import { HistoryManager } from '../../src/core/HistoryManager';

describe('HistoryManager', () => {
  let historyManager;
  let mockEditor;

  beforeEach(() => {
    mockEditor = {
      id: 'test-editor',
      blocks: [
        { id: 'block1', config: { content: 'Test 1' } },
        { id: 'block2', config: { content: 'Test 2' } }
      ],
      blocksJSON: jest.fn(() => JSON.stringify([
        { id: 'block1', class: 'Paragraph', data: { content: 'Test 1' } },
        { id: 'block2', class: 'Paragraph', data: { content: 'Test 2' } }
      ])),
      loadFromJSON: jest.fn(),
      $dispatch: jest.fn()
    };

    historyManager = new HistoryManager(mockEditor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with empty history and correct settings', () => {
      expect(historyManager.editor).toBe(mockEditor);
      expect(historyManager.history).toEqual([]);
      expect(historyManager.currentIndex).toBe(-1);
      expect(historyManager.maxHistorySize).toBe(50);
      expect(historyManager.debounceDelay).toBe(300);
    });

    it('should save initial state', () => {
      expect(historyManager.history).toHaveLength(1);
      expect(historyManager.currentIndex).toBe(0);
    });
  });

  describe('saveState', () => {
    it('should save current editor state', () => {
      const initialCount = historyManager.history.length;
      
      historyManager.saveState();
      
      expect(historyManager.history.length).toBe(initialCount + 1);
      expect(historyManager.currentIndex).toBe(historyManager.history.length - 1);
      expect(mockEditor.blocksJSON).toHaveBeenCalled();
    });

    it('should debounce rapid save calls', () => {
      jest.useFakeTimers();
      const initialCount = historyManager.history.length;
      
      historyManager.saveState();
      historyManager.saveState();
      historyManager.saveState();
      
      // Should not save immediately due to debouncing
      expect(historyManager.history.length).toBe(initialCount);
      
      // Advance time past debounce delay
      jest.advanceTimersByTime(350);
      
      // Should have saved only once
      expect(historyManager.history.length).toBe(initialCount + 1);
      
      jest.useRealTimers();
    });

    it('should clear future history when saving after undo', () => {
      // Save a few states
      historyManager.saveState();
      historyManager.saveState();
      historyManager.saveState();
      
      // Undo twice
      historyManager.undo();
      historyManager.undo();
      
      const indexBeforeSave = historyManager.currentIndex;
      const historyLengthBeforeSave = historyManager.history.length;
      
      // Save new state - should clear future history
      historyManager.saveState();
      
      expect(historyManager.currentIndex).toBe(indexBeforeSave + 1);
      expect(historyManager.history.length).toBe(indexBeforeSave + 2);
      expect(historyManager.history.length).toBeLessThan(historyLengthBeforeSave);
    });

    it('should enforce max history size', () => {
      historyManager.maxHistorySize = 3;
      
      // Save states beyond max size
      for (let i = 0; i < 5; i++) {
        historyManager.saveState();
        jest.advanceTimersByTime(350); // Skip debounce
      }
      
      expect(historyManager.history.length).toBe(3);
      expect(historyManager.currentIndex).toBe(2);
    });

    it('should not save duplicate states', () => {
      const initialCount = historyManager.history.length;
      
      // Try to save the same state twice
      historyManager.saveState();
      jest.advanceTimersByTime(350);
      
      historyManager.saveState();
      jest.advanceTimersByTime(350);
      
      // Should only save once since state is the same
      expect(historyManager.history.length).toBe(initialCount + 1);
    });
  });

  describe('undo', () => {
    beforeEach(() => {
      // Set up some history
      historyManager.saveState();
      jest.advanceTimersByTime(350);
      
      mockEditor.blocks[0].config.content = 'Modified Test 1';
      mockEditor.blocksJSON.mockReturnValue(JSON.stringify([
        { id: 'block1', class: 'Paragraph', data: { content: 'Modified Test 1' } },
        { id: 'block2', class: 'Paragraph', data: { content: 'Test 2' } }
      ]));
      
      historyManager.saveState();
      jest.advanceTimersByTime(350);
    });

    it('should restore previous state', () => {
      const canUndoBefore = historyManager.canUndo();
      const currentIndexBefore = historyManager.currentIndex;
      
      const result = historyManager.undo();
      
      expect(canUndoBefore).toBe(true);
      expect(result).toBe(true);
      expect(historyManager.currentIndex).toBe(currentIndexBefore - 1);
      expect(mockEditor.loadFromJSON).toHaveBeenCalled();
    });

    it('should not undo when at beginning of history', () => {
      // Undo to beginning
      while (historyManager.canUndo()) {
        historyManager.undo();
      }
      
      const result = historyManager.undo();
      
      expect(result).toBe(false);
      expect(mockEditor.loadFromJSON).not.toHaveBeenCalled();
    });

    it('should update history state after undo', () => {
      historyManager.undo();
      
      expect(mockEditor.$dispatch).toHaveBeenCalledWith('history-state-changed');
    });
  });

  describe('redo', () => {
    beforeEach(() => {
      // Set up history and undo
      historyManager.saveState();
      jest.advanceTimersByTime(350);
      historyManager.undo();
    });

    it('should restore next state', () => {
      const canRedoBefore = historyManager.canRedo();
      const currentIndexBefore = historyManager.currentIndex;
      
      const result = historyManager.redo();
      
      expect(canRedoBefore).toBe(true);
      expect(result).toBe(true);
      expect(historyManager.currentIndex).toBe(currentIndexBefore + 1);
      expect(mockEditor.loadFromJSON).toHaveBeenCalled();
    });

    it('should not redo when at end of history', () => {
      historyManager.redo(); // Redo once to get to end
      
      const result = historyManager.redo();
      
      expect(result).toBe(false);
      expect(mockEditor.loadFromJSON).toHaveBeenCalledTimes(1); // Only from the first redo
    });

    it('should update history state after redo', () => {
      historyManager.redo();
      
      expect(mockEditor.$dispatch).toHaveBeenCalledWith('history-state-changed');
    });
  });

  describe('canUndo', () => {
    it('should return true when there is history to undo', () => {
      historyManager.saveState();
      jest.advanceTimersByTime(350);
      
      expect(historyManager.canUndo()).toBe(true);
    });

    it('should return false when at beginning of history', () => {
      // Start with initial state only
      historyManager.currentIndex = 0;
      
      expect(historyManager.canUndo()).toBe(false);
    });
  });

  describe('canRedo', () => {
    it('should return true when there is future history', () => {
      historyManager.saveState();
      jest.advanceTimersByTime(350);
      historyManager.undo();
      
      expect(historyManager.canRedo()).toBe(true);
    });

    it('should return false when at end of history', () => {
      expect(historyManager.canRedo()).toBe(false);
    });
  });

  describe('clear', () => {
    it('should reset history to empty state', () => {
      // Add some history
      historyManager.saveState();
      historyManager.saveState();
      jest.advanceTimersByTime(350);
      
      historyManager.clear();
      
      expect(historyManager.history).toEqual([]);
      expect(historyManager.currentIndex).toBe(-1);
    });

    it('should save initial state after clearing', () => {
      historyManager.clear();
      
      expect(historyManager.history).toHaveLength(1);
      expect(historyManager.currentIndex).toBe(0);
    });
  });

  describe('getHistoryInfo', () => {
    it('should return current history information', () => {
      historyManager.saveState();
      historyManager.saveState();
      jest.advanceTimersByTime(350);
      
      const info = historyManager.getHistoryInfo();
      
      expect(info).toEqual({
        currentIndex: historyManager.currentIndex,
        historyLength: historyManager.history.length,
        canUndo: historyManager.canUndo(),
        canRedo: historyManager.canRedo()
      });
    });
  });

  describe('error handling', () => {
    it('should handle editor without blocksJSON method', () => {
      mockEditor.blocksJSON = undefined;
      
      expect(() => historyManager.saveState()).not.toThrow();
    });

    it('should handle editor without loadFromJSON method', () => {
      mockEditor.loadFromJSON = undefined;
      
      expect(() => historyManager.undo()).not.toThrow();
      expect(() => historyManager.redo()).not.toThrow();
    });

    it('should handle invalid JSON in history', () => {
      historyManager.history.push({ timestamp: Date.now(), state: 'invalid-json' });
      historyManager.currentIndex = historyManager.history.length - 1;
      
      expect(() => historyManager.undo()).not.toThrow();
    });
  });

  describe('debouncing', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should clear existing timeout when saving rapidly', () => {
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      
      historyManager.saveState();
      historyManager.saveState();
      
      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it('should not save during debounce period', () => {
      const initialCount = historyManager.history.length;
      
      historyManager.saveState();
      jest.advanceTimersByTime(100); // Less than debounce delay
      
      expect(historyManager.history.length).toBe(initialCount);
    });
  });
});
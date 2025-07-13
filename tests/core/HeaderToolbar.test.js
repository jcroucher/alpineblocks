import { HeaderToolbar } from '../../src/core/HeaderToolbar';

describe('HeaderToolbar', () => {
  let headerToolbar;
  let mockEditor;
  let mockHistoryManager;

  beforeEach(() => {
    mockHistoryManager = {
      canUndo: jest.fn(() => false),
      canRedo: jest.fn(() => false),
      undo: jest.fn(),
      redo: jest.fn()
    };

    mockEditor = {
      historyManager: mockHistoryManager,
      $dispatch: jest.fn(),
      $nextTick: jest.fn((callback) => callback())
    };

    headerToolbar = new HeaderToolbar();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with null editor', () => {
      expect(headerToolbar.editor).toBeNull();
    });
  });

  describe('init', () => {
    it('should store editor reference', () => {
      headerToolbar.init(mockEditor);
      
      expect(headerToolbar.editor).toBe(mockEditor);
    });
  });

  describe('render', () => {
    beforeEach(() => {
      headerToolbar.init(mockEditor);
    });

    it('should return header toolbar HTML', () => {
      const html = headerToolbar.render();
      
      expect(html).toContain('editor-header-toolbar');
      expect(html).toContain('undo-button');
      expect(html).toContain('redo-button');
      expect(html).toContain('@click="undo()"');
      expect(html).toContain('@click="redo()"');
    });

    it('should include Alpine.js data attributes', () => {
      const html = headerToolbar.render();
      
      expect(html).toContain('x-data=');
      expect(html).toContain('canUndo');
      expect(html).toContain('canRedo');
    });

    it('should show disabled state for buttons when no history', () => {
      mockHistoryManager.canUndo.mockReturnValue(false);
      mockHistoryManager.canRedo.mockReturnValue(false);
      
      const html = headerToolbar.render();
      
      expect(html).toContain(':disabled="!canUndo"');
      expect(html).toContain(':disabled="!canRedo"');
    });

    it('should handle editor without history manager', () => {
      mockEditor.historyManager = null;
      
      expect(() => headerToolbar.render()).not.toThrow();
      
      const html = headerToolbar.render();
      expect(html).toContain('editor-header-toolbar');
    });
  });

  describe('getAlpineData', () => {
    beforeEach(() => {
      headerToolbar.init(mockEditor);
    });

    it('should return Alpine.js data object with history state', () => {
      mockHistoryManager.canUndo.mockReturnValue(true);
      mockHistoryManager.canRedo.mockReturnValue(false);
      
      const data = headerToolbar.getAlpineData();
      
      expect(data.canUndo).toBe(true);
      expect(data.canRedo).toBe(false);
      expect(typeof data.undo).toBe('function');
      expect(typeof data.redo).toBe('function');
      expect(typeof data.updateHistoryState).toBe('function');
    });

    it('should handle missing history manager gracefully', () => {
      mockEditor.historyManager = null;
      
      const data = headerToolbar.getAlpineData();
      
      expect(data.canUndo).toBe(false);
      expect(data.canRedo).toBe(false);
      expect(typeof data.undo).toBe('function');
      expect(typeof data.redo).toBe('function');
    });

    describe('undo method', () => {
      it('should call history manager undo', () => {
        const data = headerToolbar.getAlpineData();
        
        data.undo();
        
        expect(mockHistoryManager.undo).toHaveBeenCalled();
        expect(mockEditor.$dispatch).toHaveBeenCalledWith('editor-undo');
      });

      it('should handle missing history manager', () => {
        mockEditor.historyManager = null;
        const data = headerToolbar.getAlpineData();
        
        expect(() => data.undo()).not.toThrow();
      });
    });

    describe('redo method', () => {
      it('should call history manager redo', () => {
        const data = headerToolbar.getAlpineData();
        
        data.redo();
        
        expect(mockHistoryManager.redo).toHaveBeenCalled();
        expect(mockEditor.$dispatch).toHaveBeenCalledWith('editor-redo');
      });

      it('should handle missing history manager', () => {
        mockEditor.historyManager = null;
        const data = headerToolbar.getAlpineData();
        
        expect(() => data.redo()).not.toThrow();
      });
    });

    describe('updateHistoryState method', () => {
      it('should update history state and trigger Alpine refresh', () => {
        const data = headerToolbar.getAlpineData();
        mockHistoryManager.canUndo.mockReturnValue(true);
        mockHistoryManager.canRedo.mockReturnValue(true);
        
        data.updateHistoryState();
        
        expect(data.canUndo).toBe(true);
        expect(data.canRedo).toBe(true);
        expect(mockEditor.$nextTick).toHaveBeenCalled();
      });

      it('should handle missing history manager', () => {
        mockEditor.historyManager = null;
        const data = headerToolbar.getAlpineData();
        
        expect(() => data.updateHistoryState()).not.toThrow();
      });
    });
  });

  describe('keyboard shortcuts', () => {
    beforeEach(() => {
      headerToolbar.init(mockEditor);
    });

    it('should include keyboard shortcut attributes', () => {
      const html = headerToolbar.render();
      
      expect(html).toContain('title="Undo (Ctrl+Z)"');
      expect(html).toContain('title="Redo (Ctrl+Y)"');
    });
  });

  describe('error handling', () => {
    it('should handle rendering without initialization', () => {
      expect(() => headerToolbar.render()).not.toThrow();
      
      const html = headerToolbar.render();
      expect(html).toContain('editor-header-toolbar');
    });

    it('should handle missing editor gracefully', () => {
      headerToolbar.editor = null;
      
      expect(() => headerToolbar.render()).not.toThrow();
    });
  });
});
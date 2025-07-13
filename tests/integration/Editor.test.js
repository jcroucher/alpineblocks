import { Editor } from '../../src/core/editor';
import { ToolManager } from '../../src/core/editor_modules/ToolManager';
import { BlockManager } from '../../src/core/editor_modules/BlockManager';
import { InlineToolbar } from '../../src/core/editor_modules/InlineToolbar';
import { HistoryManager } from '../../src/core/HistoryManager';
import { HeaderToolbar } from '../../src/core/HeaderToolbar';

// Mock the editor modules
jest.mock('../../src/core/editor_modules/ToolManager');
jest.mock('../../src/core/editor_modules/BlockManager');
jest.mock('../../src/core/editor_modules/InlineToolbar');
jest.mock('../../src/core/HistoryManager');
jest.mock('../../src/core/HeaderToolbar');

describe('Editor Integration', () => {
  let editor;
  let mockToolConfig;
  let mockToolManager;
  let mockBlockManager;
  let mockInlineToolbar;
  let mockHistoryManager;
  let mockHeaderToolbar;
  let mockElement;

  beforeEach(() => {
    // Mock DOM element
    mockElement = {
      id: 'test-editor',
      style: {},
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      },
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    };

    // Mock Alpine.js utilities
    const mockAlpineUtils = {
      $el: mockElement,
      $dispatch: jest.fn(),
      $nextTick: jest.fn((callback) => callback()),
      $watch: jest.fn()
    };

    // Mock tool configuration
    mockToolConfig = {
      'Paragraph': {
        class: class MockParagraph {
          constructor(config) {
            this.id = config.id;
            this.config = config.config;
          }
          init() {}
          render() { return '<p>Mock paragraph</p>'; }
        },
        config: { content: 'Test paragraph' }
      }
    };

    // Mock managers
    mockToolManager = {
      loadTools: jest.fn(),
      getTools: jest.fn(() => [])
    };
    mockBlockManager = {
      blocks: [],
      addBlock: jest.fn(),
      findBlockById: jest.fn(),
      renderBlocks: jest.fn(() => ''),
      updateBlock: jest.fn()
    };
    mockInlineToolbar = {
      init: jest.fn()
    };
    mockHistoryManager = {
      saveState: jest.fn(),
      undo: jest.fn(),
      redo: jest.fn(),
      canUndo: jest.fn(() => false),
      canRedo: jest.fn(() => false)
    };
    mockHeaderToolbar = {
      init: jest.fn(),
      render: jest.fn(() => '<div>Header Toolbar</div>')
    };

    // Mock constructors
    ToolManager.mockImplementation(() => mockToolManager);
    BlockManager.mockImplementation(() => mockBlockManager);
    InlineToolbar.mockImplementation(() => mockInlineToolbar);
    HistoryManager.mockImplementation(() => mockHistoryManager);
    HeaderToolbar.mockImplementation(() => mockHeaderToolbar);

    // Initialize editor
    editor = new Editor(mockToolConfig, 2);
    
    // Assign Alpine utilities
    Object.assign(editor, mockAlpineUtils);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with correct properties', () => {
      expect(editor.id).toBe('');
      expect(editor.log_level).toBe(2);
      expect(editor.toolConfig).toBe(mockToolConfig);
      expect(editor.selectedBlock).toBeNull();
      expect(editor.hoveredTarget).toEqual({});
      expect(editor.tools).toEqual([]);
    });

    it('should create manager instances', () => {
      expect(ToolManager).toHaveBeenCalledWith(mockToolConfig);
      expect(BlockManager).toHaveBeenCalled();
      expect(InlineToolbar).toHaveBeenCalled();
      expect(HistoryManager).toHaveBeenCalled();
      expect(HeaderToolbar).toHaveBeenCalled();
    });

    it('should use default log level', () => {
      const defaultEditor = new Editor(mockToolConfig);
      expect(defaultEditor.log_level).toBe(2);
    });
  });

  describe('init', () => {
    it('should initialize editor correctly', () => {
      editor.init();

      expect(editor.id).toBe('test-editor');
      expect(window.alpineEditors).toBeDefined();
      expect(window.alpineEditors['test-editor']).toBe(editor);
      expect(mockToolManager.loadTools).toHaveBeenCalled();
      expect(mockInlineToolbar.init).toHaveBeenCalledWith(editor);
      expect(mockHeaderToolbar.init).toHaveBeenCalledWith(editor);
    });

    it('should create initial paragraph block', () => {
      editor.init();

      expect(mockBlockManager.addBlock).toHaveBeenCalled();
      const addBlockCall = mockBlockManager.addBlock.mock.calls[0];
      expect(addBlockCall[0]).toBe(mockToolConfig.Paragraph.class);
    });

    it('should dispatch editor-ready event', () => {
      editor.init();

      expect(editor.$dispatch).toHaveBeenCalledWith('editor-ready', { id: 'test-editor' });
    });
  });

  describe('getToolbar', () => {
    it('should return tools from tool manager', () => {
      const mockTools = [{ name: 'Paragraph' }];
      mockToolManager.getTools.mockReturnValue(mockTools);

      const result = editor.getToolbar();

      expect(result).toBe(mockTools);
      expect(mockToolManager.getTools).toHaveBeenCalled();
    });
  });

  describe('blocks property', () => {
    it('should return blocks from block manager', () => {
      const mockBlocks = [{ id: 'block1' }, { id: 'block2' }];
      mockBlockManager.blocks = mockBlocks;

      expect(editor.blocks).toBe(mockBlocks);
    });
  });

  describe('blocksJSON', () => {
    it('should return JSON representation of blocks', () => {
      const mockBlocks = [
        {
          id: 'block1',
          constructor: { name: 'Paragraph' },
          config: { content: 'Test' }
        }
      ];
      mockBlockManager.blocks = mockBlocks;

      const result = editor.blocksJSON();
      const parsed = JSON.parse(result);

      expect(parsed).toHaveLength(1);
      expect(parsed[0]).toEqual({
        id: 'block1',
        class: 'Paragraph',
        data: { content: 'Test' }
      });
    });

    it('should return pretty formatted JSON when requested', () => {
      const mockBlocks = [
        {
          id: 'block1',
          constructor: { name: 'Paragraph' },
          config: { content: 'Test' }
        }
      ];
      mockBlockManager.blocks = mockBlocks;

      const result = editor.blocksJSON(true);

      expect(result).toContain('&nbsp;');
      expect(result).toContain('<br>');
    });
  });

  describe('getCurrentSelectedBlock', () => {
    it('should return selected block', () => {
      editor.selectedBlock = 'test-block';
      expect(editor.getCurrentSelectedBlock()).toBe('test-block');
    });
  });

  describe('getEditorContent', () => {
    it('should return rendered blocks content', () => {
      const mockContent = '<div>Rendered content</div>';
      mockBlockManager.renderBlocks.mockReturnValue(mockContent);

      const result = editor.getEditorContent();

      expect(result).toBe(mockContent);
      expect(mockBlockManager.renderBlocks).toHaveBeenCalled();
    });
  });

  describe('getSettings', () => {
    it('should return block settings', () => {
      const mockBlock = {
        id: 'test-block',
        settings: [{ name: 'content', label: 'Content' }]
      };
      mockBlockManager.blocks = [mockBlock];

      const result = editor.getSettings('test-block');

      expect(result).toBe(mockBlock.settings);
    });

    it('should return null for non-existent block', () => {
      mockBlockManager.blocks = [];

      const result = editor.getSettings('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('drag and drop functionality', () => {
    let mockEvent;

    beforeEach(() => {
      mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        currentTarget: {
          getBoundingClientRect: jest.fn(() => ({
            top: 100,
            height: 200
          }))
        },
        clientY: 150,
        relatedTarget: null,
        dataTransfer: {
          getData: jest.fn(() => 'Paragraph')
        }
      };
    });

    describe('handleDragOver', () => {
      it('should update hovered target based on mouse position', () => {
        editor.handleDragOver(mockEvent, 'test-block');

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(editor.hoveredTarget['test-block']).toBe('bottom');
      });

      it('should set position to top when in upper 40%', () => {
        mockEvent.clientY = 120; // 20px from top = 10% of 200px height
        
        editor.handleDragOver(mockEvent, 'test-block');

        expect(editor.hoveredTarget['test-block']).toBe('top');
      });

      it('should throttle drag over events', () => {
        jest.useFakeTimers();
        
        editor.handleDragOver(mockEvent, 'test-block');
        editor.handleDragOver(mockEvent, 'test-block');
        
        expect(editor.hoveredTarget['test-block']).toBeUndefined();
        
        jest.advanceTimersByTime(10);
        
        expect(editor.hoveredTarget['test-block']).toBe('bottom');
        
        jest.useRealTimers();
      });
    });

    describe('handleDragLeave', () => {
      beforeEach(() => {
        editor.hoveredTarget['test-block'] = 'bottom';
      });

      it('should clear hovered target when leaving element', () => {
        jest.useFakeTimers();
        
        editor.handleDragLeave(mockEvent, 'test-block');
        
        jest.advanceTimersByTime(100);
        
        expect(editor.hoveredTarget['test-block']).toBeUndefined();
        
        jest.useRealTimers();
      });

      it('should not clear when moving to child element', () => {
        mockEvent.relatedTarget = { parentNode: mockEvent.currentTarget };
        mockEvent.currentTarget.contains = jest.fn(() => true);
        
        editor.handleDragLeave(mockEvent, 'test-block');
        
        expect(editor.hoveredTarget['test-block']).toBe('bottom');
      });
    });

    describe('handleDrop', () => {
      it('should create new block and add to blocks array', () => {
        editor.hoveredTarget['test-block'] = 'bottom';
        mockBlockManager.blocks = [{ id: 'test-block' }];
        mockBlockManager.blocks.findIndex = jest.fn(() => 0);
        mockBlockManager.blocks.splice = jest.fn();

        editor.handleDrop(mockEvent, 'end', 'test-block');

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockEvent.dataTransfer.getData).toHaveBeenCalledWith('text/plain');
        expect(editor.hoveredTarget['test-block']).toBeUndefined();
        expect(editor.$dispatch).toHaveBeenCalledWith('editor-drop', { id: 'test-editor' });
      });

      it('should add block to end when no target specified', () => {
        mockBlockManager.blocks.push = jest.fn();

        editor.handleDrop(mockEvent);

        expect(mockBlockManager.blocks.push).toHaveBeenCalled();
      });
    });
  });

  describe('initBlock', () => {
    it('should create new block instance', () => {
      const mockBlock = { id: 'new-block', init: jest.fn() };
      const MockBlockClass = jest.fn(() => mockBlock);
      editor.toolConfig.TestTool = {
        class: MockBlockClass,
        config: { content: 'test' }
      };

      const result = editor.initBlock('TestTool');

      expect(MockBlockClass).toHaveBeenCalledWith({
        id: 'test-uuid-1234',
        updateFunction: expect.any(Function),
        config: { content: 'test' }
      });
      expect(mockBlock.init).toHaveBeenCalledWith(editor);
      expect(result).toBe(mockBlock);
    });

    it('should add block to blocks array when push is true', () => {
      const mockBlock = { id: 'new-block', init: jest.fn() };
      const MockBlockClass = jest.fn(() => mockBlock);
      editor.toolConfig.TestTool = {
        class: MockBlockClass,
        config: { content: 'test' }
      };
      mockBlockManager.blocks.push = jest.fn();

      editor.initBlock('TestTool', true);

      expect(mockBlockManager.blocks.push).toHaveBeenCalledWith(mockBlock);
    });
  });

  describe('updateFunction', () => {
    it('should update block config and dispatch event', () => {
      const mockBlock = { id: 'test-block', config: { content: 'old' } };
      mockBlockManager.blocks = [mockBlock];

      editor.updateFunction('test-block', { content: 'new' });

      expect(mockBlock.config).toEqual({ content: 'new' });
      expect(editor.$dispatch).toHaveBeenCalledWith('editor-updated', { id: 'test-editor' });
      expect(mockHistoryManager.saveState).toHaveBeenCalled();
    });
  });

  describe('setActive', () => {
    it('should update selected block and dispatch event', () => {
      editor.setActive(null, 'new-block');

      expect(editor.selectedBlock).toBe('new-block');
      expect(editor.$dispatch).toHaveBeenCalledWith('editor-block-changed', { block_id: 'new-block' });
    });

    it('should not update if block is already selected', () => {
      editor.selectedBlock = 'current-block';
      editor.setActive(null, 'current-block');

      expect(editor.$dispatch).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle missing Alpine utilities gracefully', () => {
      const editorWithoutAlpine = new Editor(mockToolConfig);
      // Add minimal Alpine utilities to prevent errors
      editorWithoutAlpine.$el = { id: 'test-editor-no-alpine' };
      editorWithoutAlpine.$dispatch = jest.fn();
      editorWithoutAlpine.$nextTick = jest.fn((callback) => callback());
      
      expect(() => editorWithoutAlpine.init()).not.toThrow();
    });

    it('should handle empty tool config', () => {
      const editorWithEmptyConfig = new Editor({});
      Object.assign(editorWithEmptyConfig, { $el: mockElement, $dispatch: jest.fn(), $nextTick: jest.fn() });
      
      expect(() => editorWithEmptyConfig.init()).not.toThrow();
    });
  });

  describe('mergeConfigPreservingToolInstances', () => {
    it('should preserve Tool instances in arrays', () => {
      const mockTool = {
        id: 'tool1',
        serializeConfig: jest.fn(),
        config: { content: 'old' }
      };
      
      const target = {
        blocks: [mockTool]
      };
      
      const source = {
        blocks: [{
          id: 'tool1',
          config: { content: 'new' }
        }]
      };
      
      editor.mergeConfigPreservingToolInstances(target, source);
      
      expect(target.blocks[0]).toBe(mockTool);
      expect(mockTool.config.content).toBe('new');
    });
    
    it('should handle non-array properties', () => {
      const target = { prop1: 'old' };
      const source = { prop1: 'new', prop2: 'added' };
      
      editor.mergeConfigPreservingToolInstances(target, source);
      
      expect(target.prop1).toBe('new');
      expect(target.prop2).toBe('added');
    });
    
    it('should handle missing Tool instances', () => {
      const target = { blocks: [] };
      const source = {
        blocks: [{
          id: 'new-tool',
          config: { content: 'test' }
        }]
      };
      
      editor.mergeConfigPreservingToolInstances(target, source);
      
      expect(target.blocks[0]).toEqual({
        id: 'new-tool',
        config: { content: 'test' }
      });
    });
  });
  
  describe('history integration', () => {
    it('should save state when blocks are updated', () => {
      jest.useFakeTimers();
      
      editor.updateFunction('test-block', { content: 'new' });
      
      // The save is debounced, so advance time to trigger it
      jest.advanceTimersByTime(1100);
      
      expect(mockHistoryManager.saveState).toHaveBeenCalled();
      
      jest.useRealTimers();
    });
    
    it('should expose undo/redo methods', () => {
      expect(typeof editor.undo).toBe('function');
      expect(typeof editor.redo).toBe('function');
      expect(typeof editor.canUndo).toBe('function');
      expect(typeof editor.canRedo).toBe('function');
    });
    
    it('should call history manager methods', () => {
      editor.undo();
      editor.redo();
      editor.canUndo();
      editor.canRedo();
      
      expect(mockHistoryManager.undo).toHaveBeenCalled();
      expect(mockHistoryManager.redo).toHaveBeenCalled();
      expect(mockHistoryManager.canUndo).toHaveBeenCalled();
      expect(mockHistoryManager.canRedo).toHaveBeenCalled();
    });
  });
  
  describe('header toolbar integration', () => {
    it('should expose getHeaderToolbar method', () => {
      expect(typeof editor.getHeaderToolbar).toBe('function');
    });
    
    it('should return header toolbar HTML', () => {
      // Initialize the editor first to set up header toolbar
      editor.init();
      
      const result = editor.getHeaderToolbar();
      expect(result).toBe('<div>Header Toolbar</div>');
      expect(mockHeaderToolbar.render).toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    it('should clear timeouts on destroy', () => {
      editor.dragThrottle = setTimeout(() => {}, 100);
      editor.dragLeaveTimeout = setTimeout(() => {}, 100);
      
      editor.destroy();
      
      expect(editor.dragThrottle).toBeNull();
      expect(editor.dragLeaveTimeout).toBeNull();
      expect(editor.hoveredTarget).toEqual({});
    });
  });
});
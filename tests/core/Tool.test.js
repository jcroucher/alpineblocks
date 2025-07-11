import Tool from '../../src/core/Tool';

describe('Tool Base Class', () => {
  let tool;
  let mockUpdateFunction;
  let mockEditor;

  beforeEach(() => {
    mockUpdateFunction = jest.fn();
    mockEditor = {
      $nextTick: jest.fn((callback) => callback()),
      $dispatch: jest.fn()
    };
    
    tool = new Tool('test-id', mockUpdateFunction, { content: 'test content' });
  });

  describe('constructor', () => {
    it('should initialize with correct properties', () => {
      expect(tool.id).toBe('test-id');
      expect(tool.updateFunction).toBe(mockUpdateFunction);
      expect(tool.config).toEqual({ content: 'test content' });
      expect(tool.editor).toBeNull();
      expect(tool.el).toBeNull();
    });
  });

  describe('triggerRedraw', () => {
    it('should call updateFunction with id and config', () => {
      tool.triggerRedraw();
      expect(mockUpdateFunction).toHaveBeenCalledWith('test-id', { content: 'test content' });
    });

    it('should handle missing updateFunction gracefully', () => {
      const toolWithoutUpdate = new Tool('test-id', null, {});
      expect(() => toolWithoutUpdate.triggerRedraw()).not.toThrow();
    });

    it('should create a deep copy of config', () => {
      const originalConfig = { nested: { value: 'original' } };
      const toolWithNested = new Tool('test-id', mockUpdateFunction, originalConfig);
      
      toolWithNested.triggerRedraw();
      
      // Verify the passed config is a deep copy
      const passedConfig = mockUpdateFunction.mock.calls[0][1];
      expect(passedConfig).toEqual(originalConfig);
      expect(passedConfig).not.toBe(originalConfig);
      expect(passedConfig.nested).not.toBe(originalConfig.nested);
    });
  });

  describe('init', () => {
    let mockElement;

    beforeEach(() => {
      mockElement = {
        addEventListener: jest.fn()
      };
      document.getElementById = jest.fn(() => mockElement);
    });

    it('should initialize with editor and set up event listeners', () => {
      tool.init(mockEditor);
      
      expect(tool.editor).toBe(mockEditor);
      expect(mockEditor.$nextTick).toHaveBeenCalledWith(expect.any(Function));
      expect(document.getElementById).toHaveBeenCalledWith('test-id');
      expect(mockElement.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));
    });

    it('should handle mouseup events with text selection', () => {
      // Mock text selection
      window.getSelection = jest.fn(() => ({
        toString: () => 'selected text'
      }));

      tool.init(mockEditor);
      
      // Simulate mouseup event
      const mouseupHandler = mockElement.addEventListener.mock.calls[0][1];
      const mockEvent = { clientX: 100, clientY: 200 };
      mouseupHandler(mockEvent);
      
      expect(mockEditor.$dispatch).toHaveBeenCalledWith('editor-show-inline-toolbar', {
        event: mockEvent,
        id: 'test-id',
        text: 'selected text'
      });
    });

    it('should handle mouseup events without text selection', () => {
      // Mock no text selection
      window.getSelection = jest.fn(() => ({
        toString: () => ''
      }));

      tool.init(mockEditor);
      
      // Simulate mouseup event
      const mouseupHandler = mockElement.addEventListener.mock.calls[0][1];
      const mockEvent = { clientX: 100, clientY: 200 };
      mouseupHandler(mockEvent);
      
      expect(mockEditor.$dispatch).toHaveBeenCalledWith('editor-hide-inline-toolbar');
    });

    it('should handle missing DOM element gracefully', () => {
      document.getElementById = jest.fn(() => null);
      
      expect(() => tool.init(mockEditor)).not.toThrow();
      expect(tool.editor).toBe(mockEditor);
    });
  });

  describe('static toolbox', () => {
    it('should return default toolbox configuration', () => {
      const toolbox = Tool.toolbox();
      expect(toolbox).toEqual({
        name: 'Tool',
        icon: 'default-icon'
      });
    });
  });

  describe('render methods', () => {
    it('should have render method that returns empty string by default', () => {
      expect(tool.render()).toBe('');
    });

    it('should have editorRender method that calls render by default', () => {
      const spy = jest.spyOn(tool, 'render');
      tool.editorRender();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle JSON stringify errors in triggerRedraw', () => {
      // Create circular reference
      const circularConfig = { self: null };
      circularConfig.self = circularConfig;
      
      const circularTool = new Tool('test-id', mockUpdateFunction, circularConfig);
      expect(() => circularTool.triggerRedraw()).not.toThrow();
    });
  });
});
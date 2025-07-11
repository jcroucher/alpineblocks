import { Settings } from '../../src/core/Settings';

describe('Settings Component', () => {
  let settings;
  let mockBlock;
  let mockEditor;

  beforeEach(() => {
    mockBlock = {
      id: 'test-block-id',
      config: {
        fontSize: '16px',
        color: 'red'
      },
      triggerRedraw: jest.fn(),
      testFunction: jest.fn()
    };

    mockEditor = {
      blocks: [mockBlock],
      getSettings: jest.fn(() => [
        { name: 'fontSize', label: 'Font Size', html: '<input type="text">' }
      ])
    };

    // Mock global alpineEditors
    global.alpineEditors = {
      'test-editor': mockEditor
    };

    settings = new Settings('test-editor', { fontSize: '16px' });
  });

  afterEach(() => {
    delete global.alpineEditors;
  });

  describe('constructor', () => {
    it('should initialize with correct properties', () => {
      expect(settings.editorId).toBe('test-editor');
      expect(settings.settings).toEqual({ fontSize: '16px' });
    });

    it('should initialize with empty settings by default', () => {
      const defaultSettings = new Settings('test-editor');
      expect(defaultSettings.settings).toEqual({});
    });
  });

  describe('init', () => {
    it('should set up event listener for editor-block-changed', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      
      settings.init();
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('editor-block-changed', expect.any(Function));
    });

    it('should update settings when editor-block-changed event is fired', () => {
      settings.init();
      
      // Simulate the event
      const eventHandler = window.addEventListener.mock.calls[0][1];
      const mockEvent = {
        detail: { block_id: 'test-block-id' }
      };
      
      eventHandler(mockEvent);
      
      expect(mockEditor.getSettings).toHaveBeenCalledWith('test-block-id');
      expect(settings.settings).toEqual([
        { name: 'fontSize', label: 'Font Size', html: '<input type="text">' }
      ]);
    });

    it('should handle missing editor gracefully', () => {
      delete global.alpineEditors['test-editor'];
      
      settings.init();
      
      const eventHandler = window.addEventListener.mock.calls[0][1];
      const mockEvent = {
        detail: { block_id: 'test-block-id' }
      };
      
      expect(() => eventHandler(mockEvent)).not.toThrow();
    });
  });

  describe('trigger', () => {
    it('should update block config property and trigger redraw', () => {
      settings.trigger('test-block-id', 'fontSize', '18px');
      
      expect(mockBlock.config.fontSize).toBe('18px');
      expect(mockBlock.triggerRedraw).toHaveBeenCalled();
    });

    it('should call block function if property is a function', () => {
      settings.trigger('test-block-id', 'testFunction', 'test-value');
      
      expect(mockBlock.testFunction).toHaveBeenCalledWith('test-value');
    });

    it('should handle missing block gracefully', () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      settings.trigger('non-existent-block', 'fontSize', '18px');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Block not found: non-existent-block')
      );
      
      consoleSpy.mockRestore();
    });

    it('should handle missing editor gracefully', () => {
      delete global.alpineEditors['test-editor'];
      
      expect(() => settings.trigger('test-block-id', 'fontSize', '18px')).not.toThrow();
    });

    it('should handle property not in config', () => {
      settings.trigger('test-block-id', 'nonExistentProperty', 'value');
      
      // Should not throw, but also shouldn't update anything
      expect(mockBlock.triggerRedraw).not.toHaveBeenCalled();
    });

    it('should handle missing config object', () => {
      const blockWithoutConfig = {
        id: 'test-block-id',
        triggerRedraw: jest.fn()
      };
      
      mockEditor.blocks = [blockWithoutConfig];
      
      settings.trigger('test-block-id', 'fontSize', '18px');
      
      expect(blockWithoutConfig.triggerRedraw).not.toHaveBeenCalled();
    });

    it('should handle null value', () => {
      settings.trigger('test-block-id', 'fontSize', null);
      
      expect(mockBlock.config.fontSize).toBeNull();
      expect(mockBlock.triggerRedraw).toHaveBeenCalled();
    });

    it('should handle boolean values', () => {
      mockBlock.config.enabled = false;
      settings.trigger('test-block-id', 'enabled', true);
      
      expect(mockBlock.config.enabled).toBe(true);
      expect(mockBlock.triggerRedraw).toHaveBeenCalled();
    });

    it('should handle object values', () => {
      const objectValue = { nested: 'value' };
      settings.trigger('test-block-id', 'customStyles', objectValue);
      
      expect(mockBlock.config.customStyles).toEqual(objectValue);
      expect(mockBlock.triggerRedraw).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle blocks array being undefined', () => {
      mockEditor.blocks = undefined;
      
      expect(() => settings.trigger('test-block-id', 'fontSize', '18px')).not.toThrow();
    });

    it('should handle blocks array being null', () => {
      mockEditor.blocks = null;
      
      expect(() => settings.trigger('test-block-id', 'fontSize', '18px')).not.toThrow();
    });

    it('should handle editor being undefined', () => {
      global.alpineEditors['test-editor'] = undefined;
      
      expect(() => settings.trigger('test-block-id', 'fontSize', '18px')).not.toThrow();
    });
  });
});
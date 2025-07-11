import { ToolManager } from '../../../src/core/editor_modules/ToolManager';

describe('ToolManager', () => {
  let toolManager;
  let mockToolConfig;
  let mockToolClass;

  beforeEach(() => {
    mockToolClass = {
      toolbox: jest.fn(() => ({
        name: 'Test Tool',
        icon: 'test-icon',
        category: 'Test'
      }))
    };

    mockToolConfig = {
      'TestTool': {
        class: mockToolClass,
        config: {
          content: 'test content'
        }
      },
      'AnotherTool': {
        class: mockToolClass,
        config: {
          content: 'another content'
        }
      }
    };

    toolManager = new ToolManager(mockToolConfig);
  });

  describe('constructor', () => {
    it('should initialize with correct properties', () => {
      expect(toolManager.toolConfig).toBe(mockToolConfig);
      expect(toolManager.tools).toEqual([]);
    });
  });

  describe('loadTools', () => {
    it('should load all valid tools', () => {
      toolManager.loadTools();
      
      expect(toolManager.tools).toHaveLength(2);
      expect(toolManager.tools[0]).toEqual({
        name: 'Test Tool',
        icon: 'test-icon',
        category: 'Test',
        class: 'TestTool'
      });
      expect(toolManager.tools[1]).toEqual({
        name: 'Test Tool',
        icon: 'test-icon',
        category: 'Test',
        class: 'AnotherTool'
      });
    });

    it('should call toolbox method for each tool', () => {
      toolManager.loadTools();
      
      expect(mockToolClass.toolbox).toHaveBeenCalledTimes(2);
    });

    it('should skip tools without class', () => {
      const invalidConfig = {
        'InvalidTool': {
          class: null,
          config: { content: 'test' }
        }
      };
      
      const invalidToolManager = new ToolManager(invalidConfig);
      invalidToolManager.loadTools();
      
      expect(invalidToolManager.tools).toHaveLength(0);
    });

    it('should skip tools without config', () => {
      const invalidConfig = {
        'InvalidTool': {
          class: mockToolClass,
          config: null
        }
      };
      
      const invalidToolManager = new ToolManager(invalidConfig);
      invalidToolManager.loadTools();
      
      expect(invalidToolManager.tools).toHaveLength(0);
    });

    it('should handle tools with custom toolbox configurations', () => {
      const customToolClass = {
        toolbox: jest.fn(() => ({
          name: 'Custom Tool',
          icon: 'custom-icon',
          category: 'Custom',
          shortcut: 'Ctrl+K',
          description: 'A custom tool'
        }))
      };

      const customConfig = {
        'CustomTool': {
          class: customToolClass,
          config: { content: 'custom' }
        }
      };

      const customToolManager = new ToolManager(customConfig);
      customToolManager.loadTools();

      expect(customToolManager.tools[0]).toEqual({
        name: 'Custom Tool',
        icon: 'custom-icon',
        category: 'Custom',
        shortcut: 'Ctrl+K',
        description: 'A custom tool',
        class: 'CustomTool'
      });
    });

    it('should handle empty tool configuration', () => {
      const emptyToolManager = new ToolManager({});
      emptyToolManager.loadTools();
      
      expect(emptyToolManager.tools).toHaveLength(0);
    });

    it('should handle tools that throw errors in toolbox method', () => {
      const errorToolClass = {
        toolbox: jest.fn(() => {
          throw new Error('Toolbox error');
        })
      };

      const errorConfig = {
        'ErrorTool': {
          class: errorToolClass,
          config: { content: 'error' }
        }
      };

      const errorToolManager = new ToolManager(errorConfig);
      
      expect(() => errorToolManager.loadTools()).toThrow('Toolbox error');
    });
  });

  describe('getTools', () => {
    it('should return empty array before loading', () => {
      expect(toolManager.getTools()).toEqual([]);
    });

    it('should return loaded tools after loading', () => {
      toolManager.loadTools();
      const tools = toolManager.getTools();
      
      expect(tools).toHaveLength(2);
      expect(tools[0]).toHaveProperty('name', 'Test Tool');
      expect(tools[0]).toHaveProperty('class', 'TestTool');
    });

    it('should return a reference to the tools array', () => {
      toolManager.loadTools();
      const tools = toolManager.getTools();
      
      expect(tools).toBe(toolManager.tools);
    });
  });

  describe('error handling', () => {
    it('should log error for missing class with Debug utility', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      const invalidConfig = {
        'InvalidTool': {
          class: null,
          config: { content: 'test' }
        }
      };
      
      const invalidToolManager = new ToolManager(invalidConfig);
      invalidToolManager.loadTools();
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Tool InvalidTool is missing a class'),
        expect.any(String)
      );
      
      consoleSpy.mockRestore();
    });

    it('should log error for missing config with Debug utility', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      const invalidConfig = {
        'InvalidTool': {
          class: mockToolClass,
          config: null
        }
      };
      
      const invalidToolManager = new ToolManager(invalidConfig);
      invalidToolManager.loadTools();
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Tool InvalidTool is missing a config'),
        expect.any(String)
      );
      
      consoleSpy.mockRestore();
    });
  });
});
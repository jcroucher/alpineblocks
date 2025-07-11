/**
 * Basic test to verify Jest setup is working
 */

describe('Test Infrastructure', () => {
  it('should run basic tests', () => {
    expect(1 + 1).toBe(2);
  });

  it('should have access to mocked console', () => {
    console.log('test message');
    expect(console.log).toHaveBeenCalledWith('test message');
  });

  it('should have access to mocked UUID', () => {
    const { v4: uuidv4 } = require('uuid');
    expect(uuidv4()).toBe('test-uuid-1234');
  });

  it('should have access to mocked DOM', () => {
    const element = document.createElement('div');
    expect(element).toBeDefined();
    expect(element.tagName).toBe('DIV');
  });

  it('should have access to mocked Alpine', () => {
    expect(window.Alpine).toBeDefined();
    expect(window.Alpine.data).toBeDefined();
  });
});

describe('Debug Utility', () => {
  let Debug;

  beforeEach(() => {
    jest.isolateModules(() => {
      Debug = require('../src/core/utils/Debug').Debug;
    });
  });

  it('should be defined', () => {
    expect(Debug).toBeDefined();
  });

  it('should have logging methods', () => {
    expect(Debug.log).toBeDefined();
    expect(Debug.error).toBeDefined();
    expect(Debug.warn).toBeDefined();
    expect(Debug.info).toBeDefined();
    expect(Debug.debug).toBeDefined();
  });

  it('should log messages when enabled', () => {
    Debug.setEnabled(true);
    Debug.log('test message');
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('[AlpineBlocks] test message'),
      expect.any(String)
    );
  });
});

describe('Tool Base Class', () => {
  let Tool;

  beforeEach(() => {
    jest.isolateModules(() => {
      Tool = require('../src/core/Tool').default;
    });
  });

  it('should be defined', () => {
    expect(Tool).toBeDefined();
  });

  it('should create instance with correct properties', () => {
    const mockUpdateFunction = jest.fn();
    const tool = new Tool('test-id', mockUpdateFunction, { content: 'test' });
    
    expect(tool.id).toBe('test-id');
    expect(tool.updateFunction).toBe(mockUpdateFunction);
    expect(tool.config).toEqual({ content: 'test' });
  });

  it('should have static toolbox method', () => {
    expect(Tool.toolbox).toBeDefined();
    const toolbox = Tool.toolbox();
    expect(toolbox).toHaveProperty('name');
    expect(toolbox).toHaveProperty('icon');
  });
});

describe('Paragraph Tool', () => {
  let Paragraph;

  beforeEach(() => {
    jest.isolateModules(() => {
      Paragraph = require('../src/tools/Paragraph').default;
    });
  });

  it('should be defined', () => {
    expect(Paragraph).toBeDefined();
  });

  it('should create instance with default config', () => {
    const mockUpdateFunction = jest.fn();
    const paragraph = new Paragraph({
      id: 'test-paragraph',
      updateFunction: mockUpdateFunction,
      config: {}
    });
    
    expect(paragraph.id).toBe('test-paragraph');
    expect(paragraph.config).toHaveProperty('content');
    expect(paragraph.config).toHaveProperty('fontSize');
    expect(paragraph.settings).toBeInstanceOf(Array);
  });

  it('should have static toolbox method', () => {
    expect(Paragraph.toolbox).toBeDefined();
    const toolbox = Paragraph.toolbox();
    expect(toolbox.name).toBe('Paragraph');
    expect(toolbox.category).toBe('Basic');
  });
});

describe('Button Tool', () => {
  let Button;

  beforeEach(() => {
    jest.isolateModules(() => {
      Button = require('../src/tools/Button').default;
    });
  });

  it('should be defined', () => {
    expect(Button).toBeDefined();
  });

  it('should create instance with default config', () => {
    const mockUpdateFunction = jest.fn();
    const button = new Button({
      id: 'test-button',
      updateFunction: mockUpdateFunction,
      config: {}
    });
    
    expect(button.id).toBe('test-button');
    expect(button.config).toHaveProperty('text');
    expect(button.config).toHaveProperty('type');
    expect(button.settings).toBeInstanceOf(Array);
  });

  it('should have static toolbox method', () => {
    expect(Button.toolbox).toBeDefined();
    const toolbox = Button.toolbox();
    expect(toolbox.name).toBe('Button');
    expect(toolbox.category).toBe('Interactive');
  });
});

describe('Integration Test', () => {
  it('should be able to import and use main components', () => {
    const { Debug } = require('../src/core/utils/Debug');
    const Tool = require('../src/core/Tool').default;
    const Paragraph = require('../src/tools/Paragraph').default;
    
    expect(Debug).toBeDefined();
    expect(Tool).toBeDefined();
    expect(Paragraph).toBeDefined();
    
    // Test that Paragraph extends Tool
    expect(Paragraph.prototype instanceof Tool).toBe(true);
  });
});
/**
 * Test utilities for AlpineBlocks
 */

/**
 * Create a mock Alpine.js component
 * @param {Object} data - Component data
 * @returns {Object} Mock Alpine component
 */
export function createMockAlpineComponent(data = {}) {
  return {
    $el: document.createElement('div'),
    $dispatch: jest.fn(),
    $nextTick: jest.fn((callback) => callback()),
    $watch: jest.fn(),
    $refs: {},
    ...data
  };
}

/**
 * Create a mock DOM element with common properties
 * @param {string} tagName - Element tag name
 * @param {Object} properties - Additional properties
 * @returns {Object} Mock DOM element
 */
export function createMockElement(tagName = 'div', properties = {}) {
  const element = {
    tagName: tagName.toUpperCase(),
    id: '',
    className: '',
    style: {},
    textContent: '',
    innerHTML: '',
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(),
      toggle: jest.fn()
    },
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    contains: jest.fn(),
    getBoundingClientRect: jest.fn(() => ({
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      bottom: 100,
      right: 100
    })),
    ...properties
  };

  return element;
}

/**
 * Create a mock block instance
 * @param {Object} config - Block configuration
 * @returns {Object} Mock block
 */
export function createMockBlock(config = {}) {
  return {
    id: config.id || 'test-block',
    config: config.config || {},
    constructor: { name: config.className || 'TestBlock' },
    render: jest.fn(() => '<div>Mock Block</div>'),
    editorRender: jest.fn(() => '<div>Editor Mock Block</div>'),
    init: jest.fn(),
    triggerRedraw: jest.fn(),
    settings: config.settings || [],
    ...config
  };
}

/**
 * Create a mock tool class
 * @param {Object} toolbox - Toolbox configuration
 * @returns {Function} Mock tool class
 */
export function createMockToolClass(toolbox = {}) {
  const MockTool = class {
    constructor(config) {
      this.id = config.id;
      this.config = config.config;
      this.updateFunction = config.updateFunction;
    }

    init() {}
    render() { return '<div>Mock Tool</div>'; }
    editorRender() { return '<div>Editor Mock Tool</div>'; }
    
    static toolbox() {
      return {
        name: 'Mock Tool',
        icon: 'mock-icon',
        category: 'Test',
        ...toolbox
      };
    }
  };

  return MockTool;
}

/**
 * Create a mock editor instance
 * @param {Object} config - Editor configuration
 * @returns {Object} Mock editor
 */
export function createMockEditor(config = {}) {
  return {
    id: config.id || 'test-editor',
    blocks: config.blocks || [],
    selectedBlock: config.selectedBlock || null,
    hoveredTarget: config.hoveredTarget || {},
    toolConfig: config.toolConfig || {},
    $dispatch: jest.fn(),
    $nextTick: jest.fn((callback) => callback()),
    getSettings: jest.fn(() => []),
    ...config
  };
}

/**
 * Create a mock drag event
 * @param {Object} options - Event options
 * @returns {Object} Mock drag event
 */
export function createMockDragEvent(options = {}) {
  return {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    stopImmediatePropagation: jest.fn(),
    currentTarget: options.currentTarget || createMockElement(),
    relatedTarget: options.relatedTarget || null,
    clientX: options.clientX || 100,
    clientY: options.clientY || 100,
    dataTransfer: {
      getData: jest.fn(() => options.dragData || 'Paragraph'),
      setData: jest.fn(),
      ...options.dataTransfer
    },
    ...options
  };
}

/**
 * Create mock form input event
 * @param {*} value - Input value
 * @param {Object} options - Additional options
 * @returns {Object} Mock input event
 */
export function createMockInputEvent(value, options = {}) {
  return {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    target: {
      value: value,
      checked: options.checked,
      type: options.type || 'text',
      ...options.target
    },
    ...options
  };
}

/**
 * Wait for next tick (useful for async operations)
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after timeout
 */
export function waitFor(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Simulate Alpine.js reactive updates
 * @param {Function} callback - Callback to execute
 * @returns {Promise} Promise that resolves after callback
 */
export function nextTick(callback) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (callback) callback();
      resolve();
    }, 0);
  });
}

/**
 * Assert that HTML contains specific elements
 * @param {string} html - HTML string to test
 * @param {string} selector - CSS selector to find
 * @returns {boolean} Whether element is found
 */
export function htmlContains(html, selector) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.querySelector(selector) !== null;
}

/**
 * Extract text content from HTML
 * @param {string} html - HTML string
 * @returns {string} Text content
 */
export function getTextContent(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

/**
 * Create a comprehensive test environment
 * @param {Object} options - Environment options
 * @returns {Object} Test environment
 */
export function createTestEnvironment(options = {}) {
  const mockElement = createMockElement();
  const mockAlpine = createMockAlpineComponent();
  const mockEditor = createMockEditor();
  
  // Set up global mocks
  global.alpineEditors = {
    [mockEditor.id]: mockEditor,
    ...options.editors
  };
  
  return {
    mockElement,
    mockAlpine,
    mockEditor,
    cleanup: () => {
      delete global.alpineEditors;
    }
  };
}
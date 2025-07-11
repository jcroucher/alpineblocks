import '@testing-library/jest-dom';

// Mock UUID for consistent testing
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-1234')
}));

// Mock Alpine.js
global.Alpine = {
  data: jest.fn(),
  start: jest.fn(),
  store: jest.fn()
};

// Mock window.Alpine
Object.defineProperty(window, 'Alpine', {
  value: global.Alpine,
  writable: true
});

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn()
};

// Mock window.getSelection for text selection tests
Object.defineProperty(window, 'getSelection', {
  value: jest.fn(() => ({
    toString: () => 'selected text',
    getRangeAt: () => ({
      extractContents: jest.fn(),
      insertNode: jest.fn()
    }),
    anchorNode: {
      parentNode: {
        nodeName: 'P'
      }
    }
  }))
});

// Mock DOM methods
Object.defineProperty(document, 'createElement', {
  value: jest.fn((tagName) => {
    const element = {
      tagName: tagName.toUpperCase(),
      style: {},
      textContent: '',
      innerHTML: '',
      id: '',
      className: '',
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
      }))
    };
    return element;
  })
});

// Mock DOMParser for HTML validation tests
global.DOMParser = class {
  parseFromString(str, type) {
    return {
      querySelector: jest.fn((selector) => {
        // Return null for valid HTML, mock error element for invalid HTML
        return selector === 'parsererror' ? null : null;
      })
    };
  }
};

// Set up global editor registry
global.alpineEditors = {};
global.window.alpineEditors = global.alpineEditors;
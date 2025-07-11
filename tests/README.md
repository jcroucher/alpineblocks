# AlpineBlocks Test Suite

Comprehensive test suite for the AlpineBlocks project using Jest and Testing Library.

## Overview

The test suite covers:
- **Core functionality** - Editor, Tool base class, Settings, Debug utility
- **Editor modules** - ToolManager, BlockManager, InlineToolbar
- **Tools** - Paragraph, Button, Columns, and other block types
- **Integration tests** - Full editor workflow
- **Utilities** - Helper functions and test utilities

## Test Structure

```
tests/
├── core/                    # Core system tests
│   ├── utils/              # Utility tests
│   │   └── Debug.test.js   # Debug utility tests
│   ├── editor_modules/     # Editor module tests
│   │   ├── ToolManager.test.js
│   │   └── BlockManager.test.js
│   ├── Tool.test.js        # Base Tool class tests
│   └── Settings.test.js    # Settings component tests
├── tools/                  # Individual tool tests
│   ├── Paragraph.test.js   # Paragraph tool tests
│   ├── Button.test.js      # Button tool tests
│   └── Columns.test.js     # Columns tool tests
├── integration/            # Integration tests
│   └── Editor.test.js      # Full editor integration
├── helpers/                # Test utilities
│   └── testUtils.js        # Helper functions
├── setup.js               # Test setup and mocks
├── runTests.js            # Test runner script
└── README.md              # This file
```

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Using the Test Runner
```bash
node tests/runTests.js
```

## Test Configuration

Tests are configured with:
- **Jest** as the test runner
- **jsdom** environment for DOM testing
- **Testing Library** for DOM utilities
- **Babel** for ES6+ transpilation
- **Mocked dependencies** for isolated testing

## Key Test Files

### Core Tests

**`core/utils/Debug.test.js`**
- Tests the centralized debug utility
- Verifies log levels and styling
- Ensures proper enable/disable functionality

**`core/Tool.test.js`**
- Tests the base Tool class
- Verifies inheritance patterns
- Tests event handling and Alpine.js integration

**`core/Settings.test.js`**
- Tests the settings panel functionality
- Verifies property updates and triggers
- Tests error handling for missing blocks

### Tool Tests

**`tools/Paragraph.test.js`**
- Tests paragraph rendering and editing
- Verifies settings configuration
- Tests style application and content handling

**`tools/Button.test.js`**
- Tests button rendering with different types
- Verifies icon handling and custom styles
- Tests URL handling and accessibility

**`tools/Columns.test.js`**
- Tests multi-column layout functionality
- Verifies nested block handling
- Tests drag-and-drop integration

### Integration Tests

**`integration/Editor.test.js`**
- Tests full editor workflow
- Verifies component integration
- Tests drag-and-drop functionality
- Tests block management and updates

## Test Utilities

**`helpers/testUtils.js`**
- Mock factories for common objects
- DOM testing utilities
- Alpine.js component helpers
- Event simulation functions

## Mocking Strategy

The test suite uses comprehensive mocking:

### Global Mocks
- **UUID** - Predictable test IDs
- **Alpine.js** - Mocked reactive framework
- **Console methods** - Prevent test noise
- **DOM methods** - Consistent test environment

### Component Mocks
- **Tool classes** - Simplified implementations
- **Editor modules** - Isolated testing
- **DOM elements** - Controlled behavior

## Coverage Goals

The test suite aims for:
- **90%+ line coverage** across all source files
- **85%+ branch coverage** for conditional logic
- **100% coverage** for critical paths
- **Error handling** coverage for edge cases

## Writing Tests

### Test Structure
```javascript
describe('ComponentName', () => {
  let component;
  let mockDependency;

  beforeEach(() => {
    // Setup test environment
    mockDependency = jest.fn();
    component = new ComponentName(mockDependency);
  });

  describe('method', () => {
    it('should do something specific', () => {
      // Test implementation
      expect(component.method()).toBe(expectedResult);
    });
  });
});
```

### Using Test Utilities
```javascript
import { createMockBlock, createMockDragEvent } from '../helpers/testUtils';

const mockBlock = createMockBlock({
  id: 'test-block',
  config: { content: 'test' }
});

const dragEvent = createMockDragEvent({
  dragData: 'Paragraph',
  clientX: 100,
  clientY: 200
});
```

### Testing Alpine.js Components
```javascript
import { createMockAlpineComponent } from '../helpers/testUtils';

const mockAlpine = createMockAlpineComponent({
  blocks: [],
  selectedBlock: null
});

// Test Alpine.js interactions
component.init(mockAlpine);
expect(mockAlpine.$dispatch).toHaveBeenCalledWith('event-name', data);
```

## Best Practices

1. **Isolation** - Each test should be independent
2. **Mocking** - Mock external dependencies
3. **Clarity** - Use descriptive test names
4. **Coverage** - Test both success and error paths
5. **Speed** - Keep tests fast and focused
6. **Real scenarios** - Test actual usage patterns

## Debugging Tests

### Running Single Tests
```bash
npm test -- --testNamePattern="Debug Utility"
```

### Running Test Files
```bash
npm test -- tests/core/Tool.test.js
```

### Debug Mode
```bash
npm test -- --verbose --no-coverage
```

### Watch Mode with Coverage
```bash
npm run test:watch -- --coverage
```

## Continuous Integration

The test suite is designed to run in CI environments:
- **Fast execution** - Under 30 seconds for full suite
- **Deterministic** - No flaky tests
- **Comprehensive** - High coverage requirements
- **Clear reporting** - Detailed failure information

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Maintain coverage thresholds
3. Follow existing patterns
4. Update this README if needed
5. Test both happy and error paths

## Common Issues

### Mock Issues
- Ensure mocks are reset between tests
- Use `jest.clearAllMocks()` in `beforeEach`
- Mock external dependencies consistently

### Alpine.js Testing
- Use provided mock utilities
- Test component interactions
- Verify event dispatching

### Async Testing
- Use `async/await` or return promises
- Mock timers when needed
- Test error scenarios
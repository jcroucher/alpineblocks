# Debug System

AlpineBlocks includes a comprehensive debug system for development and troubleshooting.

## Overview

All console output is centralized through the `Debug` utility class, which can be controlled via configuration.

## Configuration

Debug settings are configured in `src/config/debug.js`:

```javascript
export const DebugConfig = {
    // Enable/disable all debug output
    enabled: process.env.NODE_ENV === 'development',
    
    // Debug levels: ERROR = 0, WARN = 1, INFO = 2, DEBUG = 3
    level: 2, // INFO level by default
    
    // Module-specific debug settings
    modules: {
        editor: true,
        tools: true,
        toolbar: true,
        settings: true,
        blocks: true,
        inline: false // Disable inline toolbar debugging by default
    }
};
```

## Usage

### In Development

The debug system is automatically enabled in development mode. You can control it via the browser console:

```javascript
// Enable/disable debug output
window.AlpineBlocksDebug.setEnabled(true);

// Change debug level (0-3)
window.AlpineBlocksDebug.setLevel(3); // Show all messages

// Modify configuration
window.AlpineBlocksDebugConfig.level = 1; // Show only errors and warnings
```

### In Code

Use the Debug utility instead of console methods:

```javascript
import { Debug } from './core/utils/Debug';

// Different log levels
Debug.error('Something went wrong', errorObject);
Debug.warn('This is deprecated');
Debug.info('Tool loaded successfully');
Debug.debug('Detailed debugging info');
Debug.log('General message');
```

## Debug Levels

- **ERROR (0)**: Critical errors only
- **WARN (1)**: Warnings and errors
- **INFO (2)**: General information, warnings, and errors
- **DEBUG (3)**: All messages including detailed debugging

## Styled Output

All debug messages are styled with colors for easy identification:

- **ERROR**: Red, bold
- **WARN**: Orange, bold  
- **INFO**: Blue, bold
- **DEBUG**: Gray
- **LOG**: Dark gray

## Production

In production builds, debug output is automatically disabled unless explicitly enabled.

## Browser Tools

When debug mode is enabled, you have access to:

- `window.AlpineBlocksDebug` - Debug utility methods
- `window.AlpineBlocksDebugConfig` - Runtime configuration
# AlpineBlocks Import Usage

This document describes how to use AlpineBlocks as an imported NPM package in your projects.

## Installation

```bash
npm install alpineblocks
```

## Basic Usage

### 1. ES Module Import (Recommended)

```javascript
import AlpineBlocks from 'alpineblocks';
import 'alpineblocks/css';

// Initialize the editor
const editor = new AlpineBlocks({
    holder: document.getElementById('editor'),
    tools: [
        { class: 'Paragraph' },
        { class: 'Header' },
        { class: 'List' },
        { class: 'Image' }
    ]
});

// Initialize the editor
await editor.init();
```

### 2. CommonJS Import

```javascript
const AlpineBlocks = require('alpineblocks');
require('alpineblocks/css');

const editor = new AlpineBlocks({
    holder: document.getElementById('editor'),
    tools: [
        { class: 'Paragraph' },
        { class: 'Header' }
    ]
});

await editor.init();
```

## API Reference

### Constructor Options

```javascript
const editor = new AlpineBlocks({
    holder: HTMLElement,          // Required: Container element
    tools: Array,                 // Optional: Array of tool configurations
    media: Object                 // Optional: Media picker configuration
});
```

### Methods

#### `init()`
Initialize the editor. Returns a Promise that resolves when initialization is complete.

```javascript
await editor.init();
```

#### `save()`
Get the current editor data as JSON.

```javascript
const data = editor.save();
console.log(data); // Returns JSON string with block data
```

#### `render(data)`
Render blocks from data and return HTML output.

```javascript
const html = editor.render([
    {
        class: 'Header',
        data: { content: 'My Title', level: 'h1' }
    },
    {
        class: 'Paragraph',
        data: { content: '<p>Some content</p>' }
    }
]);
```

#### `getHTML()`
Get the current editor content as clean HTML.

```javascript
const html = editor.getHTML();
```

#### `destroy()`
Clean up and destroy the editor instance.

```javascript
editor.destroy();
```

## Tool Configuration

Configure which tools are available in the editor:

```javascript
const editor = new AlpineBlocks({
    holder: document.getElementById('editor'),
    tools: [
        { class: 'Paragraph' },
        { class: 'Header', config: { level: 'h2' } },
        { class: 'List', config: { type: 'ul' } },
        { class: 'Image' },
        { class: 'Quote' },
        { class: 'Code' },
        { class: 'VideoPlayer' },
        { class: 'AudioPlayer' },
        { class: 'Button' },
        { class: 'Alert' }
    ]
});
```

## Media Configuration

Enable the media picker for remote media browsing:

```javascript
const editor = new AlpineBlocks({
    holder: document.getElementById('editor'),
    tools: [
        { class: 'Image' },
        { class: 'VideoPlayer' }
    ],
    media: {
        apiUrl: 'https://your-api-server.com/api/media',
        allowUpload: true,
        fileTypes: ['all', 'image', 'video']
    }
});
```

## CSS Imports

The package provides multiple CSS options:

```javascript
// Main editor styles (includes all editor UI)
import 'alpineblocks/css';

// Or import specific stylesheets
import 'alpineblocks/editor.css';     // Editor interface styles
import 'alpineblocks/frontend.css';   // Frontend rendering styles
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AlpineBlocks Example</title>
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
</head>
<body>
    <div id="editor"></div>
    
    <script type="module">
        import AlpineBlocks from 'alpineblocks';
        import 'alpineblocks/css';

        const editor = new AlpineBlocks({
            holder: document.getElementById('editor'),
            tools: [
                { class: 'Paragraph' },
                { class: 'Header' },
                { class: 'List' },
                { class: 'Image' }
            ]
        });

        await editor.init();
        
        // Example usage
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                const data = editor.save();
                console.log('Saved data:', data);
            }
        });
    </script>
</body>
</html>
```

## Requirements

- **Alpine.js 3.x**: Must be loaded before initializing AlpineBlocks
- **Modern Browser**: Supports ES2015+ features
- **Node.js**: For NPM installation and bundling

## Notes

- The editor automatically starts Alpine.js if it hasn't been started yet
- Each editor instance gets a unique ID for proper isolation
- Media picker requires server-side API implementation (see media-api.md)
- All tools are bundled with the package, no additional imports needed
# AlpineBlocks

[![npm version](https://badge.fury.io/js/alpineblocks.svg)](https://badge.fury.io/js/alpineblocks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, extensible block-based content editor built with Alpine.js. Create dynamic, interactive content with drag-and-drop simplicity.

## Features

- 🎯 **Lightweight** - Minimal footprint
- 🔧 **Extensible** - Easy to add custom block types
- 🎨 **18+ Built-in Blocks** - Paragraph, Header, List, Code, Image, Quote, WYSIWYG, Alert, Video, Audio, Carousel, Columns, Raw HTML, Delimiter, Button, and more
- 🚀 **Alpine.js Powered** - Reactive and performant
- 📱 **Mobile Friendly** - Responsive design
- 🎪 **Drag & Drop** - Intuitive block management
- 💾 **JSON Export** - Easy data handling
- 🎛️ **Settings Panel** - Real-time block configuration
- 🔍 **Collapse Mode** - Toggle button to hide editor padding/borders for clean preview

## Demo

Check out the live demo at [https://jcroucher.github.io/alpineblocks/](https://jcroucher.github.io/alpineblocks/)

## Installation

```bash
npm install alpineblocks alpinejs
```

## ⚠️ Important: Alpine.js Integration

AlpineBlocks requires Alpine.js 3.x as a peer dependency. **The loading order is critical** - AlpineBlocks components must be registered before Alpine.js starts processing the DOM.

### Correct Loading Order:
```html
<!-- 1. Load AlpineBlocks FIRST -->
<script src="path/to/alpineblocks/dist/index.js"></script>

<!-- 2. Then load Alpine.js with defer -->
<script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
```

For detailed integration instructions, see [ALPINE_INTEGRATION_GUIDE.md](./ALPINE_INTEGRATION_GUIDE.md)

## Quick Start

### 1. HTML Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AlpineBlocks Example</title>
    
    <!-- Include AlpineBlocks CSS -->
    <link rel="stylesheet" href="node_modules/alpineblocks/dist/editor.css">
    <link rel="stylesheet" href="node_modules/alpineblocks/dist/frontend.css">
</head>
<body>
    <!-- Editor Container -->
    <div class="editor-layout">
        <!-- Tools Panel -->
        <div class="panel">
            <div class="panel-header">Tools</div>
            <div class="panel-content">
                <div id="toolbar" x-data="editorToolbar()">
                    <template x-for="tool in tools" :key="tool.name">
                        <div class="tool-item" 
                             draggable="true"
                             @dragstart="handleDragStart($event, tool)">
                            <div class="tool-icon" x-html="tool.icon"></div>
                            <div class="tool-name" x-text="tool.name"></div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        
        <!-- Editor Area -->
        <div class="panel editor-area">
            <div class="editor-content" 
                 id="editor" 
                 x-data="alpineEditor({
                     tools: [
                         { class: 'Paragraph', config: { content: 'Hello World!' } },
                         { class: 'Header', config: { content: 'My Header', level: 'h2' } },
                         { class: 'List', config: { content: '<li>Item 1</li>', type: 'ul' } }
                     ]
                 })">
                
                <template x-for="block in blocks" :key="block.id">
                    <div class="ab-block" 
                         @click="setActive($event, block.id)"
                         :class="{ 'selected': selectedBlock === block.id }">
                        
                        <!-- Remove Button -->
                        <button class="block-remove-btn" 
                                @click.stop="showDeleteConfirmation(block.id)">×</button>
                        
                        <!-- Block Content -->
                        <div x-html="block.editorRender()"></div>
                    </div>
                </template>
            </div>
        </div>
        
        <!-- Settings Panel -->
        <div class="panel">
            <div class="panel-header">Settings</div>
            <div class="panel-content" 
                 id="settings" 
                 x-data="editorSettings('editor', {})">
                <template x-for="setting in settings" :key="setting.name">
                    <div class="settings-field">
                        <label x-text="setting.label"></label>
                        <div x-html="setting.html"></div>
                    </div>
                </template>
            </div>
        </div>
    </div>
    
    <!-- IMPORTANT: Load scripts in this exact order -->
    <!-- 1. AlpineBlocks must load first to register components -->
    <script src="node_modules/alpineblocks/dist/index.js"></script>
    
    <!-- 2. Alpine.js loads after and auto-starts with components ready -->
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
</body>
</html>
```

### 2. ES Module Usage

```javascript
import Alpine from 'alpinejs';
import AlpineBlocks from 'alpineblocks';
import 'alpineblocks/css';

// Make Alpine globally available
window.Alpine = Alpine;

// Create and initialize the editor
const editor = new AlpineBlocks({
    holder: document.getElementById('editor'),
    tools: [
        { class: 'Paragraph' },
        { class: 'Header' },
        { class: 'List' }
    ]
});

// Initialize the editor
await editor.init();

// Start Alpine after everything is ready
Alpine.start();
```

### 3. CommonJS Usage

```javascript
const Alpine = require('alpinejs');
const AlpineBlocks = require('alpineblocks');
require('alpineblocks/css');

// Make Alpine globally available
window.Alpine = Alpine;

// Usage is the same as ES modules
const editor = new AlpineBlocks({ /* config */ });
```

## Configuration

### Basic Configuration

```javascript
// Configure your editor with specific tools
x-data="alpineEditor({
    tools: [
        {
            class: 'Paragraph',
            config: {
                content: 'Your default content here'
            }
        },
        {
            class: 'Header',
            config: {
                content: 'Default Header',
                level: 'h2'
            }
        },
        {
            class: 'Image',
            config: {
                src: '',
                alt: 'Image description',
                alignment: 'center'
            }
        }
    ]
})"
```

### Available Block Types

| Block Type | Description | Configuration Options |
|------------|-------------|----------------------|
| `Paragraph` | Basic text paragraph | `content` |
| `Header` | Heading text | `content`, `level` (h1-h6) |
| `List` | Ordered/unordered lists | `content`, `type` (ul/ol) |
| `Code` | Syntax-highlighted code | `content`, `language`, `showLineNumbers` |
| `Image` | Images with captions | `src`, `alt`, `caption`, `alignment`, `width` |
| `Quote` | Blockquotes | `content`, `attribution`, `style` |
| `WYSIWYG` | Rich text editor | `content`, `format` |
| `Alert` | Alert/notification boxes | `content`, `type`, `dismissible`, `icon` |
| `VideoPlayer` | Video embeds | `url`, `type`, `autoplay`, `controls` |
| `AudioPlayer` | Audio players | `url`, `type`, `title`, `artist`, `controls` |
| `Carousel` | Image carousels | `slides`, `showArrows`, `showDots` |
| `Columns` | Multi-column layouts | `columns`, `gap`, `alignment`, `responsive` |
| `Raw` | Raw HTML content | `content`, `mode`, `validateHtml` |
| `Delimiter` | Section dividers | `style`, `color` |
| `Button` | Interactive buttons | `text`, `type`, `size` |

## API Reference

### Editor Methods

```javascript
// Get editor instance
const editor = document.getElementById('editor')._x_dataStack[0].editor;

// Get all blocks as JSON
const json = editor.blocksJSON();

// Get selected block
const selectedBlock = editor.getCurrentSelectedBlock();

// Add a new block
const newBlock = editor.initBlock('Paragraph', true);

// Set active block
editor.setActive(null, blockId);
```

### Events

```javascript
// Listen for editor events
document.addEventListener('editor-ready', (e) => {
    console.log('Editor ready:', e.detail.id);
});

document.addEventListener('editor-updated', (e) => {
    console.log('Editor updated:', e.detail.id);
});

document.addEventListener('editor-block-changed', (e) => {
    console.log('Block changed:', e.detail.block_id);
});
```

## Creating Custom Blocks

```javascript
// Create a custom block class
class CustomBlock {
    constructor(options) {
        this.id = options.id;
        this.config = options.config || {};
        this.updateFunction = options.updateFunction;
    }
    
    init(editor) {
        this.editor = editor;
    }
    
    editorRender() {
        return `<div class="custom-block">${this.config.content}</div>`;
    }
    
    get settings() {
        return [
            {
                name: 'content',
                label: 'Content',
                html: `<input type="text" value="${this.config.content}" 
                             @input="updateConfig('content', $event.target.value)">`
            }
        ];
    }
}

// Register the custom block
// Add to your tools configuration
{
    class: 'CustomBlock',
    config: {
        content: 'Custom content'
    }
}
```

## Styling

AlpineBlocks comes with default CSS that you can customize:

```css
/* Override default styles */
.ab-block {
    border: 2px solid #e5e7eb;
    padding: 1rem;
    margin: 0.5rem 0;
}

.ab-block.selected {
    border-color: #3b82f6;
}

.block-remove-btn {
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
}
```

## Development

```bash
# Clone the repository
git clone https://github.com/jcroucher/alpineblocks.git
cd alpineblocks

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Troubleshooting

### "Alpine Expression Error: [component] is not defined"
This error occurs when Alpine.js starts before AlpineBlocks components are registered.

**Solution:** Ensure AlpineBlocks script loads before Alpine.js:
```html
<!-- Correct order -->
<script src="alpineblocks.js"></script>
<script src="alpine.js" defer></script>
```

### Components not working in development server
When using Parcel, Webpack, or other bundlers, you need manual control over Alpine initialization.

**Solution:** See the [ES Module Usage](#2-es-module-usage) section above or check [ALPINE_INTEGRATION_GUIDE.md](./ALPINE_INTEGRATION_GUIDE.md)

### Styles not loading
Make sure to include both CSS files:
```html
<link rel="stylesheet" href="path/to/editor.css">    <!-- Editor UI styles -->
<link rel="stylesheet" href="path/to/frontend.css">  <!-- Block content styles -->
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses

This project uses icons from [Font Awesome Free](https://fontawesome.com/), which is licensed under the [SIL OFL 1.1 License](https://scripts.sil.org/OFL). Font Awesome Free is free for commercial and personal use.

## Support

- 📚 [Documentation](https://jcroucher.github.io/alpineblocks/)
- 🐛 [Issues](https://github.com/jcroucher/alpineblocks/issues)
- 💬 [Discussions](https://github.com/jcroucher/alpineblocks/discussions)

## Changelog

### 1.0.0
- Initial release
- 18+ built-in block types
- Drag & drop functionality
- Remove button with confirmation modal
- JSON export/import
- Settings panel
- Mobile responsive design
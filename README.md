# AlpineBlocks

[![npm version](https://badge.fury.io/js/alpineblocks.svg)](https://badge.fury.io/js/alpineblocks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, extensible block-based content editor built with Alpine.js. Create dynamic, interactive content with drag-and-drop simplicity.

## Features

- 🎯 **Lightweight** - Minimal footprint with Alpine.js
- 🔧 **Extensible** - Easy to add custom block types  
- 🎨 **18+ Built-in Blocks** - Paragraph, Header, List, Code, Image, Quote, WYSIWYG, Alert, Video, Audio, Carousel, Columns, Raw HTML, Delimiter, Button, and more
- 🚀 **Alpine.js Powered** - Reactive and performant
- 📱 **Mobile Friendly** - Responsive design
- 🎪 **Drag & Drop** - Intuitive block management
- 💾 **JSON Export** - Easy data handling
- 🎛️ **Settings Panel** - Real-time block configuration
- 🎨 **Layout Templates** - Pre-built layouts with HTML detection

## Demo

Check out the live demo at [https://jcroucher.github.io/alpineblocks/](https://jcroucher.github.io/alpineblocks/)

## Quick Start

### 1. Installation

```bash
npm install alpineblocks alpinejs
```

### 2. Basic HTML Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AlpineBlocks Example</title>
    
    <!-- AlpineBlocks CSS -->
    <link rel="stylesheet" href="node_modules/alpineblocks/dist/editor.css">
    <link rel="stylesheet" href="node_modules/alpineblocks/dist/frontend.css">
    
    <style>
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .editor-layout {
            display: grid;
            grid-template-columns: 200px 1fr 250px;
            min-height: 600px;
        }
        
        .panel {
            border-right: 1px solid #e5e7eb;
            background: white;
        }
        
        .panel-header {
            padding: 1rem;
            background: #f9fafb;
            border-bottom: 1px solid #e5e7eb;
            font-weight: 600;
        }
        
        .panel-content {
            padding: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>AlpineBlocks Editor</h1>
            <p>A simple, powerful block-based content editor</p>
        </div>
        
        <div class="editor-layout">
            <!-- Tools Panel -->
            <div class="panel">
                <div class="panel-header">Tools</div>
                <div class="panel-content">
                    <div id="toolbar" x-data="editorToolbar()">
                        <template x-for="tool in tools" :key="tool.name">
                            <div class="tool-item" 
                                 draggable="true"
                                 @dragstart="handleDragStart($event, tool)"
                                 @click="handleClick($event, tool)">
                                <div class="tool-icon" x-html="tool.icon"></div>
                                <div class="tool-name" x-text="tool.name"></div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            
            <!-- Editor Area -->
            <div class="panel editor-area">
                <div class="panel-header">Content</div>
                <div class="editor-content" 
                     id="editor" 
                     x-data="alpineEditor()">
                    
                    <template x-for="block in blocks" :key="block.id">
                        <div class="ab-block" 
                             @click="setActive($event, block.id)"
                             :class="{ 'selected': selectedBlock === block.id }"
                             @dragover.prevent="handleDragOver($event, block.id)"
                             @drop="handleDrop($event, 'end', block.id)">
                            
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
                            <label x-text="setting.label || setting.name"></label>
                            <div x-html="setting.html"></div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
    
    <!-- JSON Output -->
    <div class="output">
        <h3>JSON Output</h3>
        <pre x-data="{ json: '[]' }" 
             x-init="setInterval(() => {
                 const editor = document.getElementById('editor')?._x_dataStack?.[0];
                 if (editor && editor.blocksJSON) {
                     json = JSON.stringify(editor.blocksJSON(), null, 2);
                 }
             }, 1000)" 
             x-text="json"></pre>
    </div>

    <script type="module">
        // Use an async function to handle the initialization
        async function initializeAlpineBlocks() {
            // Import Alpine.js from node_modules
            const Alpine = await import('alpinejs');
            
            // Make Alpine available globally
            window.Alpine = Alpine.default;
            
            // Import AlpineBlocks to register all components BEFORE starting Alpine
            await import('alpineblocks');
            
            console.log('AlpineBlocks loaded successfully!');
            
            // Start Alpine manually after all components are registered
            Alpine.default.start();
        }
        
        // Initialize everything
        initializeAlpineBlocks().catch(error => {
            console.error('Failed to initialize AlpineBlocks:', error);
        });
    </script>
</body>
</html>
```

## ⚠️ Important: Alpine.js Integration

**The loading order is critical** - AlpineBlocks components must be registered before Alpine.js starts processing the DOM.

### For CDN Usage:
```html
<!-- 1. Load AlpineBlocks FIRST -->
<script src="path/to/alpineblocks/dist/index.js"></script>

<!-- 2. Then load Alpine.js with defer -->
<script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
```

### For ES Modules (Recommended):
```javascript
async function initializeAlpineBlocks() {
    const Alpine = await import('alpinejs');
    window.Alpine = Alpine.default;
    
    // Import AlpineBlocks to register components
    await import('alpineblocks');
    
    // Start Alpine after components are registered
    Alpine.default.start();
}

initializeAlpineBlocks();
```

## Layout Templates

AlpineBlocks supports loading pre-built layout templates:

```javascript
// Configure remote layout loading
window.AlpineBlocks.configure({
    layouts: {
        source: 'remote',
        url: '/layouts/',
        index: 'index.json'
    }
});
```

Create layout files using simple HTML:

```json
{
  "id": "hero-section",
  "name": "Hero Section",
  "description": "Modern hero with call-to-action",
  "html": "<div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 5rem 2rem; text-align: center; color: white;'><h1>Your Headline Here</h1><p>Compelling subtitle text</p><button>Get Started</button></div>"
}
```

## Available Block Types

| Block Type | Description |
|------------|-------------|
| `Paragraph` | Basic text paragraphs |
| `Header` | Heading text (h1-h6) |
| `List` | Ordered/unordered lists |
| `Code` | Syntax-highlighted code blocks |
| `Image` | Images with captions |
| `Quote` | Blockquotes with attribution |
| `WYSIWYG` | Rich text editor |
| `Alert` | Alert/notification boxes |
| `VideoPlayer` | Video embeds (YouTube, Vimeo) |
| `AudioPlayer` | Audio players |
| `Carousel` | Image carousels |
| `Columns` | Multi-column layouts |
| `Raw` | Raw HTML content |
| `Delimiter` | Section dividers |
| `Button` | Interactive buttons |

## API Reference

### Get JSON Output
```javascript
// Get all blocks as JSON
const editor = document.getElementById('editor')._x_dataStack[0];
const json = editor.blocksJSON();
```

### Add Blocks Programmatically
```javascript
// Add a new block
const newBlock = editor.initBlock('Paragraph', true);

// Configure the block
newBlock.config.content = 'Hello, World!';
```

### Events
```javascript
// Listen for editor events
document.addEventListener('editor-ready', (e) => {
    console.log('Editor ready:', e.detail.id);
});

document.addEventListener('editor-block-changed', (e) => {
    console.log('Block changed:', e.detail.block_id);
});
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

**Solution:** Ensure AlpineBlocks loads before Alpine.js:
```html
<!-- Correct order -->
<script src="alpineblocks.js"></script>
<script src="alpine.js" defer></script>
```

For ES modules, use the async initialization pattern shown above.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📚 [Documentation](https://jcroucher.github.io/alpineblocks/)
- 🐛 [Issues](https://github.com/jcroucher/alpineblocks/issues)
- 💬 [Discussions](https://github.com/jcroucher/alpineblocks/discussions)
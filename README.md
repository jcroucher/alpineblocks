# AlpineBlocks

A lightweight, extensible block-based content editor built with Alpine.js. Create rich, interactive content with a simple drag-and-drop interface.

## Features

- **Lightweight**: Built with Alpine.js for minimal overhead
- **Extensible**: Easy to add custom block types
- **Drag & Drop**: Intuitive interface for content creation
- **Nested Blocks**: Support for complex layouts with nested content
- **Responsive**: Works on desktop and mobile devices
- **Modern Design**: Clean, professional UI with CSS custom properties

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/jcroucher/alpineblocks.git
cd alpineblocks
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:1234`

## Built-in Block Types

- **Paragraph**: Rich text with formatting options
- **Header**: Customizable heading levels
- **List**: Ordered and unordered lists
- **Image**: Image blocks with captions and alignment
- **Button**: Interactive buttons with styling
- **Alert**: Notification blocks with different types
- **Quote**: Blockquotes with attribution
- **Code**: Syntax-highlighted code blocks
- **Columns**: Multi-column layouts with nested blocks
- **Raw HTML**: Direct HTML input
- **Delimiter**: Visual separators

## Bundle Size

- **Development**: ~131KB uncompressed (includes debugging and full feature set)
- **Production**: ~23KB gzipped (optimized for production use)
- **Dependencies**: Alpine.js (framework) + UUID (unique identifiers)

*Note: The actual bundle size may vary based on which blocks and features you include in your build.*

## Usage

### Basic Setup

```html
<div x-data="alpineEditor({ tools: [/* your tools config */] })">
    <!-- Toolbar -->
    <div class="toolbar" x-data="editorToolbar()">
        <!-- Tools will be populated here -->
    </div>
    
    <!-- Editor Area -->
    <div class="editor-content">
        <!-- Blocks will be rendered here -->
    </div>
    
    <!-- Settings Panel -->
    <div class="settings" x-data="editorSettings('editorId')">
        <!-- Block settings will appear here -->
    </div>
</div>
```

### Creating Custom Block Types

```javascript
import Tool from './core/Tool';

class CustomBlock extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);
        
        this.config = {
            // Default configuration
        };
        
        this.settings = [
            // Settings panel configuration
        ];
    }
    
    static toolbox() {
        return {
            name: 'Custom Block',
            icon: '<svg>...</svg>',
            category: 'Custom'
        };
    }
    
    editorRender() {
        // Return HTML for editor view
    }
    
    render() {
        // Return HTML for output view
    }
}

export default CustomBlock;
```

## Architecture

- **Core**: Base classes and editor functionality
- **Tools**: Individual block types
- **Inline Tools**: Text formatting options
- **UI**: Modern CSS design system

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

**John Croucher**
- Website: [jcroucher.com](https://jcroucher.com)
- GitHub: [@jcroucher](https://github.com/jcroucher)
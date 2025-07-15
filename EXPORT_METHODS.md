# AlpineBlocks Export Methods

AlpineBlocks provides several methods to export clean content without editor UI elements. These methods are useful for saving content, generating static HTML, or integrating with other systems.

## Clean HTML Export Methods

### `getCleanHTML()`

Exports all blocks as clean HTML without any editor UI elements.

**Returns:** `string` - Clean HTML content of all blocks

**Example:**
```javascript
// Get the editor Alpine component instance
const editorElement = document.getElementById('your-editor-id');
const editorComponent = Alpine.$data(editorElement);

// Export all blocks as clean HTML
const cleanHTML = editorComponent.getCleanHTML();
console.log(cleanHTML);
```

### `getBlockHTML(blockId)`

Exports a specific block as clean HTML without editor UI elements.

**Parameters:**
- `blockId` (string) - The ID of the block to export

**Returns:** `string` - Clean HTML content of the specified block

**Example:**
```javascript
// Get the editor Alpine component instance
const editorElement = document.getElementById('your-editor-id');
const editorComponent = Alpine.$data(editorElement);

// Export a specific block as clean HTML
const blockHTML = editorComponent.getBlockHTML('block-id-here');
console.log(blockHTML);
```

### `getTemplateHTML()`

Exports all blocks as HTML with data attributes for template/design tools. This is useful when you need to identify which blocks are which in the exported HTML.

**Returns:** `string` - HTML content with data-tool and data-tool-id attributes

**Example:**
```javascript
// Get the editor Alpine component instance
const editorElement = document.getElementById('your-editor-id');
const editorComponent = Alpine.$data(editorElement);

// Export all blocks with data attributes
const templateHTML = editorComponent.getTemplateHTML();
console.log(templateHTML);
// Output: <p data-tool="Paragraph" data-tool-id="block-123">Content</p>
```

## JSON Export Methods

### `blocksJSON(pretty = false)`

Exports all blocks as JSON data.

**Parameters:**
- `pretty` (boolean, optional) - Whether to format JSON for display (default: false)

**Returns:** `string` - JSON representation of all blocks

**Example:**
```javascript
// Get the editor Alpine component instance
const editorElement = document.getElementById('your-editor-id');
const editorComponent = Alpine.$data(editorElement);

// Export as JSON
const json = editorComponent.blocksJSON();
const prettyJson = editorComponent.blocksJSON(true);
```

## How It Works

Each block tool in AlpineBlocks has two render methods:

1. **`editorRender()`** - Returns HTML with editor UI elements (contenteditable, Alpine.js directives, etc.)
2. **`render()`** - Returns clean HTML without any editor UI elements

The export methods use the `render()` method to generate clean output suitable for production use.

## Block-Specific Rendering

Each block type renders differently in clean mode:

- **Paragraph**: `<div>` with styled content
- **Header**: `<h1>`, `<h2>`, etc. with content
- **List**: `<ul>` or `<ol>` with list items
- **Image**: `<figure>` with `<img>` and optional caption
- **Quote**: `<blockquote>` with content and attribution
- **Code**: `<pre><code>` with syntax highlighting classes
- **And more...**

## Example Use Cases

1. **Save to Database**: Store clean HTML in your database
2. **Generate Static Sites**: Export content for static site generators
3. **Email Templates**: Use clean HTML in email campaigns
4. **Print Layouts**: Export for PDF generation
5. **API Integration**: Send clean content to other systems

## Complete Example

See `export-example.html` for a working demonstration of the export functionality.
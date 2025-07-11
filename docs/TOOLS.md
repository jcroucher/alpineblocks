# AlpineBlocks Tools Documentation

This document provides an overview of all available tools in the AlpineBlocks editor.

## Basic Tools

### Paragraph
The default text block for basic content.
- **Config Options:**
  - `content`: The text content of the paragraph

### Header
Heading blocks with multiple levels.
- **Config Options:**
  - `content`: The heading text
  - `level`: Heading level (h1-h6)

### List
Ordered and unordered lists.
- **Config Options:**
  - `content`: List items in HTML format
  - `type`: List type ('ul' or 'ol')

### Quote
Blockquotes with optional attribution.
- **Config Options:**
  - `content`: The quote text
  - `attribution`: Quote attribution/source
  - `style`: Quote style ('default', 'blockquote', 'pullquote', 'testimonial')

### Table
Customizable tables with row/column management.
- **Config Options:**
  - `content`: Table HTML content
  - `hasHeader`: Whether to include header row
  - `bordered`: Add borders to cells
  - `striped`: Alternate row colors

### WYSIWYG
Rich text editor with formatting options.
- **Config Options:**
  - `content`: HTML content
  - `format`: Block format ('p', 'div', 'pre')

### Alert
Notification blocks with different styles.
- **Config Options:**
  - `content`: Alert message
  - `type`: Alert type ('info', 'success', 'warning', 'error')
  - `dismissible`: Allow closing the alert
  - `icon`: Show/hide alert icon

## Media Tools

### Image
Image blocks with captions and alignment.
- **Config Options:**
  - `src`: Image URL
  - `alt`: Alt text
  - `caption`: Image caption
  - `alignment`: Image alignment ('left', 'center', 'right')
  - `width`: Image width

### VideoPlayer
Video embedding with multiple source types.
- **Config Options:**
  - `url`: Video URL
  - `type`: Video source ('youtube', 'vimeo', 'direct')
  - `autoplay`: Enable autoplay
  - `controls`: Show video controls
  - `muted`: Mute video
  - `loop`: Loop video
  - `caption`: Video caption

### AudioPlayer
Audio player with metadata support.
- **Config Options:**
  - `url`: Audio URL
  - `type`: Audio source ('file', 'spotify', 'soundcloud')
  - `title`: Track title
  - `artist`: Artist name
  - `autoplay`: Enable autoplay
  - `controls`: Show audio controls
  - `loop`: Loop audio

### Carousel
Image slideshow with navigation.
- **Config Options:**
  - `slides`: Array of slide objects (image and caption)
  - `autoplay`: Enable autoplay
  - `interval`: Slide interval
  - `showArrows`: Show navigation arrows
  - `showDots`: Show navigation dots
  - `showCaptions`: Show slide captions

## Layout Tools

### Columns
Multi-column layout with responsive options.
- **Config Options:**
  - `columns`: Array of column objects (content and width)
  - `gap`: Space between columns
  - `alignment`: Vertical alignment
  - `responsive`: Enable responsive layout
  - `breakpoint`: Responsive breakpoint

### Delimiter
Visual separators with various styles.
- **Config Options:**
  - `style`: Delimiter style ('line', 'dots', 'asterisks', 'custom')
  - `color`: Delimiter color
  - `width`: Delimiter width
  - `thickness`: Line thickness
  - `spacing`: Vertical spacing
  - `customText`: Custom delimiter text

## Interactive Tools

### Button
Interactive buttons with customization.
- **Config Options:**
  - `text`: Button text
  - `url`: Button link URL
  - `type`: Button style ('primary', 'secondary', 'outline', 'link')
  - `size`: Button size ('small', 'medium', 'large')
  - `icon`: Button icon
  - `iconPosition`: Icon placement ('left', 'right')
  - `fullWidth`: Full-width button
  - `disabled`: Disable button

## Advanced Tools

### Code
Code blocks with syntax highlighting.
- **Config Options:**
  - `content`: Code content
  - `language`: Programming language
  - `showLineNumbers`: Show line numbers

### Raw
Direct HTML/CSS/JavaScript insertion.
- **Config Options:**
  - `content`: Raw code content
  - `mode`: Code type ('html', 'css', 'javascript')
  - `executeScript`: Execute JavaScript code
  - `validateHtml`: Validate HTML content
  - `wrapCss`: Scope CSS to block 
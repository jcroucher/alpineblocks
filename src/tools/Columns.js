import Tool from '../core/Tool';
import { Debug } from '../core/utils/Debug';

/**
 * Columns tool for creating multi-column layouts with nested blocks
 */
class Columns extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            columns: this.config.columns || [
                { blocks: [], width: '1fr' },
                { blocks: [], width: '1fr' }
            ],
            gap: this.config.gap || '20px',
            alignment: this.config.alignment || 'top',
            responsive: this.config.responsive || true,
            breakpoint: this.config.breakpoint || '768px'
        };

        this.settings = [
            {
                name: 'columnCount',
                label: 'Column Layout',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'columnCount', $event.target.value)">
                    <option value="2">Two Columns</option>
                    <option value="3">Three Columns</option>
                    <option value="4">Four Columns</option>
                    <option value="custom">Custom</option>
                </select>`
            },
            {
                name: 'gap',
                label: 'Column Gap',
                html: `<input type="text" class="settings-input"
                    @change="trigger('${this.id}', 'gap', $event.target.value)"
                    value="${this.config.gap}"
                    placeholder="20px">`
            },
            {
                name: 'alignment',
                label: 'Vertical Alignment',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="top">Top</option>
                    <option value="center">Center</option>
                    <option value="bottom">Bottom</option>
                    <option value="stretch">Stretch</option>
                </select>`
            },
            {
                name: 'responsive',
                label: 'Responsive Layout',
                html: `<div class="settings-group">
                    <label class="settings-checkbox">
                        <input type="checkbox" 
                            @change="trigger('${this.id}', 'responsive', $event.target.checked)"
                            ${this.config.responsive ? 'checked' : ''}>
                        <span class="settings-checkbox-label">Responsive Layout</span>
                    </label>
                    <input type="text" class="settings-input"
                        x-show="${this.config.responsive}"
                        @change="trigger('${this.id}', 'breakpoint', $event.target.value)"
                        value="${this.config.breakpoint}"
                        placeholder="Breakpoint (e.g. 768px)">
                </div>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Columns',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z"/></svg>',
            category: 'Layout'
        };
    }

    /**
     * Update the number of columns
     * @param {string|number} count - The number of columns to create
     */
    updateColumnCount(count) {
        if (count === 'custom') {
            return;
        }

        const newColumns = [];
        for (let i = 0; i < parseInt(count); i++) {
            newColumns.push({
                blocks: [],
                width: '1fr'
            });
        }

        this.config.columns = newColumns;
        this.triggerRedraw();
    }

    /**
     * Generate CSS styles for the column grid
     * @returns {string} CSS styles string
     */
    getColumnStyles() {
        const alignmentMap = {
            top: 'start',
            center: 'center',
            bottom: 'end',
            stretch: 'stretch'
        };

        return `
            display: grid;
            grid-template-columns: ${this.config.columns.map(col => col.width).join(' ')};
            gap: ${this.config.gap};
            align-items: ${alignmentMap[this.config.alignment]};
        `;
    }

    /**
     * Handle dropping blocks into columns
     * @param {number} columnIndex - The index of the column
     * @param {Object} blockData - The block data from drag operation
     * @param {string} position - Position to insert ('end' or 'start')
     */
    handleColumnDrop(columnIndex, blockData, position = 'end') {
        if (!this.config.columns[columnIndex]) {
            return;
        }

        const toolClass = blockData.class;
        const toolConfig = blockData.config || {};
        
        const nestedBlock = {
            id: this.generateId(),
            class: toolClass,
            config: toolConfig,
            ...this.getToolDefaults(toolClass)
        };

        if (position === 'end') {
            this.config.columns[columnIndex].blocks.push(nestedBlock);
        } else {
            this.config.columns[columnIndex].blocks.unshift(nestedBlock);
        }

        this.triggerRedraw();
    }

    /**
     * Get default configuration for different tool types
     * @param {string} toolClass - The tool class name
     * @returns {Object} Default configuration object
     */
    getToolDefaults(toolClass) {
        const defaults = {
            'Paragraph': { config: { content: 'Enter paragraph text...', fontSize: '16px' } },
            'Header': { config: { content: 'Header text', level: 'h2' } },
            'Image': { config: { src: '', alt: 'Image', caption: '', alignment: 'center' } },
            'List': { config: { content: 'List item', type: 'ul' } },
            'Button': { config: { text: 'Button', type: 'primary', size: 'medium' } },
            'Alert': { config: { content: 'Alert message', type: 'info', dismissible: false } },
            'Quote': { config: { content: 'Quote text', attribution: '' } }
        };

        return defaults[toolClass] || { config: {} };
    }

    /**
     * Generate unique ID for nested blocks
     * @returns {string} Unique identifier
     */
    generateId() {
        return 'nested-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Render nested blocks within a column
     * @param {number} columnIndex - The index of the column
     * @returns {string} HTML string for nested blocks
     */
    renderNestedBlocks(columnIndex) {
        const column = this.config.columns[columnIndex];
        if (!column || !column.blocks || column.blocks.length === 0) {
            return '<div class="column-placeholder">Drop blocks here</div>';
        }

        return column.blocks.map(block => {
            return `<div class="nested-block nested-block-${block.class}" data-block-id="${block.id}">
                <div class="nested-block-content">
                    ${this.renderNestedBlockContent(block)}
                </div>
                <div class="nested-block-controls">
                    <button class="delete-nested-block" @click="removeNestedBlock(${columnIndex}, '${block.id}')">×</button>
                </div>
            </div>`;
        }).join('');
    }

    /**
     * Render the content of a nested block
     * @param {Object} block - The block object to render
     * @returns {string} HTML string for the block content
     */
    renderNestedBlockContent(block) {
        switch (block.class) {
            case 'Paragraph':
                return `<div class="nested-paragraph" style="font-size: ${block.config.fontSize || '16px'}">
                    <p>${block.config.content || 'Enter paragraph text...'}</p>
                </div>`;
            case 'Header':
                return `<div class="nested-header">
                    <${block.config.level || 'h2'} style="margin: 0; color: ${block.config.color || '#333'}">
                        ${block.config.content || 'Header text'}
                    </${block.config.level || 'h2'}>
                </div>`;
            case 'Image':
                if (block.config.src) {
                    return `<div class="nested-image" style="text-align: ${block.config.alignment || 'center'}">
                        <img src="${block.config.src}" alt="${block.config.alt || ''}" style="max-width: 100%; height: auto;">
                        ${block.config.caption ? `<div class="image-caption">${block.config.caption}</div>` : ''}
                    </div>`;
                } else {
                    return '<div class="image-placeholder">📷 Click to add image</div>';
                }
            case 'List':
                const listType = block.config.type || 'ul';
                return `<div class="nested-list">
                    <${listType}><li>${block.config.content || 'List item'}</li></${listType}>
                </div>`;
            case 'Button':
                return `<div class="nested-button" style="text-align: center; margin: 10px 0;">
                    <button class="btn btn-${block.config.type || 'primary'} btn-${block.config.size || 'medium'}">
                        ${block.config.text || 'Button'}
                    </button>
                </div>`;
            case 'Alert':
                return `<div class="nested-alert alert-${block.config.type || 'info'}" style="padding: 10px; border-radius: 4px; margin: 10px 0;">
                    ${block.config.icon ? '⚠️ ' : ''}${block.config.content || 'Alert message'}
                </div>`;
            case 'Quote':
                return `<div class="nested-quote" style="border-left: 4px solid #ddd; padding-left: 16px; margin: 10px 0; font-style: italic;">
                    <blockquote>${block.config.content || 'Quote text'}</blockquote>
                    ${block.config.attribution ? `<cite>— ${block.config.attribution}</cite>` : ''}
                </div>`;
            default:
                return `<div class="block-preview">
                    <div class="block-type-icon">📦</div>
                    <div class="block-type-name">${block.class}</div>
                    <div class="block-type-desc">Block content</div>
                </div>`;
        }
    }

    /**
     * Remove a nested block from a column
     * @param {number} columnIndex - The index of the column
     * @param {string} blockId - The ID of the block to remove
     */
    removeNestedBlock(columnIndex, blockId) {
        const column = this.config.columns[columnIndex];
        if (column && column.blocks) {
            column.blocks = column.blocks.filter(block => block.id !== blockId);
            this.triggerRedraw();
        }
    }

    editorRender() {
        const columnsToolInstance = this;
        
        return `<div class="columns-block" style="${this.getColumnStyles()}"
                     x-data="{ 
                         hoveredColumn: null,
                         handleColumnDragOver(event, columnIndex) {
                             event.preventDefault();
                             event.stopPropagation();
                             this.hoveredColumn = columnIndex;
                         },
                         handleColumnDragLeave(event, columnIndex) {
                             // Only clear if we're actually leaving the column
                             if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) {
                                 this.hoveredColumn = null;
                             }
                         },
                         handleColumnDrop(event, columnIndex) {
                             event.preventDefault();
                             event.stopPropagation();
                             event.stopImmediatePropagation();
                             
                             // Clear hover state immediately
                             this.hoveredColumn = null;
                             
                             try {
                                 // Try to get JSON data first, then fall back to text/plain
                                 let blockData;
                                 const jsonData = event.dataTransfer.getData('application/json');
                                 if (jsonData) {
                                     blockData = JSON.parse(jsonData);
                                 } else {
                                     // Fall back to text/plain format (from toolbar)
                                     const toolClass = event.dataTransfer.getData('text/plain');
                                     blockData = {
                                         class: toolClass,
                                         config: {}
                                     };
                                 }
                                 
                                 const columnsBlock = window.alpineEditors.editorjs.blocks.find(b => b.id === '${this.id}');
                                 if (columnsBlock) {
                                     columnsBlock.handleColumnDrop(columnIndex, blockData);
                                 }
                                 // Prevent the main editor from handling this drop
                                 return false;
                             } catch (e) {
                                 Debug.error('Error handling column drop:', e);
                             }
                         },
                         removeNestedBlock(columnIndex, blockId) {
                             const columnsBlock = window.alpineEditors.editorjs.blocks.find(b => b.id === '${this.id}');
                             if (columnsBlock) {
                                 columnsBlock.removeNestedBlock(columnIndex, blockId);
                             }
                         }
                     }">
            ${this.config.columns.map((column, index) => `
                <div class="column column-${index}" 
                     :class="{ 'column-hovered': hoveredColumn === ${index} }">
                    
                    <div class="column-content column-drop-zone" 
                         @dragover="handleColumnDragOver($event, ${index})"
                         @dragleave="handleColumnDragLeave($event, ${index})"
                         @drop="handleColumnDrop($event, ${index})">
                        ${this.renderNestedBlocks(index)}
                    </div>
                </div>
            `).join('')}
        </div>`;
    }

    render() {
        return `<div class="columns-block" style="${this.getColumnStyles()}">
            ${this.config.columns.map((column, index) => `
                <div class="column">
                    <div class="column-content">
                        ${this.renderNestedBlocks(index)}
                    </div>
                </div>
            `).join('')}
        </div>`;
    }
}

export default Columns;
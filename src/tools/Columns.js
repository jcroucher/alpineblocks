import Tool from '../core/Tool';
import { Debug } from '../core/utils/Debug';
import { escapeHtml } from '../utils/HtmlEscape';

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
    }

    /**
     * Get settings dynamically based on current config
     * Using a getter ensures settings reflect current state
     */
    get settings() {
        const currentColumnCount = this.config.columns.length;

        return [
            {
                name: 'columnCount',
                label: 'Column Layout',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'columnCount', $event.target.value)">
                    <option value="2" ${currentColumnCount === 2 ? 'selected' : ''}>Two Columns</option>
                    <option value="3" ${currentColumnCount === 3 ? 'selected' : ''}>Three Columns</option>
                    <option value="4" ${currentColumnCount === 4 ? 'selected' : ''}>Four Columns</option>
                    <option value="custom" ${![2, 3, 4].includes(currentColumnCount) ? 'selected' : ''}>Custom</option>
                </select>`
            },
            {
                name: 'gap',
                label: 'Column Gap',
                html: `<input type="text" class="settings-input"
                    @change="trigger('${this.id}', 'gap', $event.target.value)"
                    value="${escapeHtml(this.config.gap)}"
                    placeholder="20px">`
            },
            {
                name: 'alignment',
                label: 'Vertical Alignment',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="top" ${this.config.alignment === 'top' ? 'selected' : ''}>Top</option>
                    <option value="center" ${this.config.alignment === 'center' ? 'selected' : ''}>Center</option>
                    <option value="bottom" ${this.config.alignment === 'bottom' ? 'selected' : ''}>Bottom</option>
                    <option value="stretch" ${this.config.alignment === 'stretch' ? 'selected' : ''}>Stretch</option>
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
                        value="${escapeHtml(this.config.breakpoint)}"
                        placeholder="Breakpoint (e.g. 768px)">
                </div>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Columns',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z"/></svg>',
            category: 'Layout',
            allowRawPreview: false
        };
    }

    /**
     * Update the number of columns
     * @param {string|number} count - The number of columns to create
     */
    columnCount(count) {
        console.log('[Columns.columnCount] Called with:', count);
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

        console.log('[Columns.columnCount] Creating', newColumns.length, 'columns');
        this.config.columns = newColumns;
        this.triggerRedraw();
        console.log('[Columns.columnCount] Redraw triggered');

        // Trigger settings refresh to update the dropdown
        if (this.editor && this.editor.selectedBlock === this.id) {
            document.dispatchEvent(new CustomEvent('editor-block-changed', {
                detail: { block_id: this.id }
            }));
        }
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
        
        const nestedBlock = this.editor.initBlock(toolClass, false);
        
        if (!nestedBlock) {
            Debug.error(`Failed to create nested block of type ${toolClass}`);
            return;
        }
        
        
        if (position === 'end') {
            this.config.columns[columnIndex].blocks.push(nestedBlock);
        } else {
            this.config.columns[columnIndex].blocks.unshift(nestedBlock);
        }

        this.editor.setActive(null, nestedBlock.id);
        this.triggerRedraw();
    }

    /**
     * Override serializeConfig to preserve nested Tool instances
     * @param {Object} config - Configuration to serialize
     * @returns {Object} Clean configuration with Tool instances preserved
     */
    serializeConfig(config) {
        if (!config || typeof config !== 'object') {
            return config;
        }

        const serialized = {};
        for (const [key, value] of Object.entries(config)) {
            if (key === 'editor' || key === 'updateFunction' || typeof value === 'function') {
                continue;
            }

            if (key === 'columns' && Array.isArray(value)) {
                // Special handling for columns to preserve Tool instances
                serialized[key] = value.map((column) => {
                    if (column.blocks && Array.isArray(column.blocks)) {
                        // DON'T serialize the nested Tool instances - keep them as-is
                        return {
                            ...column,
                            blocks: column.blocks // Keep Tool instances intact
                        };
                    }
                    return column;
                });
            } else {
                // For other properties, use the parent serialization
                serialized[key] = value;
            }
        }
        
        return serialized;
    }

    /**
     * Get or create the actual tool instance for a nested block
     * @param {Object} block - The plain block object
     * @returns {Object} Tool instance
     */
    getToolInstance(block) {
        
        // Return cached instance if available
        if (block._toolInstance) {
            return block._toolInstance;
        }

        // Extract the class name from the block object eg $33963d57131b26df$var$Header should be Header, it may also be a string like "Paragraph"
        //const classMatch = block.class.match(/\$([a-f0-9]+)\$var\$(\w+)/);
        //const classId = classMatch ? classMatch[1] : null;
        //const className = classMatch ? classMatch[2] : null;

        // Get the tool class from the editor's tool registry
        const editorInstance = window.alpineEditors?.['alpineblocks-editor'];
        const className = block.class;

        if (!editorInstance || !editorInstance.toolConfig[className]) {
            Debug.error(`Tool class ${block.class} not found in editor registry`);
            return null;
        }

        const ToolClass = editorInstance.toolConfig[className].class;
        
        // Create a nested update function that routes to our column block
        const nestedUpdateFunction = (id, newConfig) => {
            this.updateNestedBlock(id, newConfig);
        };

        // Create the tool instance with proper context
        const toolInstance = new ToolClass({
            id: block.id,
            updateFunction: nestedUpdateFunction,
            config: block.config
        });


        // Initialize with editor context if available
        if (editorInstance) {
            toolInstance.init(editorInstance);
        }

        // Update the tool's settings HTML to use the composite ID for proper routing
        this.updateNestedToolSettings(toolInstance, this.id);

        // Cache the instance
        block._toolInstance = toolInstance;

        return toolInstance;
    }

    /**
     * Create fallback block when tool class is not available
     * @param {string} toolClass - The tool class name
     * @param {string} blockId - The block ID
     * @param {Object} config - The tool configuration
     * @returns {Object} Fallback block object
     */
    createFallbackBlock(toolClass, blockId, config) {
        return {
            id: blockId,
            toolClass: toolClass, // Use toolClass instead of class to avoid confusion
            config: config,
            editorRender: () => `<div class="block-preview">
                <div class="block-type-icon">📦</div>
                <div class="block-type-name">${toolClass}</div>
                <div class="block-type-desc">Tool not available</div>
            </div>`,
            settings: []
        };
    }

    /**
     * Update a nested block's configuration
     * @param {string} blockId - The nested block ID
     * @param {Object} newConfig - The new configuration
     */
    updateNestedBlock(blockId, newConfig) {
        
        // Find the nested block across all columns
        for (let columnIndex = 0; columnIndex < this.config.columns.length; columnIndex++) {
            const column = this.config.columns[columnIndex];
            const blockIndex = column.blocks.findIndex(block => block.id === blockId);
            
            if (blockIndex !== -1) {
                // Update only the config properties, don't touch the block object itself
                const currentBlock = column.blocks[blockIndex];
                
                // Update config properties directly without recreating the block
                Object.keys(newConfig).forEach(key => {
                    currentBlock.config[key] = newConfig[key];
                });
                
                
                this.triggerRedraw();
                
                
                // Clear cached tool instance to force re-render with updated config
                if (currentBlock._toolInstance) {
                    delete currentBlock._toolInstance;
                }
                
                // Trigger debounced state save for nested block updates
                if (this.editor && this.editor.debouncedSaveState) {
                    this.editor.debouncedSaveState();
                }
                
                return;
            }
        }
        
        Debug.error(`Nested block ${blockId} not found for update`);
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

        const renderedBlocks = column.blocks.map((block, blockIndex) => {
            
            // Create proper Alpine.js context for each nested block
            const blockContent = this.renderNestedBlockWithContext(block);
            
            const compositeId = `${this.id}::${block.id}`;
            
            return `<div class="nested-block nested-block-${compositeId}" 
                         data-block-id="${block.id}"
                         data-composite-id="${compositeId}"
                         :class="{ 'nested-block-selected': selectedBlock === '${compositeId}' }"
                         @click.stop="handleNestedBlockClick('${block.id}')">
                <div class="nested-block-content">
                    ${blockContent}
                </div>
                <div class="nested-block-controls">
                    <button class="delete-nested-block" @click.stop="removeNestedBlock(${columnIndex}, '${block.id}')">×</button>
                </div>
            </div>`;
        });
        
        return renderedBlocks.join('');
    }

    /**
     * Render nested block with proper Alpine.js context
     * @param {Object} block - The block instance
     * @returns {string} HTML with proper Alpine.js scope
     */
    renderNestedBlockWithContext(block) {
        const compositeId = `${this.id}::${block.id}`;
        
        // Get the actual tool instance and its render content
        const toolInstance = this.getToolInstance(block);
        let toolContent = '';
        
        if (toolInstance && typeof toolInstance.editorRender === 'function') {
            toolContent = toolInstance.editorRender();
        } else {
            toolContent = this.createFallbackRender(block);
        }
        
        // Create an Alpine.js component wrapper that provides the 'block' context
        // This allows the tool's original editorRender() to work without modification
        return `<div x-data="{ 
                    block: ${JSON.stringify({
                        id: block.id,
                        config: block.config
                    }).replace(/"/g, '&quot;')},
                    updateNestedBlock(property, value) {
                        this.block.config[property] = value;
                        $dispatch('nested-update', { 
                            blockId: '${compositeId}', 
                            property: property, 
                            value: value 
                        });
                    }
                }" 
                x-init="
                    // Override block config assignments to route through updateNestedBlock
                    $watch('block.config', (newConfig) => {
                        // This handles reactive updates from the nested tool
                    }, { deep: true });
                ">
            ${this.fixNestedToolEventHandlers(toolContent, compositeId)}
        </div>`;
    }

    /**
     * Fix event handlers in nested tool content to work with the wrapper context
     * @param {string} content - The tool's rendered content
     * @param {string} compositeId - The composite ID for this nested block
     * @returns {string} Content with fixed event handlers
     */
    fixNestedToolEventHandlers(content, compositeId) {
        // Replace direct config assignments with calls to updateNestedBlock
        content = content.replace(
            /@blur="block\.config\.(\w+)\s*=\s*\$event\.target\.innerHTML"/g,
            `@blur="updateNestedBlock('$1', $event.target.innerHTML)"`
        );
        
        content = content.replace(
            /@blur="block\.config\.(\w+)\s*=\s*\$event\.target\.value"/g,
            `@blur="updateNestedBlock('$1', $event.target.value)"`
        );
        
        content = content.replace(
            /@change="block\.config\.(\w+)\s*=\s*\$event\.target\.value"/g,
            `@change="updateNestedBlock('$1', $event.target.value)"`
        );
        
        content = content.replace(
            /@change="block\.config\.(\w+)\s*=\s*\$event\.target\.checked"/g,
            `@change="updateNestedBlock('$1', $event.target.checked)"`
        );
        
        return content;
    }

    /**
     * Create fallback render for blocks that don't have proper tool instances
     * @param {Object} block - The block object
     * @returns {string} Fallback HTML content
     */
    createFallbackRender(block) {
        return `<div class="block-preview">
            <div class="block-type-icon">📦</div>
            <div class="block-type-name">Error Loading ${block.class}</div>
        </div>`;
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
                                 
                                 const columnsBlock = window.alpineEditors['alpineblocks-editor'].blocks.find(b => b.id === '${this.id}');
                                 if (columnsBlock) {
                                     columnsBlock.handleColumnDrop(columnIndex, blockData);
                                 }
                                 // Prevent the main editor from handling this drop
                                 return false;
                             } catch (e) {
                                 console.error('Error handling column drop:', e);
                             }
                         },
                         removeNestedBlock(columnIndex, blockId) {
                             const columnsBlock = window.alpineEditors['alpineblocks-editor'].blocks.find(b => b.id === '${this.id}');
                             if (columnsBlock) {
                                 columnsBlock.removeNestedBlock(columnIndex, blockId);
                             }
                         },
                         handleNestedBlockClick(blockId) {
                             // Set nested block as active using composite ID
                             const compositeId = '${this.id}::' + blockId;
                             
                             const editorInstance = window.alpineEditors?.['alpineblocks-editor'];
                             
                             if (editorInstance) {
                                 editorInstance.setActive(null, compositeId);
                                 
                                 // Force settings update
                                 setTimeout(() => {
                                     document.dispatchEvent(new CustomEvent('editor-block-changed', { 
                                         detail: { block_id: compositeId } 
                                     }));
                                 }, 100);
                             }
                         },
                         handleNestedUpdate(event) {
                             // Handle nested block updates from child components
                             const { blockId, property, value } = event.detail;
                             const editorInstance = window.alpineEditors?.['alpineblocks-editor'];
                             if (editorInstance) {
                                 const settingsElement = document.querySelector('#settings');
                                 if (settingsElement && settingsElement._x_dataStack && settingsElement._x_dataStack[0]) {
                                     settingsElement._x_dataStack[0].trigger(blockId, property, value);
                                 }
                             }
                         }
                     }"
                     @nested-update="handleNestedUpdate($event)">
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

    /**
     * Get settings for a nested block
     * @param {string} nestedBlockId - The ID of the nested block
     * @returns {Array|null} Array of settings or null if not found
     */
    getNestedBlockSettings(nestedBlockId) {        
        // Find the nested block across all columns
        for (let i = 0; i < this.config.columns.length; i++) {
            const column = this.config.columns[i];
            
            const block = column.blocks.find(b => b.id === nestedBlockId);
            if (block) {
                // Get the actual tool instance for settings
                const toolInstance = this.getToolInstance(block);
                if (toolInstance && toolInstance.settings && Array.isArray(toolInstance.settings)) {
                    return this.updateSettingsForNestedBlock(toolInstance.settings, nestedBlockId);
                }
                
                return [];
            }
        }
        return null;
    }

    /**
     * Update the actual tool's settings to work with nested block routing
     * @param {Array} settings - The actual tool's settings array  
     * @param {string} nestedBlockId - The nested block ID
     * @returns {Array} Settings with updated composite IDs
     */
    updateSettingsForNestedBlock(settings, nestedBlockId) {
        const compositeId = `${this.id}::${nestedBlockId}`;
        
        return settings.map(setting => {
            if (setting.html && typeof setting.html === 'string') {
                // Replace the block ID in trigger calls with composite ID
                // Handle various patterns that tools might use
                let updatedHtml = setting.html;
                
                // Replace trigger calls with the tool's original ID
                const escapedId = nestedBlockId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                updatedHtml = updatedHtml.replace(
                    new RegExp(`trigger\\('${escapedId}'`, 'g'),
                    `trigger('${compositeId}'`
                );
                
                // Also handle cases where tools use their constructor name or class name
                // This catches any remaining trigger calls that use different ID patterns
                updatedHtml = updatedHtml.replace(
                    /trigger\('([^']+)',\s*'([^']+)',\s*([^)]+)\)/g,
                    (match, id, property, value) => {
                        // If the ID doesn't already contain our parent ID, update it
                        if (!id.includes(this.id)) {
                            return `trigger('${compositeId}', '${property}', ${value})`;
                        }
                        return match;
                    }
                );
                
                return { ...setting, html: updatedHtml };
            }
            return setting;
        });
    }

    /**
     * Update nested tool settings to use composite IDs for proper routing
     * @param {Object} toolInstance - The nested tool instance
     * @param {string} parentId - The parent column block ID
     */
    updateNestedToolSettings(toolInstance, parentId) {
        if (!toolInstance.settings || !Array.isArray(toolInstance.settings)) {
            return;
        }

        // Create the composite ID for this nested block
        const compositeId = `${parentId}::${toolInstance.id}`;

        // Update each setting's HTML to use the composite ID
        toolInstance.settings.forEach(setting => {
            if (setting.html && typeof setting.html === 'string') {
                // Replace all instances of the original ID with the composite ID in trigger calls
                // Escape special regex characters in the ID
                const escapedId = toolInstance.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                setting.html = setting.html.replace(
                    new RegExp(`trigger\\('${escapedId}'`, 'g'),
                    `trigger('${compositeId}'`
                );
            }
        });
    }

    /**
     * Fix Alpine.js bindings in nested block content to use proper routing
     * @param {string} blockContent - The rendered block content HTML
     * @param {string} blockId - The nested block ID
     * @returns {string} Fixed HTML with proper event handlers
     */
    fixNestedBlockBindings(blockContent, blockId) {
        if (!blockContent || typeof blockContent !== 'string') {
            return blockContent;
        }

        // Find the actual nested block to get its config values
        let nestedBlock = null;
        for (const column of this.config.columns) {
            nestedBlock = column.blocks.find(b => b.id === blockId);
            if (nestedBlock) break;
        }

        if (!nestedBlock) {
            return blockContent;
        }

        const compositeId = `${this.id}::${blockId}`;
        
        // Fix x-html bindings - replace with actual content and make editable
        blockContent = blockContent.replace(
            /(<[^>]*)\s+x-html="block\.config\.(\w+)"([^>]*>)([^<]*<\/[^>]+>)/g,
            (match, openTag, property, attributes, endPart) => {
                const content = nestedBlock.config[property] || '';
                const closingTagMatch = endPart.match(/<\/[^>]+>$/);
                const closingTag = closingTagMatch ? closingTagMatch[0] : '</div>';
                
                // Make contenteditable and add event handler
                const editableTag = openTag + ' contenteditable="true"' + 
                    ` @blur="$dispatch('nested-update', { blockId: '${compositeId}', property: '${property}', value: $event.target.innerHTML })"` +
                    attributes.replace('>', '>');
                
                return editableTag + content + closingTag;
            }
        );
        
        // Fix existing event handlers to use composite ID
        blockContent = blockContent.replace(
            /@blur="block\.config\.(\w+)\s*=\s*\$event\.target\.innerHTML"/g,
            `@blur="$dispatch('nested-update', { blockId: '${compositeId}', property: '$1', value: $event.target.innerHTML })"`
        );
        
        blockContent = blockContent.replace(
            /@blur="block\.config\.(\w+)\s*=\s*\$event\.target\.value"/g,
            `@blur="$dispatch('nested-update', { blockId: '${compositeId}', property: '$1', value: $event.target.value })"`
        );
        
        blockContent = blockContent.replace(
            /@change="block\.config\.(\w+)\s*=\s*\$event\.target\.value"/g,
            `@change="$dispatch('nested-update', { blockId: '${compositeId}', property: '$1', value: $event.target.value })"`
        );
        
        blockContent = blockContent.replace(
            /@blur="block\.config\.(\w+)\s*=\s*\$event\.target\.checked"/g,
            `@blur="$dispatch('nested-update', { blockId: '${compositeId}', property: '$1', value: $event.target.checked })"`
        );

        // Fix references to block.config to use actual values
        Object.keys(nestedBlock.config).forEach(key => {
            const value = nestedBlock.config[key];
            blockContent = blockContent.replace(
                new RegExp(`block\.config\.${key}`, 'g'),
                typeof value === 'string' ? `'${value.replace(/'/g, "\\'")}'` : value
            );
        });

        return blockContent;
    }
}

export default Columns;
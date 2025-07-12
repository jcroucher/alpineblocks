import { ToolManager } from "./editor_modules/ToolManager";
import { BlockManager } from "./editor_modules/BlockManager";
import { InlineToolbar } from "./editor_modules/InlineToolbar";
import { HistoryManager } from "./HistoryManager";
import { HeaderToolbar } from "./HeaderToolbar";
import { Debug } from "./utils/Debug";

const { v4: uuidv4 } = require('uuid');

/**
 * Main editor class that coordinates all editor functionality
 * Manages tools, blocks, and user interactions
 */

export class Editor {
    constructor(toolConfig, log_level = 2, historySize = 30) {
        this.id = '';
        this.log_level = log_level;

        this.tools = [];
        this.selectedBlock = null;
        this.hoveredTarget = {};
        this.toolConfig = toolConfig;
        this.dragThrottle = null;
        this.dragLeaveTimeout = null;
        this.deleteConfirmation = {
            show: false,
            blockId: null
        };

        this.toolManager = new ToolManager(toolConfig);
        this.blockManager = new BlockManager();
        this.inlineToolbar = new InlineToolbar();
        this.historyManager = new HistoryManager(this, historySize);
        this.headerToolbar = null; // Will be initialized after editor ID is set
        
        // Debounced state saving for property updates
        this.debouncedSaveState = this.debounce(() => {
            this.saveState('Updated block properties');
        }, 1000); // Save after 1 second of inactivity
    }

    /**
     * Initialize the editor with Alpine.js integration
     */
    init() {
        Debug.info('Block editor initialized');

        this.id = this.$el.id;

        window.alpineEditors = window.alpineEditors || {};
        window.alpineEditors[this.id] = this;

        // Initialize header toolbar now that we have the ID
        this.headerToolbar = new HeaderToolbar(this.id);
        this.headerToolbar.init();

        this.toolManager.loadTools();
        
        // Only initialize a default block if toolConfig is available
        if (this.toolConfig && this.toolConfig['Paragraph']) {
            this.initBlock('Paragraph', true);
        }

        this.inlineToolbar.init(this);

        // Generate the delete confirmation modal
        this.generateModal();

        // Listen for confirm delete events
        window.addEventListener('confirm-delete-block', (e) => {
            this.confirmDeleteBlock(e.detail.blockId);
        });

        // Set up keyboard shortcuts
        this.setupKeyboardShortcuts();

        this.$nextTick(() => {
            this.$dispatch('editor-ready', { id: this.id });
        });
    }

    /**
     * Set up keyboard shortcuts for undo/redo
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when this editor is active
            if (this.id && document.querySelector(`#${this.id}:focus-within`)) {
                if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                    e.preventDefault();
                    this.undo();
                } else if (((e.ctrlKey || e.metaKey) && e.key === 'y') || 
                          ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')) {
                    e.preventDefault();
                    this.redo();
                }
            }
        });
    }

    /**
     * Undo the last action
     * @returns {boolean} Whether undo was successful
     */
    undo() {
        return this.historyManager.undo();
    }

    /**
     * Redo the next action
     * @returns {boolean} Whether redo was successful
     */
    redo() {
        return this.historyManager.redo();
    }

    /**
     * Save current state to history
     * @param {string} action - Description of the action
     */
    saveState(action) {
        this.historyManager.saveState(action);
    }

    /**
     * Get history status for UI updates
     * @returns {Object} History status
     */
    getHistoryStatus() {
        return this.historyManager.getStatus();
    }

    /**
     * Debounce utility function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Get available tools for the toolbar
     * @returns {Array} Array of tool configurations
     */
    getToolbar() {
        return this.toolManager.getTools();
    }

    /**
     * Get header toolbar HTML
     * @returns {string} HTML string for the header toolbar
     */
    getHeaderToolbar() {
        if (!this.headerToolbar) {
            return '<div class="header-toolbar"><!-- Header toolbar not yet initialized --></div>';
        }
        return this.headerToolbar.render();
    }

    /**
     * Get all blocks in the editor
     * @returns {Array} Array of block instances
     */
    get blocks() {
        return this.blockManager.blocks;
    }

    /**
     * Export blocks as JSON
     * @param {boolean} pretty - Whether to format for HTML display
     * @returns {string} JSON string of blocks
     */
    blocksJSON(pretty = false) {
        console.log('=== BLOCKS JSON DEBUG START ===');
        console.log('1. blocksJSON called, blocks count:', this.blocks.length);
        
        const blocksData = this.blocks.map((block, index) => {
            console.log(`2. Processing block ${index}:`, block);
            console.log(`3. block.class:`, block.class);
            console.log(`4. block.constructor.name:`, block.constructor.name);
            
            // Use the preserved class name if available, otherwise extract from constructor name
            let className = block.class || block.constructor.name;
            console.log(`5. className (initial):`, className);
            
            // If we get a bundled class name, try to extract the real name
            if (className.includes('$var$')) {
                const match = className.match(/\$var\$(\w+)$/);
                if (match) {
                    className = match[1];
                    console.log(`6. className after bundled extraction:`, className);
                }
            }
            
            console.log(`7. About to serialize block config for block ${index}`);
            const serializedConfig = this.serializeBlockConfig(block.config);
            
            const blockData = {
                id: block.id,
                class: className,
                data: serializedConfig
            };
            console.log(`8. Final block data for block ${index}:`, blockData);
            
            return blockData;
        });

        console.log('9. All blocks data:', blocksData);
        const data = JSON.stringify(blocksData, null, 2);
        console.log('10. Final JSON string length:', data.length);
        console.log('=== BLOCKS JSON DEBUG END ===');

        if (pretty) {
            return data.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
        }

        return data;
    }

    /**
     * Serialize block config without circular references
     * @param {Object} config - The configuration to serialize
     * @returns {Object} Clean configuration object
     */
    serializeBlockConfig(config) {
        console.log('=== SERIALIZE BLOCK CONFIG DEBUG START ===');
        console.log('1. serializeBlockConfig called with:', config);
        
        if (!config || typeof config !== 'object') {
            console.log('2. Config is not object, returning as-is:', config);
            return config;
        }
        
        const serialized = {};
        for (const [key, value] of Object.entries(config)) {
            console.log(`3. Processing key: ${key}, value:`, value);
            
            if (key === 'editor' || key === 'updateFunction' || typeof value === 'function') {
                // Skip circular references and functions
                console.log(`4. Skipping key ${key} (circular ref or function)`);
                continue;
            }
            
            if (Array.isArray(value)) {
                console.log(`5. Processing array for key ${key}, length:`, value.length);
                // Handle arrays (like columns with nested blocks)
                serialized[key] = value.map((item, index) => {
                    console.log(`6. Processing array item ${index}:`, item);
                    
                    if (item && typeof item === 'object') {
                        // For nested blocks, only include serializable properties
                        if (item.id && item.config) {
                            console.log(`7. Found nested block with id: ${item.id}`);
                            console.log(`8. item.class:`, item.class);
                            console.log(`9. item.constructor:`, item.constructor);
                            console.log(`10. item.constructor.name:`, item.constructor?.name);
                            
                            // Use the preserved class name if available, otherwise extract from constructor name
                            let className = item.class || (item.constructor && item.constructor.name) || 'Unknown';
                            console.log(`11. className derived:`, className);
                            
                            // Handle bundled class names - check both class property and constructor name
                            if (className.includes('$var$')) {
                                const match = className.match(/\$var\$(\w+)$/);
                                if (match) {
                                    className = match[1];
                                    console.log(`12. className after bundled name extraction:`, className);
                                }
                            } else if (item.constructor && item.constructor.name && item.constructor.name.includes('$var$')) {
                                // Handle case where class property is clean but constructor name is bundled
                                const match = item.constructor.name.match(/\$var\$(\w+)$/);
                                if (match) {
                                    className = match[1];
                                    console.log(`12b. className extracted from bundled constructor name:`, className);
                                }
                            }
                            
                            const serializedBlock = {
                                id: item.id,
                                class: className,
                                config: this.serializeBlockConfig(item.config)
                            };
                            console.log(`13. Serialized nested block:`, serializedBlock);
                            
                            return serializedBlock;
                        }
                        // For other objects, recursively serialize
                        console.log(`14. Recursively serializing object item:`, item);
                        return this.serializeBlockConfig(item);
                    }
                    console.log(`15. Returning array item as-is:`, item);
                    return item;
                });
            } else if (value && typeof value === 'object') {
                // Recursively serialize nested objects
                console.log(`16. Recursively serializing object value for key ${key}`);
                serialized[key] = this.serializeBlockConfig(value);
            } else {
                // Primitive values
                console.log(`17. Setting primitive value for key ${key}:`, value);
                serialized[key] = value;
            }
        }
        console.log('18. Final serialized object:', serialized);
        console.log('=== SERIALIZE BLOCK CONFIG DEBUG END ===');
        return serialized;
    }

    /**
     * Get the currently selected block
     * @returns {Object|null} Selected block instance
     */
    getCurrentSelectedBlock() {
        return this.selectedBlock;
    }

    /**
     * Get rendered content of all blocks
     * @returns {string} HTML string of all blocks
     */
    getEditorContent() {
        return this.blockManager.renderBlocks();
    }

    /**
     * Get settings for a specific block (including nested blocks)
     * @param {string} blockId - ID of the block (may be composite for nested blocks)
     * @returns {Array|null} Array of settings or null if not found
     */
    getSettings(blockId) {
        console.log('getSettings called with blockId:', blockId);
        
        if (!blockId) {
            console.log('No blockId provided, returning null');
            return null;
        }
        
        // Check if this is a nested block (format: parentId::nestedId)
        if (blockId.includes('::')) {
            console.log('Nested block detected');
            const [parentId, nestedId] = blockId.split('::');
            console.log('Parent ID:', parentId, 'Nested ID:', nestedId);
            
            const parentBlock = this.blockManager.blocks.find(b => b.id === parentId);
            console.log('Parent block found:', !!parentBlock);
            
            if (parentBlock && typeof parentBlock.getNestedBlockSettings === 'function') {
                console.log('Calling getNestedBlockSettings on parent block');
                const nestedSettings = parentBlock.getNestedBlockSettings(nestedId);
                console.log('Nested settings returned:', nestedSettings);
                return nestedSettings;
            } else {
                console.log('Parent block or getNestedBlockSettings method not found');
            }
        }
        
        // Regular top-level block
        console.log('Looking for regular top-level block');
        const block = this.blockManager.blocks.find(b => b.id === blockId);
        console.log('Block found:', !!block);
        const settings = block ? block.settings : null;
        console.log('Settings returned:', settings);
        return settings;
    }


    /**
     * Handle drag over events for blocks
     * @param {Event} event - Drag event
     * @param {string} blockId - ID of the target block
     */
    handleDragOver(event, blockId) {
        event.preventDefault();
        
        if (this.dragLeaveTimeout) {
            clearTimeout(this.dragLeaveTimeout);
            this.dragLeaveTimeout = null;
        }
        
        if (this.dragThrottle) {
            clearTimeout(this.dragThrottle);
        }
        
        this.dragThrottle = setTimeout(() => {
            const dropTarget = event.currentTarget;
            const rect = dropTarget.getBoundingClientRect();
            const relY = event.clientY - rect.top;
            
            const position = relY < (rect.height * 0.4) ? 'top' : 'bottom';
            
            if (this.hoveredTarget[blockId] !== position) {
                this.hoveredTarget[blockId] = position;
            }
        }, 10);
    }

    /**
     * Handle drag leave events for blocks
     * @param {Event} event - Drag event
     * @param {string} blockId - ID of the target block
     */
    handleDragLeave(event, blockId) {
        const dropTarget = event.currentTarget;
        const relatedTarget = event.relatedTarget;
        
        if (!relatedTarget || !dropTarget.contains(relatedTarget)) {
            if (this.dragLeaveTimeout) {
                clearTimeout(this.dragLeaveTimeout);
            }
            
            this.dragLeaveTimeout = setTimeout(() => {
                if (this.hoveredTarget[blockId]) {
                    delete this.hoveredTarget[blockId];
                }
                this.dragLeaveTimeout = null;
            }, 100);
        }
    }

    /**
     * Create a new block instance
     * @param {string} blockName - Name of the block type
     * @param {boolean} push - Whether to add to blocks array
     * @param {string} existingId - Optional existing ID to use instead of generating new one
     * @returns {Object} New block instance
     */
    initBlock(blockName, push = false, existingId = null) {
        console.log('=== INITBLOCK DEBUG START ===');
        console.log('1. initBlock called with blockName:', blockName);
        console.log('2. push:', push);
        console.log('3. existingId:', existingId);
        
        if (!this.toolConfig || !this.toolConfig[blockName]) {
            Debug.error(`Tool configuration for ${blockName} not found`);
            console.log('4. Tool configuration not found, returning null');
            return null;
        }

        console.log('5. Tool config found:', this.toolConfig[blockName]);
        const BlockClass = this.toolConfig[blockName].class;
        console.log('6. BlockClass:', BlockClass);
        console.log('7. BlockClass.name:', BlockClass.name);
        
        const config = JSON.parse(JSON.stringify(this.toolConfig[blockName].config));
        console.log('8. Config for new block:', config);
        
        const newBlock = new BlockClass({
            id: existingId || uuidv4(),
            updateFunction: this.updateFunction.bind(this),
            config: config
        });

        console.log('9. New block created');
        console.log('10. newBlock.constructor.name BEFORE class assignment:', newBlock.constructor.name);
        console.log('11. newBlock.class BEFORE assignment:', newBlock.class);

        // Preserve the clean class name
        newBlock.class = blockName;
        
        console.log('12. newBlock.class AFTER assignment:', newBlock.class);
        console.log('13. newBlock.constructor.name AFTER assignment:', newBlock.constructor.name);
        
        newBlock.init(this);

        console.log('14. After init() call:');
        console.log('15. newBlock.class:', newBlock.class);
        console.log('16. newBlock.constructor.name:', newBlock.constructor.name);

        if (push) {
            this.blocks.push(newBlock);
            console.log('17. Block pushed to blocks array');
        }

        console.log('18. Final newBlock object:', JSON.stringify({
            id: newBlock.id,
            class: newBlock.class,
            constructorName: newBlock.constructor.name,
            config: newBlock.config
        }, null, 2));
        console.log('=== INITBLOCK DEBUG END ===');

        return newBlock;
    }

    /**
     * Handle drop events for blocks
     * @param {Event} event - Drop event
     * @param {string} position - Drop position
     * @param {string|null} blockId - ID of target block
     */
    handleDrop(event, position = 'end', blockId = null) {
        event.preventDefault();
        
        this.clearDragTimeouts();
        
        const blockName = event.dataTransfer.getData('text/plain');
        const newBlock = this.initBlock(blockName);

        if (!newBlock) {
            Debug.error(`Failed to create block of type ${blockName}`);
            return;
        }

        if (blockId) {
            const index = this.blocks.findIndex(b => b.id === blockId);
            const insertPosition = this.hoveredTarget[blockId] === 'top' ? 'before' : 'after';
            delete this.hoveredTarget[blockId];
            
            if (insertPosition === 'before') {
                this.blocks.splice(index, 0, newBlock);
            } else {
                this.blocks.splice(index + 1, 0, newBlock);
            }
        } else {
            this.blocks.push(newBlock);
        }

        this.$dispatch('editor-drop', { id: this.id });
        this.setActive(null, newBlock.id);
        this.saveState(`Added ${blockName} block`);
    }

    /**
     * Clear all drag-related timeouts
     */
    clearDragTimeouts() {
        if (this.dragThrottle) {
            clearTimeout(this.dragThrottle);
            this.dragThrottle = null;
        }
        if (this.dragLeaveTimeout) {
            clearTimeout(this.dragLeaveTimeout);
            this.dragLeaveTimeout = null;
        }
    }

    /**
     * Clean up when component is destroyed
     */
    destroy() {
        this.clearDragTimeouts();
        this.hoveredTarget = {};
    }

    /**
     * Update a block's configuration
     * @param {string} id - Block ID
     * @param {Object} config - New configuration
     */
    updateFunction(id, config) {
        console.log('=== UPDATE FUNCTION DEBUG START ===');
        console.log('1. updateFunction called with id:', id);
        console.log('2. config received:', config);
        
        const block = this.blockManager.blocks.find(b => b.id === id);
        console.log('3. block found:', !!block);
        
        if (block) {
            console.log('4. block.config BEFORE merge:', block.config);
            // Merge config while preserving Tool instances in arrays
            this.mergeConfigPreservingToolInstances(block.config, config);
            console.log('5. block.config AFTER merge:', block.config);
            
            this.$dispatch('editor-updated', { id: this.id });
            
            // Use debounced save for property updates
            this.debouncedSaveState();
        }
        console.log('=== UPDATE FUNCTION DEBUG END ===');
    }

    /**
     * Merge config while preserving Tool instances in arrays
     * @param {Object} target - Target config to update
     * @param {Object} source - Source config with updates
     */
    mergeConfigPreservingToolInstances(target, source) {
        console.log('=== MERGE CONFIG DEBUG START ===');
        console.log('1. Target keys:', Object.keys(target));
        console.log('2. Source keys:', Object.keys(source));
        
        for (const [key, value] of Object.entries(source)) {
            console.log(`3. Processing key: ${key}`);
            console.log(`4. Value type: ${Array.isArray(value) ? 'array' : typeof value}`);
            
            if (Array.isArray(value) && Array.isArray(target[key])) {
                console.log(`5. Processing array for key ${key}, source length: ${value.length}, target length: ${target[key].length}`);
                
                // For arrays, preserve existing Tool instances where possible
                value.forEach((item, index) => {
                    console.log(`6. Processing array item ${index}:`, item);
                    
                    if (item && typeof item === 'object' && item.id) {
                        console.log(`7. Found object with ID: ${item.id}`);
                        
                        // Find existing Tool instance with same ID
                        const existingTool = target[key].find(t => t && t.id === item.id);
                        console.log(`8. Existing tool found:`, existingTool ? 'YES' : 'NO');
                        console.log(`9. Existing tool has serializeConfig:`, existingTool && typeof existingTool.serializeConfig === 'function' ? 'YES' : 'NO');
                        
                        if (existingTool && typeof existingTool.serializeConfig === 'function') {
                            console.log(`10. Updating existing Tool instance config instead of replacing`);
                            // Update the existing Tool instance's config instead of replacing it
                            this.mergeConfigPreservingToolInstances(existingTool.config, item.config || {});
                            // Don't replace the Tool instance
                            return;
                        } else {
                            console.log(`11. Replacing with serialized object`);
                        }
                    }
                    // For non-Tool items or new items, just assign
                    console.log(`12. Assigning value at index ${index}`);
                    target[key][index] = value[index];
                });
                
                // Handle array length changes
                if (value.length !== target[key].length) {
                    console.log(`13. Adjusting array length from ${target[key].length} to ${value.length}`);
                    target[key].length = value.length;
                }
            } else if (value && typeof value === 'object' && !Array.isArray(value)) {
                // For nested objects, recurse
                if (!target[key] || typeof target[key] !== 'object') {
                    target[key] = {};
                }
                this.mergeConfigPreservingToolInstances(target[key], value);
            } else {
                // For primitive values, just assign
                console.log(`14. Assigning primitive value for key ${key}`);
                target[key] = value;
            }
        }
        console.log('=== MERGE CONFIG DEBUG END ===');
    }

    /**
     * Set the active block (supports nested blocks)
     * @param {Event|null} event - Event that triggered the change
     * @param {string} block - Block ID to set as active (may be composite for nested blocks)
     */
    setActive(event, block) {
        if (this.selectedBlock === block) return;

        this.selectedBlock = block;
        Debug.debug(`Block changed: ${block}`);

        this.$nextTick(() => {
            this.$dispatch('editor-block-changed', { block_id: block });
        });
    }

    /**
     * Show delete confirmation modal
     * @param {string} blockId - ID of block to delete
     */
    showDeleteConfirmation(blockId) {
        this.deleteConfirmation.blockId = blockId;
        this.deleteConfirmation.show = true;
        Debug.debug(`Delete confirmation shown for block: ${blockId}`);
    }

    /**
     * Confirm and delete the block
     */
    confirmDeleteBlock(blockId) {
        if (!blockId) return;

        const blockIndex = this.blocks.findIndex(b => b.id === blockId);
        
        if (blockIndex !== -1) {
            // Remove the block
            this.blocks.splice(blockIndex, 1);
            
            // Clear selection if deleted block was selected
            if (this.selectedBlock === blockId) {
                this.selectedBlock = null;
                this.$dispatch('editor-block-changed', { block_id: null });
            }
            
            Debug.info(`Block deleted: ${blockId}`);
            this.$dispatch('editor-updated', { id: this.id });
            this.saveState('Deleted block');
        }

        // Hide modal
        window.dispatchEvent(new CustomEvent('hide-delete-confirmation'));
    }

    /**
     * Generate and inject the delete confirmation modal
     */
    generateModal() {
        // Only generate modal if it doesn't exist
        if (document.querySelector('.modal-overlay')) {
            return;
        }

        // Create modal HTML
        const modalHTML = `
        <div class="modal-overlay" 
            x-data="{ 
                show: false, 
                blockId: null,
                init() {
                    window.addEventListener('show-delete-confirmation', (e) => {
                        console.log('show-delete-confirmation event received:', e.detail);
                        this.blockId = e.detail.blockId;
                        this.show = true;
                    });
                    window.addEventListener('hide-delete-confirmation', () => {
                        this.show = false;
                        this.blockId = null;
                    });
                },
            }" 
            x-show="show" 
            @click="show = false"
            style="display: none;">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <svg class="modal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                    </svg>
                    <h3 class="modal-title">Remove Block</h3>
                </div>
                <p class="modal-description">
                    Are you sure you want to remove this block? This action cannot be undone.
                </p>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-cancel" @click="show = false">
                        Cancel
                    </button>
                    <button class="modal-btn modal-btn-confirm" 
                            @click="
                                window.dispatchEvent(new CustomEvent('confirm-delete-block', { detail: { blockId: blockId } }));
                                show = false;
                                blockId = null;
                            ">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    `;

        // Inject modal into body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        Debug.info('Delete confirmation modal generated and injected');
    }

    /**
     * Log messages based on log level (deprecated - use Debug utility)
     * @param {string} message - Message to log
     * @param {number} level - Log level (1-3)
     * @deprecated Use Debug utility instead
     */
    log(message, level = 1) {
        if (level > this.log_level) return;
        Debug.log(message);
    }
}
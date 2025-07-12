import { ToolManager } from "./editor_modules/ToolManager";
import { BlockManager } from "./editor_modules/BlockManager";
import { InlineToolbar } from "./editor_modules/InlineToolbar";
import { HistoryManager } from "./HistoryManager";
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
        const blocksData = this.blocks.map(block => {
            // Use the preserved class name if available, otherwise extract from constructor name
            let className = block.class || block.constructor.name;
            
            // If we get a bundled class name, try to extract the real name
            if (className.includes('$var$')) {
                const match = className.match(/\$var\$(\w+)$/);
                if (match) {
                    className = match[1];
                }
            }
            
            return {
                id: block.id,
                class: className,
                data: this.serializeBlockConfig(block.config)
            };
        });

        const data = JSON.stringify(blocksData, null, 2);

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
        if (!config || typeof config !== 'object') {
            return config;
        }
        
        const serialized = {};
        for (const [key, value] of Object.entries(config)) {
            if (key === 'editor' || key === 'updateFunction' || typeof value === 'function') {
                // Skip circular references and functions
                continue;
            }
            
            if (Array.isArray(value)) {
                // Handle arrays (like columns with nested blocks)
                serialized[key] = value.map(item => {
                    if (item && typeof item === 'object') {
                        // For nested blocks, only include serializable properties
                        if (item.id && item.constructor && item.config) {
                            return {
                                id: item.id,
                                class: item.constructor.name,
                                config: this.serializeBlockConfig(item.config)
                            };
                        }
                        // For other objects, recursively serialize
                        return this.serializeBlockConfig(item);
                    }
                    return item;
                });
            } else if (value && typeof value === 'object') {
                // Recursively serialize nested objects
                serialized[key] = this.serializeBlockConfig(value);
            } else {
                // Primitive values
                serialized[key] = value;
            }
        }
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
        if (!this.toolConfig || !this.toolConfig[blockName]) {
            Debug.error(`Tool configuration for ${blockName} not found`);
            return null;
        }

        const BlockClass = this.toolConfig[blockName].class;
        const config = JSON.parse(JSON.stringify(this.toolConfig[blockName].config));
        const newBlock = new BlockClass({
            id: existingId || uuidv4(),
            updateFunction: this.updateFunction.bind(this),
            config: config
        });

        // Preserve the clean class name
        newBlock.class = blockName;
        
        newBlock.init(this);

        if (push) {
            this.blocks.push(newBlock);
        }

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
        const block = this.blockManager.blocks.find(b => b.id === id);
        if (block) {
            block.config = config;
            this.$dispatch('editor-updated', { id: this.id });
            
            // Use debounced save for property updates
            this.debouncedSaveState();
        }
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
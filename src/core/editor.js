import { ToolManager } from "./editor_modules/ToolManager";
import { BlockManager } from "./editor_modules/BlockManager";
import { InlineToolbar } from "./editor_modules/InlineToolbar";
import { Debug } from "./utils/Debug";

const { v4: uuidv4 } = require('uuid');

/**
 * Main editor class that coordinates all editor functionality
 * Manages tools, blocks, and user interactions
 */

export class Editor {
    constructor(toolConfig, log_level = 2) {
        this.id = '';
        this.log_level = log_level;

        this.tools = [];
        this.selectedBlock = null;
        this.hoveredTarget = {};
        this.toolConfig = toolConfig;
        this.dragThrottle = null;
        this.dragLeaveTimeout = null;

        this.toolManager = new ToolManager(toolConfig);
        this.blockManager = new BlockManager();
        this.inlineToolbar = new InlineToolbar();
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
        this.initBlock('Paragraph', true);

        this.inlineToolbar.init(this);

        this.$nextTick(() => {
            this.$dispatch('editor-ready', { id: this.id });
        });
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
        const data = JSON.stringify(this.blocks.map(b => {
            return {
                id: b.id,
                class: b.constructor.name,
                data: b.config
            };
        }), null, 2);

        if (pretty) {
            return data.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
        }

        return data;
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
     * Get settings for a specific block
     * @param {string} blockId - ID of the block
     * @returns {Array|null} Array of settings or null if not found
     */
    getSettings(blockId) {
        const block = this.blockManager.blocks.find(b => b.id === blockId);
        return block ? block.settings : null;
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
     * @returns {Object} New block instance
     */
    initBlock(blockName, push = false) {
        const BlockClass = this.toolConfig[blockName].class;
        const config = JSON.parse(JSON.stringify(this.toolConfig[blockName].config));
        const newBlock = new BlockClass({
            id: uuidv4(),
            updateFunction: this.updateFunction.bind(this),
            config: config
        });

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
        }
    }

    /**
     * Set the active block
     * @param {Event|null} event - Event that triggered the change
     * @param {string} block - Block ID to set as active
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
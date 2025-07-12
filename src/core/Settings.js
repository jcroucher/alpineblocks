import { Debug } from './utils/Debug';

/**
 * Settings panel manager for handling block property updates
 */
export class Settings {
    constructor(editorId, settings = {}) {
        this.editorId = editorId;
        this.settings = settings;
    }

    /**
     * Initialize settings panel event listeners
     */
    init() {
        window.addEventListener('editor-block-changed', event => {
            console.log('Settings: editor-block-changed event received:', event.detail);
            if (window.alpineEditors[this.editorId]) {
                const newSettings = window.alpineEditors[this.editorId].getSettings(event.detail.block_id);
                console.log('Settings: new settings from editor:', newSettings);
                this.settings = newSettings || [];
                
                // Force Alpine to update by dispatching a custom event
                document.dispatchEvent(new CustomEvent('settings-updated', { 
                    detail: { 
                        editorId: this.editorId, 
                        settings: this.settings,
                        blockId: event.detail.block_id
                    } 
                }));
            }
        });
    }

    /**
     * Handle property changes from the settings panel (supports nested blocks)
     * @param {string} block_id - The ID of the block to update (may be composite for nested blocks)
     * @param {string} property - The property name to update
     * @param {*} value - The new value for the property
     */
    trigger(block_id, property, value = null) {
        const editorInstance = window.alpineEditors[this.editorId];
        if (!editorInstance) {
            Debug.error('Editor instance not found:', this.editorId);
            return;
        }

        // Check if this is a nested block (format: parentId::nestedId)
        if (block_id.includes('::')) {
            const [parentId, nestedId] = block_id.split('::');
            const parentBlock = editorInstance.blocks.find(b => b.id === parentId);
            
            if (parentBlock && typeof parentBlock.updateNestedBlock === 'function') {
                // Create update object for nested block
                const updateObj = { [property]: value };
                parentBlock.updateNestedBlock(nestedId, updateObj);
                return;
            } else {
                Debug.error('Parent block or updateNestedBlock method not found:', parentId);
                return;
            }
        }
        
        // Handle regular top-level blocks
        const block = editorInstance.blocks.find(b => b.id === block_id);
        
        if (!block) {
            Debug.error('Block not found:', block_id);
            return;
        }

        if (typeof block[property] === 'function') {
            block[property](value);
        } else if (block.config && block.config.hasOwnProperty(property)) {
            block.config[property] = value;
            block.triggerRedraw();
        } else {
            block[property] = value;
            if (block.triggerRedraw) {
                block.triggerRedraw();
            }
        }
    }

    /**
     * Execute a callback function and trigger editor redraw
     * @param {Function} callback - The callback function to execute
     */
    doCallback(callback) {
        callback();
        window.alpineEditors[this.editorId].blockManager.triggerRedraw();
    }
}
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
            if (window.alpineEditors[this.editorId]) {
                this.settings = window.alpineEditors[this.editorId].getSettings(event.detail.block_id);
            }
        });
    }

    /**
     * Handle property changes from the settings panel
     * @param {string} block_id - The ID of the block to update
     * @param {string} property - The property name to update
     * @param {*} value - The new value for the property
     */
    trigger(block_id, property, value = null) {
        const block = window.alpineEditors[this.editorId].blocks.find(b => b.id === block_id);
        
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
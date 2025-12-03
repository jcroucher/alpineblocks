/**
 * RichTextEditor - High-level wrapper for AlpineBlocks rich text editing
 *
 * Provides a simple API for initializing rich text editors across the application.
 * Uses the custom contenteditable-based editor (no TinyMCE dependency).
 */

import richTextLoader from '../utils/RichTextLoader';

class RichTextEditor {
    /**
     * Register a selector for auto-initialization (preferred method)
     * @param {string} selector - CSS selector for textarea(s)
     * @param {object} config - Editor configuration options
     */
    static register(selector, config = {}) {
        console.log('🎨 AlpineBlocks RichTextEditor register for:', selector);
        richTextLoader.register(selector, config);
    }

    /**
     * Setup auto-initialization for editors matching a selector
     * @deprecated Use register() instead
     * @param {string} selector - CSS selector for textarea(s)
     * @param {object} config - Editor configuration options
     */
    static setupAutoInit(selector, config = {}) {
        console.log('🎨 AlpineBlocks RichTextEditor auto-init for:', selector);
        richTextLoader.setupAutoInit(selector, config);
    }

    /**
     * Initialize editors on a selector
     * @param {string} selector - CSS selector for element(s)
     * @param {object} config - Editor configuration
     * @returns {Promise<Array>} Array of editor instances
     */
    static async init(selector, config = {}) {
        return richTextLoader.init(selector, config);
    }

    /**
     * Remove all editor instances
     */
    static removeAll() {
        richTextLoader.removeAll();
    }

    /**
     * Remove a specific editor instance
     * @param {string} id - Editor ID
     */
    static remove(id) {
        richTextLoader.remove(id);
    }

    /**
     * Get an editor instance
     * @param {string|HTMLElement} idOrElement - Editor ID or element
     * @returns {object|null} Editor instance
     */
    static getInstance(idOrElement) {
        return richTextLoader.getInstance(idOrElement);
    }

    /**
     * Setup Turbo compatibility
     */
    static setupTurboCompatibility() {
        richTextLoader.setupTurboCompatibility();
    }

    /**
     * Setup accordion compatibility
     * @param {string} selector - CSS selector for elements
     * @param {object} config - Editor configuration
     */
    static setupAccordionCompatibility(selector, config = {}) {
        richTextLoader.setupAccordionCompatibility(selector, config);
    }

    /**
     * Create Rich Text Editor properties HTML (for injection into external properties panels)
     * @returns {string} Properties HTML string
     */
    static createRichTextPropertiesHTML() {
        // Delegate to RichTextLoader class (access via constructor)
        return richTextLoader.constructor.createRichTextPropertiesHTML();
    }
}

export default RichTextEditor;

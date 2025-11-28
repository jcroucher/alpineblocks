/**
 * TinyMCE Editor Wrapper
 * High-level API for TinyMCE integration in AlpineBlocks
 *
 * Provides easy-to-use methods for initializing TinyMCE with
 * AlpineBlocks-specific customizations and configurations
 */

import tinymceLoader from '../utils/TinyMCELoader';

class TinyMCE {
    constructor() {
        this.loader = tinymceLoader;
    }

    /**
     * Initialize TinyMCE with AlpineBlocks defaults
     * @param {string} selector - CSS selector for textarea(s)
     * @param {object} options - Configuration options
     * @returns {Promise}
     */
    async initialize(selector, options = {}) {
        const config = {
            height: options.height || 400,
            plugins: options.plugins || 'lists link image table code',
            toolbar: options.toolbar || 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
            menubar: options.menubar !== undefined ? options.menubar : false,
            statusbar: options.statusbar !== undefined ? options.statusbar : true,
            resize: options.resize !== undefined ? options.resize : true,
            promotion: false,
            branding: false,
            ...options
        };

        return this.loader.initAll(selector, config);
    }

    /**
     * Initialize a single editor instance
     * @param {string} id - Element ID
     * @param {object} options - Configuration options
     * @returns {Promise}
     */
    async initializeOne(id, options = {}) {
        const selector = id.startsWith('#') ? id : `#${id}`;
        return this.loader.init(selector, options);
    }

    /**
     * Remove all editor instances
     */
    removeAll() {
        this.loader.removeAll();
    }

    /**
     * Remove a specific editor instance
     * @param {string} id - Editor ID
     */
    remove(id) {
        this.loader.remove(id);
    }

    /**
     * Check if TinyMCE is loaded
     * @returns {boolean}
     */
    isLoaded() {
        return this.loader.isLoaded();
    }

    /**
     * Load TinyMCE from source
     * @param {string} source - URL to tinymce.min.js
     * @returns {Promise}
     */
    async load(source = '/tinymce/tinymce.min.js') {
        return this.loader.load(source);
    }

    /**
     * Setup automatic compatibility features
     * @param {string} selector - CSS selector for textarea(s)
     * @param {object} options - Configuration options
     */
    setupAutoInit(selector, options = {}) {
        // Setup Turbo compatibility
        this.loader.setupTurboCompatibility();

        // Setup accordion compatibility
        this.loader.setupAccordionCompatibility(selector, options);

        // Initialize on DOM ready
        const initEditors = () => {
            this.initialize(selector, options);
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initEditors);
        } else {
            initEditors();
        }

        // Re-initialize on Turbo navigation
        document.addEventListener('turbo:load', initEditors);
        document.addEventListener('turbo:render', initEditors);
    }

    /**
     * Get the raw TinyMCE loader instance
     * For advanced use cases
     */
    getLoader() {
        return this.loader;
    }

    /**
     * Get a specific editor instance
     * @param {string} id - Editor ID
     * @returns {object|null}
     */
    getEditor(id) {
        if (this.isLoaded()) {
            return window.tinymce.get(id);
        }
        return null;
    }

    /**
     * Get all editor instances
     * @returns {Array}
     */
    getAllEditors() {
        if (this.isLoaded()) {
            return window.tinymce.get();
        }
        return [];
    }
}

// Export singleton instance
const tinymce = new TinyMCE();

export default tinymce;

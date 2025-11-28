/**
 * TinyMCE Loader Utility
 * Centralized TinyMCE loading and initialization for AlpineBlocks
 *
 * This provides a single source of truth for TinyMCE across all systems
 * that use AlpineBlocks (main app, WPS Pages, WPS Mailer, etc.)
 */

class TinyMCELoader {
    constructor() {
        this.loaded = false;
        this.loading = false;
        this.loadPromise = null;
        this.instances = new Map();
        this.defaultConfig = {
            height: 400,
            menubar: false,
            plugins: 'lists link image table code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
            statusbar: true,
            resize: true,
            promotion: false,
            branding: false
        };
    }

    /**
     * Check if TinyMCE is already loaded
     */
    isLoaded() {
        return typeof window.tinymce !== 'undefined';
    }

    /**
     * Load TinyMCE from the specified source
     * @param {string} source - URL to tinymce.min.js (default: /tinymce/tinymce.min.js)
     * @returns {Promise}
     */
    async load(source = '/tinymce/tinymce.min.js') {
        // If already loaded, return immediately
        if (this.isLoaded()) {
            this.loaded = true;
            return Promise.resolve(window.tinymce);
        }

        // If currently loading, return the existing promise
        if (this.loading && this.loadPromise) {
            return this.loadPromise;
        }

        // Start loading
        this.loading = true;
        this.loadPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = source;
            script.async = true;

            script.onload = () => {
                this.loaded = true;
                this.loading = false;
                console.log('✅ AlpineBlocks TinyMCE loaded from', source);
                resolve(window.tinymce);
            };

            script.onerror = () => {
                this.loading = false;
                this.loadPromise = null;
                reject(new Error(`Failed to load TinyMCE from ${source}`));
            };

            document.head.appendChild(script);
        });

        return this.loadPromise;
    }

    /**
     * Initialize TinyMCE on a selector with custom configuration
     * @param {string} selector - CSS selector for textarea(s)
     * @param {object} config - TinyMCE configuration options
     * @returns {Promise}
     */
    async init(selector, config = {}) {
        // Ensure TinyMCE is loaded
        if (!this.isLoaded()) {
            await this.load(config.source || '/tinymce/tinymce.min.js');
        }

        // Merge with default config
        const finalConfig = {
            ...this.defaultConfig,
            ...config,
            selector,
            base_url: config.base_url || '/tinymce',
            suffix: '.min'
        };

        // Remove source from config as it's not a TinyMCE option
        delete finalConfig.source;

        // Initialize TinyMCE
        return new Promise((resolve, reject) => {
            window.tinymce.init({
                ...finalConfig,
                setup: (editor) => {
                    // Track the instance
                    editor.on('init', () => {
                        this.instances.set(editor.id, editor);
                        console.log('✅ AlpineBlocks TinyMCE initialized:', editor.id);
                    });

                    // Call user's setup function if provided
                    if (config.setup) {
                        config.setup(editor);
                    }

                    // Auto-save on change
                    editor.on('change', () => {
                        editor.save();
                    });

                    // Save on blur
                    editor.on('blur', () => {
                        editor.save();
                    });

                    // Resolve when ready
                    editor.on('init', () => {
                        resolve(editor);
                    });
                }
            });
        });
    }

    /**
     * Initialize all matching textareas, handling hidden accordions
     * @param {string} selector - CSS selector for textarea(s)
     * @param {object} config - TinyMCE configuration options
     * @returns {Promise}
     */
    async initAll(selector, config = {}) {
        if (!this.isLoaded()) {
            await this.load(config.source || '/tinymce/tinymce.min.js');
        }

        const promises = [];
        document.querySelectorAll(selector).forEach((editor) => {
            // Skip if already initialized
            if (window.tinymce.get(editor.id)) {
                return;
            }

            // Check if editor is in a hidden accordion
            const accordion = editor.closest('[data-accordion-target="content"]');
            if (accordion && accordion.classList.contains('hidden')) {
                // Skip hidden editors - they'll be initialized when accordion opens
                return;
            }

            promises.push(this.init(`#${editor.id}`, config));
        });

        return Promise.all(promises);
    }

    /**
     * Remove all TinyMCE instances
     */
    removeAll() {
        if (this.isLoaded()) {
            window.tinymce.remove();
            this.instances.clear();
        }
    }

    /**
     * Remove a specific TinyMCE instance
     * @param {string} id - Editor ID
     */
    remove(id) {
        if (this.isLoaded()) {
            const editor = window.tinymce.get(id);
            if (editor) {
                editor.remove();
                this.instances.delete(id);
            }
        }
    }

    /**
     * Setup Turbo compatibility
     * Cleans up editors before page cache
     */
    setupTurboCompatibility() {
        document.addEventListener('turbo:before-cache', () => {
            this.removeAll();
        });

        document.addEventListener('turbo:load', () => {
            // Re-initialize will happen when init() is called
        });
    }

    /**
     * Setup accordion compatibility
     * Initializes editors when accordion panels are opened
     * @param {string} selector - CSS selector for textarea(s)
     * @param {object} config - TinyMCE configuration options
     */
    setupAccordionCompatibility(selector, config = {}) {
        document.addEventListener('click', (e) => {
            const accordionButton = e.target.closest('[data-action*="accordion#toggle"]');
            if (accordionButton) {
                setTimeout(() => {
                    const accordionElement = accordionButton.closest('[data-controller="accordion"]');
                    if (accordionElement) {
                        const accordionContent = accordionElement.querySelector('[data-accordion-target="content"]');
                        if (accordionContent && !accordionContent.classList.contains('hidden')) {
                            accordionContent.querySelectorAll(selector).forEach((editor) => {
                                if (!window.tinymce.get(editor.id)) {
                                    this.init(`#${editor.id}`, config);
                                }
                            });
                        }
                    }
                }, 50);
            }
        });
    }
}

// Export singleton instance
const tinymceLoader = new TinyMCELoader();

export default tinymceLoader;

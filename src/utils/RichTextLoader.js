/**
 * RichText Loader Utility
 * Centralized rich text editor loading and initialization for AlpineBlocks
 *
 * This provides a custom contenteditable-based WYSIWYG editor as the primary solution.
 * No TinyMCE dependencies - this is a standalone rich text editor.
 */

import { CommonEditorToolbar } from '../core/CommonEditorToolbar';

class RichTextLoader {
    constructor() {
        this.instances = new Map();
        this.defaultConfig = {
            height: 400,
            features: {
                blocks: true,
                bold: true,
                italic: true,
                underline: true,
                strikethrough: true,
                formatBlock: true,
                lists: true,
                links: true,
                alignment: true,
                indentation: true,
                textColor: true,
                backgroundColor: true,
                fontSize: true,
                fontFamily: true
            },
            placeholder: 'Start typing here...',
            className: 'alpineblocks-richtext-editor'
        };
    }

    /**
     * Initialize rich text editor on a selector
     * @param {string} selector - CSS selector for element(s) to convert to rich text editors
     * @param {object} config - Editor configuration options
     * @returns {Promise<Array>} Array of initialized editor instances
     */
    async init(selector, config = {}) {
        const finalConfig = {
            ...this.defaultConfig,
            ...config
        };

        const elements = document.querySelectorAll(selector);
        const instances = [];

        elements.forEach((element) => {
            // Skip if already initialized
            if (this.instances.has(element)) {
                instances.push(this.instances.get(element));
                return;
            }

            const instance = this.initializeSingleEditor(element, finalConfig);
            instances.push(instance);
        });

        return Promise.resolve(instances);
    }

    /**
     * Initialize a single rich text editor
     * @param {HTMLElement} element - Element to convert to editor
     * @param {object} config - Editor configuration
     * @returns {object} Editor instance
     */
    initializeSingleEditor(element, config) {
        const editorId = element.id || `richtext-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        if (!element.id) {
            element.id = editorId;
        }

        // Get initial content from textarea or element
        let initialContent = '';
        if (element.tagName === 'TEXTAREA') {
            initialContent = element.value;

            // Create editor wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'richtext-editor-wrapper';
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.border = '1px solid #d1d5db';
            wrapper.style.borderRadius = '4px';
            wrapper.style.overflow = 'hidden';

            // Hide textarea and insert wrapper after it
            element.style.display = 'none';
            element.parentNode.insertBefore(wrapper, element.nextSibling);

            // Create toolbar
            const toolbar = new CommonEditorToolbar({
                className: config.toolbarClassName || 'richtext-toolbar',
                features: config.features || this.defaultConfig.features
            });

            // Create toolbar container with Alpine x-data
            const toolbarContainer = document.createElement('div');
            toolbarContainer.className = 'richtext-toolbar-container';
            toolbarContainer.setAttribute('x-data', '{ handleToolbarCommand: null }');
            toolbarContainer.innerHTML = toolbar.render(editorId);
            wrapper.appendChild(toolbarContainer);

            // Create contenteditable div
            const editorDiv = document.createElement('div');
            editorDiv.id = `${editorId}-editor`;
            editorDiv.contentEditable = 'true';
            editorDiv.className = config.className || this.defaultConfig.className;
            editorDiv.style.minHeight = `${config.height || this.defaultConfig.height}px`;
            editorDiv.style.padding = '12px';
            editorDiv.style.outline = 'none';
            editorDiv.style.overflowY = 'auto';
            editorDiv.style.backgroundColor = 'white';
            editorDiv.innerHTML = initialContent || `<p>${config.placeholder || this.defaultConfig.placeholder}</p>`;

            wrapper.appendChild(editorDiv);

            // Configure execCommand to use HTML tags instead of CSS styles
            // This makes bold use <b> instead of <span style="font-weight: bold">
            try {
                document.execCommand('styleWithCSS', false, false);
                document.execCommand('defaultParagraphSeparator', false, 'p');
            } catch (e) {
                console.warn('Could not configure execCommand settings:', e);
            }

            // Setup Alpine.js event handlers for toolbar
            this.setupToolbarHandlers(toolbarContainer, editorDiv);

            // Sync changes back to textarea
            editorDiv.addEventListener('input', () => {
                element.value = editorDiv.innerHTML;
                if (config.onChange) {
                    config.onChange(editorDiv.innerHTML);
                }
            });

            // Handle blur events
            editorDiv.addEventListener('blur', () => {
                element.value = editorDiv.innerHTML;
                if (config.onBlur) {
                    config.onBlur(editorDiv.innerHTML);
                }
            });

            const instance = {
                id: editorId,
                element: element,
                editorDiv: editorDiv,
                wrapper: wrapper,
                toolbar: toolbar,
                getContent: () => editorDiv.innerHTML,
                setContent: (content) => {
                    editorDiv.innerHTML = content;
                    element.value = content;
                },
                focus: () => editorDiv.focus(),
                remove: () => this.remove(editorId)
            };

            this.instances.set(element, instance);
            this.instances.set(editorId, instance);

            console.log('✅ AlpineBlocks RichText editor initialized:', editorId);

            if (config.onInit) {
                config.onInit(instance);
            }

            return instance;
        } else {
            // For non-textarea elements, just make contenteditable
            element.contentEditable = 'true';
            element.style.minHeight = `${config.height || this.defaultConfig.height}px`;

            const instance = {
                id: editorId,
                element: element,
                editorDiv: element,
                getContent: () => element.innerHTML,
                setContent: (content) => { element.innerHTML = content; },
                focus: () => element.focus(),
                remove: () => this.remove(editorId)
            };

            this.instances.set(element, instance);
            this.instances.set(editorId, instance);

            return instance;
        }
    }

    /**
     * Setup toolbar button handlers
     * @param {HTMLElement} toolbarContainer - Toolbar container element
     * @param {HTMLElement} editorDiv - Editor contenteditable div
     */
    setupToolbarHandlers(toolbarContainer, editorDiv) {
        // Store the last selection
        let savedSelection = null;

        // Save selection when editor loses focus
        editorDiv.addEventListener('blur', () => {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                savedSelection = selection.getRangeAt(0);
            }
        });

        // Define the command handler function
        const handleToolbarCommand = (command, value = null) => {
            console.log('[RichText] Executing command:', command, 'value:', value);

            // Restore selection if we have one
            if (savedSelection) {
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(savedSelection);
                console.log('[RichText] Restored selection:', selection.toString());
            }

            editorDiv.focus();

            try {
                const result = document.execCommand(command, false, value);
                console.log('[RichText] execCommand result:', result);
            } catch (error) {
                console.warn('[RichText] Command execution failed:', command, error);
            }

            // Save the new selection after the command
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                savedSelection = selection.getRangeAt(0);
            }
        };

        // Wait for Alpine to initialize the x-data, then inject the function
        const injectHandler = () => {
            if (window.Alpine && toolbarContainer._x_dataStack && toolbarContainer._x_dataStack[0]) {
                toolbarContainer._x_dataStack[0].handleToolbarCommand = handleToolbarCommand;
            }
        };

        // Try immediately and also after a short delay for Alpine initialization
        setTimeout(injectHandler, 0);
        setTimeout(injectHandler, 100);

        // Prevent toolbar buttons from stealing focus on mousedown
        // Note: We DON'T preventDefault on buttons because that blocks the click event
        // Instead, we prevent default only on the editor blur to maintain selection
        toolbarContainer.addEventListener('mousedown', (e) => {
            const button = e.target.closest('button');
            if (button) {
                // Don't preventDefault - it blocks click events!
                // The editor focus() call in handleToolbarCommand handles selection
                return;
            }
            // For select/input, we still need to prevent default
            const input = e.target.closest('select, input');
            if (input) {
                e.preventDefault();
            }
        });

        // Also set up manual event listeners as fallback
        toolbarContainer.addEventListener('click', (e) => {
            // Handle regular toolbar buttons with data-command
            const button = e.target.closest('[data-command]');
            if (button) {
                e.preventDefault();
                const command = button.dataset.command;
                handleToolbarCommand(command, null);
                return;
            }
        });

        // Handle select changes
        toolbarContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('toolbar-select')) {
                const value = e.target.value;
                // Extract command from @change attribute or use common pattern
                if (e.target.classList.contains('toolbar-font-family')) {
                    handleToolbarCommand('fontName', value);
                } else if (e.target.classList.contains('toolbar-font-size')) {
                    handleToolbarCommand('fontSize', value);
                } else {
                    // For format block selector
                    handleToolbarCommand('formatBlock', value);
                }
            }
        });

        // Handle color inputs
        toolbarContainer.addEventListener('change', (e) => {
            if (e.target.type === 'color') {
                const value = e.target.value;
                // Check parent structure to determine if foreColor or backColor
                if (e.target.parentElement && e.target.parentElement.innerHTML.includes('foreColor')) {
                    handleToolbarCommand('foreColor', value);
                } else if (e.target.parentElement && e.target.parentElement.innerHTML.includes('backColor')) {
                    handleToolbarCommand('backColor', value);
                }
            }
        });
    }

    /**
     * Setup auto-initialization for elements matching a selector
     * @param {string} selector - CSS selector for elements to auto-initialize
     * @param {object} config - Editor configuration
     */
    setupAutoInit(selector, config = {}) {
        const initEditors = () => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element) => {
                // Check if editor is in a hidden accordion
                const accordion = element.closest('[data-accordion-target="content"]');
                if (accordion && accordion.classList.contains('hidden')) {
                    // Skip hidden editors - they'll be initialized when accordion opens
                    return;
                }

                // Skip if already initialized
                if (this.instances.has(element)) {
                    return;
                }

                this.init(`#${element.id || 'richtext-' + Date.now()}`, config);
            });
        };

        // Initialize on various events
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initEditors);
        } else {
            initEditors();
        }

        // Turbo compatibility
        document.addEventListener('turbo:load', initEditors);
        document.addEventListener('turbo:render', initEditors);

        // Setup accordion compatibility
        this.setupAccordionCompatibility(selector, config);

        // Setup Turbo cleanup
        this.setupTurboCompatibility();
    }

    /**
     * Setup Turbo compatibility
     * Cleans up editors before page cache
     */
    setupTurboCompatibility() {
        document.addEventListener('turbo:before-cache', () => {
            this.removeAll();
        });
    }

    /**
     * Setup accordion compatibility
     * Initializes editors when accordion panels are opened
     * @param {string} selector - CSS selector for elements
     * @param {object} config - Editor configuration options
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
                            accordionContent.querySelectorAll(selector).forEach((element) => {
                                if (!this.instances.has(element)) {
                                    this.init(`#${element.id}`, config);
                                }
                            });
                        }
                    }
                }, 50);
            }
        });
    }

    /**
     * Remove all editor instances
     */
    removeAll() {
        this.instances.forEach((instance) => {
            if (instance.wrapper) {
                instance.wrapper.remove();
            }
            if (instance.element && instance.element.style) {
                instance.element.style.display = '';
            }
        });
        this.instances.clear();
    }

    /**
     * Remove a specific editor instance
     * @param {string} id - Editor ID or element
     */
    remove(id) {
        const instance = this.instances.get(id);
        if (instance) {
            if (instance.wrapper) {
                instance.wrapper.remove();
            }
            if (instance.element && instance.element.style) {
                instance.element.style.display = '';
            }
            this.instances.delete(instance.id);
            this.instances.delete(instance.element);
        }
    }

    /**
     * Get an editor instance by ID or element
     * @param {string|HTMLElement} idOrElement - Editor ID or element
     * @returns {object|null} Editor instance or null
     */
    getInstance(idOrElement) {
        return this.instances.get(idOrElement) || null;
    }
}

// Export singleton instance
const richTextLoader = new RichTextLoader();

export default richTextLoader;

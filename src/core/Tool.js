/**
 * Base class for all AlpineBlocks tools
 * Provides common functionality for block rendering and interaction
 */
export default class Tool {
    constructor(id, updateFunction, config) {
        this.id = id;
        this.updateFunction = updateFunction;
        this.config = config;
        this.editor = null;
        this.el = null;
    }

    /**
     * Triggers a redraw of the block by calling the update function
     */
    triggerRedraw() {
        if (typeof this.updateFunction === 'function') {
            // Use the safe serialization method to avoid circular references
            const cleanConfig = this.serializeConfig(this.config);
            this.updateFunction(this.id, cleanConfig);
        }
    }

    /**
     * Serialize config safely without circular references
     * @param {Object} config - Configuration to serialize
     * @param {Set} [seen] - Set of already seen objects to prevent circular references
     * @returns {Object} Clean configuration
     */
    serializeConfig(config, seen = new Set()) {
        if (!config || typeof config !== 'object') {
            return config;
        }

        // Check for circular reference
        if (seen.has(config)) {
            return '[Circular Reference]';
        }
        seen.add(config);

        const serialized = {};
        for (const [key, value] of Object.entries(config)) {
            if (key === 'editor' || key === 'updateFunction' || typeof value === 'function') {
                // Skip circular references and functions
                continue;
            }

            if (Array.isArray(value)) {
                serialized[key] = value.map(item => {
                    if (item && typeof item === 'object') {
                        if (item.id && item.config) {
                            // For nested blocks, use their own serializeConfig if available
                            if (typeof item.serializeConfig === 'function') {
                                // Extract class name properly from Tool instances
                                let className = item.class;
                                if (!className && item.constructor && item.constructor.name) {
                                    className = item.constructor.name;
                                    // Handle bundled class names like $var$Header
                                    if (className.includes('$var$')) {
                                        const match = className.match(/\$var\$(\w+)$/);
                                        if (match) {
                                            className = match[1];
                                        }
                                    }
                                }
                                
                                return {
                                    id: item.id,
                                    class: className || 'Unknown',
                                    config: item.serializeConfig(item.config)
                                };
                            }
                            
                            // Fallback for plain objects from previous serialization
                            let className;
                            if (item.class && typeof item.class === 'string' && item.class !== 'Object') {
                                className = item.class;
                            } else if (item.constructor && item.constructor.name && item.constructor.name !== 'Object') {
                                className = item.constructor.name;
                                // Handle bundled class names
                                if (className.includes('$var$')) {
                                    const match = className.match(/\$var\$(\w+)$/);
                                    if (match) {
                                        className = match[1];
                                    }
                                }
                            } else {
                                className = 'Unknown';
                            }
                            
                            return {
                                id: item.id,
                                class: className,
                                config: this.serializeConfig(item.config, seen)
                            };
                        }
                        return this.serializeConfig(item, seen);
                    }
                    return item;
                });
            } else if (value && typeof value === 'object') {
                serialized[key] = this.serializeConfig(value, seen);
            } else {
                serialized[key] = value;
            }
        }
        return serialized;
    }

    /**
     * Initialize the tool with editor instance and set up event listeners
     * @param {Object} editor - The Alpine editor instance
     */
    init(editor) {
        this.editor = editor;

        this.editor.$nextTick(() => {
            this.el = document.getElementById(this.id);

            // Only add event listeners if element exists (nested blocks may not have direct DOM IDs)
            if (this.el) {
                this.el.addEventListener('mouseup', (event) => {
                    const selectedText = window.getSelection().toString();
                    if (selectedText.length > 0) {
                        this.editor.$dispatch('editor-show-inline-toolbar', { 
                            event: event, 
                            id: this.id, 
                            text: selectedText 
                        });
                    } else {
                        this.editor.$dispatch('editor-hide-inline-toolbar');
                    }
                });
            }
        });
    }

    /**
     * Helper method to generate select options with current value selected
     * @param {Array} options - Array of {value, label} objects
     * @param {string} currentValue - Current selected value
     * @returns {string} HTML options string
     */
    generateSelectOptions(options, currentValue) {
        return options.map(option => {
            const value = option.value || option;
            const label = option.label || option;
            const selected = currentValue === value ? 'selected' : '';
            return `<option value="${value}" ${selected}>${label}</option>`;
        }).join('');
    }

    /**
     * Render method for displaying the tool output
     * Override in subclasses to provide specific rendering
     * @returns {string} HTML string for output rendering
     */
    render() {
        return '';
    }

    /**
     * Editor render method for displaying the tool in edit mode
     * By default, calls render() method
     * Override in subclasses if different rendering is needed for editor
     * @returns {string} HTML string for editor rendering
     */
    editorRender() {
        return this.render();
    }

    /**
     * Static method to define tool metadata for the toolbox
     * @returns {Object} Tool configuration object
     */
    static toolbox() {
        return {
            name: 'Tool',
            icon: 'default-icon'
        };
    }
}
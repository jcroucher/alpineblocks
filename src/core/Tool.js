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
     * @returns {Object} Clean configuration
     */
    serializeConfig(config) {
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
                serialized[key] = value.map(item => {
                    if (item && typeof item === 'object') {
                        if (item.id && item.config) {
                            // For nested blocks, serialize recursively
                            // Preserve existing class property if it exists and is valid
                            let className;
                            if (item.class && typeof item.class === 'string' && item.class !== 'Object') {
                                className = item.class;
                            } else {
                                className = item.constructor ? item.constructor.name : 'Unknown';
                            }
                            
                            return {
                                id: item.id,
                                class: className,
                                config: this.serializeConfig(item.config)
                            };
                        }
                        return this.serializeConfig(item);
                    }
                    return item;
                });
            } else if (value && typeof value === 'object') {
                serialized[key] = this.serializeConfig(value);
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
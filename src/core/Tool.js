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
            this.updateFunction(this.id, JSON.parse(JSON.stringify(this.config)));
        }
    }

    /**
     * Initialize the tool with editor instance and set up event listeners
     * @param {Object} editor - The Alpine editor instance
     */
    init(editor) {
        this.editor = editor;

        this.editor.$nextTick(() => {
            this.el = document.getElementById(this.id);

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
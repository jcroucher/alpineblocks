/**
 * Toolbar manager for handling tool drag operations
 */
export class Toolbar {
    constructor() {
        this.tools = [];
    }

    /**
     * Initialize toolbar event listeners
     */
    init() {
        window.addEventListener('editor-ready', event => {
            const editorId = event.detail.id;
            if (window.alpineEditors && window.alpineEditors[editorId]) {
                this.tools = window.alpineEditors[editorId].getToolbar();
            }
        });
    }

    /**
     * Handle drag start event for tools
     * @param {DragEvent} event - The drag event
     * @param {Object} tool - The tool being dragged
     */
    handleDragStart(event, tool) {
        event.dataTransfer.setData('text/plain', tool.class);
        event.dataTransfer.effectAllowed = 'copy';
    }
}
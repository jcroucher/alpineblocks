/**
 * Toolbar manager for handling tool drag operations and click-to-append
 */
export class Toolbar {
    constructor() {
        this.tools = [];
        this.isDragging = false;
        this.dragStartTime = null;
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
        this.isDragging = true;
        this.dragStartTime = Date.now();
        event.dataTransfer.setData('text/plain', tool.class);
        event.dataTransfer.effectAllowed = 'copy';
        
        // Store current dragged tool globally for access during dragover
        window.currentDraggedTool = tool.class;
    }

    /**
     * Handle drag end event for tools
     * @param {DragEvent} event - The drag event
     */
    handleDragEnd(event) {
        // Reset drag state after a short delay to allow click detection
        setTimeout(() => {
            this.isDragging = false;
            this.dragStartTime = null;
            // Clear the global dragged tool
            window.currentDraggedTool = null;
        }, 100);
    }

    /**
     * Handle click event for tools (append to bottom if not dragging)
     * @param {MouseEvent} event - The click event
     * @param {Object} tool - The tool being clicked
     */
    handleClick(event, tool) {
        // Prevent click if we just finished dragging
        if (this.isDragging || (this.dragStartTime && Date.now() - this.dragStartTime < 200)) {
            return;
        }

        // Find the editor instance
        const editorElement = document.getElementById('editorjs');
        if (editorElement && editorElement._x_dataStack && editorElement._x_dataStack[0]) {
            const editorData = editorElement._x_dataStack[0];
            if (editorData.editor) {
                // Create a synthetic drop event to append at the end
                const syntheticEvent = {
                    preventDefault: () => {},
                    dataTransfer: {
                        getData: () => tool.class
                    }
                };
                
                // Call handleDrop with no position/blockId to append at end
                editorData.editor.handleDrop(syntheticEvent, 'end', null);
            }
        }
    }

    /**
     * Handle drop event (existing functionality)
     * @param {DragEvent} event - The drop event
     * @param {Object} tool - The tool being dropped
     */
    handleDrop(event, tool) {
        // This method is kept for compatibility but drag/drop is handled by the editor
        event.preventDefault();
    }
}
/**
 * History Manager for undo/redo functionality
 * Tracks changes to the editor blocks and allows reverting to previous states
 */
export class HistoryManager {
    constructor(editor, maxHistorySize = 30) {
        this.editor = editor;
        this.history = [];
        this.currentIndex = -1;
        this.maxHistorySize = maxHistorySize; // Configurable, default 30
        this.isApplyingState = false; // Prevent recursive history tracking
        
        // Save initial state
        this.saveState();
    }

    /**
     * Save the current editor state to history
     * @param {string} action - Description of the action that triggered this save
     */
    saveState(action = 'Initial state') {
        // Don't save state if we're currently applying a previous state
        if (this.isApplyingState) {
            return;
        }

        const currentState = {
            blocks: JSON.parse(this.editor.blocksJSON()),
            timestamp: Date.now(),
            action: action
        };

        // If we're not at the end of history, remove everything after current index
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentIndex + 1);
        }

        // Add new state
        this.history.push(currentState);

        // Keep history size manageable
        if (this.history.length > this.maxHistorySize) {
            this.history.shift();
        } else {
            this.currentIndex++;
        }

        this.notifyHistoryChange();
    }

    /**
     * Undo the last action
     * @returns {boolean} Whether undo was successful
     */
    undo() {
        if (!this.canUndo()) {
            return false;
        }

        this.currentIndex--;
        this.applyState(this.history[this.currentIndex]);
        this.notifyHistoryChange();
        return true;
    }

    /**
     * Redo the next action
     * @returns {boolean} Whether redo was successful
     */
    redo() {
        if (!this.canRedo()) {
            return false;
        }

        this.currentIndex++;
        this.applyState(this.history[this.currentIndex]);
        this.notifyHistoryChange();
        return true;
    }

    /**
     * Check if undo is possible
     * @returns {boolean}
     */
    canUndo() {
        return this.currentIndex > 0;
    }

    /**
     * Check if redo is possible
     * @returns {boolean}
     */
    canRedo() {
        return this.currentIndex < this.history.length - 1;
    }

    /**
     * Apply a previous state to the editor
     * @param {Object} state - The state to apply
     */
    applyState(state) {
        this.isApplyingState = true;

        try {
            // Clear current blocks
            this.editor.blocks.splice(0, this.editor.blocks.length);

            // Recreate blocks from state
            state.blocks.forEach(blockData => {
                // Clean the class name if it's corrupted
                let className = blockData.class;
                if (className && className.includes('$var$')) {
                    const match = className.match(/\$var\$(\w+)$/);
                    if (match) {
                        className = match[1];
                    }
                }
                
                const block = this.editor.initBlock(className, false, blockData.id);
                if (block) {
                    // Use the correct property name from the JSON structure
                    block.config = { ...blockData.data };
                    this.editor.blocks.push(block);
                }
            });

            // Clear selection
            this.editor.selectedBlock = null;
            if (this.editor.$dispatch) {
                this.editor.$dispatch('editor-block-changed', { block_id: null });
                
                // Force Alpine component to sync with new editor state
                this.editor.$nextTick(() => {
                    // Update the Alpine component's blocks array
                    const alpineComponent = this.editor.$el._x_dataStack?.[0];
                    if (alpineComponent) {
                        // Create a new proxy for the blocks array to ensure reactivity
                        alpineComponent.blocks = new Proxy(this.editor.blocks, {
                            set(target, property, value) {
                                target[property] = value;
                                return true;
                            }
                        });
                    }
                    
                    // Force a complete editor update
                    this.editor.$dispatch('editor-updated', { id: this.editor.id });
                });
            }

        } finally {
            this.isApplyingState = false;
        }
    }

    /**
     * Notify listeners that history state has changed
     */
    notifyHistoryChange() {
        document.dispatchEvent(new CustomEvent('history-changed', {
            detail: {
                canUndo: this.canUndo(),
                canRedo: this.canRedo(),
                currentIndex: this.currentIndex,
                totalStates: this.history.length
            }
        }));
    }

    /**
     * Get current history status
     * @returns {Object} History status
     */
    getStatus() {
        return {
            canUndo: this.canUndo(),
            canRedo: this.canRedo(),
            currentAction: this.history[this.currentIndex]?.action,
            totalStates: this.history.length
        };
    }

    /**
     * Clear all history
     */
    clearHistory() {
        this.history = [];
        this.currentIndex = -1;
        this.saveState('History cleared');
    }
}
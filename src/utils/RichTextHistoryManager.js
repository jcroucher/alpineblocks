/**
 * RichTextHistoryManager - Custom undo/redo for contenteditable rich text editor
 *
 * Unlike the browser's native undo (which only tracks typing and execCommand),
 * this manager tracks ALL changes including:
 * - Template drops (manual DOM insertions)
 * - Inline style changes (background, padding, etc.)
 * - Property modifications via StyleControls
 *
 * Implementation:
 * - Stores HTML snapshots + cursor position
 * - Debounces typing to avoid excessive snapshots
 * - Explicitly saves after non-typing operations (drops, style changes)
 */
export class RichTextHistoryManager {
    constructor(editorElement, options = {}) {
        this.editor = editorElement;
        this.history = [];
        this.currentIndex = -1;
        this.maxHistorySize = options.maxHistorySize || 50;
        this.isApplyingState = false; // Prevent recursive tracking
        this.typingTimer = null;
        this.typingDelay = options.typingDelay || 1000; // 1 second after typing stops

        // Callbacks
        this.onStateChange = options.onStateChange || null;

        // Save initial state
        this.saveState('Initial state');
    }

    /**
     * Save the current editor state to history
     * @param {string} action - Description of the action that triggered this save
     * @param {boolean} immediate - Skip debounce, save immediately
     */
    saveState(action = 'Change', immediate = false) {
        // Don't save state if we're currently applying a previous state
        if (this.isApplyingState) {
            return;
        }

        // For typing, debounce to avoid excessive snapshots
        if (!immediate && action === 'Typing') {
            clearTimeout(this.typingTimer);
            this.typingTimer = setTimeout(() => {
                this._performSave(action);
            }, this.typingDelay);
            return;
        }

        // For explicit actions (drops, style changes), save immediately
        this._performSave(action);
    }

    /**
     * Internal method to perform the actual save
     * @param {string} action - Description of the action
     */
    _performSave(action) {
        // Capture current selection/cursor position
        const selection = window.getSelection();
        let selectionState = null;

        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);

            // Store selection as relative offsets within the editor
            try {
                const preSelectionRange = range.cloneRange();
                preSelectionRange.selectNodeContents(this.editor);
                preSelectionRange.setEnd(range.startContainer, range.startOffset);
                const start = preSelectionRange.toString().length;

                selectionState = {
                    start: start,
                    end: start + range.toString().length,
                    collapsed: range.collapsed
                };
            } catch (e) {
                // If we can't capture selection, just store null
                selectionState = null;
            }
        }

        const currentState = {
            html: this.editor.innerHTML,
            selection: selectionState,
            timestamp: Date.now(),
            action: action
        };

        // Check if this state is different from the current one
        // (avoid duplicate snapshots)
        if (this.currentIndex >= 0) {
            const lastState = this.history[this.currentIndex];
            if (lastState && lastState.html === currentState.html) {
                // No change, don't save
                return;
            }
        }

        // If we're not at the end of history, remove everything after current index
        // (user made changes after undoing, so discard the "future")
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

        this._notifyStateChange();
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
        const state = this.history[this.currentIndex];
        this._applyState(state);
        this._notifyStateChange();
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
        const state = this.history[this.currentIndex];
        this._applyState(state);
        this._notifyStateChange();
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
    _applyState(state) {
        this.isApplyingState = true;

        try {
            // Restore HTML content
            this.editor.innerHTML = state.html;

            // Restore selection/cursor position
            // We restore selection synchronously, but after a microtask to ensure DOM is updated
            if (state.selection) {
                // Use requestAnimationFrame for better timing
                requestAnimationFrame(() => {
                    this._restoreSelection(state.selection);
                });
            }

            // Trigger input event so listeners know content changed
            const event = new Event('input', { bubbles: true });
            this.editor.dispatchEvent(event);

        } finally {
            this.isApplyingState = false;
        }
    }

    /**
     * Restore cursor/selection position from saved state
     * @param {Object} selectionState - Saved selection state
     */
    _restoreSelection(selectionState) {
        try {
            // Create a new range
            const range = document.createRange();
            const selection = window.getSelection();

            // Find the text node and offset for the start position
            const { node: startNode, offset: startOffset } = this._getNodeAndOffset(selectionState.start);

            if (startNode) {
                range.setStart(startNode, startOffset);

                if (selectionState.collapsed) {
                    range.collapse(true);
                } else {
                    // Find the end position
                    const { node: endNode, offset: endOffset } = this._getNodeAndOffset(selectionState.end);
                    if (endNode) {
                        range.setEnd(endNode, endOffset);
                    }
                }

                selection.removeAllRanges();
                selection.addRange(range);
            }
        } catch (e) {
            // If we can't restore selection, just place cursor at start
            try {
                const range = document.createRange();
                const selection = window.getSelection();
                range.setStart(this.editor, 0);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
            } catch (e2) {
                // Give up on selection restoration
            }
        }
    }

    /**
     * Find text node and offset for a given character position
     * @param {number} charCount - Character position from start
     * @returns {Object} {node, offset}
     */
    _getNodeAndOffset(charCount) {
        const treeWalker = document.createTreeWalker(
            this.editor,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let currentCount = 0;
        let currentNode = treeWalker.nextNode();

        while (currentNode) {
            const nodeLength = currentNode.textContent.length;

            if (currentCount + nodeLength >= charCount) {
                // Found the node
                return {
                    node: currentNode,
                    offset: charCount - currentCount
                };
            }

            currentCount += nodeLength;
            currentNode = treeWalker.nextNode();
        }

        // Couldn't find position, return last node
        if (currentNode) {
            return { node: currentNode, offset: currentNode.textContent.length };
        }

        // Fallback to editor element
        return { node: this.editor, offset: 0 };
    }

    /**
     * Notify listeners that history state has changed
     */
    _notifyStateChange() {
        if (this.onStateChange) {
            this.onStateChange({
                canUndo: this.canUndo(),
                canRedo: this.canRedo(),
                currentIndex: this.currentIndex,
                totalStates: this.history.length,
                currentAction: this.history[this.currentIndex]?.action
            });
        }
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
            totalStates: this.history.length,
            currentIndex: this.currentIndex
        };
    }

    /**
     * Clear all history and save current state as initial
     */
    clearHistory() {
        this.history = [];
        this.currentIndex = -1;
        this.saveState('History cleared', true);
    }

    /**
     * Destroy the history manager (cleanup)
     */
    destroy() {
        clearTimeout(this.typingTimer);
        this.history = [];
        this.currentIndex = -1;
        this.editor = null;
        this.onStateChange = null;
    }
}

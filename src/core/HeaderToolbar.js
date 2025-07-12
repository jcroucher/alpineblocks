/**
 * Header Toolbar component for editor actions like undo/redo, preview, etc.
 */
export class HeaderToolbar {
    constructor(editorId) {
        this.editorId = editorId;
        this.canUndo = false;
        this.canRedo = false;
    }

    /**
     * Initialize the header toolbar
     */
    init() {
        // Listen for history changes to update button states
        document.addEventListener('history-changed', (e) => {
            this.canUndo = e.detail.canUndo;
            this.canRedo = e.detail.canRedo;
            
            // Force Alpine to update by dispatching a custom event
            document.dispatchEvent(new CustomEvent('header-toolbar-updated', { 
                detail: { 
                    editorId: this.editorId,
                    canUndo: this.canUndo,
                    canRedo: this.canRedo
                } 
            }));
        });
    }

    /**
     * Handle undo action
     */
    handleUndo() {
        const editor = window.alpineEditors?.[this.editorId];
        if (editor) {
            editor.undo();
        }
    }

    /**
     * Handle redo action
     */
    handleRedo() {
        const editor = window.alpineEditors?.[this.editorId];
        if (editor) {
            editor.redo();
        }
    }

    /**
     * Handle preview action
     */
    handlePreview() {
        const editor = window.alpineEditors?.[this.editorId];
        if (editor) {
            // Dispatch preview event for custom handling
            document.dispatchEvent(new CustomEvent('editor-preview', { 
                detail: { 
                    editorId: this.editorId,
                    content: editor.getEditorContent(),
                    json: editor.blocksJSON()
                } 
            }));
        }
    }

    /**
     * Handle settings action
     */
    handleSettings() {
        const editor = window.alpineEditors?.[this.editorId];
        if (editor) {
            // Dispatch settings event for custom handling
            document.dispatchEvent(new CustomEvent('editor-settings', { 
                detail: { 
                    editorId: this.editorId
                } 
            }));
        }
    }

    /**
     * Get the toolbar HTML
     * @returns {string} HTML string for the toolbar
     */
    render() {
        return `
            <div class="header-toolbar" 
                 x-data="headerToolbar('${this.editorId}')"
                 x-init="init()">
                <button class="header-btn" 
                        :disabled="!canUndo"
                        :class="{ 'header-btn-disabled': !canUndo }"
                        @click="handleUndo()"
                        title="Undo (Ctrl+Z)">
                    <svg class="header-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
                    </svg>
                </button>
                <button class="header-btn" 
                        :disabled="!canRedo"
                        :class="{ 'header-btn-disabled': !canRedo }"
                        @click="handleRedo()"
                        title="Redo (Ctrl+Y)">
                    <svg class="header-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/>
                    </svg>
                </button>
                <div class="header-divider"></div>
                <button class="header-btn" 
                        @click="handlePreview()"
                        title="Preview">
                    <svg class="header-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
                <button class="header-btn" 
                        @click="handleSettings()"
                        title="Editor Settings">
                    <svg class="header-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                    </svg>
                </button>
            </div>
        `;
    }
}
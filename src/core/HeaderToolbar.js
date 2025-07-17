/**
 * Header Toolbar component for editor actions like undo/redo, preview, etc.
 */
export class HeaderToolbar {
    constructor(editorId) {
        this.editorId = editorId;
        this.canUndo = false;
        this.canRedo = false;
        this.isCollapsed = false;
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

        // Register this instance globally for external access
        this.registerGlobalAPI();

        // Listen for external command events
        this.setupEventListeners();
    }

    /**
     * Register global API methods for external access
     */
    registerGlobalAPI() {
        // Create namespace if it doesn't exist
        if (!window.AlpineBlocks) {
            window.AlpineBlocks = {};
        }
        if (!window.AlpineBlocks.headerToolbar) {
            window.AlpineBlocks.headerToolbar = {};
        }

        // Register this instance
        window.AlpineBlocks.headerToolbar[this.editorId] = {
            toggleCollapse: () => this.toggleCollapse(),
            undo: () => this.handleUndo(),
            redo: () => this.handleRedo(),
            preview: () => this.handlePreview(),
            settings: () => this.handleSettings(),
            getState: () => ({
                canUndo: this.canUndo,
                canRedo: this.canRedo,
                isCollapsed: this.isCollapsed
            })
        };
    }

    /**
     * Setup event listeners for external commands
     */
    setupEventListeners() {
        // Listen for external header toolbar commands
        document.addEventListener('alpineblocks-header-command', (e) => {
            const { editorId, command, data } = e.detail;
            
            // Only respond to commands for this editor
            if (editorId !== this.editorId && editorId !== 'all') {
                return;
            }

            switch (command) {
                case 'toggleCollapse':
                    this.toggleCollapse();
                    break;
                case 'undo':
                    this.handleUndo();
                    break;
                case 'redo':
                    this.handleRedo();
                    break;
                case 'preview':
                    this.handlePreview();
                    break;
                case 'settings':
                    this.handleSettings();
                    break;
                default:
                    console.warn(`Unknown header toolbar command: ${command}`);
            }
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
            const cleanContent = editor.getCleanContent ? editor.getCleanContent() : editor.getEditorContent();
            
            document.dispatchEvent(new CustomEvent('editor-preview', { 
                detail: { 
                    editorId: this.editorId,
                    content: cleanContent,
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
     * Toggle collapsed state - removes/adds editor padding and borders
     */
    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        
        // Find the editor container and toggle the collapsed class
        const editorContainer = document.querySelector(`[x-data*="alpineEditor"][x-data*="${this.editorId}"]`) || 
                               document.getElementById(this.editorId) ||
                               document.querySelector('.editor-content');
        
        if (editorContainer) {
            if (this.isCollapsed) {
                editorContainer.classList.add('editor-collapsed');
            } else {
                editorContainer.classList.remove('editor-collapsed');
            }
        }
        
        // Update the toolbar state
        document.dispatchEvent(new CustomEvent('header-toolbar-updated', { 
            detail: { 
                editorId: this.editorId,
                canUndo: this.canUndo,
                canRedo: this.canRedo,
                isCollapsed: this.isCollapsed
            } 
        }));
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
                <button class="toolbar-btn" 
                        :disabled="!canUndo"
                        :class="{ 'toolbar-btn-disabled': !canUndo }"
                        @click="handleUndo()"
                        title="Undo (Ctrl+Z)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
                    </svg>
                </button>
                <button class="toolbar-btn" 
                        :disabled="!canRedo"
                        :class="{ 'toolbar-btn-disabled': !canRedo }"
                        @click="handleRedo()"
                        title="Redo (Ctrl+Y)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/>
                    </svg>
                </button>
                <div class="toolbar-separator"></div>
                <button class="toolbar-btn" 
                        @click="handlePreview()"
                        title="Preview">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-92.7-69.4z"/>
                    </svg>
                </button>
                <button class="toolbar-btn" 
                        @click="toggleCollapse()"
                        :class="{ 'toolbar-btn-active': isCollapsed }"
                        :title="isCollapsed ? 'Expand editor (show padding/borders)' : 'Collapse editor (hide padding/borders)'">
                    <svg x-show="!isCollapsed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 11H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2zM19 7H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2zM19 15H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2z"/>
                    </svg>
                    <svg x-show="isCollapsed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 7V3a1 1 0 0 0-2 0v4H2a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0V9h4a1 1 0 0 0 0-2H8zM23 7h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zM23 15h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"/>
                    </svg>
                </button>
            </div>
        `;
    }
}
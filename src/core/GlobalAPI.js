/**
 * Global API functions for AlpineBlocks
 * These functions provide external access to AlpineBlocks functionality
 */

// Global media library function
window.openMediaLibrary = function(blockId, mediaType = 'all') {
    // Get the media picker from the first available editor
    const firstEditor = Object.values(window.alpineEditors || {})[0];
    if (!firstEditor || !firstEditor.mediaPicker) {
        console.warn('Media picker not available. Please configure media settings in your editor initialization.');
        return;
    }
    
    const mediaPicker = firstEditor.mediaPicker;
    
    // Configure the media picker for this selection
    mediaPicker.open({
        fileTypes: [mediaType],
        onSelect: (selectedItem) => {
            // Find the block and update its configuration
            for (const editorId in window.alpineEditors) {
                const editor = window.alpineEditors[editorId];
                if (editor && editor.blocks) {
                    const block = editor.blocks.find(b => b.id === blockId);
                    if (block) {
                        if (mediaType === 'image') {
                            block.config.src = selectedItem.url;
                            if (selectedItem.name) {
                                block.config.alt = selectedItem.name;
                            }
                        } else if (mediaType === 'video') {
                            block.config.url = selectedItem.url;
                            block.config.type = 'direct';
                        }
                        block.triggerRedraw();
                        break;
                    }
                }
            }
        }
    });
};

// Global image upload function
window.uploadImage = async function(event, blockId) {
    const file = event.target.files[0];
    if (!file) return;
    
    const statusEl = document.getElementById(`upload-status-${blockId}`);
    if (statusEl) {
        statusEl.textContent = 'Uploading...';
        statusEl.style.color = '#3b82f6';
    }
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('blockId', blockId);
    
    try {
        // You can configure this endpoint in your server
        const uploadEndpoint = window.ALPINEBLOCKS_CONFIG?.uploadEndpoint || '/api/upload-image';
        
        const response = await fetch(uploadEndpoint, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.url) {
            // Update the image source
            const editorInstance = window.alpineEditors?.['alpineblocks-editor'];
            if (editorInstance) {
                const block = editorInstance.blocks.find(b => b.id === blockId);
                if (block) {
                    block.config.src = result.url;
                    block.triggerRedraw();
                }
            }
            
            if (statusEl) {
                statusEl.textContent = '✅ Upload successful';
                statusEl.style.color = '#10b981';
                setTimeout(() => {
                    statusEl.textContent = '';
                }, 3000);
            }
        } else {
            throw new Error(result.message || 'Upload failed');
        }
    } catch (error) {
        console.error('Upload error:', error);
        if (statusEl) {
            statusEl.textContent = '❌ Upload failed: ' + error.message;
            statusEl.style.color = '#ef4444';
        }
    }
};

/**
 * Setup global AlpineBlocks API
 */
export function setupGlobalAPI() {
    // Initialize global namespace
    window.AlpineBlocks = window.AlpineBlocks || {};

    /**
     * Global configuration for AlpineBlocks
     * @param {object} config - Configuration object
     */
    window.AlpineBlocks.configure = function(config) {
        if (!window.AlpineBlocksConfig) {
            window.AlpineBlocksConfig = {};
        }
        Object.assign(window.AlpineBlocksConfig, config);
    };

    /**
     * Toggle collapse state for a specific editor or all editors
     * @param {string} editorId - Editor ID or 'all' for all editors
     */
    window.AlpineBlocks.toggleCollapse = function(editorId = 'alpineblocks-editor') {
        if (window.AlpineBlocks.headerToolbar?.[editorId]) {
            window.AlpineBlocks.headerToolbar[editorId].toggleCollapse();
        } else {
            // Fallback: dispatch event
            document.dispatchEvent(new CustomEvent('alpineblocks-header-command', {
                detail: { editorId, command: 'toggleCollapse' }
            }));
        }
    };

    /**
     * Trigger undo for a specific editor
     * @param {string} editorId - Editor ID
     */
    window.AlpineBlocks.undo = function(editorId = 'alpineblocks-editor') {
        if (window.AlpineBlocks.headerToolbar?.[editorId]) {
            window.AlpineBlocks.headerToolbar[editorId].undo();
        } else {
            document.dispatchEvent(new CustomEvent('alpineblocks-header-command', {
                detail: { editorId, command: 'undo' }
            }));
        }
    };

    /**
     * Trigger redo for a specific editor
     * @param {string} editorId - Editor ID
     */
    window.AlpineBlocks.redo = function(editorId = 'alpineblocks-editor') {
        if (window.AlpineBlocks.headerToolbar?.[editorId]) {
            window.AlpineBlocks.headerToolbar[editorId].redo();
        } else {
            document.dispatchEvent(new CustomEvent('alpineblocks-header-command', {
                detail: { editorId, command: 'redo' }
            }));
        }
    };

    /**
     * Trigger preview for a specific editor
     * @param {string} editorId - Editor ID
     */
    window.AlpineBlocks.preview = function(editorId = 'alpineblocks-editor') {
        if (window.AlpineBlocks.headerToolbar?.[editorId]) {
            window.AlpineBlocks.headerToolbar[editorId].preview();
        } else {
            document.dispatchEvent(new CustomEvent('alpineblocks-header-command', {
                detail: { editorId, command: 'preview' }
            }));
        }
    };

    /**
     * Get the current state of the header toolbar
     * @param {string} editorId - Editor ID
     * @returns {object} Current state object
     */
    window.AlpineBlocks.getHeaderState = function(editorId = 'alpineblocks-editor') {
        if (window.AlpineBlocks.headerToolbar?.[editorId]) {
            return window.AlpineBlocks.headerToolbar[editorId].getState();
        }
        return { canUndo: false, canRedo: false, isCollapsed: false };
    };

    /**
     * Send a custom command to the header toolbar
     * @param {string} command - Command name
     * @param {string} editorId - Editor ID
     * @param {object} data - Optional data
     */
    window.AlpineBlocks.sendHeaderCommand = function(command, editorId = 'alpineblocks-editor', data = {}) {
        document.dispatchEvent(new CustomEvent('alpineblocks-header-command', {
            detail: { editorId, command, data }
        }));
    };

    /**
     * Get pages array from editorPages component
     * @param {string} editorId - Editor ID
     * @returns {Array} Pages array
     */
    window.AlpineBlocks.getPages = function(editorId = 'alpineblocks-editor') {
        const pageElements = document.querySelectorAll('[x-data*="editorPages"]');
        for (const element of pageElements) {
            const component = window.Alpine.$data(element);
            if (component && component.pages) {
                return component.pages;
            }
        }
        return [];
    };

    /**
     * Add a new page using the editorPages component
     * @param {string} editorId - Editor ID
     * @returns {*} Result of addPage method
     */
    window.AlpineBlocks.addPage = function(editorId = 'alpineblocks-editor') {
        const pageElements = document.querySelectorAll('[x-data*="editorPages"]');
        for (const element of pageElements) {
            const component = window.Alpine.$data(element);
            if (component && typeof component.addPage === 'function') {
                return component.addPage();
            }
        }
        return null;
    };

    /**
     * Get current page title from editorPages component
     * @param {string} editorId - Editor ID
     * @returns {string} Current page title
     */
    window.AlpineBlocks.getCurrentPageTitle = function(editorId = 'alpineblocks-editor') {
        const pageElements = document.querySelectorAll('[x-data*="editorPages"]');
        for (const element of pageElements) {
            const component = window.Alpine.$data(element);
            if (component && typeof component.getCurrentPageTitle === 'function') {
                return component.getCurrentPageTitle();
            }
        }
        return '';
    };

    /**
     * Get current page blocks from editorPages component
     * @param {string} editorId - Editor ID
     * @returns {Array} Current page blocks
     */
    window.AlpineBlocks.getCurrentPageBlocks = function(editorId = 'alpineblocks-editor') {
        const pageElements = document.querySelectorAll('[x-data*="editorPages"]');
        for (const element of pageElements) {
            const component = window.Alpine.$data(element);
            if (component && typeof component.getCurrentPageBlocks === 'function') {
                return component.getCurrentPageBlocks();
            }
        }
        return [];
    };

    /**
     * Get project settings from editorPages component
     * @param {string} editorId - Editor ID
     * @returns {Object} Project settings object
     */
    window.AlpineBlocks.getProjectSettings = function(editorId = 'alpineblocks-editor') {
        const pageElements = document.querySelectorAll('[x-data*="editorPages"]');
        for (const element of pageElements) {
            const component = window.Alpine.$data(element);
            if (component && component.projectSettings) {
                return component.projectSettings;
            }
        }
        return {};
    };

    /**
     * Switch to a specific page
     * @param {string} pageId - Page ID to switch to
     * @param {string} editorId - Editor ID
     * @returns {boolean} Success status
     */
    window.AlpineBlocks.switchToPage = function(pageId, editorId = 'alpineblocks-editor') {
        const pageElements = document.querySelectorAll('[x-data*="editorPages"]');
        for (const element of pageElements) {
            const component = window.Alpine.$data(element);
            if (component && typeof component.switchToPage === 'function') {
                component.switchToPage(pageId);
                return true;
            }
        }
        return false;
    };

    /**
     * Get current page ID
     * @param {string} editorId - Editor ID
     * @returns {string} Current page ID
     */
    window.AlpineBlocks.getCurrentPageId = function(editorId = 'alpineblocks-editor') {
        const pageElements = document.querySelectorAll('[x-data*="editorPages"]');
        for (const element of pageElements) {
            const component = window.Alpine.$data(element);
            if (component && component.currentPageId) {
                return component.currentPageId;
            }
        }
        return '';
    };

    /**
     * Delete a page
     * @param {string} pageId - Page ID to delete
     * @param {string} editorId - Editor ID
     * @returns {boolean} Success status
     */
    window.AlpineBlocks.deletePage = function(pageId, editorId = 'alpineblocks-editor') {
        const pageElements = document.querySelectorAll('[x-data*="editorPages"]');
        for (const element of pageElements) {
            const component = window.Alpine.$data(element);
            if (component && typeof component.deletePage === 'function') {
                component.deletePage(pageId);
                return true;
            }
        }
        return false;
    };

    /**
     * Rename a page
     * @param {string} pageId - Page ID to rename
     * @param {string} editorId - Editor ID
     * @returns {boolean} Success status
     */
    window.AlpineBlocks.renamePage = function(pageId, editorId = 'alpineblocks-editor') {
        const pageElements = document.querySelectorAll('[x-data*="editorPages"]');
        for (const element of pageElements) {
            const component = window.Alpine.$data(element);
            if (component && typeof component.renamePage === 'function') {
                component.renamePage(pageId);
                return true;
            }
        }
        return false;
    };

    /**
     * Load content into the editor from JSON data
     * @param {Array|String|Object} blocksData - Blocks data to load (array, JSON string, or object with blocks property)
     * @param {string} editorId - Editor ID (defaults to 'alpineblocks-editor')
     * @returns {boolean} Success status
     */
    window.AlpineBlocks.loadContent = function(blocksData, editorId = 'alpineblocks-editor') {
        const editor = window.alpineEditors?.[editorId];
        
        if (!editor) {
            console.error(`AlpineBlocks: Editor with id '${editorId}' not found`);
            return false;
        }
        
        // Parse blocks data if it's a string
        let blocks = blocksData;
        if (typeof blocksData === 'string') {
            try {
                blocks = JSON.parse(blocksData);
            } catch (e) {
                console.error('AlpineBlocks: Failed to parse blocks data:', e);
                return false;
            }
        }
        
        // Ensure blocks is an array
        if (!Array.isArray(blocks)) {
            blocks = blocks?.blocks || [];
        }
        
        // Clear existing blocks
        editor.blockManager.blocks = [];
        
        // Create blocks from saved data
        if (blocks && blocks.length > 0) {
            blocks.forEach(blockData => {
                const blockClass = blockData.class || blockData.type || 'Paragraph';
                
                // Only create block if tool exists
                if (blockClass && editor.toolConfig[blockClass]) {
                    const block = editor.initBlock(blockClass, true, blockData.id);
                    
                    // Apply saved configuration
                    if (block && blockData.data) {
                        Object.assign(block.config, blockData.data);
                    }
                }
            });
        }
        
        // Add default paragraph if no blocks loaded
        if (editor.blockManager.blocks.length === 0 && editor.toolConfig['Paragraph']) {
            editor.initBlock('Paragraph', true);
        }
        
        // Dispatch events
        document.dispatchEvent(new CustomEvent('editor-clear-selection'));
        
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('editor-changed'));
        }, 100);
        
        return true;
    };
}
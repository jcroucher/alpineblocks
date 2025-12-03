import { Debug } from './utils/Debug';
import { generateId } from '../utils/generateId.js';
import { StyleControls } from './StyleControls.js';

/**
 * Settings panel manager for handling block property updates
 */
export class Settings {
    constructor(editorId, settings = {}) {
        this.editorId = editorId;
        this.settings = settings;
        this.cssProperties = {};
        this.currentBlockId = null;
        this.currentElement = null;  // Store reference to the actual DOM element
    }

    /**
     * Initialize settings panel event listeners
     */
    init() {
        this.editorReady = false;

        // Wait for editor to be ready
        document.addEventListener('editor-ready', (event) => {
            if (event.detail.id === this.editorId) {
                this.editorReady = true;
                Debug.debug('Settings: Editor ready for', this.editorId);
            }
        });

        window.addEventListener('editor-block-changed', event => {
            Debug.debug('Settings: Received editor-block-changed event', event.detail);

            this.handleBlockChanged(event.detail.block_id);
        });

        // Listen for template element selections from rich text editor
        document.addEventListener('template-selected', event => {
            Debug.debug('Settings: Received template-selected event', event.detail);

            this.handleTemplateSelected(event.detail);
        });
    }
    
    handleBlockChanged(blockId) {
        this.currentElement = null;  // Clear element reference for regular blocks

        if (window.alpineEditors && window.alpineEditors[this.editorId]) {
            const newSettings = window.alpineEditors[this.editorId].getSettings(blockId);
            this.settings = newSettings || [];
            this.currentBlockId = blockId;

            // Parse CSS properties from the block's inline styles
            this.parseCSSPropertiesFromBlock(blockId);

            // Check if this is a WYSIWYG/RichTextEditor block
            const editorInstance = window.alpineEditors[this.editorId];
            const block = editorInstance.blocks.find(b => b.id === blockId);
            const blockType = block ? (block.class || block.constructor.name) : null;

            Debug.debug('Settings: Block type', blockType, 'for block', blockId);

            if (blockType === 'WYSIWYG') {
                // Inject RichTextEditor-specific properties
                this.injectRichTextEditorProperties(block);
                Debug.debug('Settings: Injected RichTextEditor properties for block', blockId);
            }

            Debug.debug('Settings: Updated settings for block', blockId, this.settings);

            // Force Alpine to update by dispatching a custom event
            document.dispatchEvent(new CustomEvent('settings-updated', {
                detail: {
                    editorId: this.editorId,
                    settings: this.settings,
                    blockId: blockId,
                    cssProperties: this.cssProperties
                }
            }));
        } else {
            Debug.warn('Settings: Editor instance not found', this.editorId);
            Debug.debug('Settings: Available editors:', Object.keys(window.alpineEditors || {}));

            // Try again after a short delay in case editor is still initializing
            setTimeout(() => {
                if (window.alpineEditors && window.alpineEditors[this.editorId]) {
                    this.handleBlockChanged(blockId);
                } else {
                    Debug.error('Settings: Editor instance still not found after delay', this.editorId);
                }
            }, 100);
        }
    }

    /**
     * Handle template element selection from rich text editor
     * @param {Object} detail - Event detail from template-selected event
     */
    handleTemplateSelected(detail) {
        console.log('[Settings] Received template-selected event detail:', detail);
        console.log('[Settings] detail.currentElement:', detail.currentElement);
        console.log('[Settings] detail.element:', detail.element);
        console.log('[Settings] detail.clickedElement:', detail.clickedElement);

        this.currentElement = detail.currentElement || detail.element;  // Store the clicked element

        console.log('[Settings] Stored currentElement:', this.currentElement);
        console.log('[Settings] Current element tag:', this.currentElement?.tagName);
        console.log('[Settings] Current element HTML:', this.currentElement?.outerHTML?.substring(0, 200));
        console.log('[Settings] Current element style attr:', this.currentElement?.getAttribute('style'));

        this.currentBlockId = detail.instanceId;  // Use instance ID as block ID
        this.settings = [];  // No block settings for template elements

        // Parse CSS from the clicked element (not the wrapper)
        if (this.currentElement && this.currentElement.hasAttribute('style')) {
            const styleString = this.currentElement.getAttribute('style');
            this.cssProperties = StyleControls.parseCSSProperties(styleString);
            console.log('[Settings] Parsed CSS properties:', this.cssProperties);
            Debug.debug('Settings: Parsed CSS from template element', this.cssProperties);
        } else {
            this.cssProperties = {};
            console.log('[Settings] No styles on element');
            Debug.debug('Settings: No styles on template element');
        }

        // Dispatch update event
        document.dispatchEvent(new CustomEvent('settings-updated', {
            detail: {
                editorId: this.editorId,
                settings: this.settings,
                blockId: this.currentBlockId,
                cssProperties: this.cssProperties
            }
        }));
    }

    /**
     * Parse CSS properties from a block's inline styles
     * @param {string} blockId - The ID of the block
     */
    parseCSSPropertiesFromBlock(blockId) {
        const editorInstance = window.alpineEditors[this.editorId];
        if (!editorInstance) {
            this.cssProperties = {};
            return;
        }

        // If we have a stored element reference (from template selection), use it
        if (this.currentElement) {
            if (this.currentElement.hasAttribute('style')) {
                const styleString = this.currentElement.getAttribute('style');
                this.cssProperties = StyleControls.parseCSSProperties(styleString);
                Debug.debug('Settings: Parsed CSS from stored element', this.cssProperties);
            } else {
                this.cssProperties = {};
                Debug.debug('Settings: No styles on stored element');
            }
            return;
        }

        // Get the block's DOM element
        let element = null;

        // Check if it's a template element
        if (blockId && blockId.startsWith('template-')) {
            const templateMap = window.templateElementMap;
            if (templateMap && templateMap[blockId]) {
                element = templateMap[blockId].element;
            }
        } else {
            // Regular block - try multiple methods to find the element

            // Method 1: Try data-block-id attribute
            element = document.querySelector(`[data-block-id="${blockId}"]`);

            // Method 2: Try ID-based selector (some blocks use id attribute)
            if (!element) {
                element = document.getElementById(blockId);
            }

            // Method 3: Get the block wrapper element from AlpineBlocks editor
            if (!element) {
                const blockWrapper = document.querySelector(`[data-block-wrapper="${blockId}"]`);
                if (blockWrapper) {
                    // Try to find the actual content element inside the wrapper
                    const contentElement = blockWrapper.querySelector('[contenteditable]') ||
                                          blockWrapper.querySelector('.block-content') ||
                                          blockWrapper.querySelector('[data-block-content]') ||
                                          blockWrapper.firstElementChild;
                    element = contentElement || blockWrapper;
                }
            }

            // Method 4: Get from editor blocks array and find corresponding DOM element
            if (!element && editorInstance.blocks) {
                const block = editorInstance.blocks.find(b => b.id === blockId);
                if (block && block.element) {
                    element = block.element;
                } else if (block) {
                    // Try to find element by searching for block ID in data attributes
                    const allBlocks = document.querySelectorAll('[id], [data-id]');
                    for (const el of allBlocks) {
                        if (el.id === blockId || el.getAttribute('data-id') === blockId) {
                            element = el;
                            break;
                        }
                    }
                }
            }
        }

        Debug.debug('Settings: Found element for block', blockId, element);

        // Parse the inline style attribute
        if (element && element.hasAttribute('style')) {
            const styleString = element.getAttribute('style');
            this.cssProperties = StyleControls.parseCSSProperties(styleString);
            Debug.debug('Settings: Parsed CSS properties', this.cssProperties);
        } else {
            this.cssProperties = {};
            Debug.debug('Settings: No styles found on element');
        }
    }

    /**
     * Update a CSS property on the current block
     * @param {string} property - The CSS property name
     * @param {string} value - The CSS property value
     */
    updateCSSProperty(property, value) {
        if (!this.currentBlockId) {
            Debug.warn('No block selected for CSS update');
            return;
        }

        // Update the cssProperties object
        this.cssProperties[property] = value;

        // Apply the styles to the block's DOM element
        this.applyStylesToBlock();
    }

    /**
     * Apply CSS properties to the current block's DOM element
     */
    applyStylesToBlock() {
        const editorInstance = window.alpineEditors[this.editorId];
        if (!editorInstance || !this.currentBlockId) {
            return;
        }

        // If we have a stored element reference (from template selection), use it directly
        if (this.currentElement) {
            const styleString = StyleControls.buildStyleString(this.cssProperties);
            this.currentElement.setAttribute('style', styleString);
            Debug.debug('Settings: Applied styles to stored element', styleString);

            // Save state if available
            if (editorInstance.debouncedSaveState) {
                editorInstance.debouncedSaveState();
            }
            return;
        }

        // Get the block's DOM element
        let element = null;

        // Check if it's a template element
        if (this.currentBlockId.startsWith('template-')) {
            const templateMap = window.templateElementMap;
            if (templateMap && templateMap[this.currentBlockId]) {
                element = templateMap[this.currentBlockId].element;
            }
        } else {
            // Regular block - try multiple methods to find the element

            // Method 1: Try data-block-id attribute
            element = document.querySelector(`[data-block-id="${this.currentBlockId}"]`);

            // Method 2: Try ID-based selector (some blocks use id attribute)
            if (!element) {
                element = document.getElementById(this.currentBlockId);
            }

            // Method 3: Get the block wrapper element from AlpineBlocks editor
            if (!element) {
                const blockWrapper = document.querySelector(`[data-block-wrapper="${this.currentBlockId}"]`);
                if (blockWrapper) {
                    // Try to find the actual content element inside the wrapper
                    const contentElement = blockWrapper.querySelector('[contenteditable]') ||
                                          blockWrapper.querySelector('.block-content') ||
                                          blockWrapper.querySelector('[data-block-content]') ||
                                          blockWrapper.firstElementChild;
                    element = contentElement || blockWrapper;
                }
            }

            // Method 4: Get from editor blocks array and find corresponding DOM element
            if (!element && editorInstance.blocks) {
                const block = editorInstance.blocks.find(b => b.id === this.currentBlockId);
                if (block && block.element) {
                    element = block.element;
                } else if (block) {
                    // Try to find element by searching for block ID in data attributes
                    const allBlocks = document.querySelectorAll('[id], [data-id]');
                    for (const el of allBlocks) {
                        if (el.id === this.currentBlockId || el.getAttribute('data-id') === this.currentBlockId) {
                            element = el;
                            break;
                        }
                    }
                }
            }
        }

        Debug.debug('Settings: Applying styles to element', this.currentBlockId, element);

        if (element) {
            // Build the style string and apply it
            const styleString = StyleControls.buildStyleString(this.cssProperties);
            element.setAttribute('style', styleString);
            Debug.debug('Settings: Applied style string', styleString);

            // Save state if available
            if (editorInstance.debouncedSaveState) {
                editorInstance.debouncedSaveState();
            }
        } else {
            Debug.warn('Settings: Could not find element to apply styles to', this.currentBlockId);
        }
    }

    /**
     * Inject RichTextEditor-specific properties into the settings panel
     * @param {object} block - The WYSIWYG block object
     */
    injectRichTextEditorProperties(block) {
        // RichTextEditor should be available globally via window.AlpineBlocks
        if (!window.AlpineBlocks || !window.AlpineBlocks.RichTextEditor) {
            Debug.warn('RichTextEditor not available - cannot inject properties');
            return;
        }

        const richTextEditor = window.AlpineBlocks.RichTextEditor;
        const propertiesHTML = richTextEditor.createRichTextPropertiesHTML();

        // Add RichTextEditor properties as a setting with a unique name/ID
        // Use block ID to ensure uniqueness across multiple WYSIWYG blocks
        const uniqueSettingName = `richtext-properties-${this.currentBlockId}`;

        this.settings.push({
            name: uniqueSettingName,
            label: 'Rich Text Editor Properties',
            html: propertiesHTML
        });

        Debug.debug('Settings: Added RichTextEditor properties HTML', propertiesHTML.substring(0, 100) + '...');
    }

    /**
     * Handle property changes from the settings panel (supports nested blocks)
     * @param {string} block_id - The ID of the block to update (may be composite for nested blocks)
     * @param {string} property - The property name to update
     * @param {*} value - The new value for the property
     */
    trigger(block_id, property, value = null) {
        const editorInstance = window.alpineEditors[this.editorId];
        if (!editorInstance) {
            Debug.error('Editor instance not found:', this.editorId);
            return;
        }

        // Check if this is a template element (format: template-toolId)
        if (block_id.startsWith('template-')) {
            const templateMap = window.templateElementMap;
            if (templateMap && templateMap[block_id] && templateMap[block_id].toolInstance) {
                const tool = templateMap[block_id].toolInstance;
                const element = templateMap[block_id].element;
                const toolType = templateMap[block_id].toolType;
                
                // Update the tool config
                tool.config[property] = value;
                
                // Update the element using the editor's method
                if (editorInstance.updateTemplateElement) {
                    editorInstance.updateTemplateElement(element, toolType, property, value);
                }
                return;
            } else {
                Debug.error('Template element not found:', block_id);
                return;
            }
        }

        // Check if this is a nested block (format: parentId::nestedId)
        if (block_id.includes('::')) {
            const [parentId, nestedId] = block_id.split('::');
            const parentBlock = editorInstance.blocks.find(b => b.id === parentId);
            
            if (parentBlock && typeof parentBlock.updateNestedBlock === 'function') {
                // Create update object for nested block
                const updateObj = { [property]: value };
                parentBlock.updateNestedBlock(nestedId, updateObj);
                return;
            } else {
                Debug.error('Parent block or updateNestedBlock method not found:', parentId);
                return;
            }
        }
        
        // Handle regular top-level blocks
        const block = editorInstance.blocks.find(b => b.id === block_id);

        if (!block) {
            Debug.error('Block not found:', block_id);
            return;
        }

        console.log('[Settings.trigger] Checking property:', property, 'on block class:', block.class || block.constructor.name);
        console.log('[Settings.trigger] block[property] type:', typeof block[property]);
        console.log('[Settings.trigger] prototype[property] type:', typeof block.constructor.prototype[property]);

        if (typeof block[property] === 'function') {
            console.log('[Settings.trigger] Calling block[property] directly');
            block[property](value);
        } else if (typeof block.constructor.prototype[property] === 'function') {
            console.log('[Settings.trigger] Calling prototype[property]');
            block.constructor.prototype[property].call(block, value);
        } else if (property === 'columnCount' && typeof block.constructor.prototype.updateColumnCount === 'function') {
            console.log('[Settings.trigger] Calling updateColumnCount fallback');
            block.constructor.prototype.updateColumnCount.call(block, value);
        } else if (block.config && block.config.hasOwnProperty(property)) {
            console.log('[Settings.trigger] Setting config property');
            block.config[property] = value;
            block.triggerRedraw();
        } else {
            console.log('[Settings.trigger] Setting direct property');
            block[property] = value;
            if (block.triggerRedraw) {
                block.triggerRedraw();
            }
        }

        // Trigger debounced state save for property changes
        if (editorInstance.debouncedSaveState) {
            editorInstance.debouncedSaveState();
        }
    }

    /**
     * Execute a callback function and trigger editor redraw
     * @param {Function} callback - The callback function to execute
     */
    doCallback(callback) {
        callback();
        window.alpineEditors[this.editorId].blockManager.triggerRedraw();
    }

    /**
     * Delete a block or template element
     * @param {string} blockId - The ID of the block to delete
     */
    deleteBlock(blockId) {
        const editorInstance = window.alpineEditors[this.editorId];
        if (!editorInstance) {
            Debug.error('Editor instance not found:', this.editorId);
            return;
        }

        // Check if this is a template element
        if (blockId.startsWith('template-')) {
            this.deleteTemplateElement(blockId);
            return;
        }

        // Show confirmation dialog for regular blocks
        if (editorInstance.showDeleteConfirmation) {
            editorInstance.showDeleteConfirmation(blockId);
        } else {
            // Fallback direct deletion
            this.confirmDeleteBlock(blockId);
        }
    }

    /**
     * Delete a template element from Raw Code preview
     * @param {string} virtualBlockId - The virtual block ID of the template element
     */
    deleteTemplateElement(virtualBlockId) {
        const templateMap = window.templateElementMap;
        if (!templateMap || !templateMap[virtualBlockId]) {
            return;
        }

        const { element } = templateMap[virtualBlockId];
        
        // Remove the element from DOM
        if (element && element.parentNode) {
            element.remove();
            
            // Update the Raw block content
            const previewContainer = element.closest('[x-ref="previewContainer"]');
            if (previewContainer) {
                const rawBlock = previewContainer.closest('.raw-block');
                if (rawBlock) {
                    const blockId = rawBlock.getAttribute('data-block-id');
                    const editorInstance = window.alpineEditors[this.editorId];
                    const block = editorInstance.blocks.find(b => b.id === blockId);
                    if (block) {
                        block.config.content = previewContainer.innerHTML;
                        // Also update the textarea
                        const textarea = rawBlock.querySelector('.code-input');
                        if (textarea) {
                            textarea.value = previewContainer.innerHTML;
                        }
                    }
                }
            }
            
            // Clean up the template mapping
            delete templateMap[virtualBlockId];
            
            // Clear the properties panel
            this.settings = [];
            document.dispatchEvent(new CustomEvent('settings-updated', { 
                detail: { 
                    editorId: this.editorId, 
                    settings: this.settings,
                    blockId: null
                } 
            }));
        }
    }

    /**
     * Confirm and delete a regular block
     * @param {string} blockId - The ID of the block to delete
     */
    confirmDeleteBlock(blockId) {
        const editorInstance = window.alpineEditors[this.editorId];
        if (!editorInstance) {
            return;
        }

        // Find and remove the block
        const blockIndex = editorInstance.blocks.findIndex(b => b.id === blockId);
        if (blockIndex !== -1) {
            editorInstance.blocks.splice(blockIndex, 1);
            
            // Clear selection if deleted block was selected
            if (editorInstance.selectedBlock === blockId) {
                editorInstance.selectedBlock = null;
                this.settings = [];
                document.dispatchEvent(new CustomEvent('settings-updated', { 
                    detail: { 
                        editorId: this.editorId, 
                        settings: this.settings,
                        blockId: null
                    } 
                }));
            }
            
            // Trigger redraw
            editorInstance.blockManager.triggerRedraw();
            
            // Save state
            if (editorInstance.debouncedSaveState) {
                editorInstance.debouncedSaveState();
            }
        }
    }

    /**
     * Duplicate a block (only for regular blocks, not template elements)
     * @param {string} blockId - The ID of the block to duplicate
     */
    duplicateBlock(blockId) {
        const editorInstance = window.alpineEditors[this.editorId];
        if (!editorInstance) {
            Debug.error('Editor instance not found:', this.editorId);
            return;
        }

        // Don't allow duplication of template elements
        if (blockId.startsWith('template-')) {
            return;
        }

        // Find the block to duplicate
        const blockIndex = editorInstance.blocks.findIndex(b => b.id === blockId);
        if (blockIndex === -1) {
            Debug.error('Block not found for duplication:', blockId);
            return;
        }

        const originalBlock = editorInstance.blocks[blockIndex];
        
        // Create a new block with the same configuration
        const toolName = originalBlock.class || originalBlock.constructor.name;
        const toolConfig = editorInstance.toolConfig[toolName];
        
        if (!toolConfig) {
            Debug.error('Tool config not found for duplication:', toolName);
            return;
        }

        // Generate new ID
        const newId = generateId();
        
        // Create new block instance
        const BlockClass = toolConfig.class;
        const newBlock = new BlockClass({
            id: newId,
            updateFunction: editorInstance.updateFunction.bind(editorInstance),
            config: JSON.parse(JSON.stringify(originalBlock.config)) // Deep copy config
        });
        
        // Preserve the class name
        newBlock.class = toolName;
        
        // Initialize the new block
        newBlock.init(editorInstance);
        
        // Insert the new block after the original
        editorInstance.blocks.splice(blockIndex + 1, 0, newBlock);
        
        // Trigger redraw
        editorInstance.blockManager.triggerRedraw();
        
        // Save state
        if (editorInstance.debouncedSaveState) {
            editorInstance.debouncedSaveState();
        }
        
        // Select the new block
        editorInstance.setActive(null, newId);
    }

    /**
     * Get action buttons for the current block
     * @param {string} blockId - The current block ID
     * @returns {Array} Array of action button configurations
     */
    getActionButtons(blockId) {
        const isTemplateElement = blockId && blockId.startsWith('template-');
        
        return [
            {
                name: 'delete',
                label: 'Delete',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="14" height="14"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>',
                action: `settings.deleteBlock('${blockId}')`,
                style: 'background: #ef4444; color: white;'
            },
            {
                name: 'duplicate',
                label: 'Duplicate',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="14" height="14"><path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/></svg>',
                action: `settings.duplicateBlock('${blockId}')`,
                style: 'background: #3b82f6; color: white;',
                disabled: isTemplateElement
            }
        ];
    }

    /**
     * Get project settings configuration
     * @returns {Object} Project settings object
     */
    static getProjectSettings() {
        const settings = localStorage.getItem('alpineblocks-project-settings');
        return settings ? JSON.parse(settings) : {
            type: 'digital', // 'digital' or 'print'
            printMaxHeight: '297mm', // A4 height default
            printOrientation: 'portrait', // 'portrait' or 'landscape'
            exportFormat: 'html' // 'html', 'pdf', etc.
        };
    }

    /**
     * Save project settings to localStorage
     * @param {Object} settings - Project settings to save
     */
    static saveProjectSettings(settings) {
        localStorage.setItem('alpineblocks-project-settings', JSON.stringify(settings));
        
        // Dispatch event for UI updates
        document.dispatchEvent(new CustomEvent('project-settings-changed', { 
            detail: { settings } 
        }));
    }

    /**
     * Update a single project setting
     * @param {string} key - Setting key
     * @param {*} value - Setting value
     */
    updateProjectSetting(key, value) {
        const settings = Settings.getProjectSettings();
        settings[key] = value;
        Settings.saveProjectSettings(settings);
    }
}
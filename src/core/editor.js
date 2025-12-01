import { ToolManager } from "./editor_modules/ToolManager";
import { BlockManager } from "./editor_modules/BlockManager";
import { InlineToolbar } from "./editor_modules/InlineToolbar";
import { HistoryManager } from "./HistoryManager";
import { HeaderToolbar } from "./HeaderToolbar";
import { Debug } from "./utils/Debug";

import { generateId } from '../utils/generateId.js';

/**
 * Main editor class that coordinates all editor functionality
 * Manages tools, blocks, and user interactions
 */

export class Editor {
    constructor(toolConfig, log_level = 2, historySize = 30) {
        this.id = '';
        this.log_level = log_level;

        this.tools = [];
        this.selectedBlock = null;
        this.hoveredTarget = {};
        this.toolConfig = toolConfig;
        this.dragThrottle = null;
        this.dragLeaveTimeout = null;
        this.deleteConfirmation = {
            show: false,
            blockId: null
        };

        this.toolManager = new ToolManager(toolConfig);
        this.blockManager = new BlockManager();
        this.inlineToolbar = new InlineToolbar();
        this.historyManager = new HistoryManager(this, historySize);
        this.headerToolbar = null; // Will be initialized after editor ID is set
        
        // Debounced state saving for property updates
        this.debouncedSaveState = this.debounce(() => {
            this.saveState('Updated block properties');
        }, 1000); // Save after 1 second of inactivity
    }

    /**
     * Initialize the editor with Alpine.js integration
     */
    init() {
        Debug.info('Block editor initialized');

        this.id = this.$el.id;

        if (!this.id) {
            Debug.error('Editor element must have an ID attribute');
            return;
        }

        window.alpineEditors = window.alpineEditors || {};
        window.alpineEditors[this.id] = this;
        
        Debug.debug('Editor registered with ID:', this.id);
        Debug.debug('Available editors:', Object.keys(window.alpineEditors));

        // Initialize header toolbar now that we have the ID
        this.headerToolbar = new HeaderToolbar(this.id);
        this.headerToolbar.init();

        this.toolManager.loadTools();
        
        // Only initialize a default block if toolConfig is available
        if (this.toolConfig && this.toolConfig['Paragraph']) {
            this.initBlock('Paragraph', true);
        }

        this.inlineToolbar.init(this);

        // Generate the delete confirmation modal
        this.generateModal();

        // Listen for confirm delete events
        window.addEventListener('confirm-delete-block', (e) => {
            this.confirmDeleteBlock(e.detail.blockId);
        });

        // Set up keyboard shortcuts
        this.setupKeyboardShortcuts();

        this.$nextTick(() => {
            // Log build info for debugging
            const buildId = 'AB-2025-01-17-002';
            console.log(`AlpineBlocks Editor initialized - Build: ${buildId}, Editor ID: ${this.id}`);
            console.log('Available methods:', {
                undo: typeof this.undo,
                redo: typeof this.redo,
                toggleCollapse: typeof this.toggleCollapse,
                preview: typeof this.preview,
                canUndo: typeof this.canUndo,
                canRedo: typeof this.canRedo
            });
            
            this.$dispatch('editor-ready', { id: this.id, buildId });
            // Also dispatch globally
            document.dispatchEvent(new CustomEvent('editor-ready', {
                detail: { id: this.id, buildId }
            }));
        });
    }

    /**
     * Set up keyboard shortcuts for undo/redo
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when this editor is active
            if (this.id && document.querySelector(`#${this.id}:focus-within`)) {
                if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                    e.preventDefault();
                    this.undo();
                } else if (((e.ctrlKey || e.metaKey) && e.key === 'y') || 
                          ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')) {
                    e.preventDefault();
                    this.redo();
                }
            }
        });
    }

    /**
     * Undo the last action
     * @returns {boolean} Whether undo was successful
     */
    undo() {
        return this.historyManager.undo();
    }

    /**
     * Redo the next action
     * @returns {boolean} Whether redo was successful
     */
    redo() {
        return this.historyManager.redo();
    }

    /**
     * Check if undo is available
     * @returns {boolean} Whether undo is possible
     */
    canUndo() {
        return this.historyManager.canUndo();
    }

    /**
     * Check if redo is available
     * @returns {boolean} Whether redo is possible
     */
    canRedo() {
        return this.historyManager.canRedo();
    }

    /**
     * Save current state to history
     * @param {string} action - Description of the action
     */
    saveState(action) {
        this.historyManager.saveState(action);
    }

    /**
     * Get history status for UI updates
     * @returns {Object} History status
     */
    getHistoryStatus() {
        return this.historyManager.getStatus();
    }

    /**
     * Toggle collapsed state - removes/adds editor padding and borders
     * @returns {boolean} New collapsed state
     */
    toggleCollapse() {
        if (this.headerToolbar) {
            this.headerToolbar.toggleCollapse();
            return this.headerToolbar.isCollapsed;
        }
        return false;
    }

    /**
     * Trigger preview mode
     * @returns {Object} Preview data with content and JSON
     */
    preview() {
        if (this.headerToolbar) {
            this.headerToolbar.handlePreview();
            return {
                content: this.getCleanContent ? this.getCleanContent() : this.getEditorContent(),
                json: this.blocksJSON()
            };
        }
        return null;
    }

    /**
     * Debounce utility function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Get available tools for the toolbar
     * @returns {Array} Array of tool configurations
     */
    getToolbar() {
        return this.toolManager.getTools();
    }

    /**
     * Get header toolbar HTML
     * @returns {string} HTML string for the header toolbar
     */
    getHeaderToolbar() {
        if (!this.headerToolbar) {
            return '<div class="header-toolbar"><!-- Header toolbar not yet initialized --></div>';
        }
        return this.headerToolbar.render();
    }

    /**
     * Get all blocks in the editor
     * @returns {Array} Array of block instances
     */
    get blocks() {
        return this.blockManager.blocks;
    }

    /**
     * Export blocks as JSON
     * @param {boolean} pretty - Whether to format for HTML display
     * @returns {string} JSON string of blocks
     */
    blocksJSON(pretty = false) {
        const blocksData = this.blocks.map((block) => {
            // Use the preserved class name if available, otherwise extract from constructor name
            let className = block.class || block.constructor.name;
            
            // If we get a bundled class name, try to extract the real name
            if (className.includes('$var$')) {
                const match = className.match(/\$var\$(\w+)$/);
                if (match) {
                    className = match[1];
                }
            }
            
            // Debug: check block content before serialization
            if (className === 'Raw') {
                // console.log('Serializing Raw block:', {
                //     blockId: block.id,
                //     hasContent: !!block.config.content,
                //     contentStart: block.config.content?.substring(0, 50),
                //     hasHTML: block.config.content?.includes('<')
                // });
            }
            
            const serializedConfig = this.serializeBlockConfig(block.config);
            
            // Debug: check serialized content
            if (className === 'Raw') {
                // console.log('Serialized Raw config:', {
                //     original: block.config.content?.substring(0, 50),
                //     serialized: serializedConfig.content?.substring(0, 50),
                //     hasHTML: serializedConfig.content?.includes('<')
                // });
            }
            
            return {
                id: block.id,
                class: className,
                data: serializedConfig
            };
        });

        const data = JSON.stringify(blocksData, null, 2);

        if (pretty) {
            return data.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
        }

        return data;
    }

    /**
     * Serialize block config without circular references
     * @param {Object} config - The configuration to serialize
     * @returns {Object} Clean configuration object
     */
    serializeBlockConfig(config) {
        
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
                // Handle arrays (like columns with nested blocks)
                serialized[key] = value.map((item, index) => {
                    
                    if (item && typeof item === 'object') {
                        // For nested blocks, only include serializable properties
                        if (item.id && item.config) {
                            
                            // Use the preserved class name if available, otherwise extract from constructor name
                            let className = item.class || (item.constructor && item.constructor.name) || 'Unknown';
                            
                            // Handle bundled class names - check both class property and constructor name
                            if (className.includes('$var$')) {
                                const match = className.match(/\$var\$(\w+)$/);
                                if (match) {
                                    className = match[1];
                                }
                            } else if (item.constructor && item.constructor.name && item.constructor.name.includes('$var$')) {
                                // Handle case where class property is clean but constructor name is bundled
                                const match = item.constructor.name.match(/\$var\$(\w+)$/);
                                if (match) {
                                    className = match[1];
                                }
                            }
                            
                            const serializedBlock = {
                                id: item.id,
                                class: className,
                                config: this.serializeBlockConfig(item.config)
                            };
                            
                            return serializedBlock;
                        }
                        // For other objects, recursively serialize
                        return this.serializeBlockConfig(item);
                    }
                    return item;
                });
            } else if (value && typeof value === 'object') {
                // Recursively serialize nested objects
                serialized[key] = this.serializeBlockConfig(value);
            } else {
                // Primitive values
                serialized[key] = value;
            }
        }
        return serialized;
    }

    /**
     * Get the currently selected block
     * @returns {Object|null} Selected block instance
     */
    getCurrentSelectedBlock() {
        return this.selectedBlock;
    }

    /**
     * Get rendered content of all blocks
     * @returns {string} HTML string of all blocks
     */
    getEditorContent() {
        return this.blockManager.renderBlocks();
    }

    getCleanContent() {
        return this.blockManager.renderCleanBlocks();
    }

    /**
     * Get settings for a specific block (including nested blocks)
     * @param {string} blockId - ID of the block (may be composite for nested blocks)
     * @returns {Array|null} Array of settings or null if not found
     */
    getSettings(blockId) {
        if (!blockId) {
            return null;
        }
        
        // Check if this is a template element (format: template-toolId)
        if (blockId.startsWith('template-')) {
            return this.getTemplateElementSettings(blockId);
        }
        
        // Check if this is a nested block (format: parentId::nestedId)
        if (blockId.includes('::')) {
            const [parentId, nestedId] = blockId.split('::');
            
            const parentBlock = this.blockManager.blocks.find(b => b.id === parentId);
            
            if (parentBlock && typeof parentBlock.getNestedBlockSettings === 'function') {
                const nestedSettings = parentBlock.getNestedBlockSettings(nestedId);
                return nestedSettings;
            }
        }
        
        // Regular top-level block
        const block = this.blockManager.blocks.find(b => b.id === blockId);
        const settings = block ? block.settings : null;
        return settings;
    }

    /**
     * Get settings for template elements
     * @param {string} virtualBlockId - Virtual block ID for template element
     * @returns {Array|null} Array of settings or null if not found
     */
    getTemplateElementSettings(virtualBlockId) {
        const templateMap = window.templateElementMap;
        
        if (!templateMap) {
            return null;
        }
        
        if (!templateMap[virtualBlockId]) {
            return null;
        }
        
        const { element, toolType, toolInstance } = templateMap[virtualBlockId];
        
        // If we already have a tool instance, return its settings
        if (toolInstance && toolInstance.settings) {
            return toolInstance.settings;
        }
        
        // Create a tool instance for this template element
        const toolConfig = this.toolConfig[toolType];
        
        if (!toolConfig || !toolConfig.class) {
            return null;
        }
        
        // Extract current values from the element
        const config = this.extractElementConfig(toolType, element);
        
        // Create tool instance
        const ToolClass = toolConfig.class;
        const tool = new ToolClass({
            id: virtualBlockId,
            updateFunction: (property, value) => {
                // Update the actual element when properties change
                this.updateTemplateElement(element, toolType, property, value);
            },
            config: config
        });
        
        // Store the tool instance for future use
        templateMap[virtualBlockId].toolInstance = tool;
        
        return tool.settings || null;
    }

    /**
     * Extract configuration from a DOM element based on tool type
     * @param {string} toolType - Type of tool
     * @param {Element} element - DOM element
     * @returns {Object} Configuration object
     */
    extractElementConfig(toolType, element) {
        const config = {};
        
        switch(toolType) {
            case 'Header':
                config.content = element.textContent || '';
                config.level = element.tagName.toLowerCase().replace('h', '') || '1';
                break;
                
            case 'Paragraph':
                config.content = element.innerHTML || '';
                break;
                
            case 'Image':
                config.src = element.src || '';
                config.alt = element.alt || '';
                config.caption = element.getAttribute('data-caption') || '';
                break;
                
            case 'Button':
                config.text = element.textContent || '';
                config.url = element.href || '#';
                config.style = element.className || 'primary';
                break;
                
            default:
                // For other tools, try to extract common properties
                if (element.textContent) {
                    config.content = element.textContent;
                }
                break;
        }
        
        return config;
    }
    
    /**
     * Update a template element when properties change
     * @param {Element} element - DOM element to update
     * @param {string} toolType - Type of tool
     * @param {string} property - Property name
     * @param {any} value - New value
     */
    updateTemplateElement(element, toolType, property, value) {
        // Get the tool instance from the template map
        const toolId = element.getAttribute('data-tool-id');
        const virtualBlockId = `template-${toolId}`;
        const templateMap = window.templateElementMap;
        
        if (!templateMap || !templateMap[virtualBlockId] || !templateMap[virtualBlockId].toolInstance) {
            return;
        }
        
        const tool = templateMap[virtualBlockId].toolInstance;
        
        // Update the tool's config
        tool.config[property] = value;
        
        // Check if the tool has a renderTemplateElement method
        if (typeof tool.renderTemplateElement === 'function') {
            // Get fresh HTML from the tool
            const newHtml = tool.renderTemplateElement(toolId);
            
            // Create a temporary container to parse the HTML
            const temp = document.createElement('div');
            temp.innerHTML = newHtml;
            const newElement = temp.firstElementChild;
            
            if (newElement) {
                // Replace the old element with the new one
                element.replaceWith(newElement);
                
                // Update the element reference in the template map
                templateMap[virtualBlockId].element = newElement;
                
                // Re-attach click handler
                this.attachTemplateClickHandler(newElement, toolType, toolId);
                
                // Use the new element for syncing
                element = newElement;
            }
        } else {
            // Fallback to manual property updates for tools without renderTemplateElement
            switch(toolType) {
                case 'Header':
                    if (property === 'content') {
                        element.textContent = value;
                    } else if (property === 'level') {
                        // Create new header element with correct level
                        const newTag = `h${value}`;
                        const newElement = document.createElement(newTag);
                        newElement.textContent = element.textContent;
                        // Copy attributes
                        Array.from(element.attributes).forEach(attr => {
                            newElement.setAttribute(attr.name, attr.value);
                        });
                        element.replaceWith(newElement);
                        element = newElement;
                    }
                    break;
                    
                case 'Paragraph':
                    if (property === 'content') {
                        element.innerHTML = value;
                    }
                    break;
                    
                case 'Button':
                    if (property === 'text') {
                        element.textContent = value;
                    } else if (property === 'url') {
                        element.href = value;
                    } else if (property === 'style') {
                        element.className = value;
                    }
                    break;
            }
        }
        
        // Sync changes back to the Raw block
        this.syncTemplateToRawBlock(element);
    }
    
    /**
     * Attach click handler to a template element
     * @param {Element} element - DOM element
     * @param {string} toolType - Type of tool
     * @param {string} toolId - Tool ID
     */
    attachTemplateClickHandler(element, toolType, toolId) {
        element.style.cursor = 'pointer';
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            const virtualBlockId = `template-${toolId}`;
            
            // Update element mapping
            window.templateElementMap = window.templateElementMap || {};
            window.templateElementMap[virtualBlockId] = {
                ...window.templateElementMap[virtualBlockId],
                element: element,
                toolType: toolType
            };
            
            // Trigger property panel update
            this.setActive(null, virtualBlockId);
        });
    }
    
    /**
     * Sync template element changes back to the Raw block content
     * @param {Element} element - Modified element
     */
    syncTemplateToRawBlock(element) {
        const previewContainer = element.closest('[x-ref="previewContainer"]');
        if (previewContainer) {
            const rawBlock = previewContainer.closest('.raw-block');
            if (rawBlock) {
                const blockId = rawBlock.getAttribute('data-block-id');
                const block = this.blockManager.blocks.find(b => b.id === blockId);
                if (block) {
                    block.config.content = previewContainer.innerHTML;
                    // Also update the textarea if it exists
                    const textarea = rawBlock.querySelector('.code-input');
                    if (textarea) {
                        textarea.value = previewContainer.innerHTML;
                    }
                }
            }
        }
    }



    /**
     * Handle drag over events for blocks
     * @param {Event} event - Drag event
     * @param {string} blockId - ID of the target block
     */
    handleDragOver(event, blockId) {
        event.preventDefault();
        
        if (this.dragLeaveTimeout) {
            clearTimeout(this.dragLeaveTimeout);
            this.dragLeaveTimeout = null;
        }
        
        if (this.dragThrottle) {
            clearTimeout(this.dragThrottle);
        }
        
        this.dragThrottle = setTimeout(() => {
            const dropTarget = event.currentTarget;
            const rect = dropTarget.getBoundingClientRect();
            const relY = event.clientY - rect.top;
            
            const position = relY < (rect.height * 0.4) ? 'top' : 'bottom';
            
            if (this.hoveredTarget[blockId] !== position) {
                this.hoveredTarget[blockId] = position;
            }
        }, 10);
    }

    /**
     * Handle drag leave events for blocks
     * @param {Event} event - Drag event
     * @param {string} blockId - ID of the target block
     */
    handleDragLeave(event, blockId) {
        const dropTarget = event.currentTarget;
        const relatedTarget = event.relatedTarget;
        
        if (!relatedTarget || !dropTarget.contains(relatedTarget)) {
            if (this.dragLeaveTimeout) {
                clearTimeout(this.dragLeaveTimeout);
            }
            
            this.dragLeaveTimeout = setTimeout(() => {
                if (this.hoveredTarget[blockId]) {
                    delete this.hoveredTarget[blockId];
                }
                this.dragLeaveTimeout = null;
            }, 100);
        }
    }

    /**
     * Create a new block instance
     * @param {string} blockName - Name of the block type
     * @param {boolean} push - Whether to add to blocks array
     * @param {string} existingId - Optional existing ID to use instead of generating new one
     * @returns {Object} New block instance
     */
    initBlock(blockName, push = false, existingId = null) {

        if (!this.toolConfig || !this.toolConfig[blockName]) {
            Debug.error(`Tool configuration for ${blockName} not found`);
            return null;
        }

        const BlockClass = this.toolConfig[blockName].class;

        const config = JSON.parse(JSON.stringify(this.toolConfig[blockName].config));

        console.log('[Editor initBlock] Initial config for', blockName, ':', config);
        console.log('[Editor initBlock] window.templateDragData:', window.templateDragData);

        // Check for template drag data and merge it into config
        if (window.templateDragData && window.templateDragData.type === blockName) {
            console.log('[Editor initBlock] Merging template drag data:', window.templateDragData.config);
            Object.assign(config, window.templateDragData.config);
            console.log('[Editor initBlock] Config after merge:', config);
            // Clear the template drag data after use
            window.templateDragData = null;
        } else {
            console.log('[Editor initBlock] No template drag data to merge');
        }

        const newBlock = new BlockClass({
            id: existingId || generateId(),
            updateFunction: this.updateFunction.bind(this),
            config: config
        });


        // Preserve the clean class name
        newBlock.class = blockName;


        newBlock.init(this);


        if (push) {
            this.blocks.push(newBlock);
        }

        return newBlock;
    }

    /**
     * Handle drop events for blocks
     * @param {Event} event - Drop event
     * @param {string} position - Drop position
     * @param {string|null} blockId - ID of target block
     */
    async handleDrop(event, position = 'end', blockId = null) {
        event.preventDefault();

        this.clearDragTimeouts();

        const dragData = event.dataTransfer.getData('text/plain');

        // Check if this is a template drop
        let isTemplate = false;
        let templateData = null;
        try {
            const parsed = JSON.parse(dragData);
            if (parsed.type === 'template' && parsed.data) {
                isTemplate = true;
                templateData = parsed.data;
            }
        } catch (e) {
            // Not JSON, treat as regular block name
        }

        if (isTemplate && templateData) {
            // Check if this is a lazy template that needs loading
            if (templateData._templateRef) {
                // Get the template reference from global storage
                const template = window._alpineTemplates?.draggedTemplate;

                if (template) {
                    console.log('[Editor] Loading lazy template:', template.id);

                    // Load template if not already loaded
                    if (!template.html && template.loadContent) {
                        console.log('[Editor] Template not loaded yet, loading now...');
                        await template.loadContent();
                    }

                    // Extract blocks now that template is loaded
                    const blocks = template.extractBlocks();
                    console.log('[Editor] Extracted blocks:', blocks.length);

                    // Update templateData with blocks
                    templateData = {
                        id: template.id,
                        name: template.name,
                        description: template.description,
                        blocks: blocks
                    };
                } else {
                    console.warn('[Editor] Template reference not found in window._alpineTemplates');
                }
            }

            // Handle template drop (now with blocks loaded)
            this.handleTemplateDrop(templateData, blockId);
        } else {
            // Handle regular block drop
            const blockName = dragData;
            const newBlock = this.initBlock(blockName);

            if (!newBlock) {
                Debug.error(`Failed to create block of type ${blockName}`);
                return;
            }

            if (blockId) {
                const index = this.blocks.findIndex(b => b.id === blockId);
                const insertPosition = this.hoveredTarget[blockId] === 'top' ? 'before' : 'after';
                delete this.hoveredTarget[blockId];

                if (insertPosition === 'before') {
                    this.blocks.splice(index, 0, newBlock);
                } else {
                    this.blocks.splice(index + 1, 0, newBlock);
                }
            } else {
                this.blocks.push(newBlock);
            }

            this.$dispatch('editor-drop', { id: this.id });
            this.setActive(null, newBlock.id);
            this.saveState(`Added ${blockName} block`);
        }
    }

    /**
     * Handle template drop specifically
     * @param {Object} template - Template object from Layout
     * @param {string|null} blockId - ID of target block
     */
    handleTemplateDrop(template, blockId = null) {
        try {
            console.log('[Editor] handleTemplateDrop called with template:', template);
            // Use pre-extracted blocks from the drag data
            const blocks = template.blocks;
            console.log('[Editor] Template blocks:', blocks);

            if (!blocks || blocks.length === 0) {
                Debug.warn(`Template ${template.name} has no blocks to add`);
                return;
            }

            const newBlocks = [];

            // Create blocks for each template block
            for (const blockData of blocks) {
                console.log('[Editor] Processing block data:', blockData);
                // Map template block types to AlpineBlocks tool names
                const toolName = this.mapTemplateBlockToTool(blockData.type);
                console.log('[Editor] Mapped to tool:', toolName);

                if (!toolName || !this.toolConfig[toolName]) {
                    Debug.warn(`Tool ${toolName} not found for template block type ${blockData.type}`);
                    continue;
                }

                // For template blocks, we need to merge config before initialization
                // So we'll create the block without initializing it first
                const BlockClass = this.toolConfig[toolName].class;
                const baseConfig = JSON.parse(JSON.stringify(this.toolConfig[toolName].config));
                const mergedConfig = Object.assign(baseConfig, blockData.data || {});
                console.log('[Editor] Merged config for', toolName, ':', mergedConfig);
                
                
                const newBlock = new BlockClass({
                    id: generateId(),
                    updateFunction: this.updateFunction.bind(this),
                    config: mergedConfig
                });
                
                // Preserve the clean class name
                newBlock.class = toolName;
                
                // Now initialize with the merged config
                newBlock.init(this);
                
                
                if (newBlock && blockData.data) {
                    // Handle Columns blocks specially - they need nested blocks
                    if (blockData.type === 'columns' && blockData.data.columns) {
                        const columns = blockData.data.columns;
                        
                        // Process nested blocks for each column
                        for (let i = 0; i < columns.length; i++) {
                            const column = columns[i];
                            if (column.blocks && Array.isArray(column.blocks)) {
                                const processedNestedBlocks = [];
                                
                                for (const nestedBlockData of column.blocks) {
                                    const nestedToolName = this.mapTemplateBlockToTool(nestedBlockData.type);
                                    if (nestedToolName && this.toolConfig[nestedToolName]) {
                                        // Create nested block with merged config
                                        const NestedBlockClass = this.toolConfig[nestedToolName].class;
                                        const nestedBaseConfig = JSON.parse(JSON.stringify(this.toolConfig[nestedToolName].config));
                                        const nestedMergedConfig = Object.assign(nestedBaseConfig, nestedBlockData.data || {});
                                        
                                        const nestedBlock = new NestedBlockClass({
                                            id: generateId(),
                                            updateFunction: this.updateFunction.bind(this),
                                            config: nestedMergedConfig
                                        });
                                        
                                        nestedBlock.class = nestedToolName;
                                        nestedBlock.init(this);
                                        
                                        if (nestedBlock) {
                                            processedNestedBlocks.push(nestedBlock);
                                        }
                                    }
                                }
                                
                                // Update the column with processed nested blocks
                                columns[i] = {
                                    ...column,
                                    blocks: processedNestedBlocks
                                };
                            }
                        }
                        
                        // Apply the processed columns configuration
                        newBlock.config.columns = columns;
                    }
                    // Note: regular block config is already applied before initialization
                }
                
                if (newBlock) {
                    newBlocks.push(newBlock);
                }
            }
            
            if (newBlocks.length === 0) {
                Debug.warn(`No valid blocks created from template ${template.name}`);
                return;
            }

            // Add blocks to editor
            if (blockId) {
                const index = this.blocks.findIndex(b => b.id === blockId);
                const insertPosition = this.hoveredTarget[blockId] === 'top' ? 'before' : 'after';
                delete this.hoveredTarget[blockId];
                
                const insertIndex = insertPosition === 'before' ? index : index + 1;
                
                // Insert all template blocks at the target position
                this.blocks.splice(insertIndex, 0, ...newBlocks);
            } else {
                this.blocks.push(...newBlocks);
            }

            this.$dispatch('editor-drop', { id: this.id });
            
            // Select the first block of the template
            if (newBlocks.length > 0) {
                this.setActive(null, newBlocks[0].id);
            }
            
            this.saveState(`Added template: ${template.name}`);
            
        } catch (error) {
            Debug.error(`Error handling template drop for ${template.name}:`, error);
        }
    }

    /**
     * Map template block types to AlpineBlocks tool names
     * @param {string} blockType - Template block type
     * @returns {string|null} Tool name
     */
    mapTemplateBlockToTool(blockType) {
        const mapping = {
            'paragraph': 'Paragraph',
            'header': 'Header',
            'image': 'Image',
            'quote': 'Quote',
            'list': 'List',
            'button': 'Button',
            'code': 'Code',
            'alert': 'Alert',
            'video': 'VideoPlayer',
            'audio': 'AudioPlayer',
            'carousel': 'Carousel',
            'columns': 'Columns',
            'raw': 'Raw',
            'wysiwyg': 'WYSIWYG'
        };
        
        return mapping[blockType.toLowerCase()] || null;
    }

    /**
     * Clear all drag-related timeouts
     */
    clearDragTimeouts() {
        if (this.dragThrottle) {
            clearTimeout(this.dragThrottle);
            this.dragThrottle = null;
        }
        if (this.dragLeaveTimeout) {
            clearTimeout(this.dragLeaveTimeout);
            this.dragLeaveTimeout = null;
        }
    }

    /**
     * Clean up when component is destroyed
     */
    destroy() {
        this.clearDragTimeouts();
        this.hoveredTarget = {};
    }

    /**
     * Update a block's configuration
     * @param {string} id - Block ID
     * @param {Object} config - New configuration
     */
    updateFunction(id, config) {
        
        const block = this.blockManager.blocks.find(b => b.id === id);
        
        if (block) {
            // Merge config while preserving Tool instances in arrays
            this.mergeConfigPreservingToolInstances(block.config, config);
            
            this.$dispatch('editor-updated', { id: this.id });
            
            // Use debounced save for property updates
            this.debouncedSaveState();
        }
    }

    /**
     * Merge config while preserving Tool instances in arrays
     * @param {Object} target - Target config to update
     * @param {Object} source - Source config with updates
     */
    mergeConfigPreservingToolInstances(target, source) {
        
        for (const [key, value] of Object.entries(source)) {
            
            if (Array.isArray(value) && Array.isArray(target[key])) {
                
                // For arrays, preserve existing Tool instances where possible
                value.forEach((item, index) => {
                    
                    if (item && typeof item === 'object' && item.id) {
                        
                        // Find existing Tool instance with same ID
                        const existingTool = target[key].find(t => t && t.id === item.id);
                        
                        if (existingTool && typeof existingTool.serializeConfig === 'function') {
                            // Update the existing Tool instance's config instead of replacing it
                            this.mergeConfigPreservingToolInstances(existingTool.config, item.config || {});
                            // Don't replace the Tool instance
                            return;
                        } else {
                        }
                    }
                    // For non-Tool items or new items, just assign
                    target[key][index] = value[index];
                });
                
                // Handle array length changes
                if (value.length !== target[key].length) {
                    target[key].length = value.length;
                }
            } else if (value && typeof value === 'object' && !Array.isArray(value)) {
                // For nested objects, recurse
                if (!target[key] || typeof target[key] !== 'object') {
                    target[key] = {};
                }
                this.mergeConfigPreservingToolInstances(target[key], value);
            } else {
                // For primitive values, just assign
                target[key] = value;
            }
        }
    }

    /**
     * Set the active block (supports nested blocks)
     * @param {Event|null} event - Event that triggered the change
     * @param {string} block - Block ID to set as active (may be composite for nested blocks)
     */
    setActive(event, block) {
        if (this.selectedBlock === block) return;

        this.selectedBlock = block;
        Debug.debug(`Block changed: ${block}`);

        this.$nextTick(() => {
            this.$dispatch('editor-block-changed', { block_id: block });
            // Also dispatch globally for settings panel
            document.dispatchEvent(new CustomEvent('editor-block-changed', { 
                detail: { block_id: block } 
            }));
        });
    }

    /**
     * Show delete confirmation modal
     * @param {string} blockId - ID of block to delete
     */
    showDeleteConfirmation(blockId) {
        this.deleteConfirmation.blockId = blockId;
        this.deleteConfirmation.show = true;
        Debug.debug(`Delete confirmation shown for block: ${blockId}`);
    }

    /**
     * Confirm and delete the block
     */
    confirmDeleteBlock(blockId) {
        if (!blockId) return;

        const blockIndex = this.blocks.findIndex(b => b.id === blockId);
        
        if (blockIndex !== -1) {
            // Remove the block
            this.blocks.splice(blockIndex, 1);
            
            // Clear selection if deleted block was selected
            if (this.selectedBlock === blockId) {
                this.selectedBlock = null;
                this.$dispatch('editor-block-changed', { block_id: null });
                // Also dispatch globally for settings panel
                document.dispatchEvent(new CustomEvent('editor-block-changed', { 
                    detail: { block_id: null } 
                }));
            }
            
            Debug.info(`Block deleted: ${blockId}`);
            this.$dispatch('editor-updated', { id: this.id });
            this.saveState('Deleted block');
        }

        // Hide modal
        window.dispatchEvent(new CustomEvent('hide-delete-confirmation'));
    }

    /**
     * Generate and inject the delete confirmation modal
     */
    generateModal() {
        // Only generate modal if it doesn't exist
        if (document.querySelector('.modal-overlay')) {
            return;
        }

        // Create modal HTML
        const modalHTML = `
        <div class="modal-overlay" 
            x-data="{ 
                show: false, 
                blockId: null,
                title: 'Remove Block',
                description: 'Are you sure you want to remove this block? This action cannot be undone.',
                init() {
                    window.addEventListener('show-delete-confirmation', (e) => {
                        this.blockId = e.detail.blockId;
                        this.title = e.detail.title || 'Remove Block';
                        this.description = e.detail.description || 'Are you sure you want to remove this block? This action cannot be undone.';
                        this.show = true;
                    });
                    window.addEventListener('hide-delete-confirmation', () => {
                        this.show = false;
                        this.blockId = null;
                        this.title = 'Remove Block';
                        this.description = 'Are you sure you want to remove this block? This action cannot be undone.';
                    });
                },
            }" 
            x-show="show" 
            @click="show = false"
            x-cloak>
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <svg class="modal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                    <h3 class="modal-title" x-text="title"></h3>
                </div>
                <p class="modal-description" x-text="description"></p>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-cancel" @click="show = false">
                        Cancel
                    </button>
                    <button class="modal-btn modal-btn-confirm" 
                            @click="
                                window.dispatchEvent(new CustomEvent('confirm-delete-block', { detail: { blockId: blockId } }));
                                show = false;
                                blockId = null;
                            ">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    `;

        // Inject modal into body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        Debug.info('Delete confirmation modal generated and injected');
        
        // Generate input modal as well
        this.generateInputModal();
    }

    /**
     * Generate and inject the input modal for page operations
     */
    generateInputModal() {
        // Only generate modal if it doesn't exist
        if (document.querySelector('.input-modal-overlay')) {
            return;
        }

        // Create input modal HTML
        const inputModalHTML = `
        <div class="input-modal-overlay" 
            x-data="{ 
                show: false, 
                title: 'Input Required',
                placeholder: 'Enter value',
                inputValue: '',
                confirmText: 'Confirm',
                cancelText: 'Cancel',
                eventType: '',
                eventData: {},
                iconType: 'edit',
                init() {
                    window.addEventListener('show-input-modal', (e) => {
                        this.title = e.detail.title || 'Input Required';
                        this.placeholder = e.detail.placeholder || 'Enter value';
                        this.inputValue = e.detail.defaultValue || '';
                        this.confirmText = e.detail.confirmText || 'Confirm';
                        this.cancelText = e.detail.cancelText || 'Cancel';
                        this.eventType = e.detail.eventType || '';
                        this.eventData = e.detail.eventData || {};
                        this.iconType = e.detail.iconType || 'edit';
                        this.show = true;
                        // Focus input after modal shows
                        this.$nextTick(() => {
                            this.$refs.modalInput?.focus();
                        });
                    });
                    window.addEventListener('hide-input-modal', () => {
                        this.show = false;
                        this.inputValue = '';
                        this.eventType = '';
                        this.eventData = {};
                    });
                },
                handleConfirm() {
                    if (this.inputValue.trim()) {
                        window.dispatchEvent(new CustomEvent(this.eventType, { 
                            detail: { 
                                ...this.eventData,
                                inputValue: this.inputValue.trim()
                            } 
                        }));
                        this.show = false;
                        this.inputValue = '';
                    }
                },
                handleKeydown(event) {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        this.handleConfirm();
                    } else if (event.key === 'Escape') {
                        event.preventDefault();
                        this.show = false;
                        this.inputValue = '';
                    }
                }
            }" 
            x-show="show" 
            @click="show = false"
            x-cloak>
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <!-- Edit Icon -->
                    <svg x-show="iconType === 'edit'" class="modal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                    </svg>
                    <!-- Plus Icon -->
                    <svg x-show="iconType === 'add'" class="modal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                    </svg>
                    <h3 class="modal-title" x-text="title"></h3>
                </div>
                <div class="modal-input-section">
                    <input 
                        type="text" 
                        class="modal-input" 
                        x-model="inputValue"
                        :placeholder="placeholder"
                        @keydown="handleKeydown($event)"
                        x-ref="modalInput"
                    />
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-cancel" @click="show = false" x-text="cancelText">
                    </button>
                    <button class="modal-btn modal-btn-confirm" 
                            @click="handleConfirm()"
                            :disabled="!inputValue.trim()"
                            x-text="confirmText">
                    </button>
                </div>
            </div>
        </div>
    `;

        // Inject modal into body
        document.body.insertAdjacentHTML('beforeend', inputModalHTML);
        
        Debug.info('Input modal generated and injected');
    }

    /**
     * Log messages based on log level (deprecated - use Debug utility)
     * @param {string} message - Message to log
     * @param {number} level - Log level (1-3)
     * @deprecated Use Debug utility instead
     */
    log(message, level = 1) {
        if (level > this.log_level) return;
        Debug.log(message);
    }
}
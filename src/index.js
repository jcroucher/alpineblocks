import Alpine from 'alpinejs';

window.Alpine = Alpine;

import { Editor } from './core/editor';
import { Toolbar } from './core/Toolbar';
import { Settings } from './core/Settings';
import { HeaderToolbar } from './core/HeaderToolbar';
import { CommonEditorToolbar } from './core/CommonEditorToolbar';
import { Debug } from './core/utils/Debug';
import Layout from './core/Layout.js';
import LayoutManager from './core/LayoutManager.js';
import { MediaPicker } from './core/MediaPicker.js';

/**
 * AlpineBlocks - A lightweight block-based content editor built with Alpine.js
 * 
 * This is the main entry point that sets up the editor, toolbar, and settings
 * components, and dynamically imports all available tools.
 */

// Import all tools directly to ensure they're available
import Paragraph from './tools/Paragraph';
import Header from './tools/Header';
import List from './tools/List';
import Code from './tools/Code';
import Image from './tools/Image';
import Quote from './tools/Quote';
import WYSIWYG from './tools/WYSIWYG';
import Alert from './tools/Alert';
import VideoPlayer from './tools/VideoPlayer';
import AudioPlayer from './tools/AudioPlayer';
import Carousel from './tools/Carousel';
import Columns from './tools/Columns';
import Raw from './tools/Raw';
import Delimiter from './tools/Delimiter';
import Button from './tools/Button';

// Tool modules registry
const toolModules = {
    Paragraph,
    Header,
    List,
    Code,
    Image,
    Quote,
    WYSIWYG,
    Alert,
    VideoPlayer,
    AudioPlayer,
    Carousel,
    Columns,
    Raw,
    Delimiter,
    Button
};

/**
 * Get default tool configuration
 * @returns {Object} Default tool configuration
 */
function getDefaultToolConfig() {
    const config = {};
    
    // Add all available tools with their default configurations
    Object.entries(toolModules).forEach(([toolName, ToolClass]) => {
        try {
            // Get the default config from the tool's toolbox() method if it exists
            const toolbox = ToolClass.toolbox ? ToolClass.toolbox() : {};
            config[toolName] = {
                class: ToolClass,
                config: toolbox.config || {}
            };
            Debug.debug(`Loaded tool: ${toolName}`);
        } catch (e) {
            Debug.error(`Error loading tool ${toolName}:`, e);
        }
    });
    
    return config;
}

/**
 * Extract and parse editor configuration from DOM, with fallback to defaults
 * @returns {Object} Parsed editor configuration
 */
function getEditorConfigFromDOM() {
    const editorElement = document.querySelector('[x-data*="alpineEditor"]');
    if (!editorElement) {
        Debug.info('No editor element found, using default config');
        return { tools: getDefaultToolConfig(), media: null };
    }

    const xDataAttr = editorElement.getAttribute('x-data');
    
    // Try to parse the entire config object
    const configMatch = xDataAttr.match(/alpineEditor\(\{([\s\S]*?)\}\)/);
    if (!configMatch) {
        Debug.info('No config found in DOM, using default config');
        return { tools: getDefaultToolConfig(), media: null };
    }

    try {
        const configStr = `{${configMatch[1]}}`;
        const fullConfig = new Function(`return ${configStr}`)();
        
        // Parse tools configuration
        const toolsConfig = fullConfig.tools || [];
        const tools = {};

        Debug.debug('toolModules keys:', Object.keys(toolModules));

        toolsConfig.forEach((tool) => {
            Debug.debug('Loading tool:', tool.class);
            
            if (toolModules[tool.class]) {
                tools[tool.class] = {
                    class: toolModules[tool.class],
                    config: tool.config || {}
                };
                Debug.debug(`Successfully loaded tool: ${tool.class}`);
            } else {
                Debug.error(`Tool ${tool.class} not found in available modules`);
            }
        });

        // If no tools were successfully parsed, fall back to defaults
        if (Object.keys(tools).length === 0) {
            Debug.info('No tools successfully parsed, using default tool config');
            return { tools: getDefaultToolConfig(), media: fullConfig.media || null };
        }

        return { tools, media: fullConfig.media || null };
    } catch (e) {
        Debug.error('Error parsing editor configuration:', e);
        Debug.info('Using default config as fallback');
        return { tools: getDefaultToolConfig(), media: null };
    }
}

// Initialize Alpine with tool loading
document.addEventListener('alpine:init', () => {
    window.Alpine.data('editorToolbar', () => new Toolbar);
    window.Alpine.data('headerToolbar', (editorId) => ({
        toolbarInstance: null,
        canUndo: false,
        canRedo: false,
        
        init() {
            this.toolbarInstance = new HeaderToolbar(editorId);
            this.toolbarInstance.init();
            
            // Listen for header toolbar updates
            document.addEventListener('header-toolbar-updated', (event) => {
                if (event.detail.editorId === editorId) {
                    this.canUndo = event.detail.canUndo;
                    this.canRedo = event.detail.canRedo;
                }
            });
        },
        
        handleUndo() {
            if (this.toolbarInstance) {
                this.toolbarInstance.handleUndo();
            }
        },
        
        handleRedo() {
            if (this.toolbarInstance) {
                this.toolbarInstance.handleRedo();
            }
        },
        
        handlePreview() {
            if (this.toolbarInstance) {
                this.toolbarInstance.handlePreview();
            }
        },
        
        handleSettings() {
            if (this.toolbarInstance) {
                this.toolbarInstance.handleSettings();
            }
        }
    }));
    window.Alpine.data('editorSettings', (editorId, initialSettings) => ({
        settingsInstance: null,
        settings: initialSettings || [],
        currentBlockId: null,
        
        init() {
            // Debug: Log the editor ID and check if editor exists
            console.log('Settings initialized for editor:', editorId);
            console.log('Available editors:', Object.keys(window.alpineEditors || {}));
            
            // Wait for the editor to be ready before initializing settings
            const initializeSettings = () => {
                if (window.alpineEditors && window.alpineEditors[editorId]) {
                    this.settingsInstance = new Settings(editorId, this.settings);
                    this.settingsInstance.init();
                    console.log('Settings instance created for editor:', editorId);
                } else {
                    // Try again after a short delay
                    setTimeout(initializeSettings, 50);
                }
            };
            
            initializeSettings();
            
            // Listen for settings updates
            document.addEventListener('settings-updated', (event) => {
                if (event.detail.editorId === editorId) {
                    this.settings = event.detail.settings || [];
                    this.currentBlockId = event.detail.blockId;
                }
            });
        },
        
        trigger(blockId, property, value) {
            if (this.settingsInstance) {
                this.settingsInstance.trigger(blockId, property, value);
            }
        },
        
        doCallback(callback) {
            if (this.settingsInstance) {
                this.settingsInstance.doCallback(callback);
            }
        },
        
        deleteBlock() {
            if (!this.currentBlockId) return;
            
            // Use the existing delete confirmation system
            window.dispatchEvent(new CustomEvent('show-delete-confirmation', { 
                detail: { 
                    blockId: this.currentBlockId,
                    type: 'block',
                    title: 'Delete Block',
                    description: 'Are you sure you want to delete this block? This action cannot be undone.'
                } 
            }));
        },
        
        duplicateBlock() {
            if (!this.currentBlockId) return;
            
            // Check if this is a template element (they can't be duplicated)
            if (this.currentBlockId.startsWith('template-')) {
                alert('Template elements cannot be duplicated. Only regular blocks can be duplicated.');
                return;
            }
            
            const editorInstance = window.alpineEditors[editorId];
            if (!editorInstance) {
                console.error('Editor instance not found:', editorId);
                return;
            }
            
            // Find the block to duplicate
            const originalBlock = editorInstance.blocks.find(b => b.id === this.currentBlockId);
            if (!originalBlock) {
                console.error('Block not found:', this.currentBlockId);
                return;
            }
            
            // Get the block class name
            const blockClass = originalBlock.class || originalBlock.constructor.name;
            
            // Create a new block of the same type
            const newBlock = editorInstance.initBlock(blockClass);
            if (!newBlock) {
                console.error('Failed to create duplicate block');
                return;
            }
            
            // Copy the configuration from the original block
            const originalConfig = JSON.parse(JSON.stringify(originalBlock.config));
            // Remove any properties that shouldn't be copied
            delete originalConfig.editor;
            delete originalConfig.updateFunction;
            
            // Apply the configuration to the new block
            Object.assign(newBlock.config, originalConfig);
            
            // Find the position of the original block and insert the new block after it
            const originalIndex = editorInstance.blocks.findIndex(b => b.id === this.currentBlockId);
            if (originalIndex !== -1) {
                editorInstance.blocks.splice(originalIndex + 1, 0, newBlock);
            } else {
                // If we can't find the original block, just add to the end
                editorInstance.blocks.push(newBlock);
            }
            
            // Trigger redraw and save state
            newBlock.triggerRedraw();
            editorInstance.saveState('Duplicated block');
            
            // Dispatch events to update the UI
            document.dispatchEvent(new CustomEvent('editor-updated', { detail: { id: editorId } }));
            document.dispatchEvent(new CustomEvent('editor-changed'));
        },
        
        canDuplicate() {
            return this.currentBlockId && !this.currentBlockId.startsWith('template-');
        }
    }));
    window.Alpine.data('alpineEditor', () => ({
        editor: null,
        blocks: [],
        selectedBlock: null,
        hoveredTarget: {},
        toolConfig: {},
        
        // Initialize when the component is mounted
        init() {
            // Get the Alpine component's element and utilities
            const $el = this.$el;
            const $dispatch = this.$dispatch;
            const $nextTick = this.$nextTick;
            const $watch = this.$watch;
            
            try {
                const editorConfig = getEditorConfigFromDOM();
                this.toolConfig = editorConfig.tools;
                Debug.info('Tool config loaded:', Object.keys(this.toolConfig));
                
                // Initialize media picker if configured
                if (editorConfig.media) {
                    this.mediaPicker = new MediaPicker(editorConfig.media);
                    this.mediaPicker.init();
                    Debug.info('Media picker initialized with config:', editorConfig.media);
                }
                
                this.editor = new Editor(this.toolConfig);
                
                // Add Alpine utilities to editor (not reactive references)
                this.editor.$el = $el;
                this.editor.$dispatch = $dispatch;
                this.editor.$nextTick = $nextTick;
                this.editor.$watch = $watch;
                
                // Add media picker reference to editor
                if (this.mediaPicker) {
                    this.editor.mediaPicker = this.mediaPicker;
                }
                
                // Initialize the editor
                this.editor.init();
                
                // Set up blocks array without circular references
                this.syncBlocksFromEditor();
                
                // Ensure the editor is available in Alpine's context
                this.$nextTick(() => {
                    // Force a re-render to show the toolbar now that editor is initialized
                    this.editor = this.editor;
                });
                
                this.selectedBlock = this.editor.selectedBlock;
                
                // Watch for selectedBlock changes to sync with editor
                $watch('selectedBlock', (newValue) => {
                    if (this.editor && this.editor.selectedBlock !== newValue) {
                        this.editor.selectedBlock = newValue;
                    }
                });
                
                // Watch for block config changes to trigger debounced state saves
                $watch('blocks', () => {
                    if (this.editor && this.editor.debouncedSaveState) {
                        this.editor.debouncedSaveState();
                    }
                }, { deep: true });
                
                // Listen for editor updates to sync blocks
                document.addEventListener('editor-updated', (event) => {
                    if (event.detail.id === this.editor.id) {
                        this.syncBlocksFromEditor();
                    }
                });
                
                // Listen for clear selection events
                document.addEventListener('editor-clear-selection', () => {
                    console.log('Clearing selection - before:', this.selectedBlock);
                    this.selectedBlock = null;
                    if (this.editor) {
                        this.editor.selectedBlock = null;
                    }
                    console.log('Clearing selection - after:', this.selectedBlock);
                    
                    // Force Alpine to completely re-evaluate by triggering multiple reactive updates
                    this.$nextTick(() => {
                        this.selectedBlock = null;
                        if (this.editor) {
                            this.editor.selectedBlock = null;
                        }
                        
                        // Force a complete re-render by updating a dummy reactive property
                        this.blocks = [...this.blocks];
                        
                        // Trigger another tick to ensure everything updates
                        this.$nextTick(() => {
                            this.selectedBlock = null;
                            if (this.editor) {
                                this.editor.selectedBlock = null;
                            }
                        });
                    });
                });
                
                document.addEventListener('editor-drop', (event) => {
                    if (event.detail.id === this.editor.id) {
                        this.syncBlocksFromEditor();
                    }
                });
                
            } catch (error) {
                Debug.error('Error initializing editor:', error);
            }
        },
        
        // Sync blocks array from editor without circular references
        syncBlocksFromEditor() {
            if (!this.editor) return;
            
            // Update the simple blocks array for Alpine's reactivity without circular refs
            this.blocks = this.editor.blocks.map(block => ({
                id: block.id,
                class: block.class || block.constructor.name,
                // Just track the count to trigger reactivity
                _updateCount: Date.now()
            }));
        },

        // Expose required methods
        blocksJSON(pretty = false) {
            if (!this.editor) return '[]';
            
            // Use the editor's blocksJSON method directly for correct serialization
            if (typeof this.editor.blocksJSON === 'function') {
                return this.editor.blocksJSON(pretty);
            }
            
            // Fallback: manually serialize using actual editor blocks
            const blocksData = this.editor.blocks.map(block => {
                // Use the preserved class name if available, otherwise extract from constructor name
                let className = block.class || block.constructor.name;
                
                // If we get a bundled class name, try to extract the real name
                if (className.includes('$var$')) {
                    const match = className.match(/\$var\$(\w+)$/);
                    if (match) {
                        className = match[1];
                    }
                }
                
                return {
                    id: block.id,
                    class: className,
                    data: this.serializeBlockConfig(block.config)
                };
            });
            
            return pretty 
                ? JSON.stringify(blocksData, null, 2).replace(/ /g, '&nbsp;').replace(/\n/g, '<br>')
                : JSON.stringify(blocksData);
        },

        // Helper method to serialize block config without circular references
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
                    serialized[key] = value.map(item => {
                        if (item && typeof item === 'object') {
                            // For nested blocks, only include serializable properties
                            if (item.id && item.config) {
                                // Use the preserved class name if available, otherwise extract from constructor name
                                let className = item.class || (item.constructor && item.constructor.name) || 'Unknown';
                                
                                // Handle bundled class names
                                if (className.includes('$var$')) {
                                    const match = className.match(/\$var\$(\w+)$/);
                                    if (match) {
                                        className = match[1];
                                    }
                                }
                                
                                return {
                                    id: item.id,
                                    class: className,
                                    config: this.serializeBlockConfig(item.config)
                                };
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
        },

        // Export clean HTML content without editor UI
        getCleanHTML() {
            if (!this.editor) return '';
            
            // Use the editor's getEditorContent method which calls renderBlocks
            if (typeof this.editor.getEditorContent === 'function') {
                return this.editor.getEditorContent();
            }
            
            // Fallback: manually render blocks
            return this.editor.blocks.map(block => {
                if (typeof block.render === 'function') {
                    return block.render();
                }
                return '';
            }).join('');
        },

        // Export clean HTML for a specific block by ID
        getBlockHTML(blockId) {
            if (!this.editor) return '';
            
            const block = this.editor.blocks.find(b => b.id === blockId);
            if (!block || typeof block.render !== 'function') {
                return '';
            }
            
            return block.render();
        },

        // Export HTML with data attributes for template/design tools
        getTemplateHTML() {
            if (!this.editor) return '';
            
            return this.editor.blocks.map(block => {
                // Try to use renderTemplateElement if available
                if (typeof block.renderTemplateElement === 'function') {
                    return block.renderTemplateElement(block.id);
                }
                
                // Fallback: add data attributes to regular render output
                let html = block.render();
                const className = block.class || block.constructor.name;
                
                // Add data attributes to the first element
                html = html.replace(/^<(\w+)/, `<$1 data-tool="${className}" data-tool-id="${block.id}"`);
                return html;
            }).join('');
        },

        handleDragOver(event, blockId) {
            event.preventDefault();
            
            // Handle drag over logic directly in Alpine component
            const dropTarget = event.currentTarget;
            const rect = dropTarget.getBoundingClientRect();
            const relY = event.clientY - rect.top;
            
            // Use improved drop zone detection - top 40% vs bottom 60%
            const position = relY < (rect.height * 0.4) ? 'top' : 'bottom';
            
            // Update Alpine's hoveredTarget directly
            if (this.hoveredTarget[blockId] !== position) {
                this.hoveredTarget[blockId] = position;
                // Also update the editor's state to keep them in sync
                if (this.editor) {
                    this.editor.hoveredTarget[blockId] = position;
                }
            }
        },

        handleDragLeave(event, blockId) {
            // Handle drag leave logic directly in Alpine component
            const dropTarget = event.currentTarget;
            const relatedTarget = event.relatedTarget;
            
            if (!relatedTarget || !dropTarget.contains(relatedTarget)) {
                // Add delay to prevent flickering
                setTimeout(() => {
                    if (this.hoveredTarget[blockId]) {
                        delete this.hoveredTarget[blockId];
                        // Also update the editor's state
                        if (this.editor && this.editor.hoveredTarget[blockId]) {
                            delete this.editor.hoveredTarget[blockId];
                        }
                    }
                }, 100);
            }
        },

        handleDrop(event, position, blockId) {
            if (this.editor) {
                // Clear the hover state immediately
                if (this.hoveredTarget[blockId]) {
                    delete this.hoveredTarget[blockId];
                }
                this.editor.handleDrop(event, position, blockId);
            }
        },

        setActive(event, blockId) {
            if (this.editor) {
                this.editor.setActive(event, blockId);
                // Sync with Alpine component state
                this.selectedBlock = blockId;
            }
        },

        showDeleteConfirmation(blockId) {
            // Dispatch event to show delete confirmation modal on window
            window.dispatchEvent(new CustomEvent('show-delete-confirmation', { detail: { blockId: blockId } }));
        },

        // Get header toolbar HTML
        getHeaderToolbar() {
            if (!this.editor) {
                return '<div class="header-toolbar"><!-- Editor not initialized --></div>';
            }
            
            // Try to get the method from the editor
            let getHeaderToolbarMethod = this.editor.getHeaderToolbar;
            if (!getHeaderToolbarMethod && this.editor.headerToolbar) {
                // Fallback: call the headerToolbar render method directly
                try {
                    return this.editor.headerToolbar.render();
                } catch (error) {
                    // Silently fall through to fallback
                }
            }
            
            if (typeof getHeaderToolbarMethod !== 'function') {
                // Provide a fallback toolbar
                return this.getFallbackHeaderToolbar();
            }
            
            try {
                return getHeaderToolbarMethod.call(this.editor);
            } catch (error) {
                return this.getFallbackHeaderToolbar();
            }
        },

        // Fallback header toolbar when editor method isn't available
        getFallbackHeaderToolbar() {
            const editorId = this.editor ? this.editor.id : 'unknown';
            return `
                <div class="header-toolbar" x-data="headerToolbar('${editorId}')">
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
        },

        // Get actual blocks for rendering (not the cleaned version)
        getEditorBlocks() {
            if (!this.editor) return [];
            return this.editor.blocks;
        },

    }));
    
    // Page Management Component
    window.Alpine.data('editorPages', () => ({
        pages: [
            { id: 'page-1', title: 'Home', blocks: [], image: null }
        ],
        currentPageId: 'page-1',
        switchingPages: false,
        projectSettings: {
            type: 'digital', // 'digital' or 'print'
            printMaxHeight: '297mm',
            printOrientation: 'portrait',
            exportFormat: 'html'
        },
        
        printDefaults: [
            { name: 'A4 Portrait (210 x 297mm)', width: '210mm', height: '297mm', orientation: 'portrait' },
            { name: 'A4 Landscape (297 x 210mm)', width: '297mm', height: '210mm', orientation: 'landscape' },
            { name: 'A3 Portrait (297 x 420mm)', width: '297mm', height: '420mm', orientation: 'portrait' },
            { name: 'A3 Landscape (420 x 297mm)', width: '420mm', height: '297mm', orientation: 'landscape' },
            { name: 'Letter Portrait (8.5 x 11in)', width: '8.5in', height: '11in', orientation: 'portrait' },
            { name: 'Letter Landscape (11 x 8.5in)', width: '11in', height: '8.5in', orientation: 'landscape' },
            { name: 'Tabloid Portrait (11 x 17in)', width: '11in', height: '17in', orientation: 'portrait' },
            { name: 'Tabloid Landscape (17 x 11in)', width: '17in', height: '11in', orientation: 'landscape' },
            { name: 'Magazine Page (8.5 x 11in)', width: '8.5in', height: '11in', orientation: 'portrait' },
            { name: 'Half Page Ad (8.5 x 5.5in)', width: '8.5in', height: '5.5in', orientation: 'landscape' }
        ],
        
        init() {
            // Load pages from localStorage if available
            const savedPages = localStorage.getItem('alpineblocks-pages');
            if (savedPages) {
                try {
                    this.pages = JSON.parse(savedPages);
                    this.currentPageId = this.pages[0]?.id || 'page-1';
                } catch (e) {
                    console.warn('Failed to load saved pages:', e);
                }
            }
            
            // Load project settings
            const savedSettings = localStorage.getItem('alpineblocks-project-settings');
            if (savedSettings) {
                try {
                    this.projectSettings = JSON.parse(savedSettings);
                } catch (e) {
                    console.warn('Failed to load project settings:', e);
                }
            }
            
            // Listen for editor changes to update current page blocks
            document.addEventListener('editor-changed', () => {
                this.updateCurrentPageBlocks();
            });
            
            // Listen for page changes
            document.addEventListener('editor-page-changed', (event) => {
                this.$nextTick(() => {
                    this.refreshCurrentPageBlocks();
                });
            });
            
            // Listen for editor ready event to load initial page
            document.addEventListener('editor-ready', () => {
                // Load the current page content when editor is ready
                setTimeout(() => {
                    this.loadPageContent(this.currentPageId);
                }, 200);
            });
            
            // Listen for deletion confirmations (pages and blocks)
            window.addEventListener('confirm-delete-block', (event) => {
                const { blockId } = event.detail;
                
                // Check if this is a page deletion
                const isPageDeletion = this.pages.some(p => p.id === blockId);
                if (isPageDeletion) {
                    this.confirmDeletePage(blockId);
                    return;
                }
                
                // Check if this is a block deletion from page manager
                if (blockId.startsWith('block-')) {
                    const blockIndex = parseInt(blockId.replace('block-', ''));
                    this.confirmDeleteBlockFromPage(blockIndex);
                    return;
                }
            });
            
            // Listen for add page confirmation
            window.addEventListener('confirm-add-page', (event) => {
                const { inputValue } = event.detail;
                this.confirmAddPage(inputValue);
            });
            
            // Listen for rename page confirmation
            window.addEventListener('confirm-rename-page', (event) => {
                const { inputValue, pageId } = event.detail;
                this.confirmRenamePage(pageId, inputValue);
            });
        },
        
        addPage() {
            // Use the modal system for adding pages
            window.dispatchEvent(new CustomEvent('show-input-modal', {
                detail: {
                    title: 'Add New Page',
                    placeholder: 'Enter page name',
                    confirmText: 'Add Page',
                    cancelText: 'Cancel',
                    eventType: 'confirm-add-page',
                    eventData: {},
                    iconType: 'add'
                }
            }));
        },
        
        confirmAddPage(pageName) {
            if (pageName && pageName.trim()) {
                const newPage = {
                    id: `page-${Date.now()}`,
                    title: pageName.trim(),
                    blocks: [],
                    image: null
                };
                this.pages.push(newPage);
                this.savePagesToStorage();
            }
        },
        
        deletePage(pageId) {
            if (this.pages.length <= 1) {
                alert('Cannot delete the last page');
                return;
            }
            
            // Use the modal system for page deletion
            window.dispatchEvent(new CustomEvent('show-delete-confirmation', { 
                detail: { 
                    blockId: pageId, 
                    type: 'page',
                    title: 'Remove Page',
                    description: 'Are you sure you want to remove this page? All content will be lost and this action cannot be undone.'
                } 
            }));
        },
        
        confirmDeletePage(pageId) {
            this.pages = this.pages.filter(p => p.id !== pageId);
            if (this.currentPageId === pageId) {
                this.currentPageId = this.pages[0].id;
                this.switchToPage(this.currentPageId);
            }
            this.savePagesToStorage();
        },
        
        renamePage(pageId) {
            const page = this.pages.find(p => p.id === pageId);
            if (page) {
                // Use the modal system for renaming pages
                window.dispatchEvent(new CustomEvent('show-input-modal', {
                    detail: {
                        title: 'Rename Page',
                        placeholder: 'Enter new page name',
                        defaultValue: page.title,
                        confirmText: 'Rename',
                        cancelText: 'Cancel',
                        eventType: 'confirm-rename-page',
                        eventData: { pageId: pageId },
                        iconType: 'edit'
                    }
                }));
            }
        },
        
        confirmRenamePage(pageId, newName) {
            const page = this.pages.find(p => p.id === pageId);
            if (page && newName && newName.trim()) {
                page.title = newName.trim();
                this.savePagesToStorage();
            }
        },
        
        switchToPage(pageId) {
            if (pageId === this.currentPageId) return;
            
            // Set flag to prevent re-selection during switch
            this.switchingPages = true;
            
            // Clear selection immediately when starting page switch
            document.dispatchEvent(new CustomEvent('editor-clear-selection'));
            
            // Save current page content first
            this.saveCurrentPageContent().then(() => {
                // Switch to new page
                this.currentPageId = pageId;
                
                // Clear selection again before loading
                document.dispatchEvent(new CustomEvent('editor-clear-selection'));
                
                // Load new page content
                this.loadPageContent(pageId);
                
                // Force Alpine to update the reactive data
                this.$nextTick(() => {
                    // Trigger a reactive update for the current page blocks
                    this.refreshCurrentPageBlocks();
                    
                    // Final clear to make sure selection is gone
                    document.dispatchEvent(new CustomEvent('editor-clear-selection'));
                    
                    // Clear the switching flag after a delay
                    setTimeout(() => {
                        this.switchingPages = false;
                    }, 200);
                });
            });
        },
        
        saveCurrentPageContent() {
            return new Promise((resolve) => {
                const currentPage = this.pages.find(p => p.id === this.currentPageId);
                if (currentPage && window.alpineEditors?.editorjs) {
                    const editor = window.alpineEditors.editorjs;
                    try {
                        // Use the blocksJSON method to get current blocks
                        const blocksData = JSON.parse(editor.blocksJSON());
                        currentPage.blocks = blocksData || [];
                        this.savePagesToStorage();
                        resolve();
                    } catch (error) {
                        console.warn('Error saving page content:', error);
                        resolve();
                    }
                } else {
                    resolve();
                }
            });
        },
        
        loadPageContent(pageId) {
            const page = this.pages.find(p => p.id === pageId);
            if (page && window.alpineEditors?.editorjs) {
                const editor = window.alpineEditors.editorjs;
                try {
                    // Clear existing blocks
                    editor.blockManager.blocks = [];
                    
                    // Load new blocks if any exist
                    if (page.blocks && page.blocks.length > 0) {
                        page.blocks.forEach(blockData => {
                            if (blockData.class && editor.toolConfig[blockData.class]) {
                                // Use initBlock to create the block properly
                                const block = editor.initBlock(blockData.class, true, blockData.id);
                                if (block && blockData.data) {
                                    // Merge the saved data into the block config
                                    Object.assign(block.config, blockData.data);
                                }
                            }
                        });
                    }
                    
                    // If no blocks, add a default paragraph
                    if (editor.blockManager.blocks.length === 0 && editor.toolConfig['Paragraph']) {
                        editor.initBlock('Paragraph', true);
                    }
                    
                    // Clear the selected block when switching pages
                    document.dispatchEvent(new CustomEvent('editor-clear-selection'));
                    
                    // Immediately clear block selection for properties panel
                    document.dispatchEvent(new CustomEvent('editor-block-changed', {
                        detail: { block_id: null }
                    }));
                    
                    // Trigger a re-render
                    setTimeout(() => {
                        // Dispatch events to update UI
                        document.dispatchEvent(new CustomEvent('editor-page-changed', {
                            detail: { pageId, blocks: page.blocks || [] }
                        }));
                        
                        // Clear block selection again to update properties panel
                        document.dispatchEvent(new CustomEvent('editor-block-changed', {
                            detail: { block_id: null }
                        }));
                        
                        // Force settings panel to clear directly
                        document.dispatchEvent(new CustomEvent('settings-updated', {
                            detail: { 
                                editorId: 'editorjs',
                                settings: [],
                                blockId: null
                            }
                        }));
                        
                        // Force Alpine to update
                        document.dispatchEvent(new CustomEvent('editor-changed'));
                    }, 100);
                } catch (error) {
                    console.warn('Error loading page content:', error);
                }
            }
        },
        
        savePagesToStorage() {
            localStorage.setItem('alpineblocks-pages', JSON.stringify(this.pages));
        },
        
        saveProjectSettings() {
            localStorage.setItem('alpineblocks-project-settings', JSON.stringify(this.projectSettings));
        },
        
        setPageImage(pageId) {
            const imageUrl = prompt('Enter image URL for this page:');
            if (imageUrl && imageUrl.trim()) {
                const page = this.pages.find(p => p.id === pageId);
                if (page) {
                    page.image = imageUrl.trim();
                    this.savePagesToStorage();
                }
            }
        },
        
        getCurrentPageImage() {
            const currentPage = this.pages.find(p => p.id === this.currentPageId);
            return currentPage?.image || null;
        },
        
        updateProjectSetting(key, value) {
            this.projectSettings[key] = value;
            this.saveProjectSettings();
            
            // Dispatch event for UI updates
            document.dispatchEvent(new CustomEvent('project-settings-changed', { 
                detail: { settings: this.projectSettings } 
            }));
        },
        
        selectPrintDefault(printDefault) {
            this.projectSettings.printMaxHeight = printDefault.height;
            this.projectSettings.printOrientation = printDefault.orientation;
            this.projectSettings.printWidth = printDefault.width;
            this.saveProjectSettings();
            
            // Dispatch event for UI updates
            document.dispatchEvent(new CustomEvent('project-settings-changed', { 
                detail: { settings: this.projectSettings } 
            }));
            
            // Check for overflow after print settings change
            this.$nextTick(() => {
                this.checkPrintOverflow();
            });
        },
        
        checkPrintOverflow() {
            if (this.projectSettings.type === 'print') {
                const editorContent = document.querySelector('.editor-content');
                if (editorContent) {
                    const maxHeight = parseFloat(this.projectSettings.printMaxHeight.replace(/mm|in|px/, ''));
                    const unit = this.projectSettings.printMaxHeight.replace(/[0-9.]/g, '');
                    const actualHeight = editorContent.scrollHeight;
                    
                    // Convert max height to pixels for comparison
                    let maxHeightPx;
                    if (unit === 'mm') {
                        maxHeightPx = maxHeight * 3.78; // 1mm ≈ 3.78px at 96dpi
                    } else if (unit === 'in') {
                        maxHeightPx = maxHeight * 96; // 1in = 96px at 96dpi
                    } else {
                        maxHeightPx = maxHeight;
                    }
                    
                    if (actualHeight > maxHeightPx) {
                        editorContent.classList.add('overflow');
                    } else {
                        editorContent.classList.remove('overflow');
                    }
                }
            }
        },
        
        updateCurrentPageBlocks() {
            // Update the current page's blocks with the latest from the editor
            if (window.alpineEditors?.editorjs) {
                const editor = window.alpineEditors.editorjs;
                try {
                    const currentPage = this.pages.find(p => p.id === this.currentPageId);
                    if (currentPage) {
                        // Use the blocksJSON method to get current blocks
                        const blocksData = JSON.parse(editor.blocksJSON());
                        currentPage.blocks = blocksData || [];
                        this.savePagesToStorage();
                        // Force Alpine to update
                        this.$nextTick(() => {
                            this.refreshCurrentPageBlocks();
                        });
                    }
                } catch (error) {
                    console.warn('Error updating page blocks:', error);
                }
            }
        },
        
        refreshCurrentPageBlocks() {
            // Force Alpine to re-evaluate the current page blocks
            // This is a workaround to ensure reactive updates
            const currentPage = this.pages.find(p => p.id === this.currentPageId);
            if (currentPage) {
                // Trigger reactivity by modifying a property
                currentPage._updateTimestamp = Date.now();
            }
        },
        
        getCurrentPageTitle() {
            const currentPage = this.pages.find(p => p.id === this.currentPageId);
            return currentPage ? currentPage.title : '';
        },
        
        getCurrentPageBlocks() {
            const currentPage = this.pages.find(p => p.id === this.currentPageId);
            const blocks = currentPage ? (currentPage.blocks || []) : [];
            
            // Convert the block data format to include type property
            return blocks.map(block => ({
                ...block,
                type: block.class ? block.class.toLowerCase() : 'unknown'
            }));
        },
        
        getBlockIcon(type) {
            const icons = {
                'paragraph': '¶',
                'header': 'H',
                'list': '•',
                'image': '🖼',
                'quote': '"',
                'code': '</>',
                'wysiwyg': '📝',
                'alert': '⚠',
                'video': '▶',
                'audio': '🔊',
                'carousel': '🎠',
                'columns': '⫼',
                'raw': '{}',
                'delimiter': '---',
                'button': '🔘'
            };
            return icons[type] || '📄';
        },
        
        getBlockDisplayName(type) {
            if (!type || typeof type !== 'string') {
                return 'Unknown Block';
            }
            
            const names = {
                'paragraph': 'Paragraph',
                'header': 'Header',
                'list': 'List',
                'image': 'Image',
                'quote': 'Quote',
                'code': 'Code',
                'wysiwyg': 'Rich Text',
                'alert': 'Alert',
                'video': 'Video',
                'audio': 'Audio',
                'carousel': 'Carousel',
                'columns': 'Columns',
                'raw': 'Raw HTML',
                'delimiter': 'Delimiter',
                'button': 'Button'
            };
            return names[type] || type.charAt(0).toUpperCase() + type.slice(1);
        },
        
        getBlockPreview(block) {
            const data = block.data || {};
            switch (block.type) {
                case 'paragraph':
                    return this.stripHtml(data.content || '').substring(0, 50) + '...';
                case 'header':
                    return this.stripHtml(data.content || '').substring(0, 30) + '...';
                case 'list':
                    return data.items?.length ? `${data.items.length} items` : 'Empty list';
                case 'image':
                    return data.caption || data.alt || 'Image';
                case 'quote':
                    return this.stripHtml(data.content || '').substring(0, 40) + '...';
                case 'code':
                    return data.language || 'Code block';
                case 'wysiwyg':
                    return this.stripHtml(data.content || '').substring(0, 50) + '...';
                case 'alert':
                    return data.message || 'Alert message';
                case 'video':
                    return data.caption || 'Video player';
                case 'audio':
                    return data.caption || 'Audio player';
                case 'carousel':
                    return `${data.slides?.length || 0} slides`;
                case 'columns':
                    return `${data.columns?.length || 0} columns`;
                case 'raw':
                    return 'HTML content';
                case 'delimiter':
                    return 'Section break';
                case 'button':
                    return data.text || 'Button';
                default:
                    return 'Block content';
            }
        },
        
        stripHtml(html) {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || '';
        },
        
        selectBlock(blockIndex) {
            // Don't select blocks during page switching
            if (this.switchingPages) return;
            
            // Focus on the block in the editor
            if (window.alpineEditors?.editorjs) {
                const editor = window.alpineEditors.editorjs;
                try {
                    const block = editor.blockManager.blocks[blockIndex];
                    if (block) {
                        editor.selectedBlock = block.id;
                        // Trigger editor change to update UI
                        document.dispatchEvent(new CustomEvent('editor-block-changed', {
                            detail: { block_id: block.id }
                        }));
                    }
                } catch (e) {
                    console.warn('Could not select block:', e);
                }
            }
        },
        
        moveBlockUp(blockIndex) {
            if (blockIndex <= 0) return;
            
            if (window.alpineEditors?.editorjs) {
                const editor = window.alpineEditors.editorjs;
                try {
                    const blocks = editor.blockManager.blocks;
                    if (blocks[blockIndex] && blocks[blockIndex - 1]) {
                        // Swap the blocks
                        [blocks[blockIndex], blocks[blockIndex - 1]] = [blocks[blockIndex - 1], blocks[blockIndex]];
                        
                        // Update immediately and refresh UI
                        setTimeout(() => {
                            this.updateCurrentPageBlocks();
                            document.dispatchEvent(new CustomEvent('editor-changed'));
                        }, 100);
                    }
                } catch (e) {
                    console.warn('Could not move block up:', e);
                }
            }
        },
        
        moveBlockDown(blockIndex) {
            const blocks = this.getCurrentPageBlocks();
            if (blockIndex >= blocks.length - 1) return;
            
            if (window.alpineEditors?.editorjs) {
                const editor = window.alpineEditors.editorjs;
                try {
                    const editorBlocks = editor.blockManager.blocks;
                    if (editorBlocks[blockIndex] && editorBlocks[blockIndex + 1]) {
                        // Swap the blocks
                        [editorBlocks[blockIndex], editorBlocks[blockIndex + 1]] = [editorBlocks[blockIndex + 1], editorBlocks[blockIndex]];
                        
                        // Update immediately and refresh UI
                        setTimeout(() => {
                            this.updateCurrentPageBlocks();
                            document.dispatchEvent(new CustomEvent('editor-changed'));
                        }, 100);
                    }
                } catch (e) {
                    console.warn('Could not move block down:', e);
                }
            }
        },
        
        deleteBlock(blockIndex) {
            if (window.alpineEditors?.editorjs) {
                const editor = window.alpineEditors.editorjs;
                const blocks = editor.blockManager.blocks;
                if (blocks[blockIndex]) {
                    // Use the modal system for block deletion from page manager
                    window.dispatchEvent(new CustomEvent('show-delete-confirmation', { 
                        detail: { 
                            blockId: `block-${blockIndex}`,
                            type: 'block-from-page',
                            title: 'Remove Block',
                            description: 'Are you sure you want to remove this block? This action cannot be undone.'
                        } 
                    }));
                }
            }
        },
        
        confirmDeleteBlockFromPage(blockIndex) {
            if (window.alpineEditors?.editorjs) {
                const editor = window.alpineEditors.editorjs;
                try {
                    const blocks = editor.blockManager.blocks;
                    if (blocks[blockIndex]) {
                        // Remove the block
                        blocks.splice(blockIndex, 1);
                        
                        // If no blocks left, add a default paragraph
                        if (blocks.length === 0 && editor.toolConfig['Paragraph']) {
                            editor.initBlock('Paragraph', true);
                        }
                        
                        // Update immediately and refresh UI
                        setTimeout(() => {
                            this.updateCurrentPageBlocks();
                            document.dispatchEvent(new CustomEvent('editor-changed'));
                        }, 100);
                    }
                } catch (e) {
                    console.warn('Could not delete block:', e);
                }
            }
        }
    }));
    
    // Templates Component
    window.Alpine.data('editorTemplates', () => ({
        templates: [],
        
        init() {
            // Get templates from Layout class
            this.templates = Layout.getAll();
        },
        
        handleTemplateClick(event, template) {
            event.preventDefault();
            this.addTemplate(template);
        },
        
        handleTemplateDragStart(event, template) {
            // Extract blocks before serialization to preserve functionality
            const extractedBlocks = template.extractBlocks();
            event.dataTransfer.setData('text/plain', JSON.stringify({
                type: 'template',
                data: {
                    id: template.id,
                    name: template.name,
                    description: template.description,
                    blocks: extractedBlocks
                }
            }));
            event.dataTransfer.effectAllowed = 'copy';
        },
        
        handleTemplateDragEnd(event) {
            // Clean up drag state if needed
        },
        
        addTemplate(template) {
            if (window.alpineEditors?.editorjs) {
                const editor = window.alpineEditors.editorjs;
                if (editor.editor) {
                    // Create LayoutManager and add the template
                    const layoutManager = new LayoutManager(editor.editor);
                    layoutManager.addLayout(template.id);
                }
            }
        }
    }));
});

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
            const editorInstance = window.alpineEditors?.editorjs;
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

// AlpineBlocks class for external usage
export default class AlpineBlocks {
    constructor(config = {}) {
        this.config = {
            holder: config.holder || null,
            tools: config.tools || [],
            media: config.media || null,
            ...config
        };
        this.instance = null;
        this.holder = this.config.holder;
    }

    async init() {
        if (!this.holder) {
            throw new Error('AlpineBlocks: holder element is required');
        }

        // Ensure Alpine is available
        if (!window.Alpine) {
            throw new Error('AlpineBlocks: Alpine.js is required');
        }

        // Set up the holder element with proper Alpine.js structure
        this.holder.innerHTML = `
            <div class="alpine-blocks-editor" id="${this.holder.id || 'alpine-editor'}" x-data="alpineEditor()">
                <div class="editor-area">
                    <div class="editor-content" x-ref="editorContent">
                        <template x-for="block in blocks" :key="block.id">
                            <div x-html="block.editorRender()"></div>
                        </template>
                    </div>
                </div>
            </div>
        `;

        // Configure the editor with tools
        if (this.config.tools.length > 0) {
            this.holder.querySelector('[x-data]').setAttribute('x-data', 
                `alpineEditor({ tools: ${JSON.stringify(this.config.tools)}, media: ${JSON.stringify(this.config.media)} })`
            );
        }

        // Initialize Alpine component
        await new Promise(resolve => {
            const checkEditor = () => {
                const editorId = this.holder.id || 'alpine-editor';
                if (window.alpineEditors && window.alpineEditors[editorId]) {
                    this.instance = window.alpineEditors[editorId];
                    resolve();
                } else {
                    setTimeout(checkEditor, 50);
                }
            };
            checkEditor();
        });

        return this;
    }

    save() {
        if (!this.instance) {
            throw new Error('AlpineBlocks: Editor not initialized. Call init() first.');
        }
        return this.instance.save();
    }

    render(data) {
        if (!this.instance) {
            throw new Error('AlpineBlocks: Editor not initialized. Call init() first.');
        }
        
        if (data && Array.isArray(data)) {
            // Load blocks from data
            this.instance.blocks = [];
            data.forEach(blockData => {
                const block = this.instance.initBlock(blockData.class, false);
                if (block && blockData.data) {
                    Object.assign(block.config, blockData.data);
                    block.triggerRedraw();
                }
            });
        }
        
        return this.instance.getCleanHTML();
    }

    getHTML() {
        if (!this.instance) {
            throw new Error('AlpineBlocks: Editor not initialized. Call init() first.');
        }
        return this.instance.getCleanHTML();
    }

    destroy() {
        if (this.instance && this.holder) {
            // Clean up
            const editorId = this.holder.id || 'alpine-editor';
            if (window.alpineEditors && window.alpineEditors[editorId]) {
                delete window.alpineEditors[editorId];
            }
            this.holder.innerHTML = '';
            this.instance = null;
        }
    }
}

// Start Alpine.js if not already started
if (!window.Alpine._started) {
    Alpine.start();
}


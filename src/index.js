import Alpine from 'alpinejs';

window.Alpine = Alpine;

import { Editor } from './core/Editor';
import { Toolbar } from './core/Toolbar';
import { Settings } from './core/Settings';
import { HeaderToolbar } from './core/HeaderToolbar';
import { Debug } from './core/utils/Debug';

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
 * Extract and parse tool configuration from DOM, with fallback to defaults
 * @returns {Object} Parsed tool configuration
 */
function getToolConfigFromDOM() {
    const editorElement = document.querySelector('[x-data*="alpineEditor"]');
    if (!editorElement) {
        Debug.info('No editor element found, using default tool config');
        return getDefaultToolConfig();
    }

    const xDataAttr = editorElement.getAttribute('x-data');
    
    const match = xDataAttr.match(/alpineEditor\(\{[\s\n]*tools:\s*(\[[\s\S]*?\])\s*\}\)/);
    if (!match) {
        Debug.info('No tools config found in DOM, using default tool config');
        return getDefaultToolConfig();
    }

    try {
        const toolsConfig = new Function(`return ${match[1]}`)();
        const config = {};

        Debug.debug('toolModules keys:', Object.keys(toolModules));

        toolsConfig.forEach((tool) => {
            Debug.debug('Loading tool:', tool.class);
            
            if (toolModules[tool.class]) {
                config[tool.class] = {
                    class: toolModules[tool.class],
                    config: tool.config || {}
                };
                Debug.debug(`Successfully loaded tool: ${tool.class}`);
            } else {
                Debug.error(`Tool ${tool.class} not found in available modules`);
            }
        });

        // If no tools were successfully parsed, fall back to defaults
        if (Object.keys(config).length === 0) {
            Debug.info('No tools successfully parsed, using default tool config');
            return getDefaultToolConfig();
        }

        return config;
    } catch (e) {
        Debug.error('Error parsing tool configuration:', e);
        Debug.info('Using default tool config as fallback');
        return getDefaultToolConfig();
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
        
        init() {
            this.settingsInstance = new Settings(editorId, this.settings);
            this.settingsInstance.init();
            
            // Listen for settings updates
            document.addEventListener('settings-updated', (event) => {
                if (event.detail.editorId === editorId) {
                    this.settings = event.detail.settings || [];
                }
            });
        },
        
        trigger(blockId, property, value) {
            if (this.settingsInstance) {
                this.settingsInstance.trigger(blockId, property, value);
            }
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
                this.toolConfig = getToolConfigFromDOM();
                Debug.info('Tool config loaded:', Object.keys(this.toolConfig));
                this.editor = new Editor(this.toolConfig);
                
                // Add Alpine utilities to editor (not reactive references)
                this.editor.$el = $el;
                this.editor.$dispatch = $dispatch;
                this.editor.$nextTick = $nextTick;
                this.editor.$watch = $watch;
                
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
});

Alpine.start();


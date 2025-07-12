import Alpine from 'alpinejs';

window.Alpine = Alpine;

import { Editor } from './core/editor';
import { Toolbar } from './core/Toolbar';
import { Settings } from './core/Settings';
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
 * Extract and parse tool configuration from DOM
 * @returns {Object} Parsed tool configuration
 */
function getToolConfigFromDOM() {
    const editorElement = document.querySelector('[x-data*="alpineEditor"]');
    if (!editorElement) return {};

    const xDataAttr = editorElement.getAttribute('x-data');
    
    const match = xDataAttr.match(/alpineEditor\(\{[\s\n]*tools:\s*(\[[\s\S]*?\])\s*\}\)/);
    if (!match) return {};

    try {
        const toolsConfig = new Function(`return ${match[1]}`)();
        const config = {};

        Debug.debug('toolModules keys:', Object.keys(toolModules));
        Debug.debug('First tool module:', toolModules.Paragraph);

        toolsConfig.forEach((tool) => {
            Debug.debug('Loading tool:', tool.class);
            Debug.debug('Available in toolModules:', !!toolModules[tool.class]);
            Debug.debug('Tool class:', toolModules[tool.class]);
            
            if (toolModules[tool.class]) {
                config[tool.class] = {
                    class: toolModules[tool.class],
                    config: tool.config || {}
                };
            } else {
                Debug.error(`Tool ${tool.class} not found in available modules`);
            }
        });

        return config;
    } catch (e) {
        Debug.error('Error parsing tool configuration:', e);
        return {};
    }
}

// Initialize Alpine with tool loading
document.addEventListener('alpine:init', () => {
    window.Alpine.data('editorToolbar', () => new Toolbar);
    window.Alpine.data('editorSettings', (editorId, initialSettings) => ({
        settingsInstance: null,
        settings: initialSettings || [],
        
        init() {
            console.log('Alpine editorSettings component initialized for editor:', editorId);
            this.settingsInstance = new Settings(editorId, this.settings);
            this.settingsInstance.init();
            
            // Listen for settings updates
            document.addEventListener('settings-updated', (event) => {
                console.log('Alpine settings: settings-updated event received:', event.detail);
                if (event.detail.editorId === editorId) {
                    console.log('Alpine settings: updating settings to:', event.detail.settings);
                    this.settings = event.detail.settings || [];
                }
            });
        },
        
        trigger(blockId, property, value) {
            console.log('Alpine settings: trigger called:', blockId, property, value);
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
            
            this.toolConfig = getToolConfigFromDOM();
            this.editor = new Editor(this.toolConfig);
            
            // Add Alpine utilities to editor
            this.editor.$el = $el;
            this.editor.$dispatch = $dispatch;
            this.editor.$nextTick = $nextTick;
            this.editor.$watch = $watch;
            
            // Initialize the editor
            this.editor.init();
            
            // Create a proxy for the blocks array to handle updates
            const self = this;
            this.blocks = new Proxy(this.editor.blocks, {
                set(target, property, value) {
                    target[property] = value;
                    if (self.editor) {
                        self.editor.blockManager.blocks = target;
                    }
                    return true;
                }
            });
            
            this.selectedBlock = this.editor.selectedBlock;
            
            // Watch for selectedBlock changes to sync with editor
            $watch('selectedBlock', (newValue) => {
                if (this.editor && this.editor.selectedBlock !== newValue) {
                    this.editor.selectedBlock = newValue;
                }
            });
        },

        // Expose required methods
        blocksJSON(pretty = false) {
            if (!this.editor) return '[]';
            
            const blocksData = this.blocks.map(block => {
                // Create a clean object without circular references
                const cleanBlock = {
                    id: block.id,
                    class: block.constructor.name,
                    data: this.serializeBlockConfig(block.config)
                };
                return cleanBlock;
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
                            if (item.id && item.constructor && item.config) {
                                return {
                                    id: item.id,
                                    class: item.constructor.name,
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

    }));
});

Alpine.start();


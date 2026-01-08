import Tool from '../core/Tool';
import { CommonEditorToolbar } from '../core/CommonEditorToolbar';

// Alpine.js component for Raw code editor
function rawCodeEditor() {
    return {
        showPreview: true,
        block: null,
        isValid: true,
        previewContent: '',
        toolbar: null,
        
        handleToolbarCommand(command, value) {
            const previewEl = this.$refs.previewContainer;
            if (previewEl) {
                previewEl.focus();
                document.execCommand(command, false, value);
                // Update the block content when user makes changes
                if (this.block) {
                    this.block.config.content = previewEl.innerHTML;
                }
            }
        },
        
        init(blockId) {
            // Validate blockId - silently return if invalid
            if (!blockId || blockId === 'undefined') {
                return;
            }

            // Find the block instance - try multiple approaches
            this.block = window.blocksManager?.blocks?.find(b => b.id === blockId);

            if (!this.block && window.alpineEditors) {
                // Try finding through alpine editors
                for (const editorId in window.alpineEditors) {
                    const editor = window.alpineEditors[editorId];
                    if (editor && editor.blocks) {
                        this.block = editor.blocks.find(b => b.id === blockId);
                        if (this.block) break;
                    }
                }
            }

            if (this.block) {
                // Set initial preview mode based on block config, defaulting to true
                this.showPreview = this.block.config.showPreview !== false;
                this.previewContent = this.block.config.content || '';
                this.isValid = this.validateCode(this.block.config.content);

                // Initialize toolbar for preview mode
                this.toolbar = new CommonEditorToolbar({
                    className: 'raw-preview-toolbar'
                });
            }
        },
        
        handleInput(event) {
            // Do nothing - just let the input happen
        },
        
        validateCode(content) {
            if (!content) return true;
            if (!this.block) return true;
            
            switch (this.block.config.mode) {
                case 'html':
                    try {
                        // Simple tag matching validation
                        const openTags = [];
                        const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
                        const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'];
                        
                        // Reset regex
                        tagRegex.lastIndex = 0;
                        let match;
                        
                        while ((match = tagRegex.exec(content)) !== null) {
                            const fullTag = match[0];
                            const tagName = match[1].toLowerCase();
                            const isClosing = fullTag.startsWith('</');
                            const isSelfClosing = fullTag.endsWith('/>') || selfClosingTags.includes(tagName);
                            
                            if (isSelfClosing && !isClosing) continue;
                            
                            if (isClosing) {
                                if (openTags.length === 0 || openTags.pop() !== tagName) {
                                    return false; // Mismatched closing tag
                                }
                            } else if (!isSelfClosing) {
                                openTags.push(tagName);
                            }
                        }
                        
                        // Check if all tags are closed
                        if (openTags.length > 0) {
                            return false;
                        }
                        
                        return true;
                    } catch (e) {
                        return false;
                    }
                
                case 'css':
                    try {
                        const style = document.createElement('style');
                        style.textContent = content;
                        document.head.appendChild(style);
                        document.head.removeChild(style);
                        return true;
                    } catch (e) {
                        return false;
                    }
                
                case 'javascript':
                    try {
                        new Function(content);
                        return true;
                    } catch (e) {
                        return false;
                    }
                
                default:
                    return true;
            }
        },

        initializePreviewContainer(element, block) {
            if (!element || !block) return;
            
            // Set the HTML content
            element.innerHTML = block.config.content || '';
            
            // Set up template element click handlers
            const templateElements = element.querySelectorAll('[data-tool]');
            
            // Find the editor instance
            let editor = null;
            if (window.alpineEditors) {
                for (const editorId in window.alpineEditors) {
                    editor = window.alpineEditors[editorId];
                    if (editor) break;
                }
            }
            
            // Set up drag and drop functionality
            this.setupDragAndDrop(element, block, editor);
            
            templateElements.forEach(el => {
                const toolType = el.getAttribute('data-tool');
                const toolId = el.getAttribute('data-tool-id');
                
                if (toolType && toolId) {
                    if (editor && typeof editor.attachTemplateClickHandler === 'function') {
                        // Use the editor's method to attach the handler
                        editor.attachTemplateClickHandler(el, toolType, toolId);
                    }
                }
            });
        },

        setupDragAndDrop(element, block, editor) {
            if (!editor) return;
            
            // Make the preview container a drop target
            element.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Check if tool is allowed for raw preview using global variable
                const toolName = window.currentDraggedTool;
                if (toolName && editor.toolConfig && editor.toolConfig[toolName]) {
                    const toolConfig = editor.toolConfig[toolName];
                    const toolboxConfig = toolConfig.class.toolbox();
                    
                    if (toolboxConfig.allowRawPreview === false) {
                        // Show no-drop cursor and visual feedback
                        element.style.cursor = 'no-drop';
                        this.showNoDropOverlay(element, toolboxConfig.name);
                        return;
                    }
                }
                
                // Show drop cursor for allowed tools
                element.style.cursor = 'default';
                this.hideNoDropOverlay(element);
                this.showDropCursor(element, e);
            });
            
            element.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Only hide cursor if we're leaving the container entirely
                if (!element.contains(e.relatedTarget)) {
                    this.hideDropCursor(element);
                    this.hideNoDropOverlay(element);
                }
            });
            
            element.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Hide drop cursor and overlay
                this.hideDropCursor(element);
                this.hideNoDropOverlay(element);
                element.style.cursor = 'default';
                
                // Get the dropped tool data from global variable as fallback
                let toolName = e.dataTransfer.getData('text/plain');
                if (!toolName) {
                    toolName = window.currentDraggedTool;
                }
                
                if (toolName && editor.toolConfig && editor.toolConfig[toolName]) {
                    // Check if tool is allowed for raw preview
                    const toolConfig = editor.toolConfig[toolName];
                    const toolboxConfig = toolConfig.class.toolbox();
                    
                    if (toolboxConfig.allowRawPreview === false) {
                        return; // Don't insert disallowed tools
                    }
                    
                    this.insertToolAtCursor(element, block, toolName, e, editor);
                }
            });
        },

        showNoDropOverlay(element, toolName) {
            // Remove existing overlay
            this.hideNoDropOverlay(element);
            
            // Create overlay element
            const overlay = document.createElement('div');
            overlay.id = 'raw-no-drop-overlay';
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(239, 68, 68, 0.1);
                border: 2px dashed #ef4444;
                border-radius: 8px;
                z-index: 1000;
                pointer-events: none;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(2px);
            `;
            
            // Create message element
            const message = document.createElement('div');
            message.style.cssText = `
                background: #ef4444;
                color: white;
                padding: 12px 20px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                text-align: center;
                box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
                display: flex;
                align-items: center;
                gap: 8px;
            `;
            message.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M15 9l-6 6"/>
                    <path d="M9 9l6 6"/>
                </svg>
                Cannot drop "${toolName}" here
            `;
            
            overlay.appendChild(message);
            element.appendChild(overlay);
        },

        hideNoDropOverlay(element) {
            const overlay = element.querySelector('#raw-no-drop-overlay');
            if (overlay) {
                overlay.remove();
            }
        },

        showDropCursor(element, e) {
            // Remove existing cursor
            this.hideDropCursor(element);
            
            // Find the insertion point
            const insertionPoint = this.getInsertionPoint(element, e);
            
            // Create cursor element
            const cursor = document.createElement('div');
            cursor.id = 'raw-drop-cursor';
            cursor.style.cssText = `
                position: absolute;
                height: 2px;
                background: #3b82f6;
                border-radius: 1px;
                z-index: 1000;
                pointer-events: none;
                box-shadow: 0 0 4px rgba(59, 130, 246, 0.5);
                transition: all 0.1s ease;
            `;
            
            // Position the cursor
            if (insertionPoint.type === 'between') {
                // Position between elements
                const rect = insertionPoint.element.getBoundingClientRect();
                const containerRect = element.getBoundingClientRect();
                
                cursor.style.left = '10px';
                cursor.style.right = '10px';
                cursor.style.top = `${rect.top - containerRect.top + (insertionPoint.position === 'before' ? -2 : rect.height)}px`;
            } else {
                // Position at the end
                cursor.style.left = '10px';
                cursor.style.right = '10px';
                cursor.style.bottom = '10px';
            }
            
            element.appendChild(cursor);
        },

        hideDropCursor(element) {
            const cursor = element.querySelector('#raw-drop-cursor');
            if (cursor) {
                cursor.remove();
            }
        },

        getInsertionPoint(element, e) {
            const children = Array.from(element.children).filter(child => child.id !== 'raw-drop-cursor');
            
            if (children.length === 0) {
                return { type: 'end' };
            }
            
            const mouseY = e.clientY;
            
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const rect = child.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                
                if (mouseY < midY) {
                    return {
                        type: 'between',
                        element: child,
                        position: 'before',
                        index: i
                    };
                }
            }
            
            return {
                type: 'between',
                element: children[children.length - 1],
                position: 'after',
                index: children.length
            };
        },

        insertToolAtCursor(element, block, toolName, e, editor) {
            // Get the tool configuration
            const toolConfig = editor.toolConfig[toolName];
            if (!toolConfig || !toolConfig.class) {
                return;
            }
            
            // Create a new tool instance
            const ToolClass = toolConfig.class;
            const toolId = `${toolName.toLowerCase()}-${Date.now()}`;
            const tool = new ToolClass({
                id: toolId,
                updateFunction: (property, value) => {
                    // Tool update callback
                },
                config: { ...toolConfig.config }
            });
            
            // Generate the HTML for the tool
            let toolHtml = '';
            if (typeof tool.renderTemplateElement === 'function') {
                toolHtml = tool.renderTemplateElement(toolId);
            } else {
                // Fallback to regular render method
                toolHtml = tool.render();
                // Add data attributes manually
                toolHtml = toolHtml.replace(/^<(\w+)/, `<$1 data-tool="${toolName}" data-tool-id="${toolId}"`);
            }
            
            // Find insertion point
            const insertionPoint = this.getInsertionPoint(element, e);
            
            if (!toolHtml) {
                return;
            }
            
            // Insert the HTML
            if (insertionPoint.type === 'end') {
                element.insertAdjacentHTML('beforeend', toolHtml);
            } else {
                const position = insertionPoint.position === 'before' ? 'beforebegin' : 'afterend';
                insertionPoint.element.insertAdjacentHTML(position, toolHtml);
            }
            
            // Update the Raw block content
            block.config.content = element.innerHTML;
            
            // Re-initialize template elements
            const newTemplateElements = element.querySelectorAll('[data-tool]');
            newTemplateElements.forEach(el => {
                const elToolType = el.getAttribute('data-tool');
                const elToolId = el.getAttribute('data-tool-id');
                
                if (elToolType && elToolId && !el.hasAttribute('data-click-handler')) {
                    el.setAttribute('data-click-handler', 'true');
                    if (editor && typeof editor.attachTemplateClickHandler === 'function') {
                        editor.attachTemplateClickHandler(el, elToolType, elToolId);
                    }
                }
            });
        }
    };
}

// Make it globally available for Alpine (only if not already defined)
if (typeof window !== 'undefined' && !window.rawCodeEditor) {
    window.rawCodeEditor = rawCodeEditor;
}

class Raw extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            content: config.content || '',
            mode: config.mode || 'html', // html, css, javascript
            showPreview: config.showPreview !== undefined ? config.showPreview : true
        };



        this.settings = [
            {
                name: 'mode',
                label: 'Code Type',
                html: `<select @change="trigger('${this.id}', 'mode', $event.target.value)" value="${this.config.mode}">
                    <option value="html" ${this.config.mode === 'html' ? 'selected' : ''}>HTML</option>
                    <option value="css" ${this.config.mode === 'css' ? 'selected' : ''}>CSS</option>
                    <option value="javascript" ${this.config.mode === 'javascript' ? 'selected' : ''}>JavaScript</option>
                </select>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Raw Code',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>',
            category: 'Advanced',
            allowRawPreview: false
        };
    }

    validateContent() {
        if (!this.config.content) return true;

        switch (this.config.mode) {
            case 'html':
                try {
                    // Check for basic HTML structure issues
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(this.config.content, 'text/html');
                    
                    // Check for parser errors
                    if (doc.querySelector('parsererror')) return false;
                    
                    // Simple tag matching validation
                    const openTags = [];
                    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
                    let match;
                    
                    while ((match = tagRegex.exec(this.config.content)) !== null) {
                        const tagName = match[1].toLowerCase();
                        const isClosing = match[0].startsWith('</');
                        const isSelfClosing = match[0].endsWith('/>') || 
                                            ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'].includes(tagName);
                        
                        if (isSelfClosing) continue;
                        
                        if (isClosing) {
                            if (openTags.length === 0 || openTags.pop() !== tagName) {
                                return false; // Mismatched closing tag
                            }
                        } else {
                            openTags.push(tagName);
                        }
                    }
                    
                    // Check if all tags are closed
                    return openTags.length === 0;
                } catch (e) {
                    return false;
                }

            case 'css':
                try {
                    const style = document.createElement('style');
                    style.textContent = this.config.content;
                    document.head.appendChild(style);
                    document.head.removeChild(style);
                    return true;
                } catch (e) {
                    return false;
                }

            case 'javascript':
                try {
                    new Function(this.config.content);
                    return true;
                } catch (e) {
                    return false;
                }

            default:
                return true;
        }
    }

    processContent() {
        if (!this.config.content) return '';

        switch (this.config.mode) {
            case 'html':
                return this.config.content;

            case 'css':
                // Always scope CSS to prevent conflicts
                return `<style data-block-id="${this.id}">
                    .raw-block[data-block-id="${this.id}"] {
                        ${this.config.content}
                    }
                </style>`;

            case 'javascript':
                // Never execute JavaScript in render mode for security
                return `<pre><code>${this.escapeHtml(this.config.content)}</code></pre>`;

            default:
                return this.config.content;
        }
    }

    editorRender() {
        // Validate that we have an ID before rendering
        if (!this.id || this.id === 'undefined') {
            return `<div class="raw-block-error" style="padding: 20px; background: #fee; border: 2px solid #f00; border-radius: 8px;">
                <h3 style="color: #c00; margin: 0 0 10px 0;">⚠ Raw Block Error</h3>
                <p style="margin: 0;">Block ID is missing or invalid. Please delete and recreate this block.</p>
            </div>`;
        }

        return `<div class="raw-block" data-block-id="${this.id}"
                     x-data="rawCodeEditor()"
                     x-init="init('${this.id}')">
            <div class="code-editor">
                <div class="code-header">
                    <div class="code-header-left">
                        <span class="code-mode" x-text="block ? block.config.mode.toUpperCase() : 'CODE'"></span>
                        <span x-show="!isValid" class="validation-error">⚠ Invalid syntax</span>
                        <span x-show="isValid" class="validation-success">✓ Valid</span>
                    </div>
                    <div class="code-header-right">
                        <button
                            class="toggle-btn"
                            :class="{ 'active': !showPreview }"
                            @click="showPreview = false"
                            type="button">
                            Code
                        </button>
                        <button
                            class="toggle-btn"
                            :class="{ 'active': showPreview }"
                            @click="showPreview = true"
                            type="button">
                            Preview
                        </button>
                    </div>
                </div>
                <textarea
                    x-show="!showPreview"
                    class="code-input"
                    :class="{ 'invalid': !isValid }"
                    @input="handleInput($event)"
                    @blur="if(block) { block.config.content = $event.target.value; }"
                    placeholder="Enter your code here..."
                    :placeholder="block ? 'Enter your ' + block.config.mode + ' code here...' : 'Enter your code here...'"
                    spellcheck="false"
                    autocomplete="off"
                    style="width: 100%; min-height: 200px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; resize: vertical;">${this.config.content}</textarea>
                <div
                    x-show="showPreview"
                    class="preview-content"
                    style="min-height: 200px; border: 1px solid var(--gray-300); border-radius: var(--radius-md); background: white;">

                    <!-- Rich Text Toolbar for Preview -->
                    <div x-show="showPreview && toolbar"
                         class="preview-toolbar-wrapper"
                         style="border-bottom: 1px solid #e5e7eb; padding: 8px;"
                         x-html="toolbar ? toolbar.render() : ''">
                    </div>

                    <div x-ref="previewContainer"
                         contenteditable="true"
                         x-init="initializePreviewContainer($el, block)"
                         @blur="if(block) { block.config.content = $el.innerHTML; }"
                         style="outline: none; cursor: text; min-height: 180px; border: 1px dashed #ccc; padding: 10px; margin: 8px;">
                    </div>
                </div>
            </div>
        </div>`;
    }

    render() {
        return `<div class="raw-block" data-block-id="${this.id}">
            ${this.processContent()}
        </div>`;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

export default Raw;

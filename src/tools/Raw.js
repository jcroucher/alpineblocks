import Tool from '../core/Tool';

// Alpine.js component for Raw code editor
function rawCodeEditor() {
    return {
        isValid: true,
        debounceTimer: null,
        previewContent: '',
        block: null,
        showPreview: false,
        
        init(blockId) {
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
                this.previewContent = this.block.config.content || '';
                this.isValid = this.validateCode(this.block.config.content);
            }
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
        
        handleInput(event) {
            const content = event.target.value;
            
            // Clear existing timer
            clearTimeout(this.debounceTimer);
            
            // Set new timer for debounced update
            this.debounceTimer = setTimeout(() => {
                // Update validation
                this.isValid = this.validateCode(content);
                
                // Always update preview content
                this.previewContent = content;
                
                // Update block config
                if (this.block) {
                    this.block.config.content = content;
                }
                
                // Force Alpine reactivity update
                this.$nextTick && this.$nextTick(() => {
                    // Force re-render
                });
            }, 500); // 500ms debounce
        },
        
        // Add a method to get current preview content for debugging
        getCurrentPreview() {
            return this.previewContent;
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
            content: this.config.content || '',
            mode: this.config.mode || 'html' // html, css, javascript
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
            category: 'Advanced'
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
                    x-init="$el.value = block ? block.config.content : ''; previewContent = $el.value;"
                    @input="handleInput($event)"
                    @blur="if(block) { block.config.content = $event.target.value; previewContent = $event.target.value; }"
                    placeholder="Enter your code here..."
                    :placeholder="block ? 'Enter your ' + block.config.mode + ' code here...' : 'Enter your code here...'"
                    spellcheck="false"
                    autocomplete="off"
                    style="width: 100%; min-height: 200px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; resize: vertical;">${this.config.content}</textarea>
                <div 
                    x-show="showPreview" 
                    class="preview-content" 
                    style="min-height: 200px; border: 1px solid var(--gray-300); border-radius: var(--radius-md); padding: var(--space-4); background: white;">
                    <div x-show="!previewContent || previewContent.trim() === ''" class="preview-placeholder">
                        Enter some HTML code and it will appear here...
                    </div>
                    <div x-show="previewContent && previewContent.trim() !== ''" x-html="previewContent"></div>
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

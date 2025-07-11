import Tool from '../core/Tool';

class Raw extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            content: this.config.content || '',
            mode: this.config.mode || 'html', // html, css, javascript
            executeScript: this.config.executeScript || false,
            validateHtml: this.config.validateHtml || true,
            wrapCss: this.config.wrapCss || true
        };

        this.settings = [
            {
                name: 'mode',
                label: 'Code Type',
                html: `<select @change="trigger('${this.id}', 'mode', $event.target.value)">
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                </select>`
            },
            {
                name: 'executeScript',
                label: 'Execute JavaScript',
                html: `<label x-show="block.config.mode === 'javascript'">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'executeScript', $event.target.checked)"
                        :checked="block.config.executeScript">
                    Execute JavaScript
                </label>`
            },
            {
                name: 'validateHtml',
                label: 'Validate HTML',
                html: `<label x-show="block.config.mode === 'html'">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'validateHtml', $event.target.checked)"
                        :checked="block.config.validateHtml">
                    Validate HTML
                </label>`
            },
            {
                name: 'wrapCss',
                label: 'Scope CSS',
                html: `<label x-show="block.config.mode === 'css'">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'wrapCss', $event.target.checked)"
                        :checked="block.config.wrapCss">
                    Scope CSS
                </label>`
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
                if (!this.config.validateHtml) return true;
                try {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(this.config.content, 'text/html');
                    return !doc.querySelector('parsererror');
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
                if (this.config.wrapCss) {
                    return `<style data-block-id="${this.id}">
                        .raw-block[data-block-id="${this.id}"] {
                            ${this.config.content}
                        }
                    </style>`;
                }
                return `<style>${this.config.content}</style>`;

            case 'javascript':
                if (this.config.executeScript) {
                    return `<script>
                        (function() {
                            ${this.config.content}
                        })();
                    </script>`;
                }
                return `<pre><code>${this.config.content}</code></pre>`;

            default:
                return this.config.content;
        }
    }

    editorRender() {
        const isValid = this.validateContent();
        
        return `<div class="raw-block" data-block-id="${this.id}">
            <div class="code-editor">
                <textarea
                    class="code-input ${!isValid ? 'invalid' : ''}"
                    x-html="block.config.content"
                    @input="block.config.content = $event.target.value"
                    placeholder="Enter your ${this.config.mode} code here..."
                    style="width: 100%; min-height: 200px; font-family: monospace;">${this.config.content}</textarea>
                ${!isValid ? '<div class="validation-error">Invalid code format</div>' : ''}
            </div>
            ${this.config.mode === 'html' ? `
                <div class="preview-section">
                    <h4>Preview:</h4>
                    <div class="preview-content" x-html="block.config.content"></div>
                </div>
            ` : ''}
        </div>`;
    }

    render() {
        return `<div class="raw-block" data-block-id="${this.id}">
            ${this.processContent()}
        </div>`;
    }
}

export default Raw;

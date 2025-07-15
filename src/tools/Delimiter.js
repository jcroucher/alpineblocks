import Tool from '../core/Tool';
import { escapeHtml } from '../utils/HtmlEscape';

class Delimiter extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            style: this.config.style || 'line', // line, dots, asterisks
            color: this.config.color || '#E8E8E8',
            width: this.config.width || '100%',
            thickness: this.config.thickness || '1px',
            spacing: this.config.spacing || '20px',
            alignment: this.config.alignment || 'center'
        };

        this.settings = [
            {
                name: 'style',
                label: 'Delimiter Style',
                html: `<select @change="trigger('${this.id}', 'style', $event.target.value)" value="${this.config.style}">
                    <option value="line" ${this.config.style === 'line' ? 'selected' : ''}>Line</option>
                    <option value="dots" ${this.config.style === 'dots' ? 'selected' : ''}>Dots</option>
                    <option value="asterisks" ${this.config.style === 'asterisks' ? 'selected' : ''}>Asterisks</option>
                </select>`
            },
            {
                name: 'appearance',
                label: 'Appearance',
                html: `<div class="delimiter-appearance">
                    <input type="color" 
                        @change="trigger('${this.id}', 'color', $event.target.value)"
                        value="${escapeHtml(this.config.color)}"
                        title="Color">
                    <input type="text" 
                        @change="trigger('${this.id}', 'width', $event.target.value)"
                        value="${escapeHtml(this.config.width)}"
                        placeholder="Width (%, px)"
                        title="Width">
                    <input type="text" 
                        @change="trigger('${this.id}', 'thickness', $event.target.value)"
                        value="${escapeHtml(this.config.thickness)}"
                        placeholder="Thickness (px)"
                        title="Thickness">
                    <input type="text" 
                        @change="trigger('${this.id}', 'spacing', $event.target.value)"
                        value="${escapeHtml(this.config.spacing)}"
                        placeholder="Spacing (px)"
                        title="Spacing">
                </div>`
            },
            {
                name: 'alignment',
                label: 'Alignment',
                html: `<select @change="trigger('${this.id}', 'alignment', $event.target.value)" value="${this.config.alignment}">
                    <option value="left" ${this.config.alignment === 'left' ? 'selected' : ''}>Left</option>
                    <option value="center" ${this.config.alignment === 'center' ? 'selected' : ''}>Center</option>
                    <option value="right" ${this.config.alignment === 'right' ? 'selected' : ''}>Right</option>
                </select>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Delimiter',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>',
            category: 'Layout',
            allowRawPreview: true
        };
    }

    getDelimiterContent() {
        switch (this.config.style) {
            case 'line':
                return `<hr style="
                    border: none;
                    height: ${this.config.thickness};
                    background-color: ${this.config.color};
                    margin: ${this.config.spacing} auto;">`;
            
            case 'dots':
                return `<div style="
                    text-align: ${this.config.alignment};
                    color: ${this.config.color};
                    margin: ${this.config.spacing} auto;
                    letter-spacing: 8px;
                    font-size: ${parseInt(this.config.thickness) * 4}px;">
                    • • •
                </div>`;
            
            case 'asterisks':
                return `<div style="
                    text-align: ${this.config.alignment};
                    color: ${this.config.color};
                    margin: ${this.config.spacing} auto;
                    letter-spacing: 8px;
                    font-size: ${parseInt(this.config.thickness) * 2}px;">
                    * * *
                </div>`;
                
            default:
                // Default to line style
                return `<hr style="
                    border: none;
                    height: ${this.config.thickness};
                    background-color: ${this.config.color};
                    margin: ${this.config.spacing} auto;">`;
        }
    }

    editorRender() {
        return `<div class="delimiter-block" style="width: ${this.config.width}; margin: 0 auto;">
            ${this.getDelimiterContent()}
        </div>`;
    }

    render() {
        return `<div class="delimiter-block" style="width: ${this.config.width}; margin: 0 auto;">
            ${this.getDelimiterContent()}
        </div>`;
    }

    /**
     * Render the delimiter as a template element with data attributes
     * @param {string} toolId - The tool ID for data attributes
     * @returns {string} HTML string with data attributes
     */
    renderTemplateElement(toolId) {
        return `<div 
            data-tool="Delimiter" 
            data-tool-id="${toolId}"
            class="delimiter-block" 
            style="width: ${this.config.width}; margin: 0 auto; cursor: pointer;">
            ${this.getDelimiterContent()}
        </div>`;
    }
}

export default Delimiter;

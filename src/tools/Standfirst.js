import Tool from '../core/Tool';
import { escapeHtml } from '../utils/HtmlEscape';

class Standfirst extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            content: this.config.content || 'This is a standfirst paragraph that introduces the main content',
            fontSize: this.config.fontSize || 'large', // small, medium, large, xlarge
            fontWeight: this.config.fontWeight || 'normal', // normal, bold, light
            alignment: this.config.alignment || 'left', // left, center, right, justify
            textColor: this.config.textColor || '#333333',
            backgroundColor: this.config.backgroundColor || 'transparent',
            padding: this.config.padding || 'medium', // none, small, medium, large
            showBorder: this.config.showBorder || false,
            borderColor: this.config.borderColor || '#cccccc'
        };

        this.settings = [
            {
                name: 'fontSize',
                label: 'Font Size',
                html: `<select @change="trigger('${this.id}', 'fontSize', $event.target.value)">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Extra Large</option>
                </select>`
            },
            {
                name: 'fontWeight',
                label: 'Font Weight',
                html: `<select @change="trigger('${this.id}', 'fontWeight', $event.target.value)">
                    <option value="light">Light</option>
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                </select>`
            },
            {
                name: 'alignment',
                label: 'Alignment',
                html: `<select @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                </select>`
            },
            {
                name: 'textColor',
                label: 'Text Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'textColor', $event.target.value)"
                    :value="block.config.textColor">`
            },
            {
                name: 'backgroundColor',
                label: 'Background Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'backgroundColor', $event.target.value)"
                    :value="block.config.backgroundColor">`
            },
            {
                name: 'padding',
                label: 'Padding',
                html: `<select @change="trigger('${this.id}', 'padding', $event.target.value)">
                    <option value="none">None</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>`
            },
            {
                name: 'showBorder',
                label: 'Show Border',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showBorder', $event.target.checked)"
                        :checked="block.config.showBorder">
                    Show Border
                </label>`
            },
            {
                name: 'borderColor',
                label: 'Border Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'borderColor', $event.target.value)"
                    :value="block.config.borderColor"
                    x-show="block.config.showBorder">`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Standfirst',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 320c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"/></svg>',
            category: 'Basic',
            allowRawPreview: true
        };
    }

    getStyleObject() {
        const fontSizes = {
            small: '1rem',
            medium: '1.2rem',
            large: '1.5rem',
            xlarge: '1.8rem'
        };

        const paddings = {
            none: '0',
            small: '0.5rem',
            medium: '1rem',
            large: '1.5rem'
        };

        return {
            fontSize: fontSizes[this.config.fontSize] || fontSizes.large,
            fontWeight: this.config.fontWeight,
            textAlign: this.config.alignment,
            color: this.config.textColor,
            backgroundColor: this.config.backgroundColor,
            padding: paddings[this.config.padding] || paddings.medium,
            border: this.config.showBorder ? `1px solid ${this.config.borderColor}` : 'none',
            borderRadius: this.config.showBorder ? '4px' : '0',
            lineHeight: '1.6',
            marginBottom: '1rem'
        };
    }

    getStyleString() {
        const styles = this.getStyleObject();
        return Object.entries(styles)
            .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
            .join('; ');
    }

    editorRender() {
        return `<div class="standfirst-block" style="${this.getStyleString()}">
            <p contenteditable="true"
                x-html="block.config.content"
                @blur="block.config.content = $event.target.innerHTML">${this.config.content}</p>
        </div>`;
    }

    render() {
        return `<div class="standfirst-block" style="${this.getStyleString()}">
            <p>${this.config.content}</p>
        </div>`;
    }

    /**
     * Render the standfirst as a template element with data attributes
     * @param {string} toolId - The tool ID for data attributes
     * @returns {string} HTML string with data attributes
     */
    renderTemplateElement(toolId) {
        return `<div 
            data-tool="Standfirst" 
            data-tool-id="${toolId}"
            class="standfirst-block" 
            style="${this.getStyleString()}; cursor: pointer;">
            <p>${this.config.content}</p>
        </div>`;
    }
}

export default Standfirst;
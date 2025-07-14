import Tool from '../core/Tool';

/**
 * Paragraph tool for creating editable text blocks
 */
class Paragraph extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            content: this.config.content || '<p>Enter your text here...</p>',
            fontSize: this.config.fontSize || 'medium',
            fontWeight: this.config.fontWeight || 'normal',
            alignment: this.config.alignment || 'left',
            lineHeight: this.config.lineHeight || 'normal',
            textColor: this.config.textColor || '#333333',
            backgroundColor: this.config.backgroundColor || 'transparent',
            padding: this.config.padding || 'none',
            margin: this.config.margin || 'normal'
        };

    }

    get settings() {
        return [
            {
                name: 'fontSize',
                label: 'Font Size',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'fontSize', $event.target.value)">
                    ${this.generateSelectOptions([
                        { value: 'small', label: 'Small' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'large', label: 'Large' },
                        { value: 'xlarge', label: 'Extra Large' }
                    ], this.config.fontSize)}
                </select>`
            },
            {
                name: 'fontWeight',
                label: 'Font Weight',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'fontWeight', $event.target.value)">
                    ${this.generateSelectOptions([
                        { value: 'normal', label: 'Normal' },
                        { value: 'bold', label: 'Bold' },
                        { value: 'light', label: 'Light' }
                    ], this.config.fontWeight)}
                </select>`
            },
            {
                name: 'alignment',
                label: 'Text Alignment',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    ${this.generateSelectOptions([
                        { value: 'left', label: 'Left' },
                        { value: 'center', label: 'Center' },
                        { value: 'right', label: 'Right' },
                        { value: 'justify', label: 'Justify' }
                    ], this.config.alignment)}
                </select>`
            },
            {
                name: 'lineHeight',
                label: 'Line Height',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'lineHeight', $event.target.value)">
                    <option value="tight">Tight</option>
                    <option value="normal">Normal</option>
                    <option value="loose">Loose</option>
                </select>`
            },
            {
                name: 'textColor',
                label: 'Text Color',
                html: `<input type="color" class="settings-color-input" 
                    @change="trigger('${this.id}', 'textColor', $event.target.value)"
                    value="${this.config.textColor}">`
            },
            {
                name: 'backgroundColor',
                label: 'Background Color',
                html: `<input type="color" class="settings-color-input" 
                    @change="trigger('${this.id}', 'backgroundColor', $event.target.value)"
                    value="${this.config.backgroundColor === 'transparent' ? '#ffffff' : this.config.backgroundColor}">`
            },
            {
                name: 'padding',
                label: 'Padding',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'padding', $event.target.value)">
                    <option value="none">None</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>`
            },
            {
                name: 'margin',
                label: 'Margin',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'margin', $event.target.value)">
                    <option value="none">None</option>
                    <option value="small">Small</option>
                    <option value="normal">Normal</option>
                    <option value="large">Large</option>
                </select>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Paragraph',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M192 32h64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384l0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-352H288l0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96H192c-88.4 0-160-71.6-160-160s71.6-160 160-160z"/></svg>',
            category: 'Basic'
        };
    }

    /**
     * Generate CSS styles based on configuration
     * @returns {string} CSS style string
     */
    getStyleString() {
        const fontSizes = {
            small: '0.875rem',
            medium: '1rem',
            large: '1.125rem',
            xlarge: '1.25rem'
        };

        const lineHeights = {
            tight: '1.2',
            normal: '1.5',
            loose: '1.8'
        };

        const paddings = {
            none: '0',
            small: '0.5rem',
            medium: '1rem',
            large: '1.5rem'
        };

        const margins = {
            none: '0',
            small: '0.5rem',
            normal: '1rem',
            large: '1.5rem'
        };

        const styles = [];
        
        styles.push(`font-size: ${fontSizes[this.config.fontSize]}`);
        styles.push(`font-weight: ${this.config.fontWeight}`);
        styles.push(`text-align: ${this.config.alignment}`);
        styles.push(`line-height: ${lineHeights[this.config.lineHeight]}`);
        styles.push(`color: ${this.config.textColor}`);
        styles.push(`background-color: ${this.config.backgroundColor}`);
        styles.push(`padding: ${paddings[this.config.padding]}`);
        styles.push(`margin: ${margins[this.config.margin]} 0`);

        return styles.join('; ');
    }

    editorRender() {
        const styleString = this.getStyleString();
        return `<div class="paragraph-block"
                    style="${styleString}"
                    contenteditable="true"
                    x-html="block.config.content"
                    @blur="block.config.content = $event.target.innerHTML">${this.config.content}</div>`;
    }

    render() {
        const styleString = this.getStyleString();
        return `<div class="paragraph-block" style="${styleString}">${this.config.content}</div>`;
    }

    /**
     * Render the paragraph as a template element with data attributes
     * @param {string} toolId - The tool ID for data attributes
     * @returns {string} HTML string with data attributes
     */
    renderTemplateElement(toolId) {
        const styleString = this.getStyleString();
        return `<p 
            data-tool="Paragraph" 
            data-tool-id="${toolId}"
            style="${styleString}; cursor: pointer;"
        >${this.config.content}</p>`;
    }
}

export default Paragraph;
import Tool from '../core/Tool';

class Header extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        // Default config if not provided
        this.config = {
            content: this.config.content || 'Heading Text',
            level: this.config.level || 'h2',
            alignment: this.config.alignment || 'left',
            anchor: this.config.anchor || '',
            fontSize: this.config.fontSize || 'default',
            fontWeight: this.config.fontWeight || 'normal',
            textColor: this.config.textColor || '#333333'
        };

        // Store the base ID for use in the getter
        this._id = id;
    }

    get settings() {
        return [
            {
                name: 'level',
                label: 'Heading Level',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'level', $event.target.value)">
                    <option value="h1" ${this.config.level === 'h1' ? 'selected' : ''}>H1</option>
                    <option value="h2" ${this.config.level === 'h2' ? 'selected' : ''}>H2</option>
                    <option value="h3" ${this.config.level === 'h3' ? 'selected' : ''}>H3</option>
                    <option value="h4" ${this.config.level === 'h4' ? 'selected' : ''}>H4</option>
                    <option value="h5" ${this.config.level === 'h5' ? 'selected' : ''}>H5</option>
                    <option value="h6" ${this.config.level === 'h6' ? 'selected' : ''}>H6</option>
                </select>`
            },
            {
                name: 'alignment',
                label: 'Text Alignment',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left" ${this.config.alignment === 'left' ? 'selected' : ''}>Left</option>
                    <option value="center" ${this.config.alignment === 'center' ? 'selected' : ''}>Center</option>
                    <option value="right" ${this.config.alignment === 'right' ? 'selected' : ''}>Right</option>
                    <option value="justify" ${this.config.alignment === 'justify' ? 'selected' : ''}>Justify</option>
                </select>`
            },
            {
                name: 'anchor',
                label: 'Anchor ID',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'anchor', $event.target.value)"
                    value="${this.config.anchor}"
                    placeholder="Optional anchor ID">`
            },
            {
                name: 'fontSize',
                label: 'Font Size',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'fontSize', $event.target.value)">
                    <option value="small" ${this.config.fontSize === 'small' ? 'selected' : ''}>Small</option>
                    <option value="default" ${this.config.fontSize === 'default' ? 'selected' : ''}>Default</option>
                    <option value="large" ${this.config.fontSize === 'large' ? 'selected' : ''}>Large</option>
                    <option value="xlarge" ${this.config.fontSize === 'xlarge' ? 'selected' : ''}>Extra Large</option>
                </select>`
            },
            {
                name: 'fontWeight',
                label: 'Font Weight',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'fontWeight', $event.target.value)">
                    <option value="normal" ${this.config.fontWeight === 'normal' ? 'selected' : ''}>Normal</option>
                    <option value="bold" ${this.config.fontWeight === 'bold' ? 'selected' : ''}>Bold</option>
                    <option value="lighter" ${this.config.fontWeight === 'lighter' ? 'selected' : ''}>Lighter</option>
                </select>`
            },
            {
                name: 'textColor',
                label: 'Text Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'textColor', $event.target.value)"
                    value="${this.config.textColor}">`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Header',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z"/></svg>',
            category: 'Basic'
        };
    }

    getStyleString() {
        const fontSizes = {
            small: '0.875rem',
            default: '',
            large: '1.25rem',
            xlarge: '1.5rem'
        };

        const styles = [];
        if (this.config.alignment) styles.push(`text-align: ${this.config.alignment}`);
        if (this.config.fontSize && this.config.fontSize !== 'default') {
            styles.push(`font-size: ${fontSizes[this.config.fontSize]}`);
        }
        if (this.config.fontWeight) styles.push(`font-weight: ${this.config.fontWeight}`);
        if (this.config.textColor) styles.push(`color: ${this.config.textColor}`);

        return styles.join('; ');
    }

    editorRender() {
        const styleString = this.getStyleString();
        const anchorId = this.config.anchor ? `id="${this.config.anchor}"` : '';
        
        return `<${this.config.level} 
            class="header-block"
            ${anchorId}
            style="${styleString}"
            contenteditable="true"
            x-html="block.config.content"
            @blur="block.config.content = $event.target.innerHTML"></${this.config.level}>`;
    }

    render() {
        const styleString = this.getStyleString();
        const anchorId = this.config.anchor ? `id="${this.config.anchor}"` : '';
        
        return `<${this.config.level} ${anchorId} style="${styleString}">${this.config.content}</${this.config.level}>`;
    }

    /**
     * Render the header as a template element with data attributes
     * @param {string} toolId - The tool ID for data attributes
     * @returns {string} HTML string with data attributes
     */
    renderTemplateElement(toolId) {
        const styleString = this.getStyleString();
        const anchorId = this.config.anchor ? `id="${this.config.anchor}"` : '';
        
        return `<${this.config.level} 
            data-tool="Header" 
            data-tool-id="${toolId}"
            ${anchorId}
            style="${styleString}; cursor: pointer;"
        >${this.config.content}</${this.config.level}>`;
    }
}

export default Header;
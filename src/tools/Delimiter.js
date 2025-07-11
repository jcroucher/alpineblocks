import Tool from '../core/Tool';

class Delimiter extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            style: this.config.style || 'line', // line, dots, asterisks, custom
            color: this.config.color || '#E8E8E8',
            width: this.config.width || '100%',
            thickness: this.config.thickness || '1px',
            spacing: this.config.spacing || '20px',
            alignment: this.config.alignment || 'center',
            customText: this.config.customText || '***'
        };

        this.settings = [
            {
                name: 'style',
                label: 'Delimiter Style',
                html: `<select @change="trigger('${this.id}', 'style', $event.target.value)">
                    <option value="line">Line</option>
                    <option value="dots">Dots</option>
                    <option value="asterisks">Asterisks</option>
                    <option value="custom">Custom Text</option>
                </select>`
            },
            {
                name: 'customText',
                label: 'Custom Text',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'customText', $event.target.value)"
                    :value="block.config.customText"
                    x-show="block.config.style === 'custom'"
                    placeholder="Enter custom delimiter text">`
            },
            {
                name: 'appearance',
                label: 'Appearance',
                html: `<div class="delimiter-appearance">
                    <input type="color" 
                        @change="trigger('${this.id}', 'color', $event.target.value)"
                        :value="block.config.color"
                        title="Color">
                    <input type="text" 
                        @change="trigger('${this.id}', 'width', $event.target.value)"
                        :value="block.config.width"
                        placeholder="Width (%, px)"
                        title="Width">
                    <input type="text" 
                        @change="trigger('${this.id}', 'thickness', $event.target.value)"
                        :value="block.config.thickness"
                        placeholder="Thickness (px)"
                        title="Thickness">
                    <input type="text" 
                        @change="trigger('${this.id}', 'spacing', $event.target.value)"
                        :value="block.config.spacing"
                        placeholder="Spacing (px)"
                        title="Spacing">
                </div>`
            },
            {
                name: 'alignment',
                label: 'Alignment',
                html: `<select @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Delimiter',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>',
            category: 'Layout'
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
            
            case 'custom':
                return `<div style="
                    text-align: ${this.config.alignment};
                    color: ${this.config.color};
                    margin: ${this.config.spacing} auto;
                    font-size: ${parseInt(this.config.thickness) * 2}px;">
                    ${this.config.customText}
                </div>`;
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
}

export default Delimiter;

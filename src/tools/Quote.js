/*class: Quote,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+O',
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author',
      },*/

import Tool from '../core/Tool';

class Quote extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            content: this.config.content || 'Enter your quote here',
            attribution: this.config.attribution || '',
            style: this.config.style || 'default',
            alignment: this.config.alignment || 'left',
            fontSize: this.config.fontSize || 'medium',
            fontStyle: this.config.fontStyle || 'italic',
            borderStyle: this.config.borderStyle || 'left',
            backgroundColor: this.config.backgroundColor || 'transparent',
            textColor: this.config.textColor || '#333333',
            borderColor: this.config.borderColor || '#cccccc'
        };

        this.settings = [
            {
                name: 'style',
                label: 'Quote Style',
                html: `<select @change="trigger('${this.id}', 'style', $event.target.value)">
                    <option value="default">Default</option>
                    <option value="blockquote">Block Quote</option>
                    <option value="pullquote">Pull Quote</option>
                    <option value="testimonial">Testimonial</option>
                </select>`
            },
            {
                name: 'alignment',
                label: 'Alignment',
                html: `<select @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>`
            },
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
                name: 'fontStyle',
                label: 'Font Style',
                html: `<select @change="trigger('${this.id}', 'fontStyle', $event.target.value)">
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                    <option value="oblique">Oblique</option>
                </select>`
            },
            {
                name: 'borderStyle',
                label: 'Border Style',
                html: `<select @change="trigger('${this.id}', 'borderStyle', $event.target.value)">
                    <option value="none">None</option>
                    <option value="left">Left Border</option>
                    <option value="top">Top Border</option>
                    <option value="bottom">Bottom Border</option>
                    <option value="full">Full Border</option>
                </select>`
            },
            {
                name: 'textColor',
                label: 'Text Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'textColor', $event.target.value)"
                    value="${this.config.textColor}">`
            },
            {
                name: 'backgroundColor',
                label: 'Background Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'backgroundColor', $event.target.value)"
                    value="${this.config.backgroundColor === 'transparent' ? '#ffffff' : this.config.backgroundColor}">`
            },
            {
                name: 'borderColor',
                label: 'Border Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'borderColor', $event.target.value)"
                    value="${this.config.borderColor}"
                    ${this.config.borderStyle === 'none' ? 'style="display:none"' : ''}>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Quote',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V216z"/></svg>',
            category: 'Basic'
        };
    }

    getBorderStyle() {
        const borderWidth = '3px';
        const borderColor = this.config.borderColor;
        
        switch (this.config.borderStyle) {
            case 'left':
                return `border-left: ${borderWidth} solid ${borderColor}`;
            case 'top':
                return `border-top: ${borderWidth} solid ${borderColor}`;
            case 'bottom':
                return `border-bottom: ${borderWidth} solid ${borderColor}`;
            case 'full':
                return `border: 1px solid ${borderColor}`;
            default:
                return 'border: none';
        }
    }

    getStyleString() {
        const fontSizes = {
            small: '0.875rem',
            medium: '1rem',
            large: '1.25rem',
            xlarge: '1.5rem'
        };

        const styles = [];
        
        styles.push(`text-align: ${this.config.alignment}`);
        styles.push(`font-size: ${fontSizes[this.config.fontSize]}`);
        styles.push(`font-style: ${this.config.fontStyle}`);
        styles.push(`color: ${this.config.textColor}`);
        styles.push(`background-color: ${this.config.backgroundColor}`);
        styles.push(this.getBorderStyle());
        styles.push('padding: 1rem');
        styles.push('margin: 1rem 0');
        
        if (this.config.borderStyle === 'left') {
            styles.push('padding-left: 1.5rem');
        }

        return styles.join('; ');
    }

    editorRender() {
        const styleString = this.getStyleString();
        return `<blockquote class="quote-block quote-${this.config.style}" style="${styleString}">
            <div class="quote-content"
                contenteditable="true"
                x-html="block.config.content"
                @blur="block.config.content = $event.target.innerHTML">${this.config.content}</div>
            <cite class="quote-attribution"
                contenteditable="true"
                x-html="block.config.attribution"
                @blur="block.config.attribution = $event.target.innerHTML"
                x-show="block.config.attribution.length > 0"
                style="font-style: normal; font-size: 0.875rem; margin-top: 0.5rem; display: block;">${this.config.attribution}</cite>
        </blockquote>`;
    }

    render() {
        const styleString = this.getStyleString();
        return `<blockquote class="quote-block quote-${this.config.style}" style="${styleString}">
            <div class="quote-content">${this.config.content}</div>
            ${this.config.attribution ? `<cite class="quote-attribution" style="font-style: normal; font-size: 0.875rem; margin-top: 0.5rem; display: block;">${this.config.attribution}</cite>` : ''}
        </blockquote>`;
    }
}

export default Quote;
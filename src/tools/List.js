import Tool from '../core/Tool';
import { escapeHtml } from '../utils/HtmlEscape';

class List extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            content: this.config.content || '<li>List item 1</li><li>List item 2</li><li>List item 3</li>',
            type: this.config.type || 'ul',
            style: this.config.style || 'default',
            indentation: this.config.indentation || 'normal',
            spacing: this.config.spacing || 'normal'
        };

        this.settings = [
            {
                name: 'type',
                label: 'List Type',
                html: `<select @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="ul">Unordered List</option>
                    <option value="ol">Ordered List</option>
                </select>`
            },
            {
                name: 'style',
                label: 'List Style',
                html: `<select @change="trigger('${this.id}', 'style', $event.target.value)">
                    <option value="default">Default</option>
                    <option value="none">None</option>
                    <option value="disc">Disc</option>
                    <option value="circle">Circle</option>
                    <option value="square">Square</option>
                    <option value="decimal">Numbers</option>
                    <option value="lower-alpha">Lower Alpha</option>
                    <option value="upper-alpha">Upper Alpha</option>
                    <option value="lower-roman">Lower Roman</option>
                    <option value="upper-roman">Upper Roman</option>
                </select>`
            },
            {
                name: 'indentation',
                label: 'Indentation',
                html: `<select @change="trigger('${this.id}', 'indentation', $event.target.value)">
                    <option value="minimal">Minimal</option>
                    <option value="normal">Normal</option>
                    <option value="extended">Extended</option>
                </select>`
            },
            {
                name: 'spacing',
                label: 'Item Spacing',
                html: `<select @change="trigger('${this.id}', 'spacing', $event.target.value)">
                    <option value="compact">Compact</option>
                    <option value="normal">Normal</option>
                    <option value="loose">Loose</option>
                </select>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'List',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>',
            category: 'Basic',
            allowRawPreview: true
        };
    }

    getStyleString() {
        const indentations = {
            minimal: '1rem',
            normal: '2rem',
            extended: '3rem'
        };

        const spacings = {
            compact: '0.25rem',
            normal: '0.5rem',
            loose: '1rem'
        };

        const styles = [];
        
        if (this.config.style && this.config.style !== 'default') {
            styles.push(`list-style-type: ${this.config.style}`);
        }
        
        if (this.config.indentation) {
            styles.push(`padding-left: ${indentations[this.config.indentation]}`);
        }
        
        if (this.config.spacing) {
            styles.push(`margin-bottom: ${spacings[this.config.spacing]}`);
        }

        return styles.join('; ');
    }

    editorRender() {
        const styleString = this.getStyleString();
        return `<${this.config.type} 
            class="list-block"
            style="${styleString}"
            contenteditable="true"
            x-html="block.config.content"
            @blur="block.config.content = $event.target.innerHTML"
            @keydown.enter.prevent="$event.target.innerHTML += '<li>New item</li>'">${this.config.content}</${this.config.type}>`;
    }

    render() {
        const styleString = this.getStyleString();
        return `<${this.config.type} style="${styleString}">${this.config.content}</${this.config.type}>`;
    }

    /**
     * Render the list as a template element with data attributes
     * @param {string} toolId - The tool ID for data attributes
     * @returns {string} HTML string with data attributes
     */
    renderTemplateElement(toolId) {
        const styleString = this.getStyleString();
        return `<${this.config.type} 
            data-tool="List" 
            data-tool-id="${toolId}"
            style="${styleString}; cursor: pointer;">${this.config.content}</${this.config.type}>`;
    }
}

export default List;

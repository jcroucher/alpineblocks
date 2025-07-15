import Tool from '../core/Tool';
import { escapeHtml } from '../utils/HtmlEscape';

class Warning extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            title: this.config.title || 'Warning',
            content: this.config.content || 'This is a warning message',
            type: this.config.type || 'warning', // warning, danger, caution
            dismissible: this.config.dismissible || false,
            icon: this.config.icon || true
        };

        this.settings = [
            {
                name: 'title',
                label: 'Title',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'title', $event.target.value)"
                    value="${escapeHtml(this.config.title)}"
                    placeholder="Warning title">`
            },
            {
                name: 'type',
                label: 'Warning Type',
                html: `<select @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="warning">Warning</option>
                    <option value="danger">Danger</option>
                    <option value="caution">Caution</option>
                </select>`
            },
            {
                name: 'dismissible',
                label: 'Dismissible',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'dismissible', $event.target.checked)"
                        :checked="block.config.dismissible">
                    Dismissible
                </label>`
            },
            {
                name: 'icon',
                label: 'Show Icon',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'icon', $event.target.checked)"
                        :checked="block.config.icon">
                    Show Icon
                </label>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Warning',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',
            category: 'Basic',
            allowRawPreview: true
        };
    }

    getIcon() {
        const icons = {
            warning: '<svg class="warning-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',
            danger: '<svg class="warning-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',
            caution: '<svg class="warning-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>'
        };
        return icons[this.config.type] || icons.warning;
    }

    editorRender() {
        return `<div class="warning-block warning-${this.config.type}">
            ${this.config.icon ? this.getIcon() : ''}
            <div class="warning-content">
                <h4 class="warning-title"
                    contenteditable="true"
                    x-html="block.config.title"
                    @blur="block.config.title = $event.target.innerHTML">${this.config.title}</h4>
                <div class="warning-message"
                    contenteditable="true"
                    x-html="block.config.content"
                    @blur="block.config.content = $event.target.innerHTML">${this.config.content}</div>
            </div>
            ${this.config.dismissible ? '<button class="warning-dismiss" @click="$el.closest(\'.warning-block\').remove()">×</button>' : ''}
        </div>`;
    }

    render() {
        return `<div class="warning-block warning-${this.config.type}">
            ${this.config.icon ? this.getIcon() : ''}
            <div class="warning-content">
                <h4 class="warning-title">${this.config.title}</h4>
                <div class="warning-message">${this.config.content}</div>
            </div>
            ${this.config.dismissible ? '<button class="warning-dismiss">×</button>' : ''}
        </div>`;
    }

    /**
     * Render the warning as a template element with data attributes
     * @param {string} toolId - The tool ID for data attributes
     * @returns {string} HTML string with data attributes
     */
    renderTemplateElement(toolId) {
        return `<div 
            data-tool="Warning" 
            data-tool-id="${toolId}"
            class="warning-block warning-${this.config.type}"
            style="cursor: pointer;">
            ${this.config.icon ? this.getIcon() : ''}
            <div class="warning-content">
                <h4 class="warning-title">${this.config.title}</h4>
                <div class="warning-message">${this.config.content}</div>
            </div>
            ${this.config.dismissible ? '<button class="warning-dismiss">×</button>' : ''}
        </div>`;
    }
}

export default Warning;
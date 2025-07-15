/*
alert: {
      class: Alert,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+A',
      config: {
        alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
        defaultType: 'primary',
        messagePlaceholder: 'Enter something',
      },
    },
 */

import Tool from '../core/Tool';
import { escapeHtml } from '../utils/HtmlEscape';

class Alert extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            content: this.config.content || 'Alert message goes here',
            type: this.config.type || 'info',
            dismissible: this.config.dismissible || false,
            icon: this.config.icon || true
        };

        this.settings = [
            {
                name: 'type',
                label: 'Alert Type',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                </select>`
            },
            {
                name: 'dismissible',
                label: 'Dismissible',
                html: `<label class="settings-checkbox">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'dismissible', $event.target.checked)"
                        :checked="${this.config.dismissible}">
                    <span class="settings-checkbox-label">Dismissible</span>
                </label>`
            },
            {
                name: 'icon',
                label: 'Show Icon',
                html: `<label class="settings-checkbox">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'icon', $event.target.checked)"
                        :checked="${this.config.icon}">
                    <span class="settings-checkbox-label">Show Icon</span>
                </label>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Alert',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',
            category: 'Basic',
            allowRawPreview: true
        };
    }

    getIcon() {
        const icons = {
            info: '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>',
            success: '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>',
            warning: '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',
            error: '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>'
        };
        return icons[this.config.type] || icons.info;
    }

    editorRender() {
        return `<div class="alert-block alert-${this.config.type}">
            ${this.config.icon ? this.getIcon() : ''}
            <div class="alert-content"
                contenteditable="true"
                x-html="block.config.content"
                @blur="block.config.content = $event.target.innerHTML"></div>
            ${this.config.dismissible ? '<button class="alert-dismiss" @click="$el.closest(\'.alert-block\').remove()">×</button>' : ''}
        </div>`;
    }

    render() {
        return `<div class="alert-block alert-${this.config.type}">
            ${this.config.icon ? this.getIcon() : ''}
            <div class="alert-content">${this.config.content}</div>
            ${this.config.dismissible ? '<button class="alert-dismiss">×</button>' : ''}
        </div>`;
    }

    /**
     * Render the alert as a template element with data attributes
     * @param {string} toolId - The tool ID for data attributes
     * @returns {string} HTML string with data attributes
     */
    renderTemplateElement(toolId) {
        return `<div 
            data-tool="Alert" 
            data-tool-id="${toolId}"
            class="alert-block alert-${this.config.type}"
            style="cursor: pointer;">
            ${this.config.icon ? this.getIcon() : ''}
            <div class="alert-content">${this.config.content}</div>
            ${this.config.dismissible ? '<button class="alert-dismiss">×</button>' : ''}
        </div>`;
    }
}

export default Alert;
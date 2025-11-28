import Tool from '../core/Tool';
import { CommonEditorToolbar } from '../core/CommonEditorToolbar';

class WYSIWYG extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            content: this.config.content || '<p>Start typing here...</p>',
            format: this.config.format || 'div',
            features: this.config.features || {
                bold: true,
                italic: true,
                underline: true,
                strikethrough: true,
                formatBlock: true,
                lists: true,
                links: true,
                alignment: true,
                indentation: true,
                textColor: true,
                backgroundColor: true,
                fontSize: true,
                fontFamily: true
            }
        };

        this.editorId = `wysiwyg-${this.id}`;
        this.toolbar = null;

        this.settings = [
            {
                name: 'format',
                label: 'Block Format',
                html: `<select @change="trigger('${this.id}', 'format', $event.target.value)">
                    <option value="div" ${this.config.format === 'div' ? 'selected' : ''}>Plain</option>
                    <option value="p" ${this.config.format === 'p' ? 'selected' : ''}>Paragraph</option>
                    <option value="pre" ${this.config.format === 'pre' ? 'selected' : ''}>Preformatted</option>
                </select>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Rich Text',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>',
            category: 'Basic',
            allowRawPreview: false
        };
    }

    init() {
        // Initialize toolbar
        this.toolbar = new CommonEditorToolbar({
            className: 'wysiwyg-toolbar',
            features: this.config.features
        });
    }

    editorRender() {
        // Return editor with toolbar
        return `<div class="wysiwyg-editor-wrapper"
                     style="border: 1px solid #e5e7eb; border-radius: 4px; overflow: hidden;"
                     x-data="{ editorId: '${this.editorId}' }"
                     x-init="
                        // Setup toolbar command handler
                        $nextTick(() => {
                            const editor = document.getElementById('${this.editorId}');
                            if (editor) {
                                $el.handleToolbarCommand = (command, value) => {
                                    editor.focus();
                                    try {
                                        document.execCommand(command, false, value);
                                    } catch (error) {
                                        console.warn('Command execution failed:', command, error);
                                    }
                                };
                            }
                        });
                     ">
            <!-- Toolbar -->
            <div class="wysiwyg-toolbar-container">
                ${this.toolbar ? this.toolbar.render(this.editorId) : ''}
            </div>

            <!-- Editor -->
            <div id="${this.editorId}"
                 class="wysiwyg-content"
                 contenteditable="true"
                 @blur="if(block) { block.config.content = $el.innerHTML; }"
                 @input="if(block) { block.config.content = $el.innerHTML; }"
                 style="min-height: 200px; padding: 12px; outline: none; background: white;">${this.config.content}</div>
        </div>`;
    }

    render() {
        return `<${this.config.format} class="wysiwyg-content">${this.config.content}</${this.config.format}>`;
    }
}

export default WYSIWYG;

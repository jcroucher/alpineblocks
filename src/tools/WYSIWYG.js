import Tool from '../core/Tool';

class WYSIWYG extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            content: this.config.content || 'Start typing here...',
            format: this.config.format || 'p'
        };

        this.settings = [
            {
                name: 'format',
                label: 'Block Format',
                html: `<select @change="trigger('${this.id}', 'format', $event.target.value)">
                    <option value="p">Paragraph</option>
                    <option value="div">Plain</option>
                    <option value="pre">Preformatted</option>
                </select>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Rich Text',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>',
            category: 'Basic'
        };
    }

    editorRender() {
        return `<div class="wysiwyg-editor">
            <div class="wysiwyg-toolbar">
                <div class="wysiwyg-toolbar-group">
                    <button class="wysiwyg-btn wysiwyg-btn-bold" 
                            @click="document.execCommand('bold')" 
                            title="Bold">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                        </svg>
                    </button>
                    <button class="wysiwyg-btn wysiwyg-btn-italic" 
                            @click="document.execCommand('italic')" 
                            title="Italic">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="19" y1="4" x2="10" y2="4"/>
                            <line x1="14" y1="20" x2="5" y2="20"/>
                            <line x1="15" y1="4" x2="9" y2="20"/>
                        </svg>
                    </button>
                    <button class="wysiwyg-btn wysiwyg-btn-underline" 
                            @click="document.execCommand('underline')" 
                            title="Underline">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
                            <line x1="4" y1="20" x2="20" y2="20"/>
                        </svg>
                    </button>
                    <button class="wysiwyg-btn wysiwyg-btn-strike" 
                            @click="document.execCommand('strikeThrough')" 
                            title="Strikethrough">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 4H9a3 3 0 0 0-2.83 4"/>
                            <path d="M14 12a4 4 0 0 1 0 8H6"/>
                            <line x1="4" y1="12" x2="20" y2="12"/>
                        </svg>
                    </button>
                </div>
                
                <div class="wysiwyg-toolbar-separator"></div>
                
                <div class="wysiwyg-toolbar-group">
                    <select class="wysiwyg-select" 
                            @change="document.execCommand('formatBlock', false, $event.target.value)"
                            title="Format">
                        <option value="p">Paragraph</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                        <option value="h4">Heading 4</option>
                        <option value="h5">Heading 5</option>
                        <option value="h6">Heading 6</option>
                        <option value="blockquote">Quote</option>
                    </select>
                </div>
                
                <div class="wysiwyg-toolbar-separator"></div>
                
                <div class="wysiwyg-toolbar-group">
                    <button class="wysiwyg-btn wysiwyg-btn-ul" 
                            @click="document.execCommand('insertUnorderedList')" 
                            title="Bullet List">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="8" y1="6" x2="21" y2="6"/>
                            <line x1="8" y1="12" x2="21" y2="12"/>
                            <line x1="8" y1="18" x2="21" y2="18"/>
                            <line x1="3" y1="6" x2="3.01" y2="6"/>
                            <line x1="3" y1="12" x2="3.01" y2="12"/>
                            <line x1="3" y1="18" x2="3.01" y2="18"/>
                        </svg>
                    </button>
                    <button class="wysiwyg-btn wysiwyg-btn-ol" 
                            @click="document.execCommand('insertOrderedList')" 
                            title="Numbered List">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="10" y1="6" x2="21" y2="6"/>
                            <line x1="10" y1="12" x2="21" y2="12"/>
                            <line x1="10" y1="18" x2="21" y2="18"/>
                            <path d="M4 6h1v4"/>
                            <path d="M4 10h2"/>
                            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
                        </svg>
                    </button>
                </div>
                
                <div class="wysiwyg-toolbar-separator"></div>
                
                <div class="wysiwyg-toolbar-group">
                    <button class="wysiwyg-btn wysiwyg-btn-link" 
                            @click="document.execCommand('createLink', false, prompt('Enter link URL'))" 
                            title="Insert Link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"/>
                            <line x1="8" y1="12" x2="16" y2="12"/>
                        </svg>
                    </button>
                    <button class="wysiwyg-btn wysiwyg-btn-unlink" 
                            @click="document.execCommand('unlink')" 
                            title="Remove Link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18.84 12.25l1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07a5.006 5.006 0 0 0-7.07-.12l-1.71 1.72"/>
                            <path d="M5.17 11.75l-1.72 1.71a5.004 5.004 0 0 0 .12 7.07a5.006 5.006 0 0 0 7.07.12l1.71-1.72"/>
                            <line x1="8" y1="2" x2="8" y2="5"/>
                            <line x1="2" y1="8" x2="5" y2="8"/>
                            <line x1="16" y1="14" x2="16" y2="17"/>
                            <line x1="14" y1="16" x2="17" y2="16"/>
                        </svg>
                    </button>
                </div>
            </div>
            <${this.config.format} 
                class="wysiwyg-content"
                contenteditable="true"
                x-html="block.config.content"
                @blur="block.config.content = $event.target.innerHTML"
                @paste="$event.preventDefault(); document.execCommand('insertText', false, $event.clipboardData.getData('text/plain'))"
            ></${this.config.format}>
        </div>`;
    }

    render() {
        return `<${this.config.format} class="wysiwyg-content">${this.config.content}</${this.config.format}>`;
    }
}

export default WYSIWYG;

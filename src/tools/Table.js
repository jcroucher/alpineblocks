import Tool from '../core/Tool';
import { escapeHtml } from '../utils/HtmlEscape';

class Table extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            content: this.config.content || this.getDefaultTable(),
            hasHeader: this.config.hasHeader || true,
            bordered: this.config.bordered || true,
            striped: this.config.striped || false
        };

        this.settings = [
            {
                name: 'hasHeader',
                label: 'Header Row',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'hasHeader', $event.target.checked)"
                        :checked="block.config.hasHeader">
                    Header Row
                </label>`
            },
            {
                name: 'bordered',
                label: 'Bordered',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'bordered', $event.target.checked)"
                        :checked="block.config.bordered">
                    Bordered
                </label>`
            },
            {
                name: 'striped',
                label: 'Striped Rows',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'striped', $event.target.checked)"
                        :checked="block.config.striped">
                    Striped Rows
                </label>`
            }
        ];
    }

    getDefaultTable() {
        return `<tr><th>Header 1</th><th>Header 2</th><th>Header 3</th></tr>
                <tr><td>Row 1, Cell 1</td><td>Row 1, Cell 2</td><td>Row 1, Cell 3</td></tr>
                <tr><td>Row 2, Cell 1</td><td>Row 2, Cell 2</td><td>Row 2, Cell 3</td></tr>`;
    }

    static toolbox() {
        return {
            name: 'Table',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 256V160H224v96H64zm0 64H224v96H64V320zm224 96V320H448v96H288zM448 256H288V160H448v96zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/></svg>',
            category: 'Basic',
            allowRawPreview: false
        };
    }

    editorRender() {
        const tableClasses = [
            'table-block',
            this.config.bordered ? 'table-bordered' : '',
            this.config.striped ? 'table-striped' : ''
        ].filter(Boolean).join(' ');

        return `<div class="table-wrapper">
            <table class="${tableClasses}">
                <tbody
                    contenteditable="true"
                    x-html="block.config.content"
                    @blur="block.config.content = $event.target.innerHTML"
                    @keydown.enter.prevent="$event.target.closest('td, th').insertAdjacentHTML('afterend', '<td>New cell</td>')"
                    @keydown.tab.prevent="$event.target.closest('tr').insertAdjacentHTML('afterend', '<tr><td>New row</td></tr>')">
                </tbody>
            </table>
            <div class="table-controls">
                <button @click="block.config.content += '<tr>' + Array($el.closest('table').rows[0].cells.length).fill('<td>New cell</td>').join('') + '</tr>'">Add Row</button>
                <button @click="$el.closest('table').rows.forEach(row => row.insertCell(-1).textContent = 'New cell')">Add Column</button>
            </div>
        </div>`;
    }

    render() {
        const tableClasses = [
            'table-block',
            this.config.bordered ? 'table-bordered' : '',
            this.config.striped ? 'table-striped' : ''
        ].filter(Boolean).join(' ');

        return `<table class="${tableClasses}">
            <tbody>${this.config.content}</tbody>
        </table>`;
    }
}

export default Table;

import { Debug } from '../utils/Debug';

export class InlineToolbar {
    constructor() {
        this.tools = [];
        this.editor = null;
        this.inlineToolbar = null;
    }

    init(editor) {
        this.editor = editor;
        // Create a new div element
        this.inlineToolbar = document.createElement('div');

        // Set the text content of the div
        this.inlineToolbar.textContent = "Hello";
        this.inlineToolbar.id = 'your-toolbar-id';

        // Style the div for proper positioning and visibility
        this.inlineToolbar.style.position = 'absolute';
        this.inlineToolbar.style.backgroundColor = 'white';
        this.inlineToolbar.style.border = '1px solid black';
        this.inlineToolbar.style.padding = '8px';
        this.inlineToolbar.style.display = 'none';

        this.inlineToolbar.innerHTML = `<button onclick=" const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const isBold = selection.anchorNode.parentNode.nodeName === 'STRONG';

            if (!isBold) {
                // Create a strong tag and wrap it around the selection
                const strongTag = document.createElement('strong');
                strongTag.appendChild(range.extractContents());
                range.insertNode(strongTag);
                strongTag.parentNode.normalize();
            }
    
            // Normalize the container to merge any adjacent text nodes
            ">Link</button>`;

        document.body.appendChild(this.inlineToolbar);

        document.getElementById('your-toolbar-id').addEventListener('mousedown', function(event) {
            event.preventDefault();  // Prevents losing focus
        });

        window.addEventListener('editor-show-inline-toolbar', event => {
            Debug.debug('Show inline toolbar event:', event);
            this.inlineToolbar.style.left = `${event.detail.event.clientX}px`;
            this.inlineToolbar.style.top = `${event.detail.event.clientY}px`;
            this.inlineToolbar.style.display = 'block';
        });

        window.addEventListener('editor-hide-inline-toolbar', event => {
            this.inlineToolbar.style.display = 'none';
        });
    }
}
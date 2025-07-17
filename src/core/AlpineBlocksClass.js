/**
 * AlpineBlocks class for external programmatic usage
 * Provides a class-based interface for initializing and managing AlpineBlocks editors
 */
export default class AlpineBlocks {
    constructor(config = {}) {
        this.config = {
            holder: config.holder || null,
            tools: config.tools || [],
            media: config.media || null,
            ...config
        };
        this.instance = null;
        this.holder = this.config.holder;
    }

    // Static method for global configuration
    static configure(config) {
        if (!window.AlpineBlocksConfig) {
            window.AlpineBlocksConfig = {};
        }
        Object.assign(window.AlpineBlocksConfig, config);
    }

    async init() {
        if (!this.holder) {
            throw new Error('AlpineBlocks: holder element is required');
        }

        // Ensure Alpine is available
        if (!window.Alpine) {
            throw new Error('AlpineBlocks: Alpine.js is required');
        }

        // Set up the holder element with proper Alpine.js structure
        this.holder.innerHTML = `
            <div class="alpine-blocks-editor" id="${this.holder.id || 'alpine-editor'}" x-data="alpineEditor()">
                <div class="editor-area">
                    <div class="editor-content" x-ref="editorContent">
                        <template x-for="block in blocks" :key="block.id">
                            <div x-html="block.editorRender()"></div>
                        </template>
                    </div>
                </div>
            </div>
        `;

        // Configure the editor with tools
        if (this.config.tools.length > 0) {
            this.holder.querySelector('[x-data]').setAttribute('x-data', 
                `alpineEditor({ tools: ${JSON.stringify(this.config.tools)}, media: ${JSON.stringify(this.config.media)} })`
            );
        }

        // Initialize Alpine component
        await new Promise(resolve => {
            const checkEditor = () => {
                const editorId = this.holder.id || 'alpine-editor';
                if (window.alpineEditors && window.alpineEditors[editorId]) {
                    this.instance = window.alpineEditors[editorId];
                    resolve();
                } else {
                    setTimeout(checkEditor, 50);
                }
            };
            checkEditor();
        });

        return this;
    }

    save() {
        if (!this.instance) {
            throw new Error('AlpineBlocks: Editor not initialized. Call init() first.');
        }
        return this.instance.save();
    }

    render(data) {
        if (!this.instance) {
            throw new Error('AlpineBlocks: Editor not initialized. Call init() first.');
        }
        
        if (data && Array.isArray(data)) {
            // Load blocks from data
            this.instance.blocks = [];
            data.forEach(blockData => {
                const block = this.instance.initBlock(blockData.class, false);
                if (block && blockData.data) {
                    Object.assign(block.config, blockData.data);
                    block.triggerRedraw();
                }
            });
        }
        
        return this.instance.getCleanHTML();
    }

    getHTML() {
        if (!this.instance) {
            throw new Error('AlpineBlocks: Editor not initialized. Call init() first.');
        }
        return this.instance.getCleanHTML();
    }

    destroy() {
        if (this.instance && this.holder) {
            // Clean up
            const editorId = this.holder.id || 'alpine-editor';
            if (window.alpineEditors && window.alpineEditors[editorId]) {
                delete window.alpineEditors[editorId];
            }
            this.holder.innerHTML = '';
            this.instance = null;
        }
    }
}
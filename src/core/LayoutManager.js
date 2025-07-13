import Layout from './Layout.js';

class LayoutManager {
    constructor(editor) {
        this.editor = editor;
        this.layouts = Layout.getAll();
    }

    // Get all available layouts
    getLayouts() {
        return this.layouts;
    }

    // Add a layout to the editor
    async addLayout(layoutId, insertIndex = null) {
        const layout = this.layouts.find(l => l.id === layoutId);
        if (!layout) {
            console.error(`Layout with id ${layoutId} not found`);
            return false;
        }

        try {
            // Extract blocks from the layout
            const blocks = layout.extractBlocks();
            
            // Convert blocks to Editor.js format and add them
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                const targetIndex = insertIndex !== null ? insertIndex + i : undefined;
                
                await this.editor.blocks.insert(
                    block.type,
                    block.data,
                    {},
                    targetIndex,
                    true
                );
            }

            // Dispatch event to notify that layout was added
            document.dispatchEvent(new CustomEvent('layout-added', {
                detail: { layoutId, blocksCount: blocks.length }
            }));

            return true;
        } catch (error) {
            console.error('Error adding layout:', error);
            return false;
        }
    }

    // Create a custom layout from current editor content
    createCustomLayout(name, description = '') {
        try {
            const blocks = this.editor.save().then(outputData => {
                if (!outputData.blocks || outputData.blocks.length === 0) {
                    console.warn('No blocks found to create layout');
                    return null;
                }

                // Convert blocks to HTML representation
                let html = '<div class="custom-layout">';
                
                outputData.blocks.forEach(block => {
                    html += this.blockToHtml(block);
                });
                
                html += '</div>';

                // Create new layout
                const customLayout = new Layout(
                    `custom-${Date.now()}`,
                    name,
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
                    html,
                    description
                );

                // Add to layouts list
                this.layouts.push(customLayout);

                return customLayout;
            });

            return blocks;
        } catch (error) {
            console.error('Error creating custom layout:', error);
            return null;
        }
    }

    // Convert a block to HTML representation
    blockToHtml(block) {
        const { type, data } = block;
        let html = '';

        switch (type) {
            case 'paragraph':
                html = `<p data-block="paragraph"`;
                if (data.fontSize) html += ` data-config-fontSize="${data.fontSize}"`;
                if (data.textColor) html += ` data-config-textColor="${data.textColor}"`;
                if (data.alignment) html += ` data-config-alignment="${data.alignment}"`;
                html += `>${data.content || ''}</p>`;
                break;

            case 'header':
                const level = data.level || 'h2';
                html = `<${level} data-block="header" data-config-level="${level}"`;
                if (data.fontSize) html += ` data-config-fontSize="${data.fontSize}"`;
                if (data.textColor) html += ` data-config-textColor="${data.textColor}"`;
                if (data.alignment) html += ` data-config-alignment="${data.alignment}"`;
                if (data.anchor) html += ` data-config-anchor="${data.anchor}"`;
                html += `>${data.content || ''}</${level}>`;
                break;

            case 'image':
                html = `<figure data-block="image"`;
                if (data.alignment) html += ` data-config-alignment="${data.alignment}"`;
                if (data.width) html += ` data-config-width="${data.width}"`;
                html += `>`;
                html += `<img src="${data.src || ''}" alt="${data.alt || ''}" />`;
                if (data.caption) {
                    html += `<figcaption>${data.caption}</figcaption>`;
                }
                html += `</figure>`;
                break;

            case 'quote':
                html = `<blockquote data-block="quote"`;
                if (data.style) html += ` data-config-style="${data.style}"`;
                if (data.alignment) html += ` data-config-alignment="${data.alignment}"`;
                html += `>`;
                html += `<div class="quote-content">${data.content || ''}</div>`;
                if (data.attribution) {
                    html += `<cite class="quote-attribution">${data.attribution}</cite>`;
                }
                html += `</blockquote>`;
                break;

            case 'list':
                const listType = data.style === 'ordered' ? 'ol' : 'ul';
                html = `<${listType} data-block="list" data-config-style="${data.style || 'unordered'}"`;
                if (data.items && Array.isArray(data.items)) {
                    html += ` data-config-items='${JSON.stringify(data.items)}'`;
                }
                html += `>`;
                if (data.items && Array.isArray(data.items)) {
                    data.items.forEach(item => {
                        html += `<li>${item}</li>`;
                    });
                }
                html += `</${listType}>`;
                break;

            case 'button':
                html = `<div data-block="button"`;
                if (data.text) html += ` data-config-text="${data.text}"`;
                if (data.style) html += ` data-config-style="${data.style}"`;
                if (data.size) html += ` data-config-size="${data.size}"`;
                if (data.alignment) html += ` data-config-alignment="${data.alignment}"`;
                if (data.url) html += ` data-config-url="${data.url}"`;
                html += `></div>`;
                break;

            default:
                html = `<div data-block="${type}">${JSON.stringify(data)}</div>`;
        }

        return html;
    }

    // Remove a custom layout
    removeLayout(layoutId) {
        const index = this.layouts.findIndex(l => l.id === layoutId);
        if (index > -1 && this.layouts[index].id.startsWith('custom-')) {
            this.layouts.splice(index, 1);
            return true;
        }
        return false;
    }
}

export default LayoutManager;
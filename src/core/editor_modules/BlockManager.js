import { generateId } from '../../utils/generateId.js';

export class BlockManager {
    constructor() {
        this.blocks = [];
    }

    addBlock(BlockClass, config) {
        const block = new BlockClass({
            id: generateId(),
            updateFunction: this.updateBlock.bind(this),
            config: config
        });
        this.blocks.push(block);
        return block;
    }

    findBlockById(blockId) {
        return this.blocks.find(b => b.id === blockId);
    }

    updateBlock(id, config) {
        const block = this.findBlockById(id);
        if (block) {
            block.config = config;
        }
    }

    renderBlocks() {
        return this.blocks.map(block => block.editorRender()).join('');
    }

    renderCleanBlocks() {
        return this.blocks.map(block => {
            const blockClass = block.class || block.type || 'block';
            const blockId = block.id || '';
            const renderedContent = block.render();
            // Wrap each block in a div with class and data-block-id
            return `<div class="block-wrapper block-${blockClass.toLowerCase()}" data-block-id="${blockId}">${renderedContent}</div>`;
        }).join('\n');
    }

    triggerRedraw() {
        this.blocks.forEach(block => block.triggerRedraw());
    }
}

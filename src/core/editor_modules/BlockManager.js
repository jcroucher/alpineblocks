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
        return this.blocks.map(block => block.render()).join('');
    }

    triggerRedraw() {
        this.blocks.forEach(block => block.triggerRedraw());
    }
}

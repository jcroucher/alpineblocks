const { v4: uuidv4 } = require('uuid');

export class BlockManager {
    constructor() {
        this.blocks = [];
    }

    addBlock(BlockClass, config) {
        const block = new BlockClass({
            id: uuidv4(),
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
        return this.blocks.map(block => block.render()).join('');
    }

    triggerRedraw() {
        this.blocks.forEach(block => block.triggerRedraw());
    }
}

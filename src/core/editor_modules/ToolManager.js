import { Debug } from '../utils/Debug';

export class ToolManager {
    constructor(toolConfig) {
        this.toolConfig = toolConfig;
        this.tools = [];
    }

    loadTools() {
        Object.entries(this.toolConfig).forEach(([key, { class: BlockClass, config }]) => {
            if (!BlockClass || !config) {
                Debug.error(`Tool ${key} is missing a ${!BlockClass ? 'class' : 'config'}`);
                return;
            }
            const blockConfig = BlockClass.toolbox();
            blockConfig['class'] = key;
            this.tools.push(blockConfig);
        });
    }

    getTools() {
        return this.tools;
    }
}

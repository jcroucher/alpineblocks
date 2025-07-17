import { TemplateGenerator } from "../utils/TemplateGenerator";
import { RemoteLayoutManager } from "./RemoteLayoutManager";

class Layout {
    constructor(id, name, icon, html, description = '') {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.html = html;
        this.description = description;
    }

    // Helper method to HTML encode content for safe storage in attributes
    static htmlEncode(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Method to parse the HTML and extract tool blocks
    extractBlocks() {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.html, 'text/html');
        const blocks = [];
        
        // Find all elements with data-block attribute
        const blockElements = doc.querySelectorAll('[data-block]');
        
        blockElements.forEach((element, index) => {
            const blockType = element.getAttribute('data-block');
            const config = {};
            
            
            // Extract configuration from data attributes
            Array.from(element.attributes).forEach(attr => {
                if (attr.name.startsWith('data-config-')) {
                    let configKey = attr.name.replace('data-config-', '');
                    // Convert kebab-case to camelCase for consistency
                    configKey = configKey.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    let value = attr.value;
                    
                    // Try to parse JSON values and booleans
                    if (value.startsWith('[') || value.startsWith('{')) {
                        try {
                            value = JSON.parse(value);
                        } catch (e) {
                            // Keep as string if JSON parsing fails
                        }
                    } else if (value === 'true' || value === 'false') {
                        value = value === 'true';
                    }
                    
                    config[configKey] = value;
                }
            });
            
            // Create block structure
            const block = {
                id: `${blockType}-${index}`,
                type: blockType,
                config: config
            };
            
            // Add any nested content
            if (element.innerHTML && !element.innerHTML.includes('data-block')) {
                block.content = element.innerHTML;
            }
            
            blocks.push(block);
        });
        
        return blocks;
    }

    // Create a template using the tool configuration system
    static createTemplateWithTools(toolConfig, toolSpecs, wrapperConfig = {}) {
        if (!toolConfig || !toolConfig.tools) {
            throw new Error('Tool configuration is required for template creation');
        }

        const generator = new TemplateGenerator(toolConfig);
        const elements = toolSpecs.map(spec => {
            const tool = toolConfig.tools[spec.toolName];
            if (!tool) {
                throw new Error(`Tool "${spec.toolName}" not found in configuration`);
            }
            
            return {
                tool: spec.toolName,
                id: spec.toolId,
                config: spec.config
            };
        });

        return generator.generateRawTemplate(elements, wrapperConfig);
    }

    // Static method to get all predefined layouts (now with remote support)
    static getAll(toolConfig = null, layoutConfig = null) {
        // Check global configuration first
        const globalConfig = window.AlpineBlocksConfig?.layouts;
        const finalLayoutConfig = layoutConfig || globalConfig;
        
        // If layout configuration is provided or configured globally, use RemoteLayoutManager
        if (finalLayoutConfig) {
            return Layout.getRemoteLayouts(finalLayoutConfig);
        }
        
        // Fallback to static layouts
        return Layout.getStaticLayouts(toolConfig);
    }
    
    // Get layouts from remote source
    static async getRemoteLayouts(layoutConfig) {
        const fallbackLayouts = Layout.getStaticLayouts();
        
        const manager = new RemoteLayoutManager({
            ...layoutConfig,
            fallbackLayouts: fallbackLayouts.map(layout => ({
                id: layout.id,
                name: layout.name,
                description: layout.description,
                icon: layout.icon,
                content: layout.html,
                tags: layout.tags || []
            }))
        });
        
        try {
            const categories = await manager.getLayouts();
            const layouts = [];
            
            for (const category of categories) {
                for (const layoutInfo of category.layouts) {
                    try {
                        const layoutData = await manager.getLayout(layoutInfo.id);
                        if (layoutData) {
                            layouts.push(layoutData);
                        }
                    } catch (error) {
                        console.warn(`Failed to load layout ${layoutInfo.id}:`, error.message);
                    }
                }
            }
            
            return layouts;
        } catch (error) {
            console.warn('Failed to load remote layouts, using static fallback:', error.message);
            return fallbackLayouts;
        }
    }
    
    // Get static layouts (now empty - moved to JSON files)
    static getStaticLayouts(toolConfig = null) {
        // All layouts moved to individual JSON files in examples/layouts/layouts/
        return [];
    }
    
    // Create layout manager instance for external use
    static createManager(config) {
        return new RemoteLayoutManager(config);
    }
}

export default Layout;
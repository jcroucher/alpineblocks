/**
 * Utility for generating template HTML using tool instances
 */
import { escapeHtml } from './HtmlEscape';

export class TemplateGenerator {
    constructor(toolConfig) {
        this.toolConfig = toolConfig;
    }

    /**
     * Create a tool instance with given configuration
     * @param {string} toolName - Name of the tool
     * @param {string} toolId - Unique ID for the tool
     * @param {Object} config - Tool configuration
     * @returns {Object} Tool instance
     */
    createTool(toolName, toolId, config = {}) {
        const toolConfig = this.toolConfig[toolName];
        if (!toolConfig || !toolConfig.class) {
            throw new Error(`Tool ${toolName} not found`);
        }

        const ToolClass = toolConfig.class;
        const mergedConfig = { ...toolConfig.config, ...config };

        return new ToolClass({
            id: toolId,
            updateFunction: () => {}, // No-op for template generation
            config: mergedConfig
        });
    }

    /**
     * Generate HTML for a tool as a template element
     * @param {string} toolName - Name of the tool
     * @param {string} toolId - Unique ID for the tool
     * @param {Object} config - Tool configuration
     * @returns {string} HTML string
     */
    generateToolHtml(toolName, toolId, config = {}) {
        const tool = this.createTool(toolName, toolId, config);
        
        if (typeof tool.renderTemplateElement === 'function') {
            return tool.renderTemplateElement(toolId);
        } else {
            // Fallback to regular render with data attributes
            let html = tool.render();
            // Add data attributes to the first element
            html = html.replace(/^<(\w+)/, `<$1 data-tool="${toolName}" data-tool-id="${toolId}"`);
            return html;
        }
    }

    /**
     * Generate a Raw block with template elements
     * @param {Array} elements - Array of element configurations
     * @param {Object} wrapperConfig - Wrapper element configuration
     * @returns {string} Raw block HTML
     */
    generateRawTemplate(elements, wrapperConfig = {}) {
        const {
            wrapperTag = 'div',
            wrapperStyles = {},
            wrapperClasses = ''
        } = wrapperConfig;

        // Generate HTML for each element
        const elementsHtml = elements.map(element => {
            const { toolName, toolId, config } = element;
            return this.generateToolHtml(toolName, toolId, config);
        }).join('');

        // Build wrapper styles
        const styleString = Object.entries(wrapperStyles)
            .map(([key, value]) => `${key}: ${value}`)
            .join('; ');

        const wrapperAttrs = [
            wrapperClasses ? `class="${wrapperClasses}"` : '',
            styleString ? `style="${styleString}"` : ''
        ].filter(Boolean).join(' ');

        const wrapperHtml = `<${wrapperTag} ${wrapperAttrs}>${elementsHtml}</${wrapperTag}>`;

        // HTML encode for data-config-content attribute
        const encodedContent = escapeHtml(wrapperHtml);

        return `<div data-block="raw" data-config-show-preview="true" data-config-mode="html" data-config-content="${encodedContent}"></div>`;
    }

    /**
     * Generate a complete layout template
     * @param {string} id - Layout ID
     * @param {string} name - Layout name
     * @param {string} icon - Layout icon SVG
     * @param {Array} elements - Array of element configurations
     * @param {Object} wrapperConfig - Wrapper configuration
     * @param {string} description - Layout description
     * @returns {Object} Layout configuration
     */
    generateLayout(id, name, icon, elements, wrapperConfig, description) {
        const content = this.generateRawTemplate(elements, wrapperConfig);
        
        return {
            id,
            name,
            icon,
            content,
            description
        };
    }
}

export default TemplateGenerator;
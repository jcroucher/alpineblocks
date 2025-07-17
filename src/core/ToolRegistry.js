// Tool imports
import Paragraph from '../tools/Paragraph';
import Header from '../tools/Header';
import List from '../tools/List';
import Code from '../tools/Code';
import Image from '../tools/Image';
import Quote from '../tools/Quote';
import WYSIWYG from '../tools/WYSIWYG';
import Alert from '../tools/Alert';
import VideoPlayer from '../tools/VideoPlayer';
import AudioPlayer from '../tools/AudioPlayer';
import Carousel from '../tools/Carousel';
import Columns from '../tools/Columns';
import Raw from '../tools/Raw';
import Delimiter from '../tools/Delimiter';
import Button from '../tools/Button';
import { Debug } from './utils/Debug';

// Tool modules registry
const toolModules = {
    Paragraph,
    Header,
    List,
    Code,
    Image,
    Quote,
    WYSIWYG,
    Alert,
    VideoPlayer,
    AudioPlayer,
    Carousel,
    Columns,
    Raw,
    Delimiter,
    Button
};

/**
 * Get default tool configuration
 * @returns {Object} Default tool configuration
 */
export function getDefaultToolConfig() {
    const config = {};
    
    // Add all available tools with their default configurations
    Object.entries(toolModules).forEach(([toolName, ToolClass]) => {
        try {
            // Get the default config from the tool's toolbox() method if it exists
            const toolbox = ToolClass.toolbox ? ToolClass.toolbox() : {};
            config[toolName] = {
                class: ToolClass,
                config: toolbox.config || {}
            };
            Debug.debug(`Loaded tool: ${toolName}`);
        } catch (e) {
            Debug.error(`Error loading tool ${toolName}:`, e);
        }
    });
    
    return config;
}

/**
 * Extract and parse editor configuration from DOM, with fallback to defaults
 * @returns {Object} Parsed editor configuration
 */
export function getEditorConfigFromDOM() {
    const editorElement = document.querySelector('[x-data*="alpineEditor"]');
    if (!editorElement) {
        Debug.info('No editor element found, using default config');
        return { tools: getDefaultToolConfig(), media: null };
    }

    const xDataAttr = editorElement.getAttribute('x-data');
    
    // Try to parse the entire config object
    const configMatch = xDataAttr.match(/alpineEditor\(\{([\s\S]*?)\}\)/);
    if (!configMatch) {
        Debug.info('No config found in DOM, using default config');
        return { tools: getDefaultToolConfig(), media: null };
    }

    try {
        const configStr = `{${configMatch[1]}}`;
        const fullConfig = new Function(`return ${configStr}`)();
        
        // Parse tools configuration
        const toolsConfig = fullConfig.tools || [];
        const tools = {};

        Debug.debug('toolModules keys:', Object.keys(toolModules));

        toolsConfig.forEach((tool) => {
            Debug.debug('Loading tool:', tool.class);
            
            if (toolModules[tool.class]) {
                tools[tool.class] = {
                    class: toolModules[tool.class],
                    config: tool.config || {}
                };
                Debug.debug(`Successfully loaded tool: ${tool.class}`);
            } else {
                Debug.error(`Tool ${tool.class} not found in available modules`);
            }
        });

        // If no tools were successfully parsed, fall back to defaults
        if (Object.keys(tools).length === 0) {
            Debug.info('No tools successfully parsed, using default tool config');
            return { tools: getDefaultToolConfig(), media: fullConfig.media || null };
        }

        return { tools, media: fullConfig.media || null };
    } catch (e) {
        Debug.error('Error parsing editor configuration:', e);
        Debug.info('Using default config as fallback');
        return { tools: getDefaultToolConfig(), media: null };
    }
}

export { toolModules };
/**
 * Debug configuration for AlpineBlocks
 * Centralized place to control all debugging settings
 */

export const DebugConfig = {
    // Enable/disable all debug output
    enabled: process.env.NODE_ENV === 'development',
    
    // Debug levels: ERROR = 0, WARN = 1, INFO = 2, DEBUG = 3
    level: 2, // INFO level by default
    
    // Module-specific debug settings
    modules: {
        editor: true,
        tools: true,
        toolbar: true,
        settings: true,
        blocks: true,
        inline: false // Disable inline toolbar debugging by default
    },
    
    // Console output styling
    styles: {
        error: 'color: #ff4757; font-weight: bold;',
        warn: 'color: #ffa502; font-weight: bold;',
        info: 'color: #3742fa; font-weight: bold;',
        debug: 'color: #57606f;',
        log: 'color: #2f3542;'
    }
};

// Allow runtime configuration in development
if (typeof window !== 'undefined' && DebugConfig.enabled) {
    window.AlpineBlocksDebugConfig = DebugConfig;
}
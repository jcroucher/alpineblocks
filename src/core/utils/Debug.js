import { DebugConfig } from '../../config/debug';

/**
 * Debug utility for consistent logging throughout the application
 * Controls all console output and can be toggled on/off
 */
export class Debug {
    static enabled = DebugConfig.enabled;
    static levels = {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3
    };
    static currentLevel = DebugConfig.level;

    /**
     * Enable or disable debug output
     * @param {boolean} enabled - Whether to enable debug output
     */
    static setEnabled(enabled) {
        Debug.enabled = enabled;
    }

    /**
     * Set the minimum log level
     * @param {number} level - Minimum level to log (0-3)
     */
    static setLevel(level) {
        Debug.currentLevel = level;
        DebugConfig.level = level;
    }

    /**
     * Log an error message
     * @param {string} message - Error message
     * @param {...any} args - Additional arguments
     */
    static error(message, ...args) {
        if (Debug.enabled && Debug.currentLevel >= Debug.levels.ERROR) {
            console.error(`%c[AlpineBlocks ERROR] ${message}`, DebugConfig.styles.error, ...args);
        }
    }

    /**
     * Log a warning message
     * @param {string} message - Warning message
     * @param {...any} args - Additional arguments
     */
    static warn(message, ...args) {
        if (Debug.enabled && Debug.currentLevel >= Debug.levels.WARN) {
            console.warn(`%c[AlpineBlocks WARN] ${message}`, DebugConfig.styles.warn, ...args);
        }
    }

    /**
     * Log an info message
     * @param {string} message - Info message
     * @param {...any} args - Additional arguments
     */
    static info(message, ...args) {
        if (Debug.enabled && Debug.currentLevel >= Debug.levels.INFO) {
            console.info(`%c[AlpineBlocks INFO] ${message}`, DebugConfig.styles.info, ...args);
        }
    }

    /**
     * Log a debug message
     * @param {string} message - Debug message
     * @param {...any} args - Additional arguments
     */
    static debug(message, ...args) {
        if (Debug.enabled && Debug.currentLevel >= Debug.levels.DEBUG) {
            console.log(`%c[AlpineBlocks DEBUG] ${message}`, DebugConfig.styles.debug, ...args);
        }
    }

    /**
     * Log a general message (equivalent to console.log)
     * @param {string} message - Message to log
     * @param {...any} args - Additional arguments
     */
    static log(message, ...args) {
        if (Debug.enabled) {
            console.log(`%c[AlpineBlocks] ${message}`, DebugConfig.styles.log, ...args);
        }
    }
}

// Global access for debugging in development
if (typeof window !== 'undefined') {
    window.AlpineBlocksDebug = Debug;
}
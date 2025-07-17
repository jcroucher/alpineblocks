// Use globally available Alpine.js
if (!window.Alpine) {
    throw new Error('AlpineBlocks requires Alpine.js to be loaded first. Please include Alpine.js before AlpineBlocks.');
}

const Alpine = window.Alpine;

// Import modular components
import { registerAlpineComponents } from './core/AlpineComponents';
import { setupGlobalAPI } from './core/GlobalAPI';
import { MediaPicker } from './core/MediaPicker.js';

// Register MediaPicker component immediately
MediaPicker.registerAlpineComponent();


/**
 * AlpineBlocks - A lightweight block-based content editor built with Alpine.js
 * 
 * This is the main entry point that sets up the editor, toolbar, and settings
 * components, and dynamically imports all available tools.
 */

// Build information for debugging
const BUILD_ID = 'AB-2025-01-17-002';
window.AlpineBlocks = window.AlpineBlocks || {};
window.AlpineBlocks.buildId = BUILD_ID;
window.AlpineBlocks.version = '1.0.0';

console.log(`AlpineBlocks loaded - Build: ${BUILD_ID}`);

// Tool registry is now handled in separate module

// Register all Alpine components
registerAlpineComponents();

// Setup global API
setupGlobalAPI();

// Debug: Log that components are registered
if (typeof window !== 'undefined' && window.console) {
    console.log('[AlpineBlocks] All components registered, ready for Alpine.js to start');
}

// Export AlpineBlocks class for external usage
import AlpineBlocks from './core/AlpineBlocksClass';
export default AlpineBlocks;


// Components are registered immediately when the registerAllAlpineComponents function is defined
// Alpine.js will be started externally after all components are registered


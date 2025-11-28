// Use globally available Alpine.js (optional for TinyMCE-only usage)
const Alpine = window.Alpine;

// Import modular components
import { registerAlpineComponents } from './core/AlpineComponents';
import { setupGlobalAPI } from './core/GlobalAPI';
import { MediaPicker } from './core/MediaPicker.js';
import TinyMCE from './editors/TinyMCE';

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

// Expose TinyMCE integration
window.AlpineBlocks.TinyMCE = TinyMCE;

console.log(`AlpineBlocks loaded - Build: ${BUILD_ID}`);

// Dispatch custom event to notify when AlpineBlocks is ready
window.dispatchEvent(new CustomEvent('alpineblocks:ready', {
    detail: { buildId: BUILD_ID, version: '1.0.0' }
}));

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


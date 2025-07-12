import $5OpyM$alpinejs from "alpinejs";
import {v4 as $5OpyM$v4} from "uuid";


/**
 * Debug configuration for AlpineBlocks
 * Centralized place to control all debugging settings
 */ const $e7e2e04465ad0ac6$export$f7c1896972d6c454 = {
    // Enable/disable all debug output
    enabled: process.env.NODE_ENV === 'development',
    // Debug levels: ERROR = 0, WARN = 1, INFO = 2, DEBUG = 3
    level: 2,
    // INFO level by default
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
if (typeof window !== 'undefined' && $e7e2e04465ad0ac6$export$f7c1896972d6c454.enabled) {
    window.AlpineBlocksDebugConfig = $e7e2e04465ad0ac6$export$f7c1896972d6c454;
    console.log('%c[AlpineBlocks] Debug mode enabled. Use window.AlpineBlocksDebugConfig to modify settings.', $e7e2e04465ad0ac6$export$f7c1896972d6c454.styles.info);
}


class $4c0d28162c26105d$export$153e5dc2c098b35c {
    static enabled = (0, $e7e2e04465ad0ac6$export$f7c1896972d6c454).enabled;
    static levels = {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3
    };
    static currentLevel = (0, $e7e2e04465ad0ac6$export$f7c1896972d6c454).level;
    /**
   * Enable or disable debug output
   * @param {boolean} enabled - Whether to enable debug output
   */ static setEnabled(enabled) {
        $4c0d28162c26105d$export$153e5dc2c098b35c.enabled = enabled;
    }
    /**
   * Set the minimum log level
   * @param {number} level - Minimum level to log (0-3)
   */ static setLevel(level) {
        $4c0d28162c26105d$export$153e5dc2c098b35c.currentLevel = level;
        (0, $e7e2e04465ad0ac6$export$f7c1896972d6c454).level = level;
    }
    /**
   * Log an error message
   * @param {string} message - Error message
   * @param {...any} args - Additional arguments
   */ static error(message, ...args) {
        if ($4c0d28162c26105d$export$153e5dc2c098b35c.enabled && $4c0d28162c26105d$export$153e5dc2c098b35c.currentLevel >= $4c0d28162c26105d$export$153e5dc2c098b35c.levels.ERROR) console.error(`%c[AlpineBlocks ERROR] ${message}`, (0, $e7e2e04465ad0ac6$export$f7c1896972d6c454).styles.error, ...args);
    }
    /**
   * Log a warning message
   * @param {string} message - Warning message
   * @param {...any} args - Additional arguments
   */ static warn(message, ...args) {
        if ($4c0d28162c26105d$export$153e5dc2c098b35c.enabled && $4c0d28162c26105d$export$153e5dc2c098b35c.currentLevel >= $4c0d28162c26105d$export$153e5dc2c098b35c.levels.WARN) console.warn(`%c[AlpineBlocks WARN] ${message}`, (0, $e7e2e04465ad0ac6$export$f7c1896972d6c454).styles.warn, ...args);
    }
    /**
   * Log an info message
   * @param {string} message - Info message
   * @param {...any} args - Additional arguments
   */ static info(message, ...args) {
        if ($4c0d28162c26105d$export$153e5dc2c098b35c.enabled && $4c0d28162c26105d$export$153e5dc2c098b35c.currentLevel >= $4c0d28162c26105d$export$153e5dc2c098b35c.levels.INFO) console.info(`%c[AlpineBlocks INFO] ${message}`, (0, $e7e2e04465ad0ac6$export$f7c1896972d6c454).styles.info, ...args);
    }
    /**
   * Log a debug message
   * @param {string} message - Debug message
   * @param {...any} args - Additional arguments
   */ static debug(message, ...args) {
        if ($4c0d28162c26105d$export$153e5dc2c098b35c.enabled && $4c0d28162c26105d$export$153e5dc2c098b35c.currentLevel >= $4c0d28162c26105d$export$153e5dc2c098b35c.levels.DEBUG) console.log(`%c[AlpineBlocks DEBUG] ${message}`, (0, $e7e2e04465ad0ac6$export$f7c1896972d6c454).styles.debug, ...args);
    }
    /**
   * Log a general message (equivalent to console.log)
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */ static log(message, ...args) {
        if ($4c0d28162c26105d$export$153e5dc2c098b35c.enabled) console.log(`%c[AlpineBlocks] ${message}`, (0, $e7e2e04465ad0ac6$export$f7c1896972d6c454).styles.log, ...args);
    }
}
// Global access for debugging in development
if (typeof window !== 'undefined') window.AlpineBlocksDebug = $4c0d28162c26105d$export$153e5dc2c098b35c;


class $237b2f748d7c9c7b$export$df4a79c26d3b48ff {
    constructor(toolConfig){
        this.toolConfig = toolConfig;
        this.tools = [];
    }
    loadTools() {
        Object.entries(this.toolConfig).forEach(([key, { class: BlockClass, config: config }])=>{
            if (!BlockClass || !config) {
                (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error(`Tool ${key} is missing a ${!BlockClass ? 'class' : 'config'}`);
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



var $f34cd5c4865618d1$require$uuidv4 = $5OpyM$v4;
class $f34cd5c4865618d1$export$d3ae936b397926f7 {
    constructor(){
        this.blocks = [];
    }
    addBlock(BlockClass, config) {
        const block = new BlockClass({
            id: $f34cd5c4865618d1$require$uuidv4(),
            updateFunction: this.updateBlock.bind(this),
            config: config
        });
        this.blocks.push(block);
        return block;
    }
    findBlockById(blockId) {
        return this.blocks.find((b)=>b.id === blockId);
    }
    updateBlock(id, config) {
        const block = this.findBlockById(id);
        if (block) block.config = config;
    }
    renderBlocks() {
        return this.blocks.map((block)=>block.render()).join('');
    }
    triggerRedraw() {
        this.blocks.forEach((block)=>block.triggerRedraw());
    }
}



class $fce9a75a0fedf01f$export$a268db361d674bec {
    constructor(){
        this.tools = [];
        this.editor = null;
        this.inlineToolbar = null;
    }
    init(editor) {
        this.editor = editor;
        // Create a new div element
        this.inlineToolbar = document.createElement('div');
        // Set the text content of the div
        this.inlineToolbar.textContent = "Hello";
        this.inlineToolbar.id = 'your-toolbar-id';
        // Style the div for proper positioning and visibility
        this.inlineToolbar.style.position = 'absolute';
        this.inlineToolbar.style.backgroundColor = 'white';
        this.inlineToolbar.style.border = '1px solid black';
        this.inlineToolbar.style.padding = '8px';
        this.inlineToolbar.style.display = 'none';
        this.inlineToolbar.innerHTML = `<button onclick=" const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const isBold = selection.anchorNode.parentNode.nodeName === 'STRONG';

            if (!isBold) {
                // Create a strong tag and wrap it around the selection
                const strongTag = document.createElement('strong');
                strongTag.appendChild(range.extractContents());
                range.insertNode(strongTag);
                strongTag.parentNode.normalize();
            }
    
            // Normalize the container to merge any adjacent text nodes
            ">Link</button>`;
        document.body.appendChild(this.inlineToolbar);
        document.getElementById('your-toolbar-id').addEventListener('mousedown', function(event) {
            event.preventDefault(); // Prevents losing focus
        });
        window.addEventListener('editor-show-inline-toolbar', (event)=>{
            (0, $4c0d28162c26105d$export$153e5dc2c098b35c).debug('Show inline toolbar event:', event);
            this.inlineToolbar.style.left = `${event.detail.event.clientX}px`;
            this.inlineToolbar.style.top = `${event.detail.event.clientY}px`;
            this.inlineToolbar.style.display = 'block';
        });
        window.addEventListener('editor-hide-inline-toolbar', (event)=>{
            this.inlineToolbar.style.display = 'none';
        });
    }
}


/**
 * History Manager for undo/redo functionality
 * Tracks changes to the editor blocks and allows reverting to previous states
 */ class $a168cf7d0e252c95$export$9572cf7a37405cc {
    constructor(editor, maxHistorySize = 30){
        this.editor = editor;
        this.history = [];
        this.currentIndex = -1;
        this.maxHistorySize = maxHistorySize; // Configurable, default 30
        this.isApplyingState = false; // Prevent recursive history tracking
        // Save initial state
        this.saveState();
    }
    /**
   * Save the current editor state to history
   * @param {string} action - Description of the action that triggered this save
   */ saveState(action = 'Initial state') {
        // Don't save state if we're currently applying a previous state
        if (this.isApplyingState) return;
        const currentState = {
            blocks: JSON.parse(this.editor.blocksJSON()),
            timestamp: Date.now(),
            action: action
        };
        // If we're not at the end of history, remove everything after current index
        if (this.currentIndex < this.history.length - 1) this.history = this.history.slice(0, this.currentIndex + 1);
        // Add new state
        this.history.push(currentState);
        // Keep history size manageable
        if (this.history.length > this.maxHistorySize) this.history.shift();
        else this.currentIndex++;
        this.notifyHistoryChange();
    }
    /**
   * Undo the last action
   * @returns {boolean} Whether undo was successful
   */ undo() {
        if (!this.canUndo()) return false;
        this.currentIndex--;
        this.applyState(this.history[this.currentIndex]);
        this.notifyHistoryChange();
        return true;
    }
    /**
   * Redo the next action
   * @returns {boolean} Whether redo was successful
   */ redo() {
        if (!this.canRedo()) return false;
        this.currentIndex++;
        this.applyState(this.history[this.currentIndex]);
        this.notifyHistoryChange();
        return true;
    }
    /**
   * Check if undo is possible
   * @returns {boolean}
   */ canUndo() {
        return this.currentIndex > 0;
    }
    /**
   * Check if redo is possible
   * @returns {boolean}
   */ canRedo() {
        return this.currentIndex < this.history.length - 1;
    }
    /**
   * Apply a previous state to the editor
   * @param {Object} state - The state to apply
   */ applyState(state) {
        this.isApplyingState = true;
        try {
            // Clear current blocks
            this.editor.blocks.splice(0, this.editor.blocks.length);
            // Recreate blocks from state
            state.blocks.forEach((blockData)=>{
                // Clean the class name if it's corrupted
                let className = blockData.class;
                if (className && className.includes('$var$')) {
                    const match = className.match(/\$var\$(\w+)$/);
                    if (match) className = match[1];
                }
                const block = this.editor.initBlock(className, false, blockData.id);
                if (block) {
                    // Use the correct property name from the JSON structure
                    block.config = {
                        ...blockData.data
                    };
                    this.editor.blocks.push(block);
                }
            });
            // Clear selection
            this.editor.selectedBlock = null;
            if (this.editor.$dispatch) {
                this.editor.$dispatch('editor-block-changed', {
                    block_id: null
                });
                // Force Alpine component to sync with new editor state
                this.editor.$nextTick(()=>{
                    // Update the Alpine component's blocks array
                    const alpineComponent = this.editor.$el._x_dataStack?.[0];
                    if (alpineComponent) // Create a new proxy for the blocks array to ensure reactivity
                    alpineComponent.blocks = new Proxy(this.editor.blocks, {
                        set (target, property, value) {
                            target[property] = value;
                            return true;
                        }
                    });
                    // Force a complete editor update
                    this.editor.$dispatch('editor-updated', {
                        id: this.editor.id
                    });
                });
            }
        } finally{
            this.isApplyingState = false;
        }
    }
    /**
   * Notify listeners that history state has changed
   */ notifyHistoryChange() {
        document.dispatchEvent(new CustomEvent('history-changed', {
            detail: {
                canUndo: this.canUndo(),
                canRedo: this.canRedo(),
                currentIndex: this.currentIndex,
                totalStates: this.history.length
            }
        }));
    }
    /**
   * Get current history status
   * @returns {Object} History status
   */ getStatus() {
        return {
            canUndo: this.canUndo(),
            canRedo: this.canRedo(),
            currentAction: this.history[this.currentIndex]?.action,
            totalStates: this.history.length
        };
    }
    /**
   * Clear all history
   */ clearHistory() {
        this.history = [];
        this.currentIndex = -1;
        this.saveState('History cleared');
    }
}


/**
 * Header Toolbar component for editor actions like undo/redo, preview, etc.
 */ class $8a83916c83abff24$export$3c11ee1da7b7384 {
    constructor(editorId){
        this.editorId = editorId;
        this.canUndo = false;
        this.canRedo = false;
    }
    /**
   * Initialize the header toolbar
   */ init() {
        // Listen for history changes to update button states
        document.addEventListener('history-changed', (e)=>{
            this.canUndo = e.detail.canUndo;
            this.canRedo = e.detail.canRedo;
            // Force Alpine to update by dispatching a custom event
            document.dispatchEvent(new CustomEvent('header-toolbar-updated', {
                detail: {
                    editorId: this.editorId,
                    canUndo: this.canUndo,
                    canRedo: this.canRedo
                }
            }));
        });
    }
    /**
   * Handle undo action
   */ handleUndo() {
        const editor = window.alpineEditors?.[this.editorId];
        if (editor) editor.undo();
    }
    /**
   * Handle redo action
   */ handleRedo() {
        const editor = window.alpineEditors?.[this.editorId];
        if (editor) editor.redo();
    }
    /**
   * Handle preview action
   */ handlePreview() {
        const editor = window.alpineEditors?.[this.editorId];
        if (editor) // Dispatch preview event for custom handling
        document.dispatchEvent(new CustomEvent('editor-preview', {
            detail: {
                editorId: this.editorId,
                content: editor.getEditorContent(),
                json: editor.blocksJSON()
            }
        }));
    }
    /**
   * Handle settings action
   */ handleSettings() {
        const editor = window.alpineEditors?.[this.editorId];
        if (editor) // Dispatch settings event for custom handling
        document.dispatchEvent(new CustomEvent('editor-settings', {
            detail: {
                editorId: this.editorId
            }
        }));
    }
    /**
   * Get the toolbar HTML
   * @returns {string} HTML string for the toolbar
   */ render() {
        return `
            <div class="header-toolbar" 
                 x-data="headerToolbar('${this.editorId}')"
                 x-init="init()">
                <button class="header-btn" 
                        :disabled="!canUndo"
                        :class="{ 'header-btn-disabled': !canUndo }"
                        @click="handleUndo()"
                        title="Undo (Ctrl+Z)">
                    <svg class="header-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
                    </svg>
                </button>
                <button class="header-btn" 
                        :disabled="!canRedo"
                        :class="{ 'header-btn-disabled': !canRedo }"
                        @click="handleRedo()"
                        title="Redo (Ctrl+Y)">
                    <svg class="header-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/>
                    </svg>
                </button>
                <div class="header-divider"></div>
                <button class="header-btn" 
                        @click="handlePreview()"
                        title="Preview">
                    <svg class="header-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
                <button class="header-btn" 
                        @click="handleSettings()"
                        title="Editor Settings">
                    <svg class="header-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                    </svg>
                </button>
            </div>
        `;
    }
}




var $cda2b75602dff697$require$uuidv4 = $5OpyM$v4;
class $cda2b75602dff697$export$7cda8d932e2f33c0 {
    constructor(toolConfig, log_level = 2, historySize = 30){
        this.id = '';
        this.log_level = log_level;
        this.tools = [];
        this.selectedBlock = null;
        this.hoveredTarget = {};
        this.toolConfig = toolConfig;
        this.dragThrottle = null;
        this.dragLeaveTimeout = null;
        this.deleteConfirmation = {
            show: false,
            blockId: null
        };
        this.toolManager = new (0, $237b2f748d7c9c7b$export$df4a79c26d3b48ff)(toolConfig);
        this.blockManager = new (0, $f34cd5c4865618d1$export$d3ae936b397926f7)();
        this.inlineToolbar = new (0, $fce9a75a0fedf01f$export$a268db361d674bec)();
        this.historyManager = new (0, $a168cf7d0e252c95$export$9572cf7a37405cc)(this, historySize);
        this.headerToolbar = null; // Will be initialized after editor ID is set
        // Debounced state saving for property updates
        this.debouncedSaveState = this.debounce(()=>{
            this.saveState('Updated block properties');
        }, 1000); // Save after 1 second of inactivity
    }
    /**
   * Initialize the editor with Alpine.js integration
   */ init() {
        (0, $4c0d28162c26105d$export$153e5dc2c098b35c).info('Block editor initialized');
        this.id = this.$el.id;
        window.alpineEditors = window.alpineEditors || {};
        window.alpineEditors[this.id] = this;
        // Initialize header toolbar now that we have the ID
        this.headerToolbar = new (0, $8a83916c83abff24$export$3c11ee1da7b7384)(this.id);
        this.headerToolbar.init();
        this.toolManager.loadTools();
        // Only initialize a default block if toolConfig is available
        if (this.toolConfig && this.toolConfig['Paragraph']) this.initBlock('Paragraph', true);
        this.inlineToolbar.init(this);
        // Generate the delete confirmation modal
        this.generateModal();
        // Listen for confirm delete events
        window.addEventListener('confirm-delete-block', (e)=>{
            this.confirmDeleteBlock(e.detail.blockId);
        });
        // Set up keyboard shortcuts
        this.setupKeyboardShortcuts();
        this.$nextTick(()=>{
            this.$dispatch('editor-ready', {
                id: this.id
            });
        });
    }
    /**
   * Set up keyboard shortcuts for undo/redo
   */ setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e)=>{
            // Only handle shortcuts when this editor is active
            if (this.id && document.querySelector(`#${this.id}:focus-within`)) {
                if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                    e.preventDefault();
                    this.undo();
                } else if ((e.ctrlKey || e.metaKey) && e.key === 'y' || (e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
                    e.preventDefault();
                    this.redo();
                }
            }
        });
    }
    /**
   * Undo the last action
   * @returns {boolean} Whether undo was successful
   */ undo() {
        return this.historyManager.undo();
    }
    /**
   * Redo the next action
   * @returns {boolean} Whether redo was successful
   */ redo() {
        return this.historyManager.redo();
    }
    /**
   * Save current state to history
   * @param {string} action - Description of the action
   */ saveState(action) {
        this.historyManager.saveState(action);
    }
    /**
   * Get history status for UI updates
   * @returns {Object} History status
   */ getHistoryStatus() {
        return this.historyManager.getStatus();
    }
    /**
   * Debounce utility function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */ debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = ()=>{
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    /**
   * Get available tools for the toolbar
   * @returns {Array} Array of tool configurations
   */ getToolbar() {
        return this.toolManager.getTools();
    }
    /**
   * Get header toolbar HTML
   * @returns {string} HTML string for the header toolbar
   */ getHeaderToolbar() {
        if (!this.headerToolbar) return '<div class="header-toolbar"><!-- Header toolbar not yet initialized --></div>';
        return this.headerToolbar.render();
    }
    /**
   * Get all blocks in the editor
   * @returns {Array} Array of block instances
   */ get blocks() {
        return this.blockManager.blocks;
    }
    /**
   * Export blocks as JSON
   * @param {boolean} pretty - Whether to format for HTML display
   * @returns {string} JSON string of blocks
   */ blocksJSON(pretty = false) {
        const blocksData = this.blocks.map((block)=>{
            // Use the preserved class name if available, otherwise extract from constructor name
            let className = block.class || block.constructor.name;
            // If we get a bundled class name, try to extract the real name
            if (className.includes('$var$')) {
                const match = className.match(/\$var\$(\w+)$/);
                if (match) className = match[1];
            }
            const serializedConfig = this.serializeBlockConfig(block.config);
            return {
                id: block.id,
                class: className,
                data: serializedConfig
            };
        });
        const data = JSON.stringify(blocksData, null, 2);
        if (pretty) return data.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
        return data;
    }
    /**
   * Serialize block config without circular references
   * @param {Object} config - The configuration to serialize
   * @returns {Object} Clean configuration object
   */ serializeBlockConfig(config) {
        if (!config || typeof config !== 'object') return config;
        const serialized = {};
        for (const [key, value] of Object.entries(config)){
            if (key === 'editor' || key === 'updateFunction' || typeof value === 'function') continue;
            if (Array.isArray(value)) // Handle arrays (like columns with nested blocks)
            serialized[key] = value.map((item, index)=>{
                if (item && typeof item === 'object') {
                    // For nested blocks, only include serializable properties
                    if (item.id && item.config) {
                        // Use the preserved class name if available, otherwise extract from constructor name
                        let className = item.class || item.constructor && item.constructor.name || 'Unknown';
                        // Handle bundled class names - check both class property and constructor name
                        if (className.includes('$var$')) {
                            const match = className.match(/\$var\$(\w+)$/);
                            if (match) className = match[1];
                        } else if (item.constructor && item.constructor.name && item.constructor.name.includes('$var$')) {
                            // Handle case where class property is clean but constructor name is bundled
                            const match = item.constructor.name.match(/\$var\$(\w+)$/);
                            if (match) className = match[1];
                        }
                        const serializedBlock = {
                            id: item.id,
                            class: className,
                            config: this.serializeBlockConfig(item.config)
                        };
                        return serializedBlock;
                    }
                    // For other objects, recursively serialize
                    return this.serializeBlockConfig(item);
                }
                return item;
            });
            else if (value && typeof value === 'object') // Recursively serialize nested objects
            serialized[key] = this.serializeBlockConfig(value);
            else // Primitive values
            serialized[key] = value;
        }
        return serialized;
    }
    /**
   * Get the currently selected block
   * @returns {Object|null} Selected block instance
   */ getCurrentSelectedBlock() {
        return this.selectedBlock;
    }
    /**
   * Get rendered content of all blocks
   * @returns {string} HTML string of all blocks
   */ getEditorContent() {
        return this.blockManager.renderBlocks();
    }
    /**
   * Get settings for a specific block (including nested blocks)
   * @param {string} blockId - ID of the block (may be composite for nested blocks)
   * @returns {Array|null} Array of settings or null if not found
   */ getSettings(blockId) {
        if (!blockId) return null;
        // Check if this is a nested block (format: parentId::nestedId)
        if (blockId.includes('::')) {
            const [parentId, nestedId] = blockId.split('::');
            const parentBlock = this.blockManager.blocks.find((b)=>b.id === parentId);
            if (parentBlock && typeof parentBlock.getNestedBlockSettings === 'function') {
                const nestedSettings = parentBlock.getNestedBlockSettings(nestedId);
                return nestedSettings;
            }
        }
        // Regular top-level block
        const block = this.blockManager.blocks.find((b)=>b.id === blockId);
        const settings = block ? block.settings : null;
        return settings;
    }
    /**
   * Handle drag over events for blocks
   * @param {Event} event - Drag event
   * @param {string} blockId - ID of the target block
   */ handleDragOver(event, blockId) {
        event.preventDefault();
        if (this.dragLeaveTimeout) {
            clearTimeout(this.dragLeaveTimeout);
            this.dragLeaveTimeout = null;
        }
        if (this.dragThrottle) clearTimeout(this.dragThrottle);
        this.dragThrottle = setTimeout(()=>{
            const dropTarget = event.currentTarget;
            const rect = dropTarget.getBoundingClientRect();
            const relY = event.clientY - rect.top;
            const position = relY < rect.height * 0.4 ? 'top' : 'bottom';
            if (this.hoveredTarget[blockId] !== position) this.hoveredTarget[blockId] = position;
        }, 10);
    }
    /**
   * Handle drag leave events for blocks
   * @param {Event} event - Drag event
   * @param {string} blockId - ID of the target block
   */ handleDragLeave(event, blockId) {
        const dropTarget = event.currentTarget;
        const relatedTarget = event.relatedTarget;
        if (!relatedTarget || !dropTarget.contains(relatedTarget)) {
            if (this.dragLeaveTimeout) clearTimeout(this.dragLeaveTimeout);
            this.dragLeaveTimeout = setTimeout(()=>{
                if (this.hoveredTarget[blockId]) delete this.hoveredTarget[blockId];
                this.dragLeaveTimeout = null;
            }, 100);
        }
    }
    /**
   * Create a new block instance
   * @param {string} blockName - Name of the block type
   * @param {boolean} push - Whether to add to blocks array
   * @param {string} existingId - Optional existing ID to use instead of generating new one
   * @returns {Object} New block instance
   */ initBlock(blockName, push = false, existingId = null) {
        if (!this.toolConfig || !this.toolConfig[blockName]) {
            (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error(`Tool configuration for ${blockName} not found`);
            return null;
        }
        const BlockClass = this.toolConfig[blockName].class;
        const config = JSON.parse(JSON.stringify(this.toolConfig[blockName].config));
        const newBlock = new BlockClass({
            id: existingId || $cda2b75602dff697$require$uuidv4(),
            updateFunction: this.updateFunction.bind(this),
            config: config
        });
        // Preserve the clean class name
        newBlock.class = blockName;
        newBlock.init(this);
        if (push) this.blocks.push(newBlock);
        return newBlock;
    }
    /**
   * Handle drop events for blocks
   * @param {Event} event - Drop event
   * @param {string} position - Drop position
   * @param {string|null} blockId - ID of target block
   */ handleDrop(event, position = 'end', blockId = null) {
        event.preventDefault();
        this.clearDragTimeouts();
        const blockName = event.dataTransfer.getData('text/plain');
        const newBlock = this.initBlock(blockName);
        if (!newBlock) {
            (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error(`Failed to create block of type ${blockName}`);
            return;
        }
        if (blockId) {
            const index = this.blocks.findIndex((b)=>b.id === blockId);
            const insertPosition = this.hoveredTarget[blockId] === 'top' ? 'before' : 'after';
            delete this.hoveredTarget[blockId];
            if (insertPosition === 'before') this.blocks.splice(index, 0, newBlock);
            else this.blocks.splice(index + 1, 0, newBlock);
        } else this.blocks.push(newBlock);
        this.$dispatch('editor-drop', {
            id: this.id
        });
        this.setActive(null, newBlock.id);
        this.saveState(`Added ${blockName} block`);
    }
    /**
   * Clear all drag-related timeouts
   */ clearDragTimeouts() {
        if (this.dragThrottle) {
            clearTimeout(this.dragThrottle);
            this.dragThrottle = null;
        }
        if (this.dragLeaveTimeout) {
            clearTimeout(this.dragLeaveTimeout);
            this.dragLeaveTimeout = null;
        }
    }
    /**
   * Clean up when component is destroyed
   */ destroy() {
        this.clearDragTimeouts();
        this.hoveredTarget = {};
    }
    /**
   * Update a block's configuration
   * @param {string} id - Block ID
   * @param {Object} config - New configuration
   */ updateFunction(id, config) {
        const block = this.blockManager.blocks.find((b)=>b.id === id);
        if (block) {
            // Merge config while preserving Tool instances in arrays
            this.mergeConfigPreservingToolInstances(block.config, config);
            this.$dispatch('editor-updated', {
                id: this.id
            });
            // Use debounced save for property updates
            this.debouncedSaveState();
        }
    }
    /**
   * Merge config while preserving Tool instances in arrays
   * @param {Object} target - Target config to update
   * @param {Object} source - Source config with updates
   */ mergeConfigPreservingToolInstances(target, source) {
        for (const [key, value] of Object.entries(source)){
            if (Array.isArray(value) && Array.isArray(target[key])) {
                // For arrays, preserve existing Tool instances where possible
                value.forEach((item, index)=>{
                    if (item && typeof item === 'object' && item.id) {
                        // Find existing Tool instance with same ID
                        const existingTool = target[key].find((t)=>t && t.id === item.id);
                        if (existingTool && typeof existingTool.serializeConfig === 'function') {
                            // Update the existing Tool instance's config instead of replacing it
                            this.mergeConfigPreservingToolInstances(existingTool.config, item.config || {});
                            // Don't replace the Tool instance
                            return;
                        }
                    }
                    // For non-Tool items or new items, just assign
                    target[key][index] = value[index];
                });
                // Handle array length changes
                if (value.length !== target[key].length) target[key].length = value.length;
            } else if (value && typeof value === 'object' && !Array.isArray(value)) {
                // For nested objects, recurse
                if (!target[key] || typeof target[key] !== 'object') target[key] = {};
                this.mergeConfigPreservingToolInstances(target[key], value);
            } else // For primitive values, just assign
            target[key] = value;
        }
    }
    /**
   * Set the active block (supports nested blocks)
   * @param {Event|null} event - Event that triggered the change
   * @param {string} block - Block ID to set as active (may be composite for nested blocks)
   */ setActive(event, block) {
        if (this.selectedBlock === block) return;
        this.selectedBlock = block;
        (0, $4c0d28162c26105d$export$153e5dc2c098b35c).debug(`Block changed: ${block}`);
        this.$nextTick(()=>{
            this.$dispatch('editor-block-changed', {
                block_id: block
            });
        });
    }
    /**
   * Show delete confirmation modal
   * @param {string} blockId - ID of block to delete
   */ showDeleteConfirmation(blockId) {
        this.deleteConfirmation.blockId = blockId;
        this.deleteConfirmation.show = true;
        (0, $4c0d28162c26105d$export$153e5dc2c098b35c).debug(`Delete confirmation shown for block: ${blockId}`);
    }
    /**
   * Confirm and delete the block
   */ confirmDeleteBlock(blockId) {
        if (!blockId) return;
        const blockIndex = this.blocks.findIndex((b)=>b.id === blockId);
        if (blockIndex !== -1) {
            // Remove the block
            this.blocks.splice(blockIndex, 1);
            // Clear selection if deleted block was selected
            if (this.selectedBlock === blockId) {
                this.selectedBlock = null;
                this.$dispatch('editor-block-changed', {
                    block_id: null
                });
            }
            (0, $4c0d28162c26105d$export$153e5dc2c098b35c).info(`Block deleted: ${blockId}`);
            this.$dispatch('editor-updated', {
                id: this.id
            });
            this.saveState('Deleted block');
        }
        // Hide modal
        window.dispatchEvent(new CustomEvent('hide-delete-confirmation'));
    }
    /**
   * Generate and inject the delete confirmation modal
   */ generateModal() {
        // Only generate modal if it doesn't exist
        if (document.querySelector('.modal-overlay')) return;
        // Create modal HTML
        const modalHTML = `
        <div class="modal-overlay" 
            x-data="{ 
                show: false, 
                blockId: null,
                init() {
                    window.addEventListener('show-delete-confirmation', (e) => {
                        this.blockId = e.detail.blockId;
                        this.show = true;
                    });
                    window.addEventListener('hide-delete-confirmation', () => {
                        this.show = false;
                        this.blockId = null;
                    });
                },
            }" 
            x-show="show" 
            @click="show = false"
            style="display: none;">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <svg class="modal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                    </svg>
                    <h3 class="modal-title">Remove Block</h3>
                </div>
                <p class="modal-description">
                    Are you sure you want to remove this block? This action cannot be undone.
                </p>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-cancel" @click="show = false">
                        Cancel
                    </button>
                    <button class="modal-btn modal-btn-confirm" 
                            @click="
                                window.dispatchEvent(new CustomEvent('confirm-delete-block', { detail: { blockId: blockId } }));
                                show = false;
                                blockId = null;
                            ">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    `;
        // Inject modal into body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        (0, $4c0d28162c26105d$export$153e5dc2c098b35c).info('Delete confirmation modal generated and injected');
    }
    /**
   * Log messages based on log level (deprecated - use Debug utility)
   * @param {string} message - Message to log
   * @param {number} level - Log level (1-3)
   * @deprecated Use Debug utility instead
   */ log(message, level = 1) {
        if (level > this.log_level) return;
        (0, $4c0d28162c26105d$export$153e5dc2c098b35c).log(message);
    }
}


/**
 * Toolbar manager for handling tool drag operations and click-to-append
 */ class $ae1a22f2bd2eaeed$export$4c260019440d418f {
    constructor(){
        this.tools = [];
        this.isDragging = false;
        this.dragStartTime = null;
    }
    /**
   * Initialize toolbar event listeners
   */ init() {
        window.addEventListener('editor-ready', (event)=>{
            const editorId = event.detail.id;
            if (window.alpineEditors && window.alpineEditors[editorId]) this.tools = window.alpineEditors[editorId].getToolbar();
        });
    }
    /**
   * Handle drag start event for tools
   * @param {DragEvent} event - The drag event
   * @param {Object} tool - The tool being dragged
   */ handleDragStart(event, tool) {
        this.isDragging = true;
        this.dragStartTime = Date.now();
        event.dataTransfer.setData('text/plain', tool.class);
        event.dataTransfer.effectAllowed = 'copy';
    }
    /**
   * Handle drag end event for tools
   * @param {DragEvent} event - The drag event
   */ handleDragEnd(event) {
        // Reset drag state after a short delay to allow click detection
        setTimeout(()=>{
            this.isDragging = false;
            this.dragStartTime = null;
        }, 100);
    }
    /**
   * Handle click event for tools (append to bottom if not dragging)
   * @param {MouseEvent} event - The click event
   * @param {Object} tool - The tool being clicked
   */ handleClick(event, tool) {
        // Prevent click if we just finished dragging
        if (this.isDragging || this.dragStartTime && Date.now() - this.dragStartTime < 200) return;
        // Find the editor instance
        const editorElement = document.getElementById('editorjs');
        if (editorElement && editorElement._x_dataStack && editorElement._x_dataStack[0]) {
            const editorData = editorElement._x_dataStack[0];
            if (editorData.editor) {
                // Create a synthetic drop event to append at the end
                const syntheticEvent = {
                    preventDefault: ()=>{},
                    dataTransfer: {
                        getData: ()=>tool.class
                    }
                };
                // Call handleDrop with no position/blockId to append at end
                editorData.editor.handleDrop(syntheticEvent, 'end', null);
            }
        }
    }
    /**
   * Handle drop event (existing functionality)
   * @param {DragEvent} event - The drop event
   * @param {Object} tool - The tool being dropped
   */ handleDrop(event, tool) {
        // This method is kept for compatibility but drag/drop is handled by the editor
        event.preventDefault();
    }
}



class $299948f22c89836d$export$c72f6eaae7b9adff {
    constructor(editorId, settings = {}){
        this.editorId = editorId;
        this.settings = settings;
    }
    /**
   * Initialize settings panel event listeners
   */ init() {
        window.addEventListener('editor-block-changed', (event)=>{
            if (window.alpineEditors[this.editorId]) {
                const newSettings = window.alpineEditors[this.editorId].getSettings(event.detail.block_id);
                this.settings = newSettings || [];
                // Force Alpine to update by dispatching a custom event
                document.dispatchEvent(new CustomEvent('settings-updated', {
                    detail: {
                        editorId: this.editorId,
                        settings: this.settings,
                        blockId: event.detail.block_id
                    }
                }));
            }
        });
    }
    /**
   * Handle property changes from the settings panel (supports nested blocks)
   * @param {string} block_id - The ID of the block to update (may be composite for nested blocks)
   * @param {string} property - The property name to update
   * @param {*} value - The new value for the property
   */ trigger(block_id, property, value = null) {
        const editorInstance = window.alpineEditors[this.editorId];
        if (!editorInstance) {
            (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error('Editor instance not found:', this.editorId);
            return;
        }
        // Check if this is a nested block (format: parentId::nestedId)
        if (block_id.includes('::')) {
            const [parentId, nestedId] = block_id.split('::');
            const parentBlock = editorInstance.blocks.find((b)=>b.id === parentId);
            if (parentBlock && typeof parentBlock.updateNestedBlock === 'function') {
                // Create update object for nested block
                const updateObj = {
                    [property]: value
                };
                parentBlock.updateNestedBlock(nestedId, updateObj);
                return;
            } else {
                (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error('Parent block or updateNestedBlock method not found:', parentId);
                return;
            }
        }
        // Handle regular top-level blocks
        const block = editorInstance.blocks.find((b)=>b.id === block_id);
        if (!block) {
            (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error('Block not found:', block_id);
            return;
        }
        if (typeof block[property] === 'function') block[property](value);
        else if (block.config && block.config.hasOwnProperty(property)) {
            block.config[property] = value;
            block.triggerRedraw();
        } else {
            block[property] = value;
            if (block.triggerRedraw) block.triggerRedraw();
        }
        // Trigger debounced state save for property changes
        if (editorInstance.debouncedSaveState) editorInstance.debouncedSaveState();
    }
    /**
   * Execute a callback function and trigger editor redraw
   * @param {Function} callback - The callback function to execute
   */ doCallback(callback) {
        callback();
        window.alpineEditors[this.editorId].blockManager.triggerRedraw();
    }
}




/**
 * Base class for all AlpineBlocks tools
 * Provides common functionality for block rendering and interaction
 */ class $7a9b6788f4274d37$export$2e2bcd8739ae039 {
    constructor(id, updateFunction, config){
        this.id = id;
        this.updateFunction = updateFunction;
        this.config = config;
        this.editor = null;
        this.el = null;
    }
    /**
   * Triggers a redraw of the block by calling the update function
   */ triggerRedraw() {
        if (typeof this.updateFunction === 'function') {
            // Use the safe serialization method to avoid circular references
            const cleanConfig = this.serializeConfig(this.config);
            this.updateFunction(this.id, cleanConfig);
        }
    }
    /**
   * Serialize config safely without circular references
   * @param {Object} config - Configuration to serialize
   * @returns {Object} Clean configuration
   */ serializeConfig(config) {
        if (!config || typeof config !== 'object') return config;
        const serialized = {};
        for (const [key, value] of Object.entries(config)){
            if (key === 'editor' || key === 'updateFunction' || typeof value === 'function') continue;
            if (Array.isArray(value)) serialized[key] = value.map((item)=>{
                if (item && typeof item === 'object') {
                    if (item.id && item.config) {
                        // For nested blocks, use their own serializeConfig if available
                        if (typeof item.serializeConfig === 'function') {
                            // Extract class name properly from Tool instances
                            let className = item.class;
                            if (!className && item.constructor && item.constructor.name) {
                                className = item.constructor.name;
                                // Handle bundled class names like $var$Header
                                if (className.includes('$var$')) {
                                    const match = className.match(/\$var\$(\w+)$/);
                                    if (match) className = match[1];
                                }
                            }
                            return {
                                id: item.id,
                                class: className || 'Unknown',
                                config: item.serializeConfig(item.config)
                            };
                        }
                        // Fallback for plain objects from previous serialization
                        let className;
                        if (item.class && typeof item.class === 'string' && item.class !== 'Object') className = item.class;
                        else if (item.constructor && item.constructor.name && item.constructor.name !== 'Object') {
                            className = item.constructor.name;
                            // Handle bundled class names
                            if (className.includes('$var$')) {
                                const match = className.match(/\$var\$(\w+)$/);
                                if (match) className = match[1];
                            }
                        } else className = 'Unknown';
                        return {
                            id: item.id,
                            class: className,
                            config: this.serializeConfig(item.config)
                        };
                    }
                    return this.serializeConfig(item);
                }
                return item;
            });
            else if (value && typeof value === 'object') serialized[key] = this.serializeConfig(value);
            else serialized[key] = value;
        }
        return serialized;
    }
    /**
   * Initialize the tool with editor instance and set up event listeners
   * @param {Object} editor - The Alpine editor instance
   */ init(editor) {
        this.editor = editor;
        this.editor.$nextTick(()=>{
            this.el = document.getElementById(this.id);
            // Only add event listeners if element exists (nested blocks may not have direct DOM IDs)
            if (this.el) this.el.addEventListener('mouseup', (event)=>{
                const selectedText = window.getSelection().toString();
                if (selectedText.length > 0) this.editor.$dispatch('editor-show-inline-toolbar', {
                    event: event,
                    id: this.id,
                    text: selectedText
                });
                else this.editor.$dispatch('editor-hide-inline-toolbar');
            });
        });
    }
    /**
   * Helper method to generate select options with current value selected
   * @param {Array} options - Array of {value, label} objects
   * @param {string} currentValue - Current selected value
   * @returns {string} HTML options string
   */ generateSelectOptions(options, currentValue) {
        return options.map((option)=>{
            const value = option.value || option;
            const label = option.label || option;
            const selected = currentValue === value ? 'selected' : '';
            return `<option value="${value}" ${selected}>${label}</option>`;
        }).join('');
    }
    /**
   * Static method to define tool metadata for the toolbox
   * @returns {Object} Tool configuration object
   */ static toolbox() {
        return {
            name: 'Tool',
            icon: 'default-icon'
        };
    }
}


/**
 * Paragraph tool for creating editable text blocks
 */ class $4672dcc6140b9c43$var$Paragraph extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || '<p>Enter your text here...</p>',
            fontSize: this.config.fontSize || 'medium',
            fontWeight: this.config.fontWeight || 'normal',
            alignment: this.config.alignment || 'left',
            lineHeight: this.config.lineHeight || 'normal',
            textColor: this.config.textColor || '#333333',
            backgroundColor: this.config.backgroundColor || 'transparent',
            padding: this.config.padding || 'none',
            margin: this.config.margin || 'normal'
        };
    }
    get settings() {
        return [
            {
                name: 'fontSize',
                label: 'Font Size',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'fontSize', $event.target.value)">
                    ${this.generateSelectOptions([
                    {
                        value: 'small',
                        label: 'Small'
                    },
                    {
                        value: 'medium',
                        label: 'Medium'
                    },
                    {
                        value: 'large',
                        label: 'Large'
                    },
                    {
                        value: 'xlarge',
                        label: 'Extra Large'
                    }
                ], this.config.fontSize)}
                </select>`
            },
            {
                name: 'fontWeight',
                label: 'Font Weight',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'fontWeight', $event.target.value)">
                    ${this.generateSelectOptions([
                    {
                        value: 'normal',
                        label: 'Normal'
                    },
                    {
                        value: 'bold',
                        label: 'Bold'
                    },
                    {
                        value: 'light',
                        label: 'Light'
                    }
                ], this.config.fontWeight)}
                </select>`
            },
            {
                name: 'alignment',
                label: 'Text Alignment',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    ${this.generateSelectOptions([
                    {
                        value: 'left',
                        label: 'Left'
                    },
                    {
                        value: 'center',
                        label: 'Center'
                    },
                    {
                        value: 'right',
                        label: 'Right'
                    },
                    {
                        value: 'justify',
                        label: 'Justify'
                    }
                ], this.config.alignment)}
                </select>`
            },
            {
                name: 'lineHeight',
                label: 'Line Height',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'lineHeight', $event.target.value)">
                    <option value="tight">Tight</option>
                    <option value="normal">Normal</option>
                    <option value="loose">Loose</option>
                </select>`
            },
            {
                name: 'textColor',
                label: 'Text Color',
                html: `<input type="color" class="settings-color-input" 
                    @change="trigger('${this.id}', 'textColor', $event.target.value)"
                    value="${this.config.textColor}">`
            },
            {
                name: 'backgroundColor',
                label: 'Background Color',
                html: `<input type="color" class="settings-color-input" 
                    @change="trigger('${this.id}', 'backgroundColor', $event.target.value)"
                    value="${this.config.backgroundColor === 'transparent' ? '#ffffff' : this.config.backgroundColor}">`
            },
            {
                name: 'padding',
                label: 'Padding',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'padding', $event.target.value)">
                    <option value="none">None</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>`
            },
            {
                name: 'margin',
                label: 'Margin',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'margin', $event.target.value)">
                    <option value="none">None</option>
                    <option value="small">Small</option>
                    <option value="normal">Normal</option>
                    <option value="large">Large</option>
                </select>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Paragraph',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M192 32h64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384l0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-352H288l0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96H192c-88.4 0-160-71.6-160-160s71.6-160 160-160z"/></svg>',
            category: 'Basic'
        };
    }
    /**
   * Generate CSS styles based on configuration
   * @returns {string} CSS style string
   */ getStyleString() {
        const fontSizes = {
            small: '0.875rem',
            medium: '1rem',
            large: '1.125rem',
            xlarge: '1.25rem'
        };
        const lineHeights = {
            tight: '1.2',
            normal: '1.5',
            loose: '1.8'
        };
        const paddings = {
            none: '0',
            small: '0.5rem',
            medium: '1rem',
            large: '1.5rem'
        };
        const margins = {
            none: '0',
            small: '0.5rem',
            normal: '1rem',
            large: '1.5rem'
        };
        const styles = [];
        styles.push(`font-size: ${fontSizes[this.config.fontSize]}`);
        styles.push(`font-weight: ${this.config.fontWeight}`);
        styles.push(`text-align: ${this.config.alignment}`);
        styles.push(`line-height: ${lineHeights[this.config.lineHeight]}`);
        styles.push(`color: ${this.config.textColor}`);
        styles.push(`background-color: ${this.config.backgroundColor}`);
        styles.push(`padding: ${paddings[this.config.padding]}`);
        styles.push(`margin: ${margins[this.config.margin]} 0`);
        return styles.join('; ');
    }
    editorRender() {
        const styleString = this.getStyleString();
        return `<div class="paragraph-block"
                    style="${styleString}"
                    contenteditable="true"
                    x-html="block.config.content"
                    @blur="block.config.content = $event.target.innerHTML">${this.config.content}</div>`;
    }
    render() {
        const styleString = this.getStyleString();
        return `<div class="paragraph-block" style="${styleString}">${this.config.content}</div>`;
    }
}
var $4672dcc6140b9c43$export$2e2bcd8739ae039 = $4672dcc6140b9c43$var$Paragraph;



class $33963d57131b26df$var$Header extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        // Default config if not provided
        this.config = {
            content: this.config.content || 'Heading Text',
            level: this.config.level || 'h2',
            alignment: this.config.alignment || 'left',
            anchor: this.config.anchor || '',
            fontSize: this.config.fontSize || 'default',
            fontWeight: this.config.fontWeight || 'normal',
            textColor: this.config.textColor || '#333333'
        };
        // Store the base ID for use in the getter
        this._id = id;
    }
    get settings() {
        return [
            {
                name: 'level',
                label: 'Heading Level',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'level', $event.target.value)">
                    <option value="h1" ${this.config.level === 'h1' ? 'selected' : ''}>H1</option>
                    <option value="h2" ${this.config.level === 'h2' ? 'selected' : ''}>H2</option>
                    <option value="h3" ${this.config.level === 'h3' ? 'selected' : ''}>H3</option>
                    <option value="h4" ${this.config.level === 'h4' ? 'selected' : ''}>H4</option>
                    <option value="h5" ${this.config.level === 'h5' ? 'selected' : ''}>H5</option>
                    <option value="h6" ${this.config.level === 'h6' ? 'selected' : ''}>H6</option>
                </select>`
            },
            {
                name: 'alignment',
                label: 'Text Alignment',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left" ${this.config.alignment === 'left' ? 'selected' : ''}>Left</option>
                    <option value="center" ${this.config.alignment === 'center' ? 'selected' : ''}>Center</option>
                    <option value="right" ${this.config.alignment === 'right' ? 'selected' : ''}>Right</option>
                    <option value="justify" ${this.config.alignment === 'justify' ? 'selected' : ''}>Justify</option>
                </select>`
            },
            {
                name: 'anchor',
                label: 'Anchor ID',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'anchor', $event.target.value)"
                    :value="block.config.anchor"
                    placeholder="Optional anchor ID">`
            },
            {
                name: 'fontSize',
                label: 'Font Size',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'fontSize', $event.target.value)">
                    <option value="small" ${this.config.fontSize === 'small' ? 'selected' : ''}>Small</option>
                    <option value="default" ${this.config.fontSize === 'default' ? 'selected' : ''}>Default</option>
                    <option value="large" ${this.config.fontSize === 'large' ? 'selected' : ''}>Large</option>
                    <option value="xlarge" ${this.config.fontSize === 'xlarge' ? 'selected' : ''}>Extra Large</option>
                </select>`
            },
            {
                name: 'fontWeight',
                label: 'Font Weight',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'fontWeight', $event.target.value)">
                    <option value="normal" ${this.config.fontWeight === 'normal' ? 'selected' : ''}>Normal</option>
                    <option value="bold" ${this.config.fontWeight === 'bold' ? 'selected' : ''}>Bold</option>
                    <option value="lighter" ${this.config.fontWeight === 'lighter' ? 'selected' : ''}>Lighter</option>
                </select>`
            },
            {
                name: 'textColor',
                label: 'Text Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'textColor', $event.target.value)"
                    :value="block.config.textColor">`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Header',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z"/></svg>',
            category: 'Basic'
        };
    }
    getStyleString() {
        const fontSizes = {
            small: '0.875rem',
            default: '',
            large: '1.25rem',
            xlarge: '1.5rem'
        };
        const styles = [];
        if (this.config.alignment) styles.push(`text-align: ${this.config.alignment}`);
        if (this.config.fontSize && this.config.fontSize !== 'default') styles.push(`font-size: ${fontSizes[this.config.fontSize]}`);
        if (this.config.fontWeight) styles.push(`font-weight: ${this.config.fontWeight}`);
        if (this.config.textColor) styles.push(`color: ${this.config.textColor}`);
        return styles.join('; ');
    }
    editorRender() {
        const styleString = this.getStyleString();
        const anchorId = this.config.anchor ? `id="${this.config.anchor}"` : '';
        return `<${this.config.level} 
            class="header-block"
            ${anchorId}
            style="${styleString}"
            contenteditable="true"
            x-html="block.config.content"
            @blur="block.config.content = $event.target.innerHTML"></${this.config.level}>`;
    }
    render() {
        const styleString = this.getStyleString();
        const anchorId = this.config.anchor ? `id="${this.config.anchor}"` : '';
        return `<${this.config.level} ${anchorId} style="${styleString}">${this.config.content}</${this.config.level}>`;
    }
}
var $33963d57131b26df$export$2e2bcd8739ae039 = $33963d57131b26df$var$Header;



class $84a8a2891314e8a4$var$List extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || '<li>List item 1</li><li>List item 2</li><li>List item 3</li>',
            type: this.config.type || 'ul',
            style: this.config.style || 'default',
            indentation: this.config.indentation || 'normal',
            spacing: this.config.spacing || 'normal'
        };
        this.settings = [
            {
                name: 'type',
                label: 'List Type',
                html: `<select @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="ul">Unordered List</option>
                    <option value="ol">Ordered List</option>
                </select>`
            },
            {
                name: 'style',
                label: 'List Style',
                html: `<select @change="trigger('${this.id}', 'style', $event.target.value)">
                    <option value="default">Default</option>
                    <option value="none">None</option>
                    <option value="disc">Disc</option>
                    <option value="circle">Circle</option>
                    <option value="square">Square</option>
                    <option value="decimal">Numbers</option>
                    <option value="lower-alpha">Lower Alpha</option>
                    <option value="upper-alpha">Upper Alpha</option>
                    <option value="lower-roman">Lower Roman</option>
                    <option value="upper-roman">Upper Roman</option>
                </select>`
            },
            {
                name: 'indentation',
                label: 'Indentation',
                html: `<select @change="trigger('${this.id}', 'indentation', $event.target.value)">
                    <option value="minimal">Minimal</option>
                    <option value="normal">Normal</option>
                    <option value="extended">Extended</option>
                </select>`
            },
            {
                name: 'spacing',
                label: 'Item Spacing',
                html: `<select @change="trigger('${this.id}', 'spacing', $event.target.value)">
                    <option value="compact">Compact</option>
                    <option value="normal">Normal</option>
                    <option value="loose">Loose</option>
                </select>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'List',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>',
            category: 'Basic'
        };
    }
    getStyleString() {
        const indentations = {
            minimal: '1rem',
            normal: '2rem',
            extended: '3rem'
        };
        const spacings = {
            compact: '0.25rem',
            normal: '0.5rem',
            loose: '1rem'
        };
        const styles = [];
        if (this.config.style && this.config.style !== 'default') styles.push(`list-style-type: ${this.config.style}`);
        if (this.config.indentation) styles.push(`padding-left: ${indentations[this.config.indentation]}`);
        if (this.config.spacing) styles.push(`margin-bottom: ${spacings[this.config.spacing]}`);
        return styles.join('; ');
    }
    editorRender() {
        const styleString = this.getStyleString();
        return `<${this.config.type} 
            class="list-block"
            style="${styleString}"
            contenteditable="true"
            x-html="block.config.content"
            @blur="block.config.content = $event.target.innerHTML"
            @keydown.enter.prevent="$event.target.innerHTML += '<li>New item</li>'"></${this.config.type}>`;
    }
    render() {
        const styleString = this.getStyleString();
        return `<${this.config.type} style="${styleString}">${this.config.content}</${this.config.type}>`;
    }
}
var $84a8a2891314e8a4$export$2e2bcd8739ae039 = $84a8a2891314e8a4$var$List;



class $5946ce6f8e5f3f11$var$Code extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || '// Your code here',
            language: this.config.language || 'javascript',
            showLineNumbers: this.config.showLineNumbers || true
        };
        this.settings = [
            {
                name: 'language',
                label: 'Language',
                html: `<select @change="trigger('${this.id}', 'language', $event.target.value)">
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="php">PHP</option>
                    <option value="ruby">Ruby</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                </select>`
            },
            {
                name: 'showLineNumbers',
                label: 'Show Line Numbers',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showLineNumbers', $event.target.checked)"
                        :checked="${this.config.showLineNumbers}">
                    Show Line Numbers
                </label>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Code',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>',
            category: 'Advanced'
        };
    }
    editorRender() {
        const lineNumbersClass = this.config.showLineNumbers ? 'line-numbers' : '';
        return `<pre class="code-block ${lineNumbersClass}">
            <code class="language-${this.config.language}"
                contenteditable="true"
                x-html="block.config.content"
                @blur="block.config.content = $event.target.innerHTML"></code>
        </pre>`;
    }
    render() {
        const lineNumbersClass = this.config.showLineNumbers ? 'line-numbers' : '';
        return `<pre class="code-block ${lineNumbersClass}">
            <code class="language-${this.config.language}">${this.config.content}</code>
        </pre>`;
    }
}
var $5946ce6f8e5f3f11$export$2e2bcd8739ae039 = $5946ce6f8e5f3f11$var$Code;


/*
image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        }
      }
 */ 
class $89b22059272e1d27$var$Image extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            src: this.config.src || 'https://placecats.com/millie/1280/720',
            alt: this.config.alt || 'Cute cat placeholder image',
            caption: this.config.caption || '',
            alignment: this.config.alignment || 'center',
            width: this.config.width || 'auto'
        };
        this.settings = [
            {
                name: 'imageUrl',
                label: 'Image URL',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'src', $event.target.value)"
                    value="${this.config.src}"
                    placeholder="Enter image URL">`
            },
            {
                name: 'altText',
                label: 'Alt Text',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'alt', $event.target.value)"
                    value="${this.config.alt}"
                    placeholder="Enter alt text">`
            },
            {
                name: 'caption',
                label: 'Caption',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'caption', $event.target.value)"
                    value="${this.config.caption}"
                    placeholder="Enter image caption">`
            },
            {
                name: 'alignment',
                label: 'Alignment',
                html: `<select @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left" ${this.config.alignment === 'left' ? 'selected' : ''}>Left</option>
                    <option value="center" ${this.config.alignment === 'center' ? 'selected' : ''}>Center</option>
                    <option value="right" ${this.config.alignment === 'right' ? 'selected' : ''}>Right</option>
                </select>`
            },
            {
                name: 'width',
                label: 'Width',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'width', $event.target.value)"
                    value="${this.config.width}"
                    placeholder="auto, 100%, or specific px">`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Image',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>',
            category: 'Media'
        };
    }
    editorRender() {
        return `<figure class="image-block" style="text-align: ${this.config.alignment}">
            <img src="${this.config.src}" 
                alt="${this.config.alt}"
                style="width: ${this.config.width}">
            <figcaption 
                contenteditable="true"
                x-html="block.config.caption"
                @blur="block.config.caption = $event.target.innerHTML">${this.config.caption}</figcaption>
        </figure>`;
    }
    render() {
        return `<figure class="image-block" style="text-align: ${this.config.alignment}">
            <img src="${this.config.src}" 
                alt="${this.config.alt}"
                style="width: ${this.config.width}">
            <figcaption>${this.config.caption}</figcaption>
        </figure>`;
    }
}
var $89b22059272e1d27$export$2e2bcd8739ae039 = $89b22059272e1d27$var$Image;


/*class: Quote,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+O',
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author',
      },*/ 
class $56e8ed795405fb5c$var$Quote extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || 'Enter your quote here',
            attribution: this.config.attribution || '',
            style: this.config.style || 'default',
            alignment: this.config.alignment || 'left',
            fontSize: this.config.fontSize || 'medium',
            fontStyle: this.config.fontStyle || 'italic',
            borderStyle: this.config.borderStyle || 'left',
            backgroundColor: this.config.backgroundColor || 'transparent',
            textColor: this.config.textColor || '#333333',
            borderColor: this.config.borderColor || '#cccccc'
        };
        this.settings = [
            {
                name: 'style',
                label: 'Quote Style',
                html: `<select @change="trigger('${this.id}', 'style', $event.target.value)">
                    <option value="default">Default</option>
                    <option value="blockquote">Block Quote</option>
                    <option value="pullquote">Pull Quote</option>
                    <option value="testimonial">Testimonial</option>
                </select>`
            },
            {
                name: 'alignment',
                label: 'Alignment',
                html: `<select @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>`
            },
            {
                name: 'fontSize',
                label: 'Font Size',
                html: `<select @change="trigger('${this.id}', 'fontSize', $event.target.value)">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Extra Large</option>
                </select>`
            },
            {
                name: 'fontStyle',
                label: 'Font Style',
                html: `<select @change="trigger('${this.id}', 'fontStyle', $event.target.value)">
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                    <option value="oblique">Oblique</option>
                </select>`
            },
            {
                name: 'borderStyle',
                label: 'Border Style',
                html: `<select @change="trigger('${this.id}', 'borderStyle', $event.target.value)">
                    <option value="none">None</option>
                    <option value="left">Left Border</option>
                    <option value="top">Top Border</option>
                    <option value="bottom">Bottom Border</option>
                    <option value="full">Full Border</option>
                </select>`
            },
            {
                name: 'textColor',
                label: 'Text Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'textColor', $event.target.value)"
                    :value="${this.config.textColor}">`
            },
            {
                name: 'backgroundColor',
                label: 'Background Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'backgroundColor', $event.target.value)"
                    :value="${this.config.backgroundColor}">`
            },
            {
                name: 'borderColor',
                label: 'Border Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'borderColor', $event.target.value)"
                    :value="${this.config.borderColor}"
                    x-show="${this.config.borderStyle !== 'none'}">`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Quote',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V216z"/></svg>',
            category: 'Basic'
        };
    }
    getBorderStyle() {
        const borderWidth = '3px';
        const borderColor = this.config.borderColor;
        switch(this.config.borderStyle){
            case 'left':
                return `border-left: ${borderWidth} solid ${borderColor}`;
            case 'top':
                return `border-top: ${borderWidth} solid ${borderColor}`;
            case 'bottom':
                return `border-bottom: ${borderWidth} solid ${borderColor}`;
            case 'full':
                return `border: 1px solid ${borderColor}`;
            default:
                return 'border: none';
        }
    }
    getStyleString() {
        const fontSizes = {
            small: '0.875rem',
            medium: '1rem',
            large: '1.25rem',
            xlarge: '1.5rem'
        };
        const styles = [];
        styles.push(`text-align: ${this.config.alignment}`);
        styles.push(`font-size: ${fontSizes[this.config.fontSize]}`);
        styles.push(`font-style: ${this.config.fontStyle}`);
        styles.push(`color: ${this.config.textColor}`);
        styles.push(`background-color: ${this.config.backgroundColor}`);
        styles.push(this.getBorderStyle());
        styles.push('padding: 1rem');
        styles.push('margin: 1rem 0');
        if (this.config.borderStyle === 'left') styles.push('padding-left: 1.5rem');
        return styles.join('; ');
    }
    editorRender() {
        const styleString = this.getStyleString();
        return `<blockquote class="quote-block quote-${this.config.style}" style="${styleString}">
            <div class="quote-content"
                contenteditable="true"
                x-html="block.config.content"
                @blur="block.config.content = $event.target.innerHTML">${this.config.content}</div>
            <cite class="quote-attribution"
                contenteditable="true"
                x-html="block.config.attribution"
                @blur="block.config.attribution = $event.target.innerHTML"
                x-show="block.config.attribution.length > 0"
                style="font-style: normal; font-size: 0.875rem; margin-top: 0.5rem; display: block;">${this.config.attribution}</cite>
        </blockquote>`;
    }
    render() {
        const styleString = this.getStyleString();
        return `<blockquote class="quote-block quote-${this.config.style}" style="${styleString}">
            <div class="quote-content">${this.config.content}</div>
            ${this.config.attribution ? `<cite class="quote-attribution" style="font-style: normal; font-size: 0.875rem; margin-top: 0.5rem; display: block;">${this.config.attribution}</cite>` : ''}
        </blockquote>`;
    }
}
var $56e8ed795405fb5c$export$2e2bcd8739ae039 = $56e8ed795405fb5c$var$Quote;



class $806caca8705a7215$var$WYSIWYG extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || 'Start typing here...',
            format: this.config.format || 'p'
        };
        this.settings = [
            {
                name: 'format',
                label: 'Block Format',
                html: `<select @change="trigger('${this.id}', 'format', $event.target.value)">
                    <option value="p">Paragraph</option>
                    <option value="div">Plain</option>
                    <option value="pre">Preformatted</option>
                </select>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Rich Text',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>',
            category: 'Basic'
        };
    }
    editorRender() {
        return `<div class="wysiwyg-editor">
            <div class="wysiwyg-toolbar">
                <div class="wysiwyg-toolbar-group">
                    <button class="wysiwyg-btn wysiwyg-btn-bold" 
                            @click="document.execCommand('bold')" 
                            title="Bold">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                        </svg>
                    </button>
                    <button class="wysiwyg-btn wysiwyg-btn-italic" 
                            @click="document.execCommand('italic')" 
                            title="Italic">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="19" y1="4" x2="10" y2="4"/>
                            <line x1="14" y1="20" x2="5" y2="20"/>
                            <line x1="15" y1="4" x2="9" y2="20"/>
                        </svg>
                    </button>
                    <button class="wysiwyg-btn wysiwyg-btn-underline" 
                            @click="document.execCommand('underline')" 
                            title="Underline">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
                            <line x1="4" y1="20" x2="20" y2="20"/>
                        </svg>
                    </button>
                    <button class="wysiwyg-btn wysiwyg-btn-strike" 
                            @click="document.execCommand('strikeThrough')" 
                            title="Strikethrough">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 4H9a3 3 0 0 0-2.83 4"/>
                            <path d="M14 12a4 4 0 0 1 0 8H6"/>
                            <line x1="4" y1="12" x2="20" y2="12"/>
                        </svg>
                    </button>
                </div>
                
                <div class="wysiwyg-toolbar-separator"></div>
                
                <div class="wysiwyg-toolbar-group">
                    <select class="wysiwyg-select" 
                            @change="document.execCommand('formatBlock', false, $event.target.value)"
                            title="Format">
                        <option value="p">Paragraph</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                        <option value="h4">Heading 4</option>
                        <option value="h5">Heading 5</option>
                        <option value="h6">Heading 6</option>
                        <option value="blockquote">Quote</option>
                    </select>
                </div>
                
                <div class="wysiwyg-toolbar-separator"></div>
                
                <div class="wysiwyg-toolbar-group">
                    <button class="wysiwyg-btn wysiwyg-btn-ul" 
                            @click="document.execCommand('insertUnorderedList')" 
                            title="Bullet List">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="8" y1="6" x2="21" y2="6"/>
                            <line x1="8" y1="12" x2="21" y2="12"/>
                            <line x1="8" y1="18" x2="21" y2="18"/>
                            <line x1="3" y1="6" x2="3.01" y2="6"/>
                            <line x1="3" y1="12" x2="3.01" y2="12"/>
                            <line x1="3" y1="18" x2="3.01" y2="18"/>
                        </svg>
                    </button>
                    <button class="wysiwyg-btn wysiwyg-btn-ol" 
                            @click="document.execCommand('insertOrderedList')" 
                            title="Numbered List">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="10" y1="6" x2="21" y2="6"/>
                            <line x1="10" y1="12" x2="21" y2="12"/>
                            <line x1="10" y1="18" x2="21" y2="18"/>
                            <path d="M4 6h1v4"/>
                            <path d="M4 10h2"/>
                            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
                        </svg>
                    </button>
                </div>
                
                <div class="wysiwyg-toolbar-separator"></div>
                
                <div class="wysiwyg-toolbar-group">
                    <button class="wysiwyg-btn wysiwyg-btn-link" 
                            @click="document.execCommand('createLink', false, prompt('Enter link URL'))" 
                            title="Insert Link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"/>
                            <line x1="8" y1="12" x2="16" y2="12"/>
                        </svg>
                    </button>
                    <button class="wysiwyg-btn wysiwyg-btn-unlink" 
                            @click="document.execCommand('unlink')" 
                            title="Remove Link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18.84 12.25l1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07a5.006 5.006 0 0 0-7.07-.12l-1.71 1.72"/>
                            <path d="M5.17 11.75l-1.72 1.71a5.004 5.004 0 0 0 .12 7.07a5.006 5.006 0 0 0 7.07.12l1.71-1.72"/>
                            <line x1="8" y1="2" x2="8" y2="5"/>
                            <line x1="2" y1="8" x2="5" y2="8"/>
                            <line x1="16" y1="14" x2="16" y2="17"/>
                            <line x1="14" y1="16" x2="17" y2="16"/>
                        </svg>
                    </button>
                </div>
            </div>
            <${this.config.format} 
                class="wysiwyg-content"
                contenteditable="true"
                x-html="block.config.content"
                @blur="block.config.content = $event.target.innerHTML"
                @paste="$event.preventDefault(); document.execCommand('insertText', false, $event.clipboardData.getData('text/plain'))"
            ></${this.config.format}>
        </div>`;
    }
    render() {
        return `<${this.config.format} class="wysiwyg-content">${this.config.content}</${this.config.format}>`;
    }
}
var $806caca8705a7215$export$2e2bcd8739ae039 = $806caca8705a7215$var$WYSIWYG;


/*
alert: {
      class: Alert,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+A',
      config: {
        alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
        defaultType: 'primary',
        messagePlaceholder: 'Enter something',
      },
    },
 */ 
class $18282cbdca00d23e$var$Alert extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || 'Alert message goes here',
            type: this.config.type || 'info',
            dismissible: this.config.dismissible || false,
            icon: this.config.icon || true
        };
        this.settings = [
            {
                name: 'type',
                label: 'Alert Type',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                </select>`
            },
            {
                name: 'dismissible',
                label: 'Dismissible',
                html: `<label class="settings-checkbox">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'dismissible', $event.target.checked)"
                        :checked="${this.config.dismissible}">
                    <span class="settings-checkbox-label">Dismissible</span>
                </label>`
            },
            {
                name: 'icon',
                label: 'Show Icon',
                html: `<label class="settings-checkbox">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'icon', $event.target.checked)"
                        :checked="${this.config.icon}">
                    <span class="settings-checkbox-label">Show Icon</span>
                </label>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Alert',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',
            category: 'Basic'
        };
    }
    getIcon() {
        const icons = {
            info: '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>',
            success: '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>',
            warning: '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',
            error: '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>'
        };
        return icons[this.config.type] || icons.info;
    }
    editorRender() {
        return `<div class="alert-block alert-${this.config.type}">
            ${this.config.icon ? this.getIcon() : ''}
            <div class="alert-content"
                contenteditable="true"
                x-html="block.config.content"
                @blur="block.config.content = $event.target.innerHTML"></div>
            ${this.config.dismissible ? '<button class="alert-dismiss" @click="$el.closest(\'.alert-block\').remove()">\xd7</button>' : ''}
        </div>`;
    }
    render() {
        return `<div class="alert-block alert-${this.config.type}">
            ${this.config.icon ? this.getIcon() : ''}
            <div class="alert-content">${this.config.content}</div>
            ${this.config.dismissible ? '<button class="alert-dismiss">\xd7</button>' : ''}
        </div>`;
    }
}
var $18282cbdca00d23e$export$2e2bcd8739ae039 = $18282cbdca00d23e$var$Alert;



class $1d78d83887e524f6$var$VideoPlayer extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            url: this.config.url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            type: this.config.type || 'youtube',
            // youtube, vimeo, direct
            autoplay: this.config.autoplay || false,
            controls: this.config.controls || true,
            muted: this.config.muted || false,
            loop: this.config.loop || false,
            aspectRatio: this.config.aspectRatio || '16:9',
            // 16:9, 4:3, 1:1
            caption: this.config.caption || ''
        };
        this.settings = [
            {
                name: 'url',
                label: 'Video URL',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'url', $event.target.value)"
                    :value="block.config.url"
                    placeholder="Enter video URL">`
            },
            {
                name: 'type',
                label: 'Video Type',
                html: `<select @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="direct">Direct URL</option>
                </select>`
            },
            {
                name: 'autoplay',
                label: 'Autoplay',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'autoplay', $event.target.checked)"
                        :checked="block.config.autoplay">
                    Autoplay
                </label>`
            },
            {
                name: 'controls',
                label: 'Show Controls',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'controls', $event.target.checked)"
                        :checked="block.config.controls">
                    Show Controls
                </label>`
            },
            {
                name: 'muted',
                label: 'Muted',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'muted', $event.target.checked)"
                        :checked="block.config.muted">
                    Muted
                </label>`
            },
            {
                name: 'loop',
                label: 'Loop',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'loop', $event.target.checked)"
                        :checked="block.config.loop">
                    Loop
                </label>`
            },
            {
                name: 'aspectRatio',
                label: 'Aspect Ratio',
                html: `<select @change="trigger('${this.id}', 'aspectRatio', $event.target.value)">
                    <option value="16:9">16:9 (Widescreen)</option>
                    <option value="4:3">4:3 (Standard)</option>
                    <option value="1:1">1:1 (Square)</option>
                </select>`
            },
            {
                name: 'caption',
                label: 'Caption',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'caption', $event.target.value)"
                    :value="block.config.caption"
                    placeholder="Enter video caption">`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Video',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>',
            category: 'Media'
        };
    }
    getVideoEmbed() {
        if (!this.config.url) return '';
        const params = [
            this.config.autoplay ? 'autoplay=1' : '',
            this.config.controls ? 'controls=1' : '',
            this.config.muted ? 'mute=1' : '',
            this.config.loop ? 'loop=1' : ''
        ].filter(Boolean).join('&');
        switch(this.config.type){
            case 'youtube':
                const youtubeId = this.extractYoutubeId(this.config.url);
                return `<div class="video-container" data-aspect-ratio="${this.config.aspectRatio}">
                    <iframe 
                        src="https://www.youtube.com/embed/${youtubeId}?${params}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </div>`;
            case 'vimeo':
                const vimeoId = this.extractVimeoId(this.config.url);
                return `<div class="video-container" data-aspect-ratio="${this.config.aspectRatio}">
                    <iframe 
                        src="https://player.vimeo.com/video/${vimeoId}?${params}"
                        frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen></iframe>
                </div>`;
            case 'direct':
                return `<div class="video-container" data-aspect-ratio="${this.config.aspectRatio}">
                    <video 
                        ${this.config.controls ? 'controls' : ''}
                        ${this.config.autoplay ? 'autoplay' : ''}
                        ${this.config.muted ? 'muted' : ''}
                        ${this.config.loop ? 'loop' : ''}>
                        <source src="${this.config.url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>`;
        }
    }
    extractYoutubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : '';
    }
    extractVimeoId(url) {
        const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)(?:[?].*)?$/;
        const match = url.match(regExp);
        return match ? match[1] : '';
    }
    editorRender() {
        return `<figure class="video-block">
            ${this.getVideoEmbed()}
            <figcaption 
                contenteditable="true"
                x-html="block.config.caption"
                @blur="block.config.caption = $event.target.innerHTML"
                x-show="block.config.caption.length > 0">${this.config.caption}</figcaption>
        </figure>`;
    }
    render() {
        return `<figure class="video-block">
            ${this.getVideoEmbed()}
            ${this.config.caption ? `<figcaption>${this.config.caption}</figcaption>` : ''}
        </figure>`;
    }
}
var $1d78d83887e524f6$export$2e2bcd8739ae039 = $1d78d83887e524f6$var$VideoPlayer;



class $b7a015afcd00e44f$var$AudioPlayer extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config = {} }){
        super(id, updateFunction, config);
        // Check if this is a new instance (no URL = new instance)
        const isNewInstance = !config.url || config.url === '';
        // Merge defaults with existing config
        // For new instances, force spotify type regardless of what was passed
        this.config = {
            url: config.url || 'https://open.spotify.com/track/0ouSkB2t2fGeW60MPcvmXl',
            type: isNewInstance ? 'spotify' : config.type || 'spotify',
            autoplay: config.autoplay !== undefined ? config.autoplay : false,
            controls: config.controls !== undefined ? config.controls : true,
            loop: config.loop !== undefined ? config.loop : false,
            title: config.title || 'The Hampster Dance Song',
            artist: config.artist || 'Hampton The Hamster',
            showMetadata: config.showMetadata !== undefined ? config.showMetadata : true
        };
        this.settings = [
            {
                name: 'url',
                label: 'Audio URL',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'url', $event.target.value)"
                    value="${this.config.url}"
                    placeholder="Enter audio URL">`
            },
            {
                name: 'type',
                label: 'Audio Type',
                html: `<select @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="file" ${this.config.type === 'file' ? 'selected' : ''}>Audio File</option>
                    <option value="spotify" ${this.config.type === 'spotify' ? 'selected' : ''}>Spotify</option>
                    <option value="soundcloud" ${this.config.type === 'soundcloud' ? 'selected' : ''}>SoundCloud</option>
                </select>`
            },
            {
                name: 'metadata',
                label: 'Metadata',
                html: `<div>
                    <input type="text" 
                        @change="trigger('${this.id}', 'title', $event.target.value)"
                        value="${this.config.title}"
                        placeholder="Title">
                    <input type="text" 
                        @change="trigger('${this.id}', 'artist', $event.target.value)"
                        value="${this.config.artist}"
                        placeholder="Artist">
                </div>`
            },
            {
                name: 'autoplay',
                label: 'Autoplay',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'autoplay', $event.target.checked)"
                        ${this.config.autoplay ? 'checked' : ''}>
                    Autoplay
                </label>`
            },
            {
                name: 'controls',
                label: 'Show Controls',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'controls', $event.target.checked)"
                        ${this.config.controls ? 'checked' : ''}>
                    Show Controls
                </label>`
            },
            {
                name: 'loop',
                label: 'Loop',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'loop', $event.target.checked)"
                        ${this.config.loop ? 'checked' : ''}>
                    Loop
                </label>`
            },
            {
                name: 'showMetadata',
                label: 'Show Metadata',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showMetadata', $event.target.checked)"
                        ${this.config.showMetadata ? 'checked' : ''}>
                    Show Metadata
                </label>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Audio',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>',
            category: 'Media'
        };
    }
    getAudioEmbed() {
        if (!this.config.url) return '';
        switch(this.config.type){
            case 'spotify':
                const spotifyId = this.extractSpotifyId(this.config.url);
                return `<iframe 
                    src="https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator"
                    width="100%" 
                    height="152"
                    frameborder="0" 
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"></iframe>`;
            case 'soundcloud':
                return `<iframe 
                    width="100%" 
                    height="166" 
                    scrolling="no" 
                    frameborder="no" 
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=${encodeURIComponent(this.config.url)}&auto_play=${this.config.autoplay}&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>`;
            case 'file':
            default:
                return `<audio 
                    class="audio-player"
                    ${this.config.controls ? 'controls' : ''}
                    ${this.config.autoplay ? 'autoplay' : ''}
                    ${this.config.loop ? 'loop' : ''}>
                    <source src="${this.config.url}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>`;
        }
    }
    extractSpotifyId(url) {
        const match = url.match(/track\/([a-zA-Z0-9]+)/);
        return match ? match[1] : '';
    }
    editorRender() {
        // Ensure we use the correct type from config
        const currentType = this.config.type || 'spotify';
        return `<div class="audio-block">
            ${this.config.showMetadata ? `
                <div class="audio-metadata">
                    <div class="audio-title"
                        contenteditable="true"
                        x-html="block.config.title"
                        @blur="block.config.title = $event.target.innerHTML">${this.config.title}</div>
                    <div class="audio-artist"
                        contenteditable="true"
                        x-html="block.config.artist"
                        @blur="block.config.artist = $event.target.innerHTML">${this.config.artist}</div>
                </div>
            ` : ''}
            ${this.getAudioEmbed()}
        </div>`;
    }
    render() {
        return `<div class="audio-block">
            ${this.config.showMetadata ? `
                <div class="audio-metadata">
                    <div class="audio-title">${this.config.title}</div>
                    <div class="audio-artist">${this.config.artist}</div>
                </div>
            ` : ''}
            ${this.getAudioEmbed()}
        </div>`;
    }
}
var $b7a015afcd00e44f$export$2e2bcd8739ae039 = $b7a015afcd00e44f$var$AudioPlayer;



class $5158dfa5f71afbd5$var$Carousel extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            slides: this.config.slides || [
                {
                    image: '',
                    caption: ''
                }
            ],
            autoplay: this.config.autoplay || false,
            interval: this.config.interval || 5000,
            showArrows: this.config.showArrows || true,
            showDots: this.config.showDots || true,
            showCaptions: this.config.showCaptions || true
        };
        this.settings = [
            {
                name: 'autoplay',
                label: 'Autoplay',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'autoplay', $event.target.checked)"
                        :checked="block.config.autoplay">
                    Autoplay
                </label>`
            },
            {
                name: 'interval',
                label: 'Interval (ms)',
                html: `<input type="number" 
                    @change="trigger('${this.id}', 'interval', $event.target.value)"
                    :value="block.config.interval"
                    min="1000"
                    step="500">`
            },
            {
                name: 'showArrows',
                label: 'Show Arrows',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showArrows', $event.target.checked)"
                        :checked="block.config.showArrows">
                    Show Arrows
                </label>`
            },
            {
                name: 'showDots',
                label: 'Show Dots',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showDots', $event.target.checked)"
                        :checked="block.config.showDots">
                    Show Dots
                </label>`
            },
            {
                name: 'showCaptions',
                label: 'Show Captions',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showCaptions', $event.target.checked)"
                        :checked="block.config.showCaptions">
                    Show Captions
                </label>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Carousel',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>',
            category: 'Media'
        };
    }
    editorRender() {
        const slides = this.config.slides.map((slide, index)=>{
            const imageInput = `
                <div class="image-input" x-show="!block.config.slides[${index}].image">
                    <input type="text" 
                        placeholder="Enter image URL"
                        @change="block.config.slides[${index}].image = $event.target.value">
                </div>`;
            const image = `
                <img x-show="block.config.slides[${index}].image"
                    :src="block.config.slides[${index}].image"
                    alt="Slide ${index + 1}">`;
            const caption = this.config.showCaptions ? `
                <div class="carousel-caption"
                    contenteditable="true"
                    x-html="block.config.slides[${index}].caption"
                    @blur="block.config.slides[${index}].caption = $event.target.innerHTML">${slide.caption || ''}</div>` : '';
            return `
                <div class="carousel-slide" x-show="currentSlide === ${index}">
                    ${imageInput}
                    ${image}
                    ${caption}
                </div>`;
        }).join('');
        const arrows = this.config.showArrows ? `
            <button class="carousel-prev" 
                @click="currentSlide = (currentSlide - 1 + block.config.slides.length) % block.config.slides.length">
                \u{2190}
            </button>
            <button class="carousel-next" 
                @click="currentSlide = (currentSlide + 1) % block.config.slides.length">
                \u{2192}
            </button>` : '';
        const dots = this.config.showDots ? `
            <div class="carousel-dots">
                ${this.config.slides.map((_, index)=>`
                    <button class="carousel-dot"
                        :class="{ active: currentSlide === ${index} }"
                        @click="currentSlide = ${index}"></button>
                `).join('')}
            </div>` : '';
        return `
            <div class="carousel-block" x-data="{ currentSlide: 0 }">
                <div class="carousel-container">
                    ${slides}
                    ${arrows}
                </div>
                ${dots}
                <div class="carousel-controls">
                    <button @click="block.config.slides.push({ image: '', caption: '' })">Add Slide</button>
                    <button x-show="block.config.slides.length > 1"
                        @click="block.config.slides.splice(currentSlide, 1); currentSlide = Math.min(currentSlide, block.config.slides.length - 1)">
                        Remove Current Slide
                    </button>
                </div>
            </div>`;
    }
    render() {
        const slides = this.config.slides.map((slide, index)=>`
            <div class="carousel-slide">
                <img src="${slide.image}" alt="Slide ${index + 1}">
                ${this.config.showCaptions && slide.caption ? `
                    <div class="carousel-caption">${slide.caption}</div>
                ` : ''}
            </div>
        `).join('');
        const arrows = this.config.showArrows ? `
            <button class="carousel-prev">\u{2190}</button>
            <button class="carousel-next">\u{2192}</button>
        ` : '';
        const dots = this.config.showDots ? `
            <div class="carousel-dots">
                ${this.config.slides.map((_, index)=>`
                    <button class="carousel-dot"></button>
                `).join('')}
            </div>
        ` : '';
        return `
            <div class="carousel-block">
                <div class="carousel-container">
                    ${slides}
                    ${arrows}
                </div>
                ${dots}
            </div>`;
    }
}
var $5158dfa5f71afbd5$export$2e2bcd8739ae039 = $5158dfa5f71afbd5$var$Carousel;




/**
 * Columns tool for creating multi-column layouts with nested blocks
 */ class $caf1e97d18e29b9d$var$Columns extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            columns: this.config.columns || [
                {
                    blocks: [],
                    width: '1fr'
                },
                {
                    blocks: [],
                    width: '1fr'
                }
            ],
            gap: this.config.gap || '20px',
            alignment: this.config.alignment || 'top',
            responsive: this.config.responsive || true,
            breakpoint: this.config.breakpoint || '768px'
        };
        this.settings = [
            {
                name: 'columnCount',
                label: 'Column Layout',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'columnCount', $event.target.value)">
                    <option value="2">Two Columns</option>
                    <option value="3">Three Columns</option>
                    <option value="4">Four Columns</option>
                    <option value="custom">Custom</option>
                </select>`
            },
            {
                name: 'gap',
                label: 'Column Gap',
                html: `<input type="text" class="settings-input"
                    @change="trigger('${this.id}', 'gap', $event.target.value)"
                    value="${this.config.gap}"
                    placeholder="20px">`
            },
            {
                name: 'alignment',
                label: 'Vertical Alignment',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="top">Top</option>
                    <option value="center">Center</option>
                    <option value="bottom">Bottom</option>
                    <option value="stretch">Stretch</option>
                </select>`
            },
            {
                name: 'responsive',
                label: 'Responsive Layout',
                html: `<div class="settings-group">
                    <label class="settings-checkbox">
                        <input type="checkbox" 
                            @change="trigger('${this.id}', 'responsive', $event.target.checked)"
                            ${this.config.responsive ? 'checked' : ''}>
                        <span class="settings-checkbox-label">Responsive Layout</span>
                    </label>
                    <input type="text" class="settings-input"
                        x-show="${this.config.responsive}"
                        @change="trigger('${this.id}', 'breakpoint', $event.target.value)"
                        value="${this.config.breakpoint}"
                        placeholder="Breakpoint (e.g. 768px)">
                </div>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Columns',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z"/></svg>',
            category: 'Layout'
        };
    }
    /**
   * Update the number of columns
   * @param {string|number} count - The number of columns to create
   */ updateColumnCount(count) {
        if (count === 'custom') return;
        const newColumns = [];
        for(let i = 0; i < parseInt(count); i++)newColumns.push({
            blocks: [],
            width: '1fr'
        });
        this.config.columns = newColumns;
        this.triggerRedraw();
    }
    /**
   * Generate CSS styles for the column grid
   * @returns {string} CSS styles string
   */ getColumnStyles() {
        const alignmentMap = {
            top: 'start',
            center: 'center',
            bottom: 'end',
            stretch: 'stretch'
        };
        return `
            display: grid;
            grid-template-columns: ${this.config.columns.map((col)=>col.width).join(' ')};
            gap: ${this.config.gap};
            align-items: ${alignmentMap[this.config.alignment]};
        `;
    }
    /**
   * Handle dropping blocks into columns
   * @param {number} columnIndex - The index of the column
   * @param {Object} blockData - The block data from drag operation
   * @param {string} position - Position to insert ('end' or 'start')
   */ handleColumnDrop(columnIndex, blockData, position = 'end') {
        if (!this.config.columns[columnIndex]) return;
        const toolClass = blockData.class;
        const nestedBlock = this.editor.initBlock(toolClass, false);
        if (!nestedBlock) {
            (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error(`Failed to create nested block of type ${toolClass}`);
            return;
        }
        if (position === 'end') this.config.columns[columnIndex].blocks.push(nestedBlock);
        else this.config.columns[columnIndex].blocks.unshift(nestedBlock);
        this.editor.setActive(null, nestedBlock.id);
        this.triggerRedraw();
    }
    /**
   * Override serializeConfig to preserve nested Tool instances
   * @param {Object} config - Configuration to serialize
   * @returns {Object} Clean configuration with Tool instances preserved
   */ serializeConfig(config) {
        if (!config || typeof config !== 'object') return config;
        const serialized = {};
        for (const [key, value] of Object.entries(config)){
            if (key === 'editor' || key === 'updateFunction' || typeof value === 'function') continue;
            if (key === 'columns' && Array.isArray(value)) // Special handling for columns to preserve Tool instances
            serialized[key] = value.map((column)=>{
                if (column.blocks && Array.isArray(column.blocks)) // DON'T serialize the nested Tool instances - keep them as-is
                return {
                    ...column,
                    blocks: column.blocks // Keep Tool instances intact
                };
                return column;
            });
            else // For other properties, use the parent serialization
            serialized[key] = value;
        }
        return serialized;
    }
    /**
   * Get or create the actual tool instance for a nested block
   * @param {Object} block - The plain block object
   * @returns {Object} Tool instance
   */ getToolInstance(block) {
        // Return cached instance if available
        if (block._toolInstance) return block._toolInstance;
        // Extract the class name from the block object eg $33963d57131b26df$var$Header should be Header, it may also be a string like "Paragraph"
        //const classMatch = block.class.match(/\$([a-f0-9]+)\$var\$(\w+)/);
        //const classId = classMatch ? classMatch[1] : null;
        //const className = classMatch ? classMatch[2] : null;
        // Get the tool class from the editor's tool registry
        const editorInstance = window.alpineEditors?.editorjs;
        const className = block.class;
        if (!editorInstance || !editorInstance.toolConfig[className]) {
            (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error(`Tool class ${block.class} not found in editor registry`);
            return null;
        }
        const ToolClass = editorInstance.toolConfig[className].class;
        // Create a nested update function that routes to our column block
        const nestedUpdateFunction = (id, newConfig)=>{
            this.updateNestedBlock(id, newConfig);
        };
        // Create the tool instance with proper context
        const toolInstance = new ToolClass({
            id: block.id,
            updateFunction: nestedUpdateFunction,
            config: block.config
        });
        // Initialize with editor context if available
        if (editorInstance) toolInstance.init(editorInstance);
        // Update the tool's settings HTML to use the composite ID for proper routing
        this.updateNestedToolSettings(toolInstance, this.id);
        // Cache the instance
        block._toolInstance = toolInstance;
        return toolInstance;
    }
    /**
   * Create fallback block when tool class is not available
   * @param {string} toolClass - The tool class name
   * @param {string} blockId - The block ID
   * @param {Object} config - The tool configuration
   * @returns {Object} Fallback block object
   */ createFallbackBlock(toolClass, blockId, config) {
        return {
            id: blockId,
            toolClass: toolClass,
            // Use toolClass instead of class to avoid confusion
            config: config,
            editorRender: ()=>`<div class="block-preview">
                <div class="block-type-icon">\u{1F4E6}</div>
                <div class="block-type-name">${toolClass}</div>
                <div class="block-type-desc">Tool not available</div>
            </div>`,
            settings: []
        };
    }
    /**
   * Update a nested block's configuration
   * @param {string} blockId - The nested block ID
   * @param {Object} newConfig - The new configuration
   */ updateNestedBlock(blockId, newConfig) {
        // Find the nested block across all columns
        for(let columnIndex = 0; columnIndex < this.config.columns.length; columnIndex++){
            const column = this.config.columns[columnIndex];
            const blockIndex = column.blocks.findIndex((block)=>block.id === blockId);
            if (blockIndex !== -1) {
                // Update only the config properties, don't touch the block object itself
                const currentBlock = column.blocks[blockIndex];
                // Update config properties directly without recreating the block
                Object.keys(newConfig).forEach((key)=>{
                    currentBlock.config[key] = newConfig[key];
                });
                this.triggerRedraw();
                // Clear cached tool instance to force re-render with updated config
                if (currentBlock._toolInstance) delete currentBlock._toolInstance;
                // Trigger debounced state save for nested block updates
                if (this.editor && this.editor.debouncedSaveState) this.editor.debouncedSaveState();
                return;
            }
        }
        (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error(`Nested block ${blockId} not found for update`);
    }
    /**
   * Render nested blocks within a column
   * @param {number} columnIndex - The index of the column
   * @returns {string} HTML string for nested blocks
   */ renderNestedBlocks(columnIndex) {
        const column = this.config.columns[columnIndex];
        if (!column || !column.blocks || column.blocks.length === 0) return '<div class="column-placeholder">Drop blocks here</div>';
        const renderedBlocks = column.blocks.map((block, blockIndex)=>{
            // Create proper Alpine.js context for each nested block
            const blockContent = this.renderNestedBlockWithContext(block);
            const compositeId = `${this.id}::${block.id}`;
            return `<div class="nested-block nested-block-${compositeId}" 
                         data-block-id="${block.id}"
                         data-composite-id="${compositeId}"
                         :class="{ 'nested-block-selected': selectedBlock === '${compositeId}' }"
                         @click.stop="handleNestedBlockClick('${block.id}')">
                <div class="nested-block-content">
                    ${blockContent}
                </div>
                <div class="nested-block-controls">
                    <button class="delete-nested-block" @click.stop="removeNestedBlock(${columnIndex}, '${block.id}')">\xd7</button>
                </div>
            </div>`;
        });
        return renderedBlocks.join('');
    }
    /**
   * Render nested block with proper Alpine.js context
   * @param {Object} block - The block instance
   * @returns {string} HTML with proper Alpine.js scope
   */ renderNestedBlockWithContext(block) {
        const compositeId = `${this.id}::${block.id}`;
        // Get the actual tool instance and its render content
        const toolInstance = this.getToolInstance(block);
        let toolContent = '';
        if (toolInstance && typeof toolInstance.editorRender === 'function') toolContent = toolInstance.editorRender();
        else toolContent = this.createFallbackRender(block);
        // Create an Alpine.js component wrapper that provides the 'block' context
        // This allows the tool's original editorRender() to work without modification
        return `<div x-data="{ 
                    block: ${JSON.stringify({
            id: block.id,
            config: block.config
        }).replace(/"/g, '&quot;')},
                    updateNestedBlock(property, value) {
                        this.block.config[property] = value;
                        $dispatch('nested-update', { 
                            blockId: '${compositeId}', 
                            property: property, 
                            value: value 
                        });
                    }
                }" 
                x-init="
                    // Override block config assignments to route through updateNestedBlock
                    $watch('block.config', (newConfig) => {
                        // This handles reactive updates from the nested tool
                    }, { deep: true });
                ">
            ${this.fixNestedToolEventHandlers(toolContent, compositeId)}
        </div>`;
    }
    /**
   * Fix event handlers in nested tool content to work with the wrapper context
   * @param {string} content - The tool's rendered content
   * @param {string} compositeId - The composite ID for this nested block
   * @returns {string} Content with fixed event handlers
   */ fixNestedToolEventHandlers(content, compositeId) {
        // Replace direct config assignments with calls to updateNestedBlock
        content = content.replace(/@blur="block\.config\.(\w+)\s*=\s*\$event\.target\.innerHTML"/g, `@blur="updateNestedBlock('$1', $event.target.innerHTML)"`);
        content = content.replace(/@blur="block\.config\.(\w+)\s*=\s*\$event\.target\.value"/g, `@blur="updateNestedBlock('$1', $event.target.value)"`);
        content = content.replace(/@change="block\.config\.(\w+)\s*=\s*\$event\.target\.value"/g, `@change="updateNestedBlock('$1', $event.target.value)"`);
        content = content.replace(/@change="block\.config\.(\w+)\s*=\s*\$event\.target\.checked"/g, `@change="updateNestedBlock('$1', $event.target.checked)"`);
        return content;
    }
    /**
   * Create fallback render for blocks that don't have proper tool instances
   * @param {Object} block - The block object
   * @returns {string} Fallback HTML content
   */ createFallbackRender(block) {
        return `<div class="block-preview">
            <div class="block-type-icon">\u{1F4E6}</div>
            <div class="block-type-name">Error Loading ${block.class}</div>
        </div>`;
    }
    /**
   * Remove a nested block from a column
   * @param {number} columnIndex - The index of the column
   * @param {string} blockId - The ID of the block to remove
   */ removeNestedBlock(columnIndex, blockId) {
        const column = this.config.columns[columnIndex];
        if (column && column.blocks) {
            column.blocks = column.blocks.filter((block)=>block.id !== blockId);
            this.triggerRedraw();
        }
    }
    editorRender() {
        const columnsToolInstance = this;
        return `<div class="columns-block" style="${this.getColumnStyles()}"
                     x-data="{ 
                         hoveredColumn: null,
                         handleColumnDragOver(event, columnIndex) {
                             event.preventDefault();
                             event.stopPropagation();
                             this.hoveredColumn = columnIndex;
                         },
                         handleColumnDragLeave(event, columnIndex) {
                             // Only clear if we're actually leaving the column
                             if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) {
                                 this.hoveredColumn = null;
                             }
                         },
                         handleColumnDrop(event, columnIndex) {
                             event.preventDefault();
                             event.stopPropagation();
                             event.stopImmediatePropagation();
                             
                             // Clear hover state immediately
                             this.hoveredColumn = null;
                             
                             try {
                                 // Try to get JSON data first, then fall back to text/plain
                                 let blockData;
                                 const jsonData = event.dataTransfer.getData('application/json');
                                 if (jsonData) {
                                     blockData = JSON.parse(jsonData);
                                 } else {
                                     // Fall back to text/plain format (from toolbar)
                                     const toolClass = event.dataTransfer.getData('text/plain');
                                     blockData = {
                                         class: toolClass,
                                         config: {}
                                     };
                                 }
                                 
                                 const columnsBlock = window.alpineEditors.editorjs.blocks.find(b => b.id === '${this.id}');
                                 if (columnsBlock) {
                                     columnsBlock.handleColumnDrop(columnIndex, blockData);
                                 }
                                 // Prevent the main editor from handling this drop
                                 return false;
                             } catch (e) {
                                 console.error('Error handling column drop:', e);
                             }
                         },
                         removeNestedBlock(columnIndex, blockId) {
                             const columnsBlock = window.alpineEditors.editorjs.blocks.find(b => b.id === '${this.id}');
                             if (columnsBlock) {
                                 columnsBlock.removeNestedBlock(columnIndex, blockId);
                             }
                         },
                         handleNestedBlockClick(blockId) {
                             // Set nested block as active using composite ID
                             const compositeId = '${this.id}::' + blockId;
                             
                             const editorInstance = window.alpineEditors?.editorjs;
                             
                             if (editorInstance) {
                                 editorInstance.setActive(null, compositeId);
                                 
                                 // Force settings update
                                 setTimeout(() => {
                                     document.dispatchEvent(new CustomEvent('editor-block-changed', { 
                                         detail: { block_id: compositeId } 
                                     }));
                                 }, 100);
                             }
                         },
                         handleNestedUpdate(event) {
                             // Handle nested block updates from child components
                             const { blockId, property, value } = event.detail;
                             const editorInstance = window.alpineEditors?.editorjs;
                             if (editorInstance) {
                                 const settingsElement = document.querySelector('#settings');
                                 if (settingsElement && settingsElement._x_dataStack && settingsElement._x_dataStack[0]) {
                                     settingsElement._x_dataStack[0].trigger(blockId, property, value);
                                 }
                             }
                         }
                     }"
                     @nested-update="handleNestedUpdate($event)">
            ${this.config.columns.map((column, index)=>`
                <div class="column column-${index}" 
                     :class="{ 'column-hovered': hoveredColumn === ${index} }">
                    
                    <div class="column-content column-drop-zone" 
                         @dragover="handleColumnDragOver($event, ${index})"
                         @dragleave="handleColumnDragLeave($event, ${index})"
                         @drop="handleColumnDrop($event, ${index})">
                        ${this.renderNestedBlocks(index)}
                    </div>
                </div>
            `).join('')}
        </div>`;
    }
    render() {
        return `<div class="columns-block" style="${this.getColumnStyles()}">
            ${this.config.columns.map((column, index)=>`
                <div class="column">
                    <div class="column-content">
                        ${this.renderNestedBlocks(index)}
                    </div>
                </div>
            `).join('')}
        </div>`;
    }
    /**
   * Get settings for a nested block
   * @param {string} nestedBlockId - The ID of the nested block
   * @returns {Array|null} Array of settings or null if not found
   */ getNestedBlockSettings(nestedBlockId) {
        // Find the nested block across all columns
        for(let i = 0; i < this.config.columns.length; i++){
            const column = this.config.columns[i];
            const block = column.blocks.find((b)=>b.id === nestedBlockId);
            if (block) {
                // Get the actual tool instance for settings
                const toolInstance = this.getToolInstance(block);
                if (toolInstance && toolInstance.settings && Array.isArray(toolInstance.settings)) return this.updateSettingsForNestedBlock(toolInstance.settings, nestedBlockId);
                return [];
            }
        }
        return null;
    }
    /**
   * Update the actual tool's settings to work with nested block routing
   * @param {Array} settings - The actual tool's settings array  
   * @param {string} nestedBlockId - The nested block ID
   * @returns {Array} Settings with updated composite IDs
   */ updateSettingsForNestedBlock(settings, nestedBlockId) {
        const compositeId = `${this.id}::${nestedBlockId}`;
        return settings.map((setting)=>{
            if (setting.html && typeof setting.html === 'string') {
                // Replace the block ID in trigger calls with composite ID
                // Handle various patterns that tools might use
                let updatedHtml = setting.html;
                // Replace trigger calls with the tool's original ID
                const escapedId = nestedBlockId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                updatedHtml = updatedHtml.replace(new RegExp(`trigger\\('${escapedId}'`, 'g'), `trigger('${compositeId}'`);
                // Also handle cases where tools use their constructor name or class name
                // This catches any remaining trigger calls that use different ID patterns
                updatedHtml = updatedHtml.replace(/trigger\('([^']+)',\s*'([^']+)',\s*([^)]+)\)/g, (match, id, property, value)=>{
                    // If the ID doesn't already contain our parent ID, update it
                    if (!id.includes(this.id)) return `trigger('${compositeId}', '${property}', ${value})`;
                    return match;
                });
                return {
                    ...setting,
                    html: updatedHtml
                };
            }
            return setting;
        });
    }
    /**
   * Update nested tool settings to use composite IDs for proper routing
   * @param {Object} toolInstance - The nested tool instance
   * @param {string} parentId - The parent column block ID
   */ updateNestedToolSettings(toolInstance, parentId) {
        if (!toolInstance.settings || !Array.isArray(toolInstance.settings)) return;
        // Create the composite ID for this nested block
        const compositeId = `${parentId}::${toolInstance.id}`;
        // Update each setting's HTML to use the composite ID
        toolInstance.settings.forEach((setting)=>{
            if (setting.html && typeof setting.html === 'string') {
                // Replace all instances of the original ID with the composite ID in trigger calls
                // Escape special regex characters in the ID
                const escapedId = toolInstance.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                setting.html = setting.html.replace(new RegExp(`trigger\\('${escapedId}'`, 'g'), `trigger('${compositeId}'`);
            }
        });
    }
    /**
   * Fix Alpine.js bindings in nested block content to use proper routing
   * @param {string} blockContent - The rendered block content HTML
   * @param {string} blockId - The nested block ID
   * @returns {string} Fixed HTML with proper event handlers
   */ fixNestedBlockBindings(blockContent, blockId) {
        if (!blockContent || typeof blockContent !== 'string') return blockContent;
        // Find the actual nested block to get its config values
        let nestedBlock = null;
        for (const column of this.config.columns){
            nestedBlock = column.blocks.find((b)=>b.id === blockId);
            if (nestedBlock) break;
        }
        if (!nestedBlock) return blockContent;
        const compositeId = `${this.id}::${blockId}`;
        // Fix x-html bindings - replace with actual content and make editable
        blockContent = blockContent.replace(/(<[^>]*)\s+x-html="block\.config\.(\w+)"([^>]*>)([^<]*<\/[^>]+>)/g, (match, openTag, property, attributes, endPart)=>{
            const content = nestedBlock.config[property] || '';
            const closingTagMatch = endPart.match(/<\/[^>]+>$/);
            const closingTag = closingTagMatch ? closingTagMatch[0] : '</div>';
            // Make contenteditable and add event handler
            const editableTag = openTag + ' contenteditable="true"' + ` @blur="$dispatch('nested-update', { blockId: '${compositeId}', property: '${property}', value: $event.target.innerHTML })"` + attributes.replace('>', '>');
            return editableTag + content + closingTag;
        });
        // Fix existing event handlers to use composite ID
        blockContent = blockContent.replace(/@blur="block\.config\.(\w+)\s*=\s*\$event\.target\.innerHTML"/g, `@blur="$dispatch('nested-update', { blockId: '${compositeId}', property: '$1', value: $event.target.innerHTML })"`);
        blockContent = blockContent.replace(/@blur="block\.config\.(\w+)\s*=\s*\$event\.target\.value"/g, `@blur="$dispatch('nested-update', { blockId: '${compositeId}', property: '$1', value: $event.target.value })"`);
        blockContent = blockContent.replace(/@change="block\.config\.(\w+)\s*=\s*\$event\.target\.value"/g, `@change="$dispatch('nested-update', { blockId: '${compositeId}', property: '$1', value: $event.target.value })"`);
        blockContent = blockContent.replace(/@blur="block\.config\.(\w+)\s*=\s*\$event\.target\.checked"/g, `@blur="$dispatch('nested-update', { blockId: '${compositeId}', property: '$1', value: $event.target.checked })"`);
        // Fix references to block.config to use actual values
        Object.keys(nestedBlock.config).forEach((key)=>{
            const value = nestedBlock.config[key];
            blockContent = blockContent.replace(new RegExp(`block\.config\.${key}`, 'g'), typeof value === 'string' ? `'${value.replace(/'/g, "\\'")}'` : value);
        });
        return blockContent;
    }
}
var $caf1e97d18e29b9d$export$2e2bcd8739ae039 = $caf1e97d18e29b9d$var$Columns;



// Alpine.js component for Raw code editor
function $08ab3851bf56e43b$var$rawCodeEditor() {
    return {
        isValid: true,
        debounceTimer: null,
        previewContent: '',
        block: null,
        showPreview: false,
        init (blockId) {
            // Find the block instance - try multiple approaches
            this.block = window.blocksManager?.blocks?.find((b)=>b.id === blockId);
            if (!this.block && window.alpineEditors) // Try finding through alpine editors
            for(const editorId in window.alpineEditors){
                const editor = window.alpineEditors[editorId];
                if (editor && editor.blocks) {
                    this.block = editor.blocks.find((b)=>b.id === blockId);
                    if (this.block) break;
                }
            }
            if (this.block) {
                this.previewContent = this.block.config.content || '';
                this.isValid = this.validateCode(this.block.config.content);
            }
        },
        validateCode (content) {
            if (!content) return true;
            if (!this.block) return true;
            switch(this.block.config.mode){
                case 'html':
                    if (!this.block.config.validateHtml) return true;
                    try {
                        // Simple tag matching validation
                        const openTags = [];
                        const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
                        const selfClosingTags = [
                            'area',
                            'base',
                            'br',
                            'col',
                            'embed',
                            'hr',
                            'img',
                            'input',
                            'link',
                            'meta',
                            'source',
                            'track',
                            'wbr'
                        ];
                        // Reset regex
                        tagRegex.lastIndex = 0;
                        let match;
                        while((match = tagRegex.exec(content)) !== null){
                            const fullTag = match[0];
                            const tagName = match[1].toLowerCase();
                            const isClosing = fullTag.startsWith('</');
                            const isSelfClosing = fullTag.endsWith('/>') || selfClosingTags.includes(tagName);
                            if (isSelfClosing && !isClosing) continue;
                            if (isClosing) {
                                if (openTags.length === 0 || openTags.pop() !== tagName) return false; // Mismatched closing tag
                            } else if (!isSelfClosing) openTags.push(tagName);
                        }
                        // Check if all tags are closed
                        if (openTags.length > 0) return false;
                        return true;
                    } catch (e) {
                        return false;
                    }
                case 'css':
                    try {
                        const style = document.createElement('style');
                        style.textContent = content;
                        document.head.appendChild(style);
                        document.head.removeChild(style);
                        return true;
                    } catch (e) {
                        return false;
                    }
                case 'javascript':
                    try {
                        new Function(content);
                        return true;
                    } catch (e) {
                        return false;
                    }
                default:
                    return true;
            }
        },
        handleInput (event) {
            const content = event.target.value;
            // Clear existing timer
            clearTimeout(this.debounceTimer);
            // Set new timer for debounced update
            this.debounceTimer = setTimeout(()=>{
                // Update validation
                this.isValid = this.validateCode(content);
                // Always update preview content
                this.previewContent = content;
                // Update block config
                if (this.block) this.block.config.content = content;
                // Force Alpine reactivity update
                this.$nextTick && this.$nextTick(()=>{
                // Force re-render
                });
            }, 500); // 500ms debounce
        },
        // Add a method to get current preview content for debugging
        getCurrentPreview () {
            return this.previewContent;
        }
    };
}
// Make it globally available for Alpine (only if not already defined)
if (typeof window !== 'undefined' && !window.rawCodeEditor) window.rawCodeEditor = $08ab3851bf56e43b$var$rawCodeEditor;
class $08ab3851bf56e43b$var$Raw extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || '',
            mode: this.config.mode || 'html',
            // html, css, javascript
            executeScript: this.config.executeScript || false,
            validateHtml: this.config.validateHtml || true,
            wrapCss: this.config.wrapCss || true
        };
        this.settings = [
            {
                name: 'mode',
                label: 'Code Type',
                html: `<select @change="trigger('${this.id}', 'mode', $event.target.value)">
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                </select>`
            },
            {
                name: 'executeScript',
                label: 'Execute JavaScript',
                html: `<label x-show="block.config.mode === 'javascript'">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'executeScript', $event.target.checked)"
                        :checked="block.config.executeScript">
                    Execute JavaScript
                </label>`
            },
            {
                name: 'validateHtml',
                label: 'Validate HTML',
                html: `<label x-show="block.config.mode === 'html'">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'validateHtml', $event.target.checked)"
                        :checked="block.config.validateHtml">
                    Validate HTML
                </label>`
            },
            {
                name: 'wrapCss',
                label: 'Scope CSS',
                html: `<label x-show="block.config.mode === 'css'">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'wrapCss', $event.target.checked)"
                        :checked="block.config.wrapCss">
                    Scope CSS
                </label>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Raw Code',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>',
            category: 'Advanced'
        };
    }
    validateContent() {
        if (!this.config.content) return true;
        switch(this.config.mode){
            case 'html':
                if (!this.config.validateHtml) return true;
                try {
                    // Check for basic HTML structure issues
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(this.config.content, 'text/html');
                    // Check for parser errors
                    if (doc.querySelector('parsererror')) return false;
                    // Simple tag matching validation
                    const openTags = [];
                    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
                    let match;
                    while((match = tagRegex.exec(this.config.content)) !== null){
                        const tagName = match[1].toLowerCase();
                        const isClosing = match[0].startsWith('</');
                        const isSelfClosing = match[0].endsWith('/>') || [
                            'area',
                            'base',
                            'br',
                            'col',
                            'embed',
                            'hr',
                            'img',
                            'input',
                            'link',
                            'meta',
                            'source',
                            'track',
                            'wbr'
                        ].includes(tagName);
                        if (isSelfClosing) continue;
                        if (isClosing) {
                            if (openTags.length === 0 || openTags.pop() !== tagName) return false; // Mismatched closing tag
                        } else openTags.push(tagName);
                    }
                    // Check if all tags are closed
                    return openTags.length === 0;
                } catch (e) {
                    return false;
                }
            case 'css':
                try {
                    const style = document.createElement('style');
                    style.textContent = this.config.content;
                    document.head.appendChild(style);
                    document.head.removeChild(style);
                    return true;
                } catch (e) {
                    return false;
                }
            case 'javascript':
                try {
                    new Function(this.config.content);
                    return true;
                } catch (e) {
                    return false;
                }
            default:
                return true;
        }
    }
    processContent() {
        if (!this.config.content) return '';
        switch(this.config.mode){
            case 'html':
                return this.config.content;
            case 'css':
                if (this.config.wrapCss) return `<style data-block-id="${this.id}">
                        .raw-block[data-block-id="${this.id}"] {
                            ${this.config.content}
                        }
                    </style>`;
                return `<style>${this.config.content}</style>`;
            case 'javascript':
                if (this.config.executeScript) return `<script>
                        (function() {
                            ${this.config.content}
                        })();
                    </script>`;
                return `<pre><code>${this.config.content}</code></pre>`;
            default:
                return this.config.content;
        }
    }
    editorRender() {
        return `<div class="raw-block" data-block-id="${this.id}" 
                     x-data="rawCodeEditor()" 
                     x-init="init('${this.id}')">
            <div class="code-editor">
                <div class="code-header">
                    <div class="code-header-left">
                        <span class="code-mode" x-text="block ? block.config.mode.toUpperCase() : 'CODE'"></span>
                        <span x-show="!isValid" class="validation-error">\u{26A0} Invalid syntax</span>
                        <span x-show="isValid" class="validation-success">\u{2713} Valid</span>
                    </div>
                    <div class="code-header-right">
                        <button 
                            class="toggle-btn" 
                            :class="{ 'active': !showPreview }"
                            @click="showPreview = false"
                            type="button">
                            Code
                        </button>
                        <button 
                            class="toggle-btn" 
                            :class="{ 'active': showPreview }"
                            @click="showPreview = true"
                            type="button">
                            Preview
                        </button>
                    </div>
                </div>
                <textarea
                    x-show="!showPreview"
                    class="code-input"
                    :class="{ 'invalid': !isValid }"
                    x-init="$el.value = block ? block.config.content : ''; previewContent = $el.value;"
                    @input="handleInput($event)"
                    @blur="if(block) { block.config.content = $event.target.value; previewContent = $event.target.value; }"
                    placeholder="Enter your code here..."
                    :placeholder="block ? 'Enter your ' + block.config.mode + ' code here...' : 'Enter your code here...'"
                    spellcheck="false"
                    autocomplete="off"
                    style="width: 100%; min-height: 200px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; resize: vertical;">${this.config.content}</textarea>
                <div 
                    x-show="showPreview" 
                    class="preview-content" 
                    style="min-height: 200px; border: 1px solid var(--gray-300); border-radius: var(--radius-md); padding: var(--space-4); background: white;">
                    <div x-show="!previewContent || previewContent.trim() === ''" class="preview-placeholder">
                        Enter some HTML code and it will appear here...
                    </div>
                    <div x-show="previewContent && previewContent.trim() !== ''" x-html="previewContent"></div>
                </div>
            </div>
        </div>`;
    }
    render() {
        return `<div class="raw-block" data-block-id="${this.id}">
            ${this.processContent()}
        </div>`;
    }
}
var $08ab3851bf56e43b$export$2e2bcd8739ae039 = $08ab3851bf56e43b$var$Raw;



class $fd39480e8716551f$var$Delimiter extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            style: this.config.style || 'line',
            // line, dots, asterisks, custom
            color: this.config.color || '#E8E8E8',
            width: this.config.width || '100%',
            thickness: this.config.thickness || '1px',
            spacing: this.config.spacing || '20px',
            alignment: this.config.alignment || 'center',
            customText: this.config.customText || '***'
        };
        this.settings = [
            {
                name: 'style',
                label: 'Delimiter Style',
                html: `<select @change="trigger('${this.id}', 'style', $event.target.value)">
                    <option value="line">Line</option>
                    <option value="dots">Dots</option>
                    <option value="asterisks">Asterisks</option>
                    <option value="custom">Custom Text</option>
                </select>`
            },
            {
                name: 'customText',
                label: 'Custom Text',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'customText', $event.target.value)"
                    :value="block.config.customText"
                    x-show="block.config.style === 'custom'"
                    placeholder="Enter custom delimiter text">`
            },
            {
                name: 'appearance',
                label: 'Appearance',
                html: `<div class="delimiter-appearance">
                    <input type="color" 
                        @change="trigger('${this.id}', 'color', $event.target.value)"
                        :value="block.config.color"
                        title="Color">
                    <input type="text" 
                        @change="trigger('${this.id}', 'width', $event.target.value)"
                        :value="block.config.width"
                        placeholder="Width (%, px)"
                        title="Width">
                    <input type="text" 
                        @change="trigger('${this.id}', 'thickness', $event.target.value)"
                        :value="block.config.thickness"
                        placeholder="Thickness (px)"
                        title="Thickness">
                    <input type="text" 
                        @change="trigger('${this.id}', 'spacing', $event.target.value)"
                        :value="block.config.spacing"
                        placeholder="Spacing (px)"
                        title="Spacing">
                </div>`
            },
            {
                name: 'alignment',
                label: 'Alignment',
                html: `<select @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Delimiter',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>',
            category: 'Layout'
        };
    }
    getDelimiterContent() {
        switch(this.config.style){
            case 'line':
                return `<hr style="
                    border: none;
                    height: ${this.config.thickness};
                    background-color: ${this.config.color};
                    margin: ${this.config.spacing} auto;">`;
            case 'dots':
                return `<div style="
                    text-align: ${this.config.alignment};
                    color: ${this.config.color};
                    margin: ${this.config.spacing} auto;
                    letter-spacing: 8px;
                    font-size: ${parseInt(this.config.thickness) * 4}px;">
                    \u{2022} \u{2022} \u{2022}
                </div>`;
            case 'asterisks':
                return `<div style="
                    text-align: ${this.config.alignment};
                    color: ${this.config.color};
                    margin: ${this.config.spacing} auto;
                    letter-spacing: 8px;
                    font-size: ${parseInt(this.config.thickness) * 2}px;">
                    * * *
                </div>`;
            case 'custom':
                return `<div style="
                    text-align: ${this.config.alignment};
                    color: ${this.config.color};
                    margin: ${this.config.spacing} auto;
                    font-size: ${parseInt(this.config.thickness) * 2}px;">
                    ${this.config.customText}
                </div>`;
        }
    }
    editorRender() {
        return `<div class="delimiter-block" style="width: ${this.config.width}; margin: 0 auto;">
            ${this.getDelimiterContent()}
        </div>`;
    }
    render() {
        return `<div class="delimiter-block" style="width: ${this.config.width}; margin: 0 auto;">
            ${this.getDelimiterContent()}
        </div>`;
    }
}
var $fd39480e8716551f$export$2e2bcd8739ae039 = $fd39480e8716551f$var$Delimiter;



class $ff02aedcfec75f6b$var$Button extends (0, $7a9b6788f4274d37$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            text: this.config.text || 'Click me',
            url: this.config.url || '',
            type: this.config.type || 'primary',
            // primary, secondary, outline, link
            size: this.config.size || 'medium',
            // small, medium, large
            icon: this.config.icon || '',
            iconPosition: this.config.iconPosition || 'left',
            fullWidth: this.config.fullWidth || false,
            disabled: this.config.disabled || false,
            customStyles: this.config.customStyles || {
                backgroundColor: '',
                textColor: '',
                borderColor: '',
                borderRadius: '',
                padding: ''
            }
        };
        this.settings = [
            {
                name: 'text',
                label: 'Button Text',
                html: `<input type="text" class="settings-input" 
                    @change="trigger('${this.id}', 'text', $event.target.value)"
                    :value="${this.config.text}"
                    placeholder="Enter button text">`
            },
            {
                name: 'url',
                label: 'URL',
                html: `<input type="text" class="settings-input" 
                    @change="trigger('${this.id}', 'url', $event.target.value)"
                    :value="${this.config.url}"
                    placeholder="Enter URL">`
            },
            {
                name: 'type',
                label: 'Button Type',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="outline">Outline</option>
                    <option value="link">Link</option>
                </select>`
            },
            {
                name: 'size',
                label: 'Size',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'size', $event.target.value)">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>`
            },
            {
                name: 'icon',
                label: 'Icon',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'icon', $event.target.value)">
                    <option value="">None</option>
                    <option value="arrow-right">Arrow Right</option>
                    <option value="download">Download</option>
                    <option value="external-link">External Link</option>
                </select>`
            },
            {
                name: 'iconPosition',
                label: 'Icon Position',
                html: `<select class="settings-select" 
                    @change="trigger('${this.id}', 'iconPosition', $event.target.value)"
                    x-show="${this.config.icon}">
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>`
            },
            {
                name: 'fullWidth',
                label: 'Full Width',
                html: `<label class="settings-checkbox">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'fullWidth', $event.target.checked)"
                        :checked="${this.config.fullWidth}">
                    <span class="settings-checkbox-label">Full Width</span>
                </label>`
            },
            {
                name: 'disabled',
                label: 'Disabled',
                html: `<label class="settings-checkbox">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'disabled', $event.target.checked)"
                        :checked="${this.config.disabled}">
                    <span class="settings-checkbox-label">Disabled</span>
                </label>`
            },
            {
                name: 'customStyles',
                label: 'Custom Styles',
                html: `<div class="custom-styles">
                    <input type="color" class="settings-color-input" 
                        @change="trigger('${this.id}', 'customStyles', {backgroundColor: $event.target.value, textColor: '${this.config.customStyles.textColor}', borderColor: '${this.config.customStyles.borderColor}', borderRadius: '${this.config.customStyles.borderRadius}', padding: '${this.config.customStyles.padding}'})"
                        value="${this.config.customStyles.backgroundColor}"
                        title="Background Color">
                    <input type="color" class="settings-color-input" 
                        @change="trigger('${this.id}', 'customStyles', {backgroundColor: '${this.config.customStyles.backgroundColor}', textColor: $event.target.value, borderColor: '${this.config.customStyles.borderColor}', borderRadius: '${this.config.customStyles.borderRadius}', padding: '${this.config.customStyles.padding}'})"
                        value="${this.config.customStyles.textColor}"
                        title="Text Color">
                    <input type="color" class="settings-color-input" 
                        @change="trigger('${this.id}', 'customStyles', {backgroundColor: '${this.config.customStyles.backgroundColor}', textColor: '${this.config.customStyles.textColor}', borderColor: $event.target.value, borderRadius: '${this.config.customStyles.borderRadius}', padding: '${this.config.customStyles.padding}'})"
                        value="${this.config.customStyles.borderColor}"
                        title="Border Color">
                    <input type="text" class="settings-input" 
                        @change="trigger('${this.id}', 'customStyles', {backgroundColor: '${this.config.customStyles.backgroundColor}', textColor: '${this.config.customStyles.textColor}', borderColor: '${this.config.customStyles.borderColor}', borderRadius: $event.target.value, padding: '${this.config.customStyles.padding}'})"
                        value="${this.config.customStyles.borderRadius}"
                        placeholder="Border Radius"
                        title="Border Radius">
                    <input type="text" class="settings-input" 
                        @change="trigger('${this.id}', 'customStyles', {backgroundColor: '${this.config.customStyles.backgroundColor}', textColor: '${this.config.customStyles.textColor}', borderColor: '${this.config.customStyles.borderColor}', borderRadius: '${this.config.customStyles.borderRadius}', padding: $event.target.value})"
                        value="${this.config.customStyles.padding}"
                        placeholder="Padding"
                        title="Padding">
                </div>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Button',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"/></svg>',
            category: 'Interactive'
        };
    }
    getIcon() {
        const icons = {
            'arrow-right': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>',
            'download': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>',
            'external-link': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>'
        };
        return icons[this.config.icon] || '';
    }
    getButtonStyles() {
        const sizeStyles = {
            small: 'padding: 0.25rem 0.5rem; font-size: 0.875rem;',
            medium: 'padding: 0.5rem 1rem; font-size: 1rem;',
            large: 'padding: 0.75rem 1.5rem; font-size: 1.125rem;'
        };
        const typeStyles = {
            primary: 'background-color: #007bff; color: white; border: none;',
            secondary: 'background-color: #6c757d; color: white; border: none;',
            outline: 'background-color: transparent; color: #007bff; border: 1px solid #007bff;',
            link: 'background-color: transparent; color: #007bff; border: none; text-decoration: underline;'
        };
        return `
            ${typeStyles[this.config.type]}
            ${sizeStyles[this.config.size]}
            ${this.config.fullWidth ? 'width: 100%;' : ''}
            ${this.config.disabled ? 'opacity: 0.65; pointer-events: none;' : ''}
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.2s;
            ${this.config.customStyles.backgroundColor ? `background-color: ${this.config.customStyles.backgroundColor} !important;` : ''}
            ${this.config.customStyles.textColor ? `color: ${this.config.customStyles.textColor} !important;` : ''}
            ${this.config.customStyles.borderColor ? `border-color: ${this.config.customStyles.borderColor} !important;` : ''}
            ${this.config.customStyles.borderRadius ? `border-radius: ${this.config.customStyles.borderRadius} !important;` : ''}
            ${this.config.customStyles.padding ? `padding: ${this.config.customStyles.padding} !important;` : ''}
        `;
    }
    editorRender() {
        const icon = this.getIcon();
        const buttonContent = `
            ${this.config.iconPosition === 'left' && icon ? `<span class="button-icon">${icon}</span>` : ''}
            <span class="button-text"
                contenteditable="true"
                x-html="block.config.text"
                @blur="block.config.text = $event.target.innerHTML">${this.config.text}</span>
            ${this.config.iconPosition === 'right' && icon ? `<span class="button-icon">${icon}</span>` : ''}
        `;
        return `<div class="button-block">
            ${this.config.url ? `
                <a href="${this.config.url}" 
                    class="button" 
                    style="${this.getButtonStyles()}"
                    target="_blank"
                    rel="noopener noreferrer">
                    ${buttonContent}
                </a>
            ` : `
                <button 
                    class="button" 
                    style="${this.getButtonStyles()}"
                    ${this.config.disabled ? 'disabled' : ''}>
                    ${buttonContent}
                </button>
            `}
        </div>`;
    }
    render() {
        const icon = this.getIcon();
        const buttonContent = `
            ${this.config.iconPosition === 'left' && icon ? `<span class="button-icon">${icon}</span>` : ''}
            <span class="button-text">${this.config.text}</span>
            ${this.config.iconPosition === 'right' && icon ? `<span class="button-icon">${icon}</span>` : ''}
        `;
        return `<div class="button-block">
            ${this.config.url ? `
                <a href="${this.config.url}" 
                    class="button" 
                    style="${this.getButtonStyles()}"
                    target="_blank"
                    rel="noopener noreferrer">
                    ${buttonContent}
                </a>
            ` : `
                <button 
                    class="button" 
                    style="${this.getButtonStyles()}"
                    ${this.config.disabled ? 'disabled' : ''}>
                    ${buttonContent}
                </button>
            `}
        </div>`;
    }
}
var $ff02aedcfec75f6b$export$2e2bcd8739ae039 = $ff02aedcfec75f6b$var$Button;


window.Alpine = (0, $5OpyM$alpinejs);
// Tool modules registry
const $cf838c15c8b009ba$var$toolModules = {
    Paragraph: $4672dcc6140b9c43$export$2e2bcd8739ae039,
    Header: $33963d57131b26df$export$2e2bcd8739ae039,
    List: $84a8a2891314e8a4$export$2e2bcd8739ae039,
    Code: $5946ce6f8e5f3f11$export$2e2bcd8739ae039,
    Image: $89b22059272e1d27$export$2e2bcd8739ae039,
    Quote: $56e8ed795405fb5c$export$2e2bcd8739ae039,
    WYSIWYG: $806caca8705a7215$export$2e2bcd8739ae039,
    Alert: $18282cbdca00d23e$export$2e2bcd8739ae039,
    VideoPlayer: $1d78d83887e524f6$export$2e2bcd8739ae039,
    AudioPlayer: $b7a015afcd00e44f$export$2e2bcd8739ae039,
    Carousel: $5158dfa5f71afbd5$export$2e2bcd8739ae039,
    Columns: $caf1e97d18e29b9d$export$2e2bcd8739ae039,
    Raw: $08ab3851bf56e43b$export$2e2bcd8739ae039,
    Delimiter: $fd39480e8716551f$export$2e2bcd8739ae039,
    Button: $ff02aedcfec75f6b$export$2e2bcd8739ae039
};
/**
 * Get default tool configuration
 * @returns {Object} Default tool configuration
 */ function $cf838c15c8b009ba$var$getDefaultToolConfig() {
    const config = {};
    // Add all available tools with their default configurations
    Object.entries($cf838c15c8b009ba$var$toolModules).forEach(([toolName, ToolClass])=>{
        try {
            // Get the default config from the tool's toolbox() method if it exists
            const toolbox = ToolClass.toolbox ? ToolClass.toolbox() : {};
            config[toolName] = {
                class: ToolClass,
                config: toolbox.config || {}
            };
            (0, $4c0d28162c26105d$export$153e5dc2c098b35c).debug(`Loaded tool: ${toolName}`);
        } catch (e) {
            (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error(`Error loading tool ${toolName}:`, e);
        }
    });
    return config;
}
/**
 * Extract and parse tool configuration from DOM, with fallback to defaults
 * @returns {Object} Parsed tool configuration
 */ function $cf838c15c8b009ba$var$getToolConfigFromDOM() {
    const editorElement = document.querySelector('[x-data*="alpineEditor"]');
    if (!editorElement) {
        (0, $4c0d28162c26105d$export$153e5dc2c098b35c).info('No editor element found, using default tool config');
        return $cf838c15c8b009ba$var$getDefaultToolConfig();
    }
    const xDataAttr = editorElement.getAttribute('x-data');
    const match = xDataAttr.match(/alpineEditor\(\{[\s\n]*tools:\s*(\[[\s\S]*?\])\s*\}\)/);
    if (!match) {
        (0, $4c0d28162c26105d$export$153e5dc2c098b35c).info('No tools config found in DOM, using default tool config');
        return $cf838c15c8b009ba$var$getDefaultToolConfig();
    }
    try {
        const toolsConfig = new Function(`return ${match[1]}`)();
        const config = {};
        (0, $4c0d28162c26105d$export$153e5dc2c098b35c).debug('toolModules keys:', Object.keys($cf838c15c8b009ba$var$toolModules));
        toolsConfig.forEach((tool)=>{
            (0, $4c0d28162c26105d$export$153e5dc2c098b35c).debug('Loading tool:', tool.class);
            if ($cf838c15c8b009ba$var$toolModules[tool.class]) {
                config[tool.class] = {
                    class: $cf838c15c8b009ba$var$toolModules[tool.class],
                    config: tool.config || {}
                };
                (0, $4c0d28162c26105d$export$153e5dc2c098b35c).debug(`Successfully loaded tool: ${tool.class}`);
            } else (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error(`Tool ${tool.class} not found in available modules`);
        });
        // If no tools were successfully parsed, fall back to defaults
        if (Object.keys(config).length === 0) {
            (0, $4c0d28162c26105d$export$153e5dc2c098b35c).info('No tools successfully parsed, using default tool config');
            return $cf838c15c8b009ba$var$getDefaultToolConfig();
        }
        return config;
    } catch (e) {
        (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error('Error parsing tool configuration:', e);
        (0, $4c0d28162c26105d$export$153e5dc2c098b35c).info('Using default tool config as fallback');
        return $cf838c15c8b009ba$var$getDefaultToolConfig();
    }
}
// Initialize Alpine with tool loading
document.addEventListener('alpine:init', ()=>{
    window.Alpine.data('editorToolbar', ()=>new (0, $ae1a22f2bd2eaeed$export$4c260019440d418f)());
    window.Alpine.data('headerToolbar', (editorId)=>({
            toolbarInstance: null,
            canUndo: false,
            canRedo: false,
            init () {
                this.toolbarInstance = new (0, $8a83916c83abff24$export$3c11ee1da7b7384)(editorId);
                this.toolbarInstance.init();
                // Listen for header toolbar updates
                document.addEventListener('header-toolbar-updated', (event)=>{
                    if (event.detail.editorId === editorId) {
                        this.canUndo = event.detail.canUndo;
                        this.canRedo = event.detail.canRedo;
                    }
                });
            },
            handleUndo () {
                if (this.toolbarInstance) this.toolbarInstance.handleUndo();
            },
            handleRedo () {
                if (this.toolbarInstance) this.toolbarInstance.handleRedo();
            },
            handlePreview () {
                if (this.toolbarInstance) this.toolbarInstance.handlePreview();
            },
            handleSettings () {
                if (this.toolbarInstance) this.toolbarInstance.handleSettings();
            }
        }));
    window.Alpine.data('editorSettings', (editorId, initialSettings)=>({
            settingsInstance: null,
            settings: initialSettings || [],
            init () {
                this.settingsInstance = new (0, $299948f22c89836d$export$c72f6eaae7b9adff)(editorId, this.settings);
                this.settingsInstance.init();
                // Listen for settings updates
                document.addEventListener('settings-updated', (event)=>{
                    if (event.detail.editorId === editorId) this.settings = event.detail.settings || [];
                });
            },
            trigger (blockId, property, value) {
                if (this.settingsInstance) this.settingsInstance.trigger(blockId, property, value);
            }
        }));
    window.Alpine.data('alpineEditor', ()=>({
            editor: null,
            blocks: [],
            selectedBlock: null,
            hoveredTarget: {},
            toolConfig: {},
            // Initialize when the component is mounted
            init () {
                // Get the Alpine component's element and utilities
                const $el = this.$el;
                const $dispatch = this.$dispatch;
                const $nextTick = this.$nextTick;
                const $watch = this.$watch;
                try {
                    this.toolConfig = $cf838c15c8b009ba$var$getToolConfigFromDOM();
                    (0, $4c0d28162c26105d$export$153e5dc2c098b35c).info('Tool config loaded:', Object.keys(this.toolConfig));
                    this.editor = new (0, $cda2b75602dff697$export$7cda8d932e2f33c0)(this.toolConfig);
                    // Add Alpine utilities to editor (not reactive references)
                    this.editor.$el = $el;
                    this.editor.$dispatch = $dispatch;
                    this.editor.$nextTick = $nextTick;
                    this.editor.$watch = $watch;
                    // Initialize the editor
                    this.editor.init();
                    // Set up blocks array without circular references
                    this.syncBlocksFromEditor();
                    // Ensure the editor is available in Alpine's context
                    this.$nextTick(()=>{
                        // Force a re-render to show the toolbar now that editor is initialized
                        this.editor = this.editor;
                    });
                    this.selectedBlock = this.editor.selectedBlock;
                    // Watch for selectedBlock changes to sync with editor
                    $watch('selectedBlock', (newValue)=>{
                        if (this.editor && this.editor.selectedBlock !== newValue) this.editor.selectedBlock = newValue;
                    });
                    // Watch for block config changes to trigger debounced state saves
                    $watch('blocks', ()=>{
                        if (this.editor && this.editor.debouncedSaveState) this.editor.debouncedSaveState();
                    }, {
                        deep: true
                    });
                    // Listen for editor updates to sync blocks
                    document.addEventListener('editor-updated', (event)=>{
                        if (event.detail.id === this.editor.id) this.syncBlocksFromEditor();
                    });
                    document.addEventListener('editor-drop', (event)=>{
                        if (event.detail.id === this.editor.id) this.syncBlocksFromEditor();
                    });
                } catch (error) {
                    (0, $4c0d28162c26105d$export$153e5dc2c098b35c).error('Error initializing editor:', error);
                }
            },
            // Sync blocks array from editor without circular references
            syncBlocksFromEditor () {
                if (!this.editor) return;
                // Update the simple blocks array for Alpine's reactivity without circular refs
                this.blocks = this.editor.blocks.map((block)=>({
                        id: block.id,
                        class: block.class || block.constructor.name,
                        // Just track the count to trigger reactivity
                        _updateCount: Date.now()
                    }));
            },
            // Expose required methods
            blocksJSON (pretty = false) {
                if (!this.editor) return '[]';
                // Use the editor's blocksJSON method directly for correct serialization
                if (typeof this.editor.blocksJSON === 'function') return this.editor.blocksJSON(pretty);
                // Fallback: manually serialize using actual editor blocks
                const blocksData = this.editor.blocks.map((block)=>{
                    // Use the preserved class name if available, otherwise extract from constructor name
                    let className = block.class || block.constructor.name;
                    // If we get a bundled class name, try to extract the real name
                    if (className.includes('$var$')) {
                        const match = className.match(/\$var\$(\w+)$/);
                        if (match) className = match[1];
                    }
                    return {
                        id: block.id,
                        class: className,
                        data: this.serializeBlockConfig(block.config)
                    };
                });
                return pretty ? JSON.stringify(blocksData, null, 2).replace(/ /g, '&nbsp;').replace(/\n/g, '<br>') : JSON.stringify(blocksData);
            },
            // Helper method to serialize block config without circular references
            serializeBlockConfig (config) {
                if (!config || typeof config !== 'object') return config;
                const serialized = {};
                for (const [key, value] of Object.entries(config)){
                    if (key === 'editor' || key === 'updateFunction' || typeof value === 'function') continue;
                    if (Array.isArray(value)) // Handle arrays (like columns with nested blocks)
                    serialized[key] = value.map((item)=>{
                        if (item && typeof item === 'object') {
                            // For nested blocks, only include serializable properties
                            if (item.id && item.config) {
                                // Use the preserved class name if available, otherwise extract from constructor name
                                let className = item.class || item.constructor && item.constructor.name || 'Unknown';
                                // Handle bundled class names
                                if (className.includes('$var$')) {
                                    const match = className.match(/\$var\$(\w+)$/);
                                    if (match) className = match[1];
                                }
                                return {
                                    id: item.id,
                                    class: className,
                                    config: this.serializeBlockConfig(item.config)
                                };
                            }
                            // For other objects, recursively serialize
                            return this.serializeBlockConfig(item);
                        }
                        return item;
                    });
                    else if (value && typeof value === 'object') // Recursively serialize nested objects
                    serialized[key] = this.serializeBlockConfig(value);
                    else // Primitive values
                    serialized[key] = value;
                }
                return serialized;
            },
            handleDragOver (event, blockId) {
                event.preventDefault();
                // Handle drag over logic directly in Alpine component
                const dropTarget = event.currentTarget;
                const rect = dropTarget.getBoundingClientRect();
                const relY = event.clientY - rect.top;
                // Use improved drop zone detection - top 40% vs bottom 60%
                const position = relY < rect.height * 0.4 ? 'top' : 'bottom';
                // Update Alpine's hoveredTarget directly
                if (this.hoveredTarget[blockId] !== position) {
                    this.hoveredTarget[blockId] = position;
                    // Also update the editor's state to keep them in sync
                    if (this.editor) this.editor.hoveredTarget[blockId] = position;
                }
            },
            handleDragLeave (event, blockId) {
                // Handle drag leave logic directly in Alpine component
                const dropTarget = event.currentTarget;
                const relatedTarget = event.relatedTarget;
                if (!relatedTarget || !dropTarget.contains(relatedTarget)) // Add delay to prevent flickering
                setTimeout(()=>{
                    if (this.hoveredTarget[blockId]) {
                        delete this.hoveredTarget[blockId];
                        // Also update the editor's state
                        if (this.editor && this.editor.hoveredTarget[blockId]) delete this.editor.hoveredTarget[blockId];
                    }
                }, 100);
            },
            handleDrop (event, position, blockId) {
                if (this.editor) {
                    // Clear the hover state immediately
                    if (this.hoveredTarget[blockId]) delete this.hoveredTarget[blockId];
                    this.editor.handleDrop(event, position, blockId);
                }
            },
            setActive (event, blockId) {
                if (this.editor) {
                    this.editor.setActive(event, blockId);
                    // Sync with Alpine component state
                    this.selectedBlock = blockId;
                }
            },
            showDeleteConfirmation (blockId) {
                // Dispatch event to show delete confirmation modal on window
                window.dispatchEvent(new CustomEvent('show-delete-confirmation', {
                    detail: {
                        blockId: blockId
                    }
                }));
            },
            // Get header toolbar HTML
            getHeaderToolbar () {
                if (!this.editor) return '<div class="header-toolbar"><!-- Editor not initialized --></div>';
                // Try to get the method from the editor
                let getHeaderToolbarMethod = this.editor.getHeaderToolbar;
                if (!getHeaderToolbarMethod && this.editor.headerToolbar) // Fallback: call the headerToolbar render method directly
                try {
                    return this.editor.headerToolbar.render();
                } catch (error) {
                // Silently fall through to fallback
                }
                if (typeof getHeaderToolbarMethod !== 'function') // Provide a fallback toolbar
                return this.getFallbackHeaderToolbar();
                try {
                    return getHeaderToolbarMethod.call(this.editor);
                } catch (error) {
                    return this.getFallbackHeaderToolbar();
                }
            },
            // Fallback header toolbar when editor method isn't available
            getFallbackHeaderToolbar () {
                const editorId = this.editor ? this.editor.id : 'unknown';
                return `
                <div class="header-toolbar" x-data="headerToolbar('${editorId}')">
                    <button class="header-btn" 
                            :disabled="!canUndo"
                            :class="{ 'header-btn-disabled': !canUndo }"
                            @click="handleUndo()"
                            title="Undo (Ctrl+Z)">
                        <svg class="header-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
                        </svg>
                    </button>
                    <button class="header-btn" 
                            :disabled="!canRedo"
                            :class="{ 'header-btn-disabled': !canRedo }"
                            @click="handleRedo()"
                            title="Redo (Ctrl+Y)">
                        <svg class="header-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/>
                        </svg>
                    </button>
                    <div class="header-divider"></div>
                    <button class="header-btn" 
                            @click="handlePreview()"
                            title="Preview">
                        <svg class="header-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </button>
                    <button class="header-btn" 
                            @click="handleSettings()"
                            title="Editor Settings">
                        <svg class="header-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                        </svg>
                    </button>
                </div>
            `;
            },
            // Get actual blocks for rendering (not the cleaned version)
            getEditorBlocks () {
                if (!this.editor) return [];
                return this.editor.blocks;
            }
        }));
});
(0, $5OpyM$alpinejs).start();


//# sourceMappingURL=index.esm.js.map

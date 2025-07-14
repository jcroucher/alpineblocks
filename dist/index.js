var $gXNCa$alpinejs = require("alpinejs");
var $gXNCa$uuid = require("uuid");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

/**
 * Debug configuration for AlpineBlocks
 * Centralized place to control all debugging settings
 */ const $9a957bb4d57af950$export$f7c1896972d6c454 = {
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
if (typeof window !== 'undefined' && $9a957bb4d57af950$export$f7c1896972d6c454.enabled) {
    window.AlpineBlocksDebugConfig = $9a957bb4d57af950$export$f7c1896972d6c454;
    console.log('%c[AlpineBlocks] Debug mode enabled. Use window.AlpineBlocksDebugConfig to modify settings.', $9a957bb4d57af950$export$f7c1896972d6c454.styles.info);
}


class $7294c730f5636c35$export$153e5dc2c098b35c {
    static enabled = (0, $9a957bb4d57af950$export$f7c1896972d6c454).enabled;
    static levels = {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3
    };
    static currentLevel = (0, $9a957bb4d57af950$export$f7c1896972d6c454).level;
    /**
   * Enable or disable debug output
   * @param {boolean} enabled - Whether to enable debug output
   */ static setEnabled(enabled) {
        $7294c730f5636c35$export$153e5dc2c098b35c.enabled = enabled;
    }
    /**
   * Set the minimum log level
   * @param {number} level - Minimum level to log (0-3)
   */ static setLevel(level) {
        $7294c730f5636c35$export$153e5dc2c098b35c.currentLevel = level;
        (0, $9a957bb4d57af950$export$f7c1896972d6c454).level = level;
    }
    /**
   * Log an error message
   * @param {string} message - Error message
   * @param {...any} args - Additional arguments
   */ static error(message, ...args) {
        if ($7294c730f5636c35$export$153e5dc2c098b35c.enabled && $7294c730f5636c35$export$153e5dc2c098b35c.currentLevel >= $7294c730f5636c35$export$153e5dc2c098b35c.levels.ERROR) console.error(`%c[AlpineBlocks ERROR] ${message}`, (0, $9a957bb4d57af950$export$f7c1896972d6c454).styles.error, ...args);
    }
    /**
   * Log a warning message
   * @param {string} message - Warning message
   * @param {...any} args - Additional arguments
   */ static warn(message, ...args) {
        if ($7294c730f5636c35$export$153e5dc2c098b35c.enabled && $7294c730f5636c35$export$153e5dc2c098b35c.currentLevel >= $7294c730f5636c35$export$153e5dc2c098b35c.levels.WARN) console.warn(`%c[AlpineBlocks WARN] ${message}`, (0, $9a957bb4d57af950$export$f7c1896972d6c454).styles.warn, ...args);
    }
    /**
   * Log an info message
   * @param {string} message - Info message
   * @param {...any} args - Additional arguments
   */ static info(message, ...args) {
        if ($7294c730f5636c35$export$153e5dc2c098b35c.enabled && $7294c730f5636c35$export$153e5dc2c098b35c.currentLevel >= $7294c730f5636c35$export$153e5dc2c098b35c.levels.INFO) console.info(`%c[AlpineBlocks INFO] ${message}`, (0, $9a957bb4d57af950$export$f7c1896972d6c454).styles.info, ...args);
    }
    /**
   * Log a debug message
   * @param {string} message - Debug message
   * @param {...any} args - Additional arguments
   */ static debug(message, ...args) {
        if ($7294c730f5636c35$export$153e5dc2c098b35c.enabled && $7294c730f5636c35$export$153e5dc2c098b35c.currentLevel >= $7294c730f5636c35$export$153e5dc2c098b35c.levels.DEBUG) console.log(`%c[AlpineBlocks DEBUG] ${message}`, (0, $9a957bb4d57af950$export$f7c1896972d6c454).styles.debug, ...args);
    }
    /**
   * Log a general message (equivalent to console.log)
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */ static log(message, ...args) {
        if ($7294c730f5636c35$export$153e5dc2c098b35c.enabled) console.log(`%c[AlpineBlocks] ${message}`, (0, $9a957bb4d57af950$export$f7c1896972d6c454).styles.log, ...args);
    }
}
// Global access for debugging in development
if (typeof window !== 'undefined') window.AlpineBlocksDebug = $7294c730f5636c35$export$153e5dc2c098b35c;


class $d91c3dbba958750e$export$df4a79c26d3b48ff {
    constructor(toolConfig){
        this.toolConfig = toolConfig;
        this.tools = [];
    }
    loadTools() {
        Object.entries(this.toolConfig).forEach(([key, { class: BlockClass, config: config }])=>{
            if (!BlockClass || !config) {
                (0, $7294c730f5636c35$export$153e5dc2c098b35c).error(`Tool ${key} is missing a ${!BlockClass ? 'class' : 'config'}`);
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



var $c1a596c4149c0a47$require$uuidv4 = $gXNCa$uuid.v4;
class $c1a596c4149c0a47$export$d3ae936b397926f7 {
    constructor(){
        this.blocks = [];
    }
    addBlock(BlockClass, config) {
        const block = new BlockClass({
            id: $c1a596c4149c0a47$require$uuidv4(),
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



class $bc5955414cf94f77$export$a268db361d674bec {
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
            (0, $7294c730f5636c35$export$153e5dc2c098b35c).debug('Show inline toolbar event:', event);
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
 */ class $0230982e13623baf$export$9572cf7a37405cc {
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
 */ class $ebbb859655ae7d1c$export$3c11ee1da7b7384 {
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




var $56b81aadc5b5902e$require$uuidv4 = $gXNCa$uuid.v4;
class $56b81aadc5b5902e$export$7cda8d932e2f33c0 {
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
        this.toolManager = new (0, $d91c3dbba958750e$export$df4a79c26d3b48ff)(toolConfig);
        this.blockManager = new (0, $c1a596c4149c0a47$export$d3ae936b397926f7)();
        this.inlineToolbar = new (0, $bc5955414cf94f77$export$a268db361d674bec)();
        this.historyManager = new (0, $0230982e13623baf$export$9572cf7a37405cc)(this, historySize);
        this.headerToolbar = null; // Will be initialized after editor ID is set
        // Debounced state saving for property updates
        this.debouncedSaveState = this.debounce(()=>{
            this.saveState('Updated block properties');
        }, 1000); // Save after 1 second of inactivity
    }
    /**
   * Initialize the editor with Alpine.js integration
   */ init() {
        (0, $7294c730f5636c35$export$153e5dc2c098b35c).info('Block editor initialized');
        this.id = this.$el.id;
        window.alpineEditors = window.alpineEditors || {};
        window.alpineEditors[this.id] = this;
        // Initialize header toolbar now that we have the ID
        this.headerToolbar = new (0, $ebbb859655ae7d1c$export$3c11ee1da7b7384)(this.id);
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
   * Check if undo is available
   * @returns {boolean} Whether undo is possible
   */ canUndo() {
        return this.historyManager.canUndo();
    }
    /**
   * Check if redo is available
   * @returns {boolean} Whether redo is possible
   */ canRedo() {
        return this.historyManager.canRedo();
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
            // Debug: check block content before serialization
            className;
            const serializedConfig = this.serializeBlockConfig(block.config);
            // Debug: check serialized content
            className;
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
        // Check if this is a template element (format: template-toolId)
        if (blockId.startsWith('template-')) return this.getTemplateElementSettings(blockId);
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
   * Get settings for template elements
   * @param {string} virtualBlockId - Virtual block ID for template element
   * @returns {Array|null} Array of settings or null if not found
   */ getTemplateElementSettings(virtualBlockId) {
        const templateMap = window.templateElementMap;
        if (!templateMap) return null;
        if (!templateMap[virtualBlockId]) return null;
        const { element: element, toolType: toolType, toolInstance: toolInstance } = templateMap[virtualBlockId];
        // If we already have a tool instance, return its settings
        if (toolInstance && toolInstance.settings) return toolInstance.settings;
        // Create a tool instance for this template element
        const toolConfig = this.toolConfig[toolType];
        if (!toolConfig || !toolConfig.class) return null;
        // Extract current values from the element
        const config = this.extractElementConfig(toolType, element);
        // Create tool instance
        const ToolClass = toolConfig.class;
        const tool = new ToolClass({
            id: virtualBlockId,
            updateFunction: (property, value)=>{
                // Update the actual element when properties change
                this.updateTemplateElement(element, toolType, property, value);
            },
            config: config
        });
        // Store the tool instance for future use
        templateMap[virtualBlockId].toolInstance = tool;
        return tool.settings || null;
    }
    /**
   * Extract configuration from a DOM element based on tool type
   * @param {string} toolType - Type of tool
   * @param {Element} element - DOM element
   * @returns {Object} Configuration object
   */ extractElementConfig(toolType, element) {
        const config = {};
        switch(toolType){
            case 'Header':
                config.content = element.textContent || '';
                config.level = element.tagName.toLowerCase().replace('h', '') || '1';
                break;
            case 'Paragraph':
                config.content = element.innerHTML || '';
                break;
            case 'Image':
                config.src = element.src || '';
                config.alt = element.alt || '';
                config.caption = element.getAttribute('data-caption') || '';
                break;
            case 'Button':
                config.text = element.textContent || '';
                config.url = element.href || '#';
                config.style = element.className || 'primary';
                break;
            default:
                // For other tools, try to extract common properties
                if (element.textContent) config.content = element.textContent;
                break;
        }
        return config;
    }
    /**
   * Update a template element when properties change
   * @param {Element} element - DOM element to update
   * @param {string} toolType - Type of tool
   * @param {string} property - Property name
   * @param {any} value - New value
   */ updateTemplateElement(element, toolType, property, value) {
        // Get the tool instance from the template map
        const toolId = element.getAttribute('data-tool-id');
        const virtualBlockId = `template-${toolId}`;
        const templateMap = window.templateElementMap;
        if (!templateMap || !templateMap[virtualBlockId] || !templateMap[virtualBlockId].toolInstance) return;
        const tool = templateMap[virtualBlockId].toolInstance;
        // Update the tool's config
        tool.config[property] = value;
        // Check if the tool has a renderTemplateElement method
        if (typeof tool.renderTemplateElement === 'function') {
            // Get fresh HTML from the tool
            const newHtml = tool.renderTemplateElement(toolId);
            // Create a temporary container to parse the HTML
            const temp = document.createElement('div');
            temp.innerHTML = newHtml;
            const newElement = temp.firstElementChild;
            if (newElement) {
                // Replace the old element with the new one
                element.replaceWith(newElement);
                // Update the element reference in the template map
                templateMap[virtualBlockId].element = newElement;
                // Re-attach click handler
                this.attachTemplateClickHandler(newElement, toolType, toolId);
                // Use the new element for syncing
                element = newElement;
            }
        } else // Fallback to manual property updates for tools without renderTemplateElement
        switch(toolType){
            case 'Header':
                if (property === 'content') element.textContent = value;
                else if (property === 'level') {
                    // Create new header element with correct level
                    const newTag = `h${value}`;
                    const newElement = document.createElement(newTag);
                    newElement.textContent = element.textContent;
                    // Copy attributes
                    Array.from(element.attributes).forEach((attr)=>{
                        newElement.setAttribute(attr.name, attr.value);
                    });
                    element.replaceWith(newElement);
                    element = newElement;
                }
                break;
            case 'Paragraph':
                if (property === 'content') element.innerHTML = value;
                break;
            case 'Button':
                if (property === 'text') element.textContent = value;
                else if (property === 'url') element.href = value;
                else if (property === 'style') element.className = value;
                break;
        }
        // Sync changes back to the Raw block
        this.syncTemplateToRawBlock(element);
    }
    /**
   * Attach click handler to a template element
   * @param {Element} element - DOM element
   * @param {string} toolType - Type of tool
   * @param {string} toolId - Tool ID
   */ attachTemplateClickHandler(element, toolType, toolId) {
        element.style.cursor = 'pointer';
        element.addEventListener('click', (e)=>{
            e.stopPropagation();
            e.preventDefault();
            const virtualBlockId = `template-${toolId}`;
            // Update element mapping
            window.templateElementMap = window.templateElementMap || {};
            window.templateElementMap[virtualBlockId] = {
                ...window.templateElementMap[virtualBlockId],
                element: element,
                toolType: toolType
            };
            // Trigger property panel update
            this.setActive(null, virtualBlockId);
        });
    }
    /**
   * Sync template element changes back to the Raw block content
   * @param {Element} element - Modified element
   */ syncTemplateToRawBlock(element) {
        const previewContainer = element.closest('[x-ref="previewContainer"]');
        if (previewContainer) {
            const rawBlock = previewContainer.closest('.raw-block');
            if (rawBlock) {
                const blockId = rawBlock.getAttribute('data-block-id');
                const block = this.blockManager.blocks.find((b)=>b.id === blockId);
                if (block) {
                    block.config.content = previewContainer.innerHTML;
                    // Also update the textarea if it exists
                    const textarea = rawBlock.querySelector('.code-input');
                    if (textarea) textarea.value = previewContainer.innerHTML;
                }
            }
        }
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
            (0, $7294c730f5636c35$export$153e5dc2c098b35c).error(`Tool configuration for ${blockName} not found`);
            return null;
        }
        const BlockClass = this.toolConfig[blockName].class;
        const config = JSON.parse(JSON.stringify(this.toolConfig[blockName].config));
        const newBlock = new BlockClass({
            id: existingId || $56b81aadc5b5902e$require$uuidv4(),
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
        const dragData = event.dataTransfer.getData('text/plain');
        // Check if this is a template drop
        let isTemplate = false;
        let templateData = null;
        try {
            const parsed = JSON.parse(dragData);
            if (parsed.type === 'template' && parsed.data) {
                isTemplate = true;
                templateData = parsed.data;
            }
        } catch (e) {
        // Not JSON, treat as regular block name
        }
        if (isTemplate && templateData) // Handle template drop
        this.handleTemplateDrop(templateData, blockId);
        else {
            // Handle regular block drop
            const blockName = dragData;
            const newBlock = this.initBlock(blockName);
            if (!newBlock) {
                (0, $7294c730f5636c35$export$153e5dc2c098b35c).error(`Failed to create block of type ${blockName}`);
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
    }
    /**
   * Handle template drop specifically
   * @param {Object} template - Template object from Layout
   * @param {string|null} blockId - ID of target block
   */ handleTemplateDrop(template, blockId = null) {
        try {
            // Use pre-extracted blocks from the drag data
            const blocks = template.blocks;
            if (!blocks || blocks.length === 0) {
                (0, $7294c730f5636c35$export$153e5dc2c098b35c).warn(`Template ${template.name} has no blocks to add`);
                return;
            }
            const newBlocks = [];
            // Create blocks for each template block
            for (const blockData of blocks){
                // Map template block types to AlpineBlocks tool names
                const toolName = this.mapTemplateBlockToTool(blockData.type);
                if (!toolName || !this.toolConfig[toolName]) {
                    (0, $7294c730f5636c35$export$153e5dc2c098b35c).warn(`Tool ${toolName} not found for template block type ${blockData.type}`);
                    continue;
                }
                // For template blocks, we need to merge config before initialization
                // So we'll create the block without initializing it first
                const BlockClass = this.toolConfig[toolName].class;
                const baseConfig = JSON.parse(JSON.stringify(this.toolConfig[toolName].config));
                const mergedConfig = Object.assign(baseConfig, blockData.data || {});
                const newBlock = new BlockClass({
                    id: $56b81aadc5b5902e$require$uuidv4(),
                    updateFunction: this.updateFunction.bind(this),
                    config: mergedConfig
                });
                // Preserve the clean class name
                newBlock.class = toolName;
                // Now initialize with the merged config
                newBlock.init(this);
                if (newBlock && blockData.data) // Handle Columns blocks specially - they need nested blocks
                {
                    if (blockData.type === 'columns' && blockData.data.columns) {
                        const columns = blockData.data.columns;
                        // Process nested blocks for each column
                        for(let i = 0; i < columns.length; i++){
                            const column = columns[i];
                            if (column.blocks && Array.isArray(column.blocks)) {
                                const processedNestedBlocks = [];
                                for (const nestedBlockData of column.blocks){
                                    const nestedToolName = this.mapTemplateBlockToTool(nestedBlockData.type);
                                    if (nestedToolName && this.toolConfig[nestedToolName]) {
                                        // Create nested block with merged config
                                        const NestedBlockClass = this.toolConfig[nestedToolName].class;
                                        const nestedBaseConfig = JSON.parse(JSON.stringify(this.toolConfig[nestedToolName].config));
                                        const nestedMergedConfig = Object.assign(nestedBaseConfig, nestedBlockData.data || {});
                                        const nestedBlock = new NestedBlockClass({
                                            id: $56b81aadc5b5902e$require$uuidv4(),
                                            updateFunction: this.updateFunction.bind(this),
                                            config: nestedMergedConfig
                                        });
                                        nestedBlock.class = nestedToolName;
                                        nestedBlock.init(this);
                                        if (nestedBlock) processedNestedBlocks.push(nestedBlock);
                                    }
                                }
                                // Update the column with processed nested blocks
                                columns[i] = {
                                    ...column,
                                    blocks: processedNestedBlocks
                                };
                            }
                        }
                        // Apply the processed columns configuration
                        newBlock.config.columns = columns;
                    }
                }
                if (newBlock) newBlocks.push(newBlock);
            }
            if (newBlocks.length === 0) {
                (0, $7294c730f5636c35$export$153e5dc2c098b35c).warn(`No valid blocks created from template ${template.name}`);
                return;
            }
            // Add blocks to editor
            if (blockId) {
                const index = this.blocks.findIndex((b)=>b.id === blockId);
                const insertPosition = this.hoveredTarget[blockId] === 'top' ? 'before' : 'after';
                delete this.hoveredTarget[blockId];
                const insertIndex = insertPosition === 'before' ? index : index + 1;
                // Insert all template blocks at the target position
                this.blocks.splice(insertIndex, 0, ...newBlocks);
            } else this.blocks.push(...newBlocks);
            this.$dispatch('editor-drop', {
                id: this.id
            });
            // Select the first block of the template
            if (newBlocks.length > 0) this.setActive(null, newBlocks[0].id);
            this.saveState(`Added template: ${template.name}`);
        } catch (error) {
            (0, $7294c730f5636c35$export$153e5dc2c098b35c).error(`Error handling template drop for ${template.name}:`, error);
        }
    }
    /**
   * Map template block types to AlpineBlocks tool names
   * @param {string} blockType - Template block type
   * @returns {string|null} Tool name
   */ mapTemplateBlockToTool(blockType) {
        const mapping = {
            'paragraph': 'Paragraph',
            'header': 'Header',
            'image': 'Image',
            'quote': 'Quote',
            'list': 'List',
            'button': 'Button',
            'code': 'Code',
            'alert': 'Alert',
            'video': 'VideoPlayer',
            'audio': 'AudioPlayer',
            'carousel': 'Carousel',
            'columns': 'Columns',
            'raw': 'Raw',
            'wysiwyg': 'WYSIWYG'
        };
        return mapping[blockType.toLowerCase()] || null;
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
        (0, $7294c730f5636c35$export$153e5dc2c098b35c).debug(`Block changed: ${block}`);
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
        (0, $7294c730f5636c35$export$153e5dc2c098b35c).debug(`Delete confirmation shown for block: ${blockId}`);
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
            (0, $7294c730f5636c35$export$153e5dc2c098b35c).info(`Block deleted: ${blockId}`);
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
                title: 'Remove Block',
                description: 'Are you sure you want to remove this block? This action cannot be undone.',
                init() {
                    window.addEventListener('show-delete-confirmation', (e) => {
                        this.blockId = e.detail.blockId;
                        this.title = e.detail.title || 'Remove Block';
                        this.description = e.detail.description || 'Are you sure you want to remove this block? This action cannot be undone.';
                        this.show = true;
                    });
                    window.addEventListener('hide-delete-confirmation', () => {
                        this.show = false;
                        this.blockId = null;
                        this.title = 'Remove Block';
                        this.description = 'Are you sure you want to remove this block? This action cannot be undone.';
                    });
                },
            }" 
            x-show="show" 
            @click="show = false"
            style="display: none;">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <svg class="modal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                    <h3 class="modal-title" x-text="title"></h3>
                </div>
                <p class="modal-description" x-text="description"></p>
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
        (0, $7294c730f5636c35$export$153e5dc2c098b35c).info('Delete confirmation modal generated and injected');
        // Generate input modal as well
        this.generateInputModal();
    }
    /**
   * Generate and inject the input modal for page operations
   */ generateInputModal() {
        // Only generate modal if it doesn't exist
        if (document.querySelector('.input-modal-overlay')) return;
        // Create input modal HTML
        const inputModalHTML = `
        <div class="input-modal-overlay" 
            x-data="{ 
                show: false, 
                title: 'Input Required',
                placeholder: 'Enter value',
                inputValue: '',
                confirmText: 'Confirm',
                cancelText: 'Cancel',
                eventType: '',
                eventData: {},
                iconType: 'edit',
                init() {
                    window.addEventListener('show-input-modal', (e) => {
                        this.title = e.detail.title || 'Input Required';
                        this.placeholder = e.detail.placeholder || 'Enter value';
                        this.inputValue = e.detail.defaultValue || '';
                        this.confirmText = e.detail.confirmText || 'Confirm';
                        this.cancelText = e.detail.cancelText || 'Cancel';
                        this.eventType = e.detail.eventType || '';
                        this.eventData = e.detail.eventData || {};
                        this.iconType = e.detail.iconType || 'edit';
                        this.show = true;
                        // Focus input after modal shows
                        this.$nextTick(() => {
                            this.$refs.modalInput?.focus();
                        });
                    });
                    window.addEventListener('hide-input-modal', () => {
                        this.show = false;
                        this.inputValue = '';
                        this.eventType = '';
                        this.eventData = {};
                    });
                },
                handleConfirm() {
                    if (this.inputValue.trim()) {
                        window.dispatchEvent(new CustomEvent(this.eventType, { 
                            detail: { 
                                ...this.eventData,
                                inputValue: this.inputValue.trim()
                            } 
                        }));
                        this.show = false;
                        this.inputValue = '';
                    }
                },
                handleKeydown(event) {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        this.handleConfirm();
                    } else if (event.key === 'Escape') {
                        event.preventDefault();
                        this.show = false;
                        this.inputValue = '';
                    }
                }
            }" 
            x-show="show" 
            @click="show = false"
            style="display: none;">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <!-- Edit Icon -->
                    <svg x-show="iconType === 'edit'" class="modal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                    </svg>
                    <!-- Plus Icon -->
                    <svg x-show="iconType === 'add'" class="modal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                    </svg>
                    <h3 class="modal-title" x-text="title"></h3>
                </div>
                <div class="modal-input-section">
                    <input 
                        type="text" 
                        class="modal-input" 
                        x-model="inputValue"
                        :placeholder="placeholder"
                        @keydown="handleKeydown($event)"
                        x-ref="modalInput"
                    />
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-cancel" @click="show = false" x-text="cancelText">
                    </button>
                    <button class="modal-btn modal-btn-confirm" 
                            @click="handleConfirm()"
                            :disabled="!inputValue.trim()"
                            x-text="confirmText">
                    </button>
                </div>
            </div>
        </div>
    `;
        // Inject modal into body
        document.body.insertAdjacentHTML('beforeend', inputModalHTML);
        (0, $7294c730f5636c35$export$153e5dc2c098b35c).info('Input modal generated and injected');
    }
    /**
   * Log messages based on log level (deprecated - use Debug utility)
   * @param {string} message - Message to log
   * @param {number} level - Log level (1-3)
   * @deprecated Use Debug utility instead
   */ log(message, level = 1) {
        if (level > this.log_level) return;
        (0, $7294c730f5636c35$export$153e5dc2c098b35c).log(message);
    }
}


/**
 * Toolbar manager for handling tool drag operations and click-to-append
 */ class $9aa7d1866d5cf0e4$export$4c260019440d418f {
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



class $acadc144a2722177$export$c72f6eaae7b9adff {
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
            (0, $7294c730f5636c35$export$153e5dc2c098b35c).error('Editor instance not found:', this.editorId);
            return;
        }
        // Check if this is a template element (format: template-toolId)
        if (block_id.startsWith('template-')) {
            const templateMap = window.templateElementMap;
            if (templateMap && templateMap[block_id] && templateMap[block_id].toolInstance) {
                const tool = templateMap[block_id].toolInstance;
                const element = templateMap[block_id].element;
                const toolType = templateMap[block_id].toolType;
                // Update the tool config
                tool.config[property] = value;
                // Update the element using the editor's method
                if (editorInstance.updateTemplateElement) editorInstance.updateTemplateElement(element, toolType, property, value);
                return;
            } else {
                (0, $7294c730f5636c35$export$153e5dc2c098b35c).error('Template element not found:', block_id);
                return;
            }
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
                (0, $7294c730f5636c35$export$153e5dc2c098b35c).error('Parent block or updateNestedBlock method not found:', parentId);
                return;
            }
        }
        // Handle regular top-level blocks
        const block = editorInstance.blocks.find((b)=>b.id === block_id);
        if (!block) {
            (0, $7294c730f5636c35$export$153e5dc2c098b35c).error('Block not found:', block_id);
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




class $8ebbeef8d21b3552$var$Layout {
    constructor(id, name, icon, html, description = ''){
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.html = html;
        this.description = description;
    }
    // Helper method to HTML encode content for safe storage in attributes
    static htmlEncode(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    // Method to parse the HTML and extract tool blocks
    extractBlocks() {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.html, 'text/html');
        const blocks = [];
        // Find all elements with data-block attribute
        const blockElements = doc.querySelectorAll('[data-block]');
        blockElements.forEach((element, index)=>{
            const blockType = element.getAttribute('data-block');
            const config = {};
            // Extract configuration from data attributes
            Array.from(element.attributes).forEach((attr)=>{
                if (attr.name.startsWith('data-config-')) {
                    let configKey = attr.name.replace('data-config-', '');
                    // Convert kebab-case to camelCase for consistency
                    configKey = configKey.replace(/-([a-z])/g, (g)=>g[1].toUpperCase());
                    let value = attr.value;
                    // Try to parse JSON values and booleans
                    if (value.startsWith('[') || value.startsWith('{')) try {
                        value = JSON.parse(value);
                    } catch (e) {
                    // Keep as string if JSON parsing fails
                    }
                    else if (value === 'true') value = true;
                    else if (value === 'false') value = false;
                    // Decode HTML entities for content attribute
                    if (configKey === 'content' && typeof value === 'string') {
                        const textarea = document.createElement('textarea');
                        textarea.innerHTML = value;
                        value = textarea.value;
                    }
                    config[configKey] = value;
                }
            });
            // Special handling for different block types
            switch(blockType){
                case 'paragraph':
                    if (!config.content) config.content = element.innerHTML;
                    break;
                case 'header':
                    if (!config.content) config.content = element.textContent;
                    if (!config.level) config.level = element.tagName.toLowerCase();
                    break;
                case 'image':
                    const img = element.querySelector('img');
                    if (img && !config.src) {
                        config.src = img.src;
                        config.alt = img.alt;
                    }
                    const caption = element.querySelector('figcaption');
                    if (caption && !config.caption) config.caption = caption.textContent;
                    break;
                case 'quote':
                    const quoteContent = element.querySelector('.quote-content');
                    const quoteAttribution = element.querySelector('.quote-attribution');
                    if (quoteContent && !config.content) config.content = quoteContent.textContent;
                    if (quoteAttribution && !config.attribution) config.attribution = quoteAttribution.textContent;
                    break;
                case 'raw':
                    break;
                case 'columns':
                    break;
            }
            blocks.push({
                type: blockType,
                data: config
            });
        });
        return blocks;
    }
    // Static method to get all predefined layouts
    static getAll() {
        return [
            // Test Template
            new $8ebbeef8d21b3552$var$Layout('test-template', 'Test Template', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>', `<div data-block="raw" data-config-show-preview="true" data-config-mode="html" data-config-content="&lt;div style='padding: 2rem; text-align: center;'&gt;&lt;h1 data-tool='Header' data-tool-id='header-1' style='font-size: 2rem; margin-bottom: 1rem; cursor: pointer; border: 2px dashed transparent;' onmouseover='this.style.border=&quot;2px dashed #3b82f6&quot;' onmouseout='this.style.border=&quot;2px dashed transparent&quot;'&gt;Interactive Template&lt;/h1&gt;&lt;img data-tool='Image' data-tool-id='image-1' src='https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&amp;fit=crop' alt='Sample image' style='width: 100%; max-width: 400px; border-radius: 0.5rem; margin: 1rem 0; cursor: pointer; border: 2px dashed transparent;' onmouseover='this.style.border=&quot;2px dashed #3b82f6&quot;' onmouseout='this.style.border=&quot;2px dashed transparent&quot;' /&gt;&lt;p data-tool='Paragraph' data-tool-id='paragraph-1' style='margin: 1rem 0; cursor: pointer; border: 2px dashed transparent; padding: 0.5rem;' onmouseover='this.style.border=&quot;2px dashed #3b82f6&quot;' onmouseout='this.style.border=&quot;2px dashed transparent&quot;'&gt;Click any element to edit its properties. This creates reusable, interactive templates!&lt;/p&gt;&lt;button data-tool='Button' data-tool-id='button-1' style='background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; border: 2px dashed transparent;' onmouseover='this.style.border=&quot;2px dashed #3b82f6&quot;' onmouseout='this.style.border=&quot;2px dashed transparent&quot;'&gt;Edit Me&lt;/button&gt;&lt;/div&gt;">
                </div>`, 'Interactive template with clickable elements that show tool properties'),
            // 1. Modern Hero Section
            new $8ebbeef8d21b3552$var$Layout('modern-hero', 'Modern Hero', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', `<div data-block="raw" data-config-show-preview="true" data-config-mode="html" data-config-content="&lt;div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 5rem 2rem; text-align: center; color: white;'&gt;&lt;h1 style='font-size: 48px; font-weight: bold; color: #ffffff; text-align: center; margin-bottom: 1rem;'&gt;Transform Your Business Today&lt;/h1&gt;&lt;p style='font-size: 20px; color: rgba(255,255,255,0.9); text-align: center; margin-bottom: 2rem;'&gt;Discover the power of innovation with our cutting-edge platform designed to accelerate your growth and streamline your operations.&lt;/p&gt;&lt;button style='background: #3b82f6; color: white; padding: 1rem 2rem; border-radius: 0.5rem; font-size: 18px; font-weight: 600; border: none; cursor: pointer;'&gt;Get Started Free&lt;/button&gt;&lt;/div&gt;">
                </div>`, 'Professional hero section with gradient background, compelling copy, and CTA'),
            // 2. Three Column Feature Grid
            new $8ebbeef8d21b3552$var$Layout('feature-grid', 'Feature Grid', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/></svg>', `<div data-block="columns" data-config-columns='[
                    {
                        "blocks": [
                            {
                                "type": "image",
                                "data": {
                                    "src": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
                                    "alt": "Fast Performance",
                                    "width": "100%",
                                    "alignment": "center"
                                }
                            },
                            {
                                "type": "header",
                                "data": {
                                    "level": "h3",
                                    "content": "Lightning Fast",
                                    "fontSize": "24px",
                                    "alignment": "center",
                                    "fontWeight": "bold"
                                }
                            },
                            {
                                "type": "paragraph",
                                "data": {
                                    "content": "Experience blazing fast performance with our optimized platform built for speed and efficiency.",
                                    "alignment": "center",
                                    "fontSize": "16px",
                                    "textColor": "#64748b"
                                }
                            }
                        ],
                        "width": "1fr",
                        "padding": "2rem",
                        "background": "#ffffff",
                        "borderRadius": "1rem",
                        "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "textAlign": "center"
                    },
                    {
                        "blocks": [
                            {
                                "type": "image",
                                "data": {
                                    "src": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
                                    "alt": "Secure Platform",
                                    "width": "100%",
                                    "alignment": "center"
                                }
                            },
                            {
                                "type": "header",
                                "data": {
                                    "level": "h3",
                                    "content": "Bank-Level Security",
                                    "fontSize": "24px",
                                    "alignment": "center",
                                    "fontWeight": "bold"
                                }
                            },
                            {
                                "type": "paragraph",
                                "data": {
                                    "content": "Your data is protected with enterprise-grade security measures and industry-leading encryption.",
                                    "alignment": "center",
                                    "fontSize": "16px",
                                    "textColor": "#64748b"
                                }
                            }
                        ],
                        "width": "1fr",
                        "padding": "2rem",
                        "background": "#ffffff",
                        "borderRadius": "1rem",
                        "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "textAlign": "center"
                    },
                    {
                        "blocks": [
                            {
                                "type": "image",
                                "data": {
                                    "src": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
                                    "alt": "Team Collaboration",
                                    "width": "100%",
                                    "alignment": "center"
                                }
                            },
                            {
                                "type": "header",
                                "data": {
                                    "level": "h3",
                                    "content": "Team Collaboration",
                                    "fontSize": "24px",
                                    "alignment": "center",
                                    "fontWeight": "bold"
                                }
                            },
                            {
                                "type": "paragraph",
                                "data": {
                                    "content": "Work seamlessly with your team using our collaborative tools and real-time synchronization.",
                                    "alignment": "center",
                                    "fontSize": "16px",
                                    "textColor": "#64748b"
                                }
                            }
                        ],
                        "width": "1fr",
                        "padding": "2rem",
                        "background": "#ffffff",
                        "borderRadius": "1rem",
                        "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "textAlign": "center"
                    }
                ]' data-config-gap="2rem" data-config-responsive="true">
                </div>`, 'Three feature cards with images, headings, and descriptions in a responsive grid'),
            // 3. Two Column Testimonial
            new $8ebbeef8d21b3552$var$Layout('testimonials', 'Testimonials', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', `<div data-block="columns" data-config-columns='[
                    {
                        "blocks": [
                            {
                                "type": "quote",
                                "data": {
                                    "content": "This platform has completely transformed how we work. The tools are intuitive and powerful, making our team more productive than ever.",
                                    "attribution": "Sarah Johnson, CEO at TechCorp",
                                    "style": "modern",
                                    "fontSize": "18px",
                                    "textColor": "#1f2937"
                                }
                            }
                        ],
                        "width": "1fr",
                        "padding": "2.5rem",
                        "background": "#ffffff",
                        "borderRadius": "1.5rem",
                        "boxShadow": "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        "border": "1px solid #e5e7eb"
                    },
                    {
                        "blocks": [
                            {
                                "type": "quote",
                                "data": {
                                    "content": "Incredible user experience and fantastic support team. The onboarding was smooth and we saw results immediately. Highly recommended!",
                                    "attribution": "Mike Chen, Product Designer",
                                    "style": "modern",
                                    "fontSize": "18px",
                                    "textColor": "#1f2937"
                                }
                            }
                        ],
                        "width": "1fr",
                        "padding": "2.5rem",
                        "background": "#ffffff",
                        "borderRadius": "1.5rem",
                        "boxShadow": "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        "border": "1px solid #e5e7eb"
                    }
                ]' data-config-gap="2rem" data-config-responsive="true">
                </div>`, 'Two testimonial cards with quotes and attribution in elegant card design'),
            // 4. Article with Sidebar
            (()=>{
                const articleContent = `<div style='display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; padding: 2rem;'>
                    <div style='padding-right: 2rem;'>
                        <h1 style='font-size: 36px; font-weight: bold; color: #111827; margin-bottom: 1rem;'>Understanding Modern Web Development</h1>
                        <p style='font-size: 18px; color: #374151; line-height: 1.7; margin-bottom: 2rem;'>The landscape of web development has evolved dramatically over the past decade. Modern frameworks and tools have made it possible to create sophisticated applications with improved performance and user experience.</p>
                        <img src='https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop' alt='Modern web development' style='width: 100%; border-radius: 0.5rem; margin-bottom: 1rem;' />
                        <p style='font-size: 14px; color: #6b7280; text-align: center; margin-bottom: 2rem;'>Modern development tools and practices</p>
                        <p style='font-size: 18px; color: #374151; line-height: 1.7;'>Today's developers have access to an unprecedented array of tools and frameworks that streamline the development process and enable rapid prototyping and deployment.</p>
                    </div>
                    <div style='padding: 2rem; background: #f9fafb; border-radius: 1rem; border: 1px solid #e5e7eb; height: fit-content;'>
                        <h3 style='font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 1rem;'>Related Topics</h3>
                        <ul style='list-style-type: disc; padding-left: 1.5rem; margin-bottom: 2rem;'>
                            <li style='margin-bottom: 0.5rem;'>JavaScript Frameworks</li>
                            <li style='margin-bottom: 0.5rem;'>CSS Preprocessors</li>
                            <li style='margin-bottom: 0.5rem;'>Build Tools</li>
                            <li style='margin-bottom: 0.5rem;'>Testing Strategies</li>
                            <li style='margin-bottom: 0.5rem;'>Deployment Automation</li>
                        </ul>
                        <h3 style='font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 1rem;'>Quick Links</h3>
                        <button style='background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: 600;'>Learn More</button>
                    </div>
                </div>`;
                return new $8ebbeef8d21b3552$var$Layout('article-sidebar', 'Article + Sidebar', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10"/><path d="M7 11h10"/><path d="M7 15h6"/></svg>', `<div data-block="raw" data-config-show-preview="true" data-config-mode="html" data-config-content="${$8ebbeef8d21b3552$var$Layout.htmlEncode(articleContent)}">
                    </div>`, 'Article layout with main content area and styled sidebar with links');
            })(),
            // 5. Premium Pricing Table
            (()=>{
                const pricingContent = `<div style='padding: 4rem 2rem; background: linear-gradient(to bottom, #f8fafc, #ffffff);'>
                    <div style='text-align: center; margin-bottom: 3rem;'>
                        <h2 style='font-size: 36px; font-weight: bold; color: #111827; margin-bottom: 1rem;'>Choose the right plan for you</h2>
                        <p style='font-size: 20px; color: #6b7280;'>Start building for free, then add a site plan to go live. Account plans unlock additional features.</p>
                    </div>
                    <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; align-items: stretch;'>
                        <div style='position: relative; padding: 2rem; background: #ffffff; border-radius: 1rem; border: 1px solid #e5e7eb; height: 100%; display: flex; flex-direction: column;'>
                            <h3 style='font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 0.5rem;'>Starter</h3>
                            <p style='font-size: 16px; color: #6b7280; margin-bottom: 2rem;'>Perfect for side projects and experimentation.</p>
                            <div style='display: flex; align-items: baseline; margin-bottom: 2rem;'>
                                <span style='font-size: 48px; font-weight: 800; color: #111827;'>$9</span>
                                <span style='font-size: 16px; color: #6b7280; margin-left: 0.25rem;'>/month</span>
                            </div>
                            <a href='#' style='display: inline-block; background: #f3f4f6; color: #374151; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; text-align: center; margin-bottom: 2rem; transition: all 0.2s;'>Get started</a>
                        </div>
                        <div style='position: relative; padding: 2rem; background: #ffffff; border-radius: 1rem; border: 2px solid #3b82f6; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); height: 100%; display: flex; flex-direction: column; transform: scale(1.05);'>
                            <div style='position: absolute; top: -1rem; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 0.5rem 1.5rem; border-radius: 9999px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);'>Most popular</div>
                            <h3 style='font-size: 20px; font-weight: 600; color: #111827; margin: 1rem 0 0.5rem 0;'>Pro</h3>
                            <p style='font-size: 16px; color: #6b7280; margin-bottom: 2rem;'>A plan that scales with your rapidly growing business.</p>
                            <div style='display: flex; align-items: baseline; margin-bottom: 2rem;'>
                                <span style='font-size: 48px; font-weight: 800; color: #111827;'>$29</span>
                                <span style='font-size: 16px; color: #6b7280; margin-left: 0.25rem;'>/month</span>
                            </div>
                            <a href='#' style='display: inline-block; background: #3b82f6; color: white; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; text-align: center; margin-bottom: 2rem; transition: all 0.2s;'>Get started</a>
                        </div>
                        <div style='position: relative; padding: 2rem; background: #ffffff; border-radius: 1rem; border: 1px solid #e5e7eb; height: 100%; display: flex; flex-direction: column;'>
                            <h3 style='font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 0.5rem;'>Enterprise</h3>
                            <p style='font-size: 16px; color: #6b7280; margin-bottom: 2rem;'>Dedicated support and infrastructure for your company.</p>
                            <div style='display: flex; align-items: baseline; margin-bottom: 2rem;'>
                                <span style='font-size: 48px; font-weight: 800; color: #111827;'>$99</span>
                                <span style='font-size: 16px; color: #6b7280; margin-left: 0.25rem;'>/month</span>
                            </div>
                            <a href='#' style='display: inline-block; background: #f3f4f6; color: #374151; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; text-align: center; margin-bottom: 2rem; transition: all 0.2s;'>Contact sales</a>
                        </div>
                    </div>
                </div>`;
                return new $8ebbeef8d21b3552$var$Layout('pricing-table', 'Premium Pricing', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="6" height="14" rx="1"/><rect x="9" y="3" width="6" height="18" rx="1"/><rect x="15" y="7" width="6" height="10" rx="1"/></svg>', `<div data-block="raw" data-config-show-preview="true" data-config-mode="html" data-config-content="${$8ebbeef8d21b3552$var$Layout.htmlEncode(pricingContent)}">
                    </div>`, 'Professional three-tier pricing table with TailwindUI-inspired design as a single cohesive block');
            })(),
            // 6. CTA Section
            new $8ebbeef8d21b3552$var$Layout('cta-section', 'Call to Action', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>', `<div data-block="raw" data-config-show-preview="true" data-config-mode="html" data-config-content="&lt;div style='background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 4rem 2rem; border-radius: 2rem; text-align: center; color: white;'&gt;&lt;h2 style='font-size: 42px; font-weight: bold; color: #ffffff; text-align: center; margin-bottom: 1rem;'&gt;Ready to Get Started?&lt;/h2&gt;&lt;p style='font-size: 20px; color: rgba(255,255,255,0.8); text-align: center; margin-bottom: 2rem;'&gt;Join over 10,000 companies that have accelerated their growth with our platform. Start your free trial today.&lt;/p&gt;&lt;button style='background: #3b82f6; color: white; padding: 1rem 2rem; border-radius: 0.5rem; font-size: 18px; font-weight: 600; border: none; cursor: pointer; margin-bottom: 2rem;'&gt;Start Free Trial&lt;/button&gt;&lt;p style='margin-top: 2rem; font-size: 14px; color: rgba(255,255,255,0.6);'&gt;No credit card required \u{2022} 14-day free trial \u{2022} Cancel anytime&lt;/p&gt;&lt;/div&gt;">
                </div>`, 'High-converting call-to-action section with trust indicators')
        ];
    }
}
var $8ebbeef8d21b3552$export$2e2bcd8739ae039 = $8ebbeef8d21b3552$var$Layout;



class $294ef9f20b3a5b48$var$LayoutManager {
    constructor(editor){
        this.editor = editor;
        this.layouts = (0, $8ebbeef8d21b3552$export$2e2bcd8739ae039).getAll();
    }
    // Get all available layouts
    getLayouts() {
        return this.layouts;
    }
    // Add a layout to the editor
    async addLayout(layoutId, insertIndex = null) {
        const layout = this.layouts.find((l)=>l.id === layoutId);
        if (!layout) {
            console.error(`Layout with id ${layoutId} not found`);
            return false;
        }
        try {
            // Extract blocks from the layout
            const blocks = layout.extractBlocks();
            // Convert blocks to Editor.js format and add them
            for(let i = 0; i < blocks.length; i++){
                const block = blocks[i];
                const targetIndex = insertIndex !== null ? insertIndex + i : undefined;
                await this.editor.blocks.insert(block.type, block.data, {}, targetIndex, true);
            }
            // Dispatch event to notify that layout was added
            document.dispatchEvent(new CustomEvent('layout-added', {
                detail: {
                    layoutId: layoutId,
                    blocksCount: blocks.length
                }
            }));
            return true;
        } catch (error) {
            console.error('Error adding layout:', error);
            return false;
        }
    }
    // Create a custom layout from current editor content
    createCustomLayout(name, description = '') {
        try {
            const blocks = this.editor.save().then((outputData)=>{
                if (!outputData.blocks || outputData.blocks.length === 0) {
                    console.warn('No blocks found to create layout');
                    return null;
                }
                // Convert blocks to HTML representation
                let html = '<div class="custom-layout">';
                outputData.blocks.forEach((block)=>{
                    html += this.blockToHtml(block);
                });
                html += '</div>';
                // Create new layout
                const customLayout = new (0, $8ebbeef8d21b3552$export$2e2bcd8739ae039)(`custom-${Date.now()}`, name, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>', html, description);
                // Add to layouts list
                this.layouts.push(customLayout);
                return customLayout;
            });
            return blocks;
        } catch (error) {
            console.error('Error creating custom layout:', error);
            return null;
        }
    }
    // Convert a block to HTML representation
    blockToHtml(block) {
        const { type: type, data: data } = block;
        let html = '';
        switch(type){
            case 'paragraph':
                html = `<p data-block="paragraph"`;
                if (data.fontSize) html += ` data-config-fontSize="${data.fontSize}"`;
                if (data.textColor) html += ` data-config-textColor="${data.textColor}"`;
                if (data.alignment) html += ` data-config-alignment="${data.alignment}"`;
                html += `>${data.content || ''}</p>`;
                break;
            case 'header':
                const level = data.level || 'h2';
                html = `<${level} data-block="header" data-config-level="${level}"`;
                if (data.fontSize) html += ` data-config-fontSize="${data.fontSize}"`;
                if (data.textColor) html += ` data-config-textColor="${data.textColor}"`;
                if (data.alignment) html += ` data-config-alignment="${data.alignment}"`;
                if (data.anchor) html += ` data-config-anchor="${data.anchor}"`;
                html += `>${data.content || ''}</${level}>`;
                break;
            case 'image':
                html = `<figure data-block="image"`;
                if (data.alignment) html += ` data-config-alignment="${data.alignment}"`;
                if (data.width) html += ` data-config-width="${data.width}"`;
                html += `>`;
                html += `<img src="${data.src || ''}" alt="${data.alt || ''}" />`;
                if (data.caption) html += `<figcaption>${data.caption}</figcaption>`;
                html += `</figure>`;
                break;
            case 'quote':
                html = `<blockquote data-block="quote"`;
                if (data.style) html += ` data-config-style="${data.style}"`;
                if (data.alignment) html += ` data-config-alignment="${data.alignment}"`;
                html += `>`;
                html += `<div class="quote-content">${data.content || ''}</div>`;
                if (data.attribution) html += `<cite class="quote-attribution">${data.attribution}</cite>`;
                html += `</blockquote>`;
                break;
            case 'list':
                const listType = data.style === 'ordered' ? 'ol' : 'ul';
                html = `<${listType} data-block="list" data-config-style="${data.style || 'unordered'}"`;
                if (data.items && Array.isArray(data.items)) html += ` data-config-items='${JSON.stringify(data.items)}'`;
                html += `>`;
                if (data.items && Array.isArray(data.items)) data.items.forEach((item)=>{
                    html += `<li>${item}</li>`;
                });
                html += `</${listType}>`;
                break;
            case 'button':
                html = `<div data-block="button"`;
                if (data.text) html += ` data-config-text="${data.text}"`;
                if (data.style) html += ` data-config-style="${data.style}"`;
                if (data.size) html += ` data-config-size="${data.size}"`;
                if (data.alignment) html += ` data-config-alignment="${data.alignment}"`;
                if (data.url) html += ` data-config-url="${data.url}"`;
                html += `></div>`;
                break;
            default:
                html = `<div data-block="${type}">${JSON.stringify(data)}</div>`;
        }
        return html;
    }
    // Remove a custom layout
    removeLayout(layoutId) {
        const index = this.layouts.findIndex((l)=>l.id === layoutId);
        if (index > -1 && this.layouts[index].id.startsWith('custom-')) {
            this.layouts.splice(index, 1);
            return true;
        }
        return false;
    }
}
var $294ef9f20b3a5b48$export$2e2bcd8739ae039 = $294ef9f20b3a5b48$var$LayoutManager;


/**
 * Base class for all AlpineBlocks tools
 * Provides common functionality for block rendering and interaction
 */ class $3e6ce1da8d004c46$export$2e2bcd8739ae039 {
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
   * @param {Set} [seen] - Set of already seen objects to prevent circular references
   * @returns {Object} Clean configuration
   */ serializeConfig(config, seen = new Set()) {
        if (!config || typeof config !== 'object') return config;
        // Check for circular reference
        if (seen.has(config)) return '[Circular Reference]';
        seen.add(config);
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
                            config: this.serializeConfig(item.config, seen)
                        };
                    }
                    return this.serializeConfig(item, seen);
                }
                return item;
            });
            else if (value && typeof value === 'object') serialized[key] = this.serializeConfig(value, seen);
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
   * Render method for displaying the tool output
   * Override in subclasses to provide specific rendering
   * @returns {string} HTML string for output rendering
   */ render() {
        return '';
    }
    /**
   * Editor render method for displaying the tool in edit mode
   * By default, calls render() method
   * Override in subclasses if different rendering is needed for editor
   * @returns {string} HTML string for editor rendering
   */ editorRender() {
        return this.render();
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
 */ class $80c6fdb5c294ffa6$var$Paragraph extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
    /**
   * Render the paragraph as a template element with data attributes
   * @param {string} toolId - The tool ID for data attributes
   * @returns {string} HTML string with data attributes
   */ renderTemplateElement(toolId) {
        const styleString = this.getStyleString();
        return `<p 
            data-tool="Paragraph" 
            data-tool-id="${toolId}"
            style="${styleString}; cursor: pointer;"
        >${this.config.content}</p>`;
    }
}
var $80c6fdb5c294ffa6$export$2e2bcd8739ae039 = $80c6fdb5c294ffa6$var$Paragraph;



class $de5191df6222c084$var$Header extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
                    value="${this.config.anchor}"
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
                    value="${this.config.textColor}">`
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
    /**
   * Render the header as a template element with data attributes
   * @param {string} toolId - The tool ID for data attributes
   * @returns {string} HTML string with data attributes
   */ renderTemplateElement(toolId) {
        const styleString = this.getStyleString();
        const anchorId = this.config.anchor ? `id="${this.config.anchor}"` : '';
        return `<${this.config.level} 
            data-tool="Header" 
            data-tool-id="${toolId}"
            ${anchorId}
            style="${styleString}; cursor: pointer;"
        >${this.config.content}</${this.config.level}>`;
    }
}
var $de5191df6222c084$export$2e2bcd8739ae039 = $de5191df6222c084$var$Header;



class $db7363abc9a57c89$var$List extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
var $db7363abc9a57c89$export$2e2bcd8739ae039 = $db7363abc9a57c89$var$List;



class $f832c373f6c04470$var$Code extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
var $f832c373f6c04470$export$2e2bcd8739ae039 = $f832c373f6c04470$var$Code;


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
class $27011ebc47b257c8$var$Image extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
    /**
   * Render the image as a template element with data attributes
   * @param {string} toolId - The tool ID for data attributes
   * @returns {string} HTML string with data attributes
   */ renderTemplateElement(toolId) {
        return `<img 
            data-tool="Image" 
            data-tool-id="${toolId}"
            src="${this.config.src}" 
            alt="${this.config.alt}"
            style="width: ${this.config.width}; cursor: pointer;"
            ${this.config.caption ? `data-caption="${this.config.caption}"` : ''}
        />`;
    }
}
var $27011ebc47b257c8$export$2e2bcd8739ae039 = $27011ebc47b257c8$var$Image;


/*class: Quote,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+O',
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author',
      },*/ 
class $3c596c9f1e11bbb7$var$Quote extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
                    value="${this.config.textColor}">`
            },
            {
                name: 'backgroundColor',
                label: 'Background Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'backgroundColor', $event.target.value)"
                    value="${this.config.backgroundColor === 'transparent' ? '#ffffff' : this.config.backgroundColor}">`
            },
            {
                name: 'borderColor',
                label: 'Border Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'borderColor', $event.target.value)"
                    value="${this.config.borderColor}"
                    ${this.config.borderStyle === 'none' ? 'style="display:none"' : ''}>`
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
var $3c596c9f1e11bbb7$export$2e2bcd8739ae039 = $3c596c9f1e11bbb7$var$Quote;



class $56ed62fe01aa8034$var$WYSIWYG extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
var $56ed62fe01aa8034$export$2e2bcd8739ae039 = $56ed62fe01aa8034$var$WYSIWYG;


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
class $c6b5f9fc4fa47998$var$Alert extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
var $c6b5f9fc4fa47998$export$2e2bcd8739ae039 = $c6b5f9fc4fa47998$var$Alert;



class $4399172a73dade70$var$VideoPlayer extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
                    value="${this.config.url}"
                    placeholder="Enter video URL">`
            },
            {
                name: 'type',
                label: 'Video Type',
                html: `<select @change="trigger('${this.id}', 'type', $event.target.value)" value="${this.config.type}">
                    <option value="youtube" ${this.config.type === 'youtube' ? 'selected' : ''}>YouTube</option>
                    <option value="vimeo" ${this.config.type === 'vimeo' ? 'selected' : ''}>Vimeo</option>
                    <option value="direct" ${this.config.type === 'direct' ? 'selected' : ''}>Direct URL</option>
                </select>`
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
                name: 'muted',
                label: 'Muted',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'muted', $event.target.checked)"
                        ${this.config.muted ? 'checked' : ''}>
                    Muted
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
                name: 'aspectRatio',
                label: 'Aspect Ratio',
                html: `<select @change="trigger('${this.id}', 'aspectRatio', $event.target.value)" value="${this.config.aspectRatio}">
                    <option value="16:9" ${this.config.aspectRatio === '16:9' ? 'selected' : ''}>16:9 (Widescreen)</option>
                    <option value="4:3" ${this.config.aspectRatio === '4:3' ? 'selected' : ''}>4:3 (Standard)</option>
                    <option value="1:1" ${this.config.aspectRatio === '1:1' ? 'selected' : ''}>1:1 (Square)</option>
                </select>`
            },
            {
                name: 'caption',
                label: 'Caption',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'caption', $event.target.value)"
                    value="${this.config.caption}"
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
            ${this.config.caption || this.config.caption === '' ? `
                <figcaption 
                    contenteditable="true"
                    @blur="updateCaption($event.target.innerHTML)"
                    placeholder="Enter video caption..."
                    style="${this.config.caption ? '' : 'color: #999; font-style: italic;'}">${this.config.caption || 'Enter video caption...'}</figcaption>
            ` : ''}
        </figure>
        
        <script>
            if (typeof window.updateVideoCaption === 'undefined') {
                window.updateVideoCaption = function(blockId, caption) {
                    // Find the editor instance and update the block
                    for (const editorId in window.alpineEditors) {
                        const editor = window.alpineEditors[editorId];
                        if (editor && editor.blocks) {
                            const block = editor.blocks.find(b => b.id === blockId);
                            if (block) {
                                block.config.caption = caption;
                                block.triggerRedraw();
                                break;
                            }
                        }
                    }
                };
                
                window.updateCaption = function(caption) {
                    // This will be bound to the specific block context
                    window.updateVideoCaption('${this.id}', caption);
                };
            }
        </script>`;
    }
    render() {
        return `<figure class="video-block">
            ${this.getVideoEmbed()}
            ${this.config.caption ? `<figcaption>${this.config.caption}</figcaption>` : ''}
        </figure>`;
    }
}
var $4399172a73dade70$export$2e2bcd8739ae039 = $4399172a73dade70$var$VideoPlayer;



class $6ddc38c087d52cba$var$AudioPlayer extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
var $6ddc38c087d52cba$export$2e2bcd8739ae039 = $6ddc38c087d52cba$var$AudioPlayer;



// Define global Alpine.js functions for carousel functionality
if (typeof window !== 'undefined') {
    window.carouselEditor = function() {
        return {
            currentSlide: 0,
            slides: [],
            autoplayInterval: null,
            init (slidesData, autoplay, interval) {
                this.slides = slidesData || [];
                if (autoplay && this.slides.length > 1) this.startAutoplay(interval);
            },
            initFromData () {
                const slidesData = JSON.parse(this.$el.getAttribute('data-slides') || '[]');
                const autoplay = this.$el.getAttribute('data-autoplay') === 'true';
                const interval = parseInt(this.$el.getAttribute('data-interval') || '5000');
                this.init(slidesData, autoplay, interval);
            },
            startAutoplay (interval = 5000) {
                if (this.autoplayInterval) clearInterval(this.autoplayInterval);
                this.autoplayInterval = setInterval(()=>{
                    this.nextSlide();
                }, interval);
            },
            stopAutoplay () {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                    this.autoplayInterval = null;
                }
            },
            nextSlide () {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            },
            prevSlide () {
                this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            },
            goToSlide (index) {
                this.currentSlide = index;
            },
            updateSlideImage (index, value) {
                if (this.slides[index]) {
                    this.slides[index] = {
                        ...this.slides[index],
                        image: value
                    };
                    this.$dispatch('slide-updated', {
                        slides: this.slides
                    });
                }
            },
            updateSlideCaption (index, value) {
                if (this.slides[index]) {
                    this.slides[index] = {
                        ...this.slides[index],
                        caption: value
                    };
                    this.$dispatch('slide-updated', {
                        slides: this.slides
                    });
                }
            },
            addSlide () {
                this.slides.push({
                    image: '',
                    caption: ''
                });
                this.$dispatch('slide-updated', {
                    slides: this.slides
                });
            },
            removeSlide () {
                if (this.slides.length > 1) {
                    this.slides.splice(this.currentSlide, 1);
                    this.currentSlide = Math.min(this.currentSlide, this.slides.length - 1);
                    this.$dispatch('slide-updated', {
                        slides: this.slides
                    });
                }
            }
        };
    };
    window.carouselViewer = function() {
        return {
            currentSlide: 0,
            slidesCount: 0,
            autoplayInterval: null,
            init (count, autoplay, interval) {
                this.slidesCount = count;
                if (autoplay && count > 1) this.startAutoplay(interval);
            },
            initFromData () {
                const count = parseInt(this.$el.getAttribute('data-slides-count') || '0');
                const autoplay = this.$el.getAttribute('data-autoplay') === 'true';
                const interval = parseInt(this.$el.getAttribute('data-interval') || '5000');
                this.init(count, autoplay, interval);
            },
            startAutoplay (interval = 5000) {
                if (this.autoplayInterval) clearInterval(this.autoplayInterval);
                this.autoplayInterval = setInterval(()=>{
                    this.nextSlide();
                }, interval);
            },
            stopAutoplay () {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                    this.autoplayInterval = null;
                }
            },
            nextSlide () {
                this.currentSlide = (this.currentSlide + 1) % this.slidesCount;
            },
            prevSlide () {
                this.currentSlide = (this.currentSlide - 1 + this.slidesCount) % this.slidesCount;
            },
            goToSlide (index) {
                this.currentSlide = index;
            }
        };
    };
}
class $06ccccc81b3eddf4$var$Carousel extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
                        ${this.config.autoplay ? 'checked' : ''}>
                    Autoplay
                </label>`
            },
            {
                name: 'interval',
                label: 'Interval (ms)',
                html: `<input type="number" 
                    @change="trigger('${this.id}', 'interval', $event.target.value)"
                    value="${this.config.interval}"
                    min="1000"
                    step="500">`
            },
            {
                name: 'showArrows',
                label: 'Show Arrows',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showArrows', $event.target.checked)"
                        ${this.config.showArrows ? 'checked' : ''}>
                    Show Arrows
                </label>`
            },
            {
                name: 'showDots',
                label: 'Show Dots',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showDots', $event.target.checked)"
                        ${this.config.showDots ? 'checked' : ''}>
                    Show Dots
                </label>`
            },
            {
                name: 'showCaptions',
                label: 'Show Captions',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showCaptions', $event.target.checked)"
                        ${this.config.showCaptions ? 'checked' : ''}>
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
                <div class="image-input" ${!slide.image ? '' : 'style="display: none;"'}>
                    <input type="text" 
                        placeholder="Enter image URL"
                        value="${slide.image || ''}"
                        @change="updateSlideImage(${index}, $event.target.value)">
                </div>`;
            const image = slide.image ? `
                <img src="${slide.image}" alt="Slide ${index + 1}">
            ` : '';
            const caption = this.config.showCaptions ? `
                <div class="carousel-caption"
                    contenteditable="true"
                    @blur="updateSlideCaption(${index}, $event.target.innerHTML)">${slide.caption || ''}</div>
            ` : '';
            return `
                <div class="carousel-slide" x-show="currentSlide === ${index}">
                    ${imageInput}
                    ${image}
                    ${caption}
                </div>`;
        }).join('');
        const arrows = this.config.showArrows ? `
            <button class="carousel-prev" @click="prevSlide()">
                \u{2190}
            </button>
            <button class="carousel-next" @click="nextSlide()">
                \u{2192}
            </button>
        ` : '';
        const dots = this.config.showDots ? `
            <div class="carousel-dots">
                ${this.config.slides.map((_, index)=>`
                    <button class="carousel-dot"
                        :class="{ active: currentSlide === ${index} }"
                        @click="goToSlide(${index})"></button>
                `).join('')}
            </div>
        ` : '';
        // Store slides data in a data attribute instead of passing as parameter
        const slideDataAttr = JSON.stringify(this.config.slides).replace(/"/g, '&quot;');
        return `
            <div class="carousel-block" 
                 x-data="carouselEditor()" 
                 data-slides='${slideDataAttr}'
                 data-autoplay="${this.config.autoplay}"
                 data-interval="${this.config.interval}"
                 x-init="initFromData()"
                 ${this.config.autoplay ? '@mouseenter="stopAutoplay()" @mouseleave="startAutoplay(' + this.config.interval + ')"' : ''}>
                
                <div class="carousel-container">
                    ${slides}
                    ${arrows}
                </div>
                
                ${dots}
                
                <div class="carousel-controls">
                    <button @click="addSlide()" class="btn btn-primary">
                        Add Slide
                    </button>
                    <button x-show="slides.length > 1" 
                            @click="removeSlide()" 
                            class="btn btn-secondary">
                        Remove Current Slide
                    </button>
                </div>
            </div>`;
    }
    render() {
        const slides = this.config.slides.filter((slide)=>slide.image) // Only show slides with images
        .map((slide, index)=>`
                <div class="carousel-slide">
                    <img src="${slide.image}" alt="Slide ${index + 1}" loading="lazy">
                    ${this.config.showCaptions && slide.caption ? `
                        <div class="carousel-caption">${slide.caption}</div>
                    ` : ''}
                </div>
            `).join('');
        const arrows = this.config.showArrows ? `
            <button class="carousel-prev" 
                    @click="prevSlide()" 
                    aria-label="Previous slide">\u{2190}</button>
            <button class="carousel-next" 
                    @click="nextSlide()" 
                    aria-label="Next slide">\u{2192}</button>
        ` : '';
        const dots = this.config.showDots ? `
            <div class="carousel-dots" role="tablist">
                ${this.config.slides.filter((slide)=>slide.image).map((_, index)=>`
                        <button class="carousel-dot" 
                                :class="{ active: currentSlide === ${index} }"
                                @click="goToSlide(${index})"
                                role="tab" 
                                aria-label="Go to slide ${index + 1}"></button>
                    `).join('')}
            </div>
        ` : '';
        const validSlides = this.config.slides.filter((slide)=>slide.image);
        const slidesCount = validSlides.length;
        if (slidesCount === 0) return `<div class="carousel-block carousel-empty">
                <p>No images added to carousel</p>
            </div>`;
        return `
            <div class="carousel-block" 
                 x-data="carouselViewer()" 
                 data-slides-count="${slidesCount}"
                 data-autoplay="${this.config.autoplay}"
                 data-interval="${this.config.interval}"
                 x-init="initFromData()"
                 ${this.config.autoplay ? '@mouseenter="stopAutoplay()" @mouseleave="startAutoplay(' + this.config.interval + ')"' : ''}
                 role="region" 
                 aria-label="Image carousel">
                
                <div class="carousel-container">
                    ${slides}
                    ${arrows}
                </div>
                
                ${dots}
            </div>`;
    }
}
var $06ccccc81b3eddf4$export$2e2bcd8739ae039 = $06ccccc81b3eddf4$var$Carousel;




/**
 * Columns tool for creating multi-column layouts with nested blocks
 */ class $02817afdb34def6d$var$Columns extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
            (0, $7294c730f5636c35$export$153e5dc2c098b35c).error(`Failed to create nested block of type ${toolClass}`);
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
            (0, $7294c730f5636c35$export$153e5dc2c098b35c).error(`Tool class ${block.class} not found in editor registry`);
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
        (0, $7294c730f5636c35$export$153e5dc2c098b35c).error(`Nested block ${blockId} not found for update`);
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
var $02817afdb34def6d$export$2e2bcd8739ae039 = $02817afdb34def6d$var$Columns;



// Alpine.js component for Raw code editor
function $dbf99af480fb2d13$var$rawCodeEditor() {
    return {
        showPreview: true,
        block: null,
        isValid: true,
        previewContent: '',
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
                // Set initial preview mode based on block config, defaulting to true
                this.showPreview = this.block.config.showPreview !== false;
                this.previewContent = this.block.config.content || '';
                this.isValid = this.validateCode(this.block.config.content);
            }
        },
        handleInput (event) {
        // Do nothing - just let the input happen
        },
        validateCode (content) {
            if (!content) return true;
            if (!this.block) return true;
            switch(this.block.config.mode){
                case 'html':
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
        initializePreviewContainer (element, block) {
            if (!element || !block) return;
            // Set the HTML content
            element.innerHTML = block.config.content || '';
            // Set up template element click handlers
            const templateElements = element.querySelectorAll('[data-tool]');
            // Find the editor instance
            let editor = null;
            if (window.alpineEditors) for(const editorId in window.alpineEditors){
                editor = window.alpineEditors[editorId];
                if (editor) break;
            }
            // Set up drag and drop functionality
            this.setupDragAndDrop(element, block, editor);
            templateElements.forEach((el)=>{
                const toolType = el.getAttribute('data-tool');
                const toolId = el.getAttribute('data-tool-id');
                if (toolType && toolId) {
                    if (editor && typeof editor.attachTemplateClickHandler === 'function') // Use the editor's method to attach the handler
                    editor.attachTemplateClickHandler(el, toolType, toolId);
                }
            });
        },
        setupDragAndDrop (element, block, editor) {
            if (!editor) return;
            // Make the preview container a drop target
            element.addEventListener('dragover', (e)=>{
                e.preventDefault();
                e.stopPropagation();
                // Show drop cursor
                this.showDropCursor(element, e);
            });
            element.addEventListener('dragleave', (e)=>{
                e.preventDefault();
                e.stopPropagation();
                // Only hide cursor if we're leaving the container entirely
                if (!element.contains(e.relatedTarget)) this.hideDropCursor(element);
            });
            element.addEventListener('drop', (e)=>{
                e.preventDefault();
                e.stopPropagation();
                // Hide drop cursor
                this.hideDropCursor(element);
                // Get the dropped tool data
                const toolName = e.dataTransfer.getData('text/plain');
                if (toolName && editor.toolConfig && editor.toolConfig[toolName]) this.insertToolAtCursor(element, block, toolName, e, editor);
            });
        },
        showDropCursor (element, e) {
            // Remove existing cursor
            this.hideDropCursor(element);
            // Find the insertion point
            const insertionPoint = this.getInsertionPoint(element, e);
            // Create cursor element
            const cursor = document.createElement('div');
            cursor.id = 'raw-drop-cursor';
            cursor.style.cssText = `
                position: absolute;
                height: 2px;
                background: #3b82f6;
                border-radius: 1px;
                z-index: 1000;
                pointer-events: none;
                box-shadow: 0 0 4px rgba(59, 130, 246, 0.5);
                transition: all 0.1s ease;
            `;
            // Position the cursor
            if (insertionPoint.type === 'between') {
                // Position between elements
                const rect = insertionPoint.element.getBoundingClientRect();
                const containerRect = element.getBoundingClientRect();
                cursor.style.left = '10px';
                cursor.style.right = '10px';
                cursor.style.top = `${rect.top - containerRect.top + (insertionPoint.position === 'before' ? -2 : rect.height)}px`;
            } else {
                // Position at the end
                cursor.style.left = '10px';
                cursor.style.right = '10px';
                cursor.style.bottom = '10px';
            }
            element.appendChild(cursor);
        },
        hideDropCursor (element) {
            const cursor = element.querySelector('#raw-drop-cursor');
            if (cursor) cursor.remove();
        },
        getInsertionPoint (element, e) {
            const children = Array.from(element.children).filter((child)=>child.id !== 'raw-drop-cursor');
            if (children.length === 0) return {
                type: 'end'
            };
            const mouseY = e.clientY;
            for(let i = 0; i < children.length; i++){
                const child = children[i];
                const rect = child.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                if (mouseY < midY) return {
                    type: 'between',
                    element: child,
                    position: 'before',
                    index: i
                };
            }
            return {
                type: 'between',
                element: children[children.length - 1],
                position: 'after',
                index: children.length
            };
        },
        insertToolAtCursor (element, block, toolName, e, editor) {
            // Get the tool configuration
            const toolConfig = editor.toolConfig[toolName];
            if (!toolConfig || !toolConfig.class) return;
            // Create a new tool instance
            const ToolClass = toolConfig.class;
            const toolId = `${toolName.toLowerCase()}-${Date.now()}`;
            const tool = new ToolClass({
                id: toolId,
                updateFunction: (property, value)=>{
                // Tool update callback
                },
                config: {
                    ...toolConfig.config
                }
            });
            // Generate the HTML for the tool
            let toolHtml = '';
            if (typeof tool.renderTemplateElement === 'function') toolHtml = tool.renderTemplateElement(toolId);
            else {
                // Fallback to regular render method
                toolHtml = tool.render();
                // Add data attributes manually
                toolHtml = toolHtml.replace(/^<(\w+)/, `<$1 data-tool="${toolName}" data-tool-id="${toolId}"`);
            }
            // Find insertion point
            const insertionPoint = this.getInsertionPoint(element, e);
            // Insert the HTML
            if (insertionPoint.type === 'end') element.insertAdjacentHTML('beforeend', toolHtml);
            else {
                const position = insertionPoint.position === 'before' ? 'beforebegin' : 'afterend';
                insertionPoint.element.insertAdjacentHTML(position, toolHtml);
            }
            // Update the Raw block content
            block.config.content = element.innerHTML;
            // Re-initialize template elements
            const newTemplateElements = element.querySelectorAll('[data-tool]');
            newTemplateElements.forEach((el)=>{
                const elToolType = el.getAttribute('data-tool');
                const elToolId = el.getAttribute('data-tool-id');
                if (elToolType && elToolId && !el.hasAttribute('data-click-handler')) {
                    el.setAttribute('data-click-handler', 'true');
                    if (editor && typeof editor.attachTemplateClickHandler === 'function') editor.attachTemplateClickHandler(el, elToolType, elToolId);
                }
            });
        }
    };
}
// Make it globally available for Alpine (only if not already defined)
if (typeof window !== 'undefined' && !window.rawCodeEditor) window.rawCodeEditor = $dbf99af480fb2d13$var$rawCodeEditor;
class $dbf99af480fb2d13$var$Raw extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            content: config.content || '',
            mode: config.mode || 'html',
            // html, css, javascript
            showPreview: config.showPreview !== undefined ? config.showPreview : true
        };
        this.settings = [
            {
                name: 'mode',
                label: 'Code Type',
                html: `<select @change="trigger('${this.id}', 'mode', $event.target.value)" value="${this.config.mode}">
                    <option value="html" ${this.config.mode === 'html' ? 'selected' : ''}>HTML</option>
                    <option value="css" ${this.config.mode === 'css' ? 'selected' : ''}>CSS</option>
                    <option value="javascript" ${this.config.mode === 'javascript' ? 'selected' : ''}>JavaScript</option>
                </select>`
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
                // Always scope CSS to prevent conflicts
                return `<style data-block-id="${this.id}">
                    .raw-block[data-block-id="${this.id}"] {
                        ${this.config.content}
                    }
                </style>`;
            case 'javascript':
                // Never execute JavaScript in render mode for security
                return `<pre><code>${this.escapeHtml(this.config.content)}</code></pre>`;
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
                    x-init="$el.value = block ? block.config.content : '';"
                    @input="handleInput($event)"
                    @blur="if(block) { block.config.content = $event.target.value; }"
                    placeholder="Enter your code here..."
                    :placeholder="block ? 'Enter your ' + block.config.mode + ' code here...' : 'Enter your code here...'"
                    spellcheck="false"
                    autocomplete="off"
                    style="width: 100%; min-height: 200px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; resize: vertical;">${this.config.content}</textarea>
                <div 
                    x-show="showPreview" 
                    class="preview-content" 
                    style="min-height: 200px; border: 1px solid var(--gray-300); border-radius: var(--radius-md); padding: var(--space-4); background: white;">
                    
                    <div x-ref="previewContainer"
                         contenteditable="true"
                         x-init="initializePreviewContainer($el, block)"
                         style="outline: none; cursor: text; min-height: 180px; border: 1px dashed #ccc; padding: 10px;">
                    </div>
                </div>
            </div>
        </div>`;
    }
    render() {
        return `<div class="raw-block" data-block-id="${this.id}">
            ${this.processContent()}
        </div>`;
    }
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m)=>map[m]);
    }
}
var $dbf99af480fb2d13$export$2e2bcd8739ae039 = $dbf99af480fb2d13$var$Raw;



class $e5fc3b2383ff720a$var$Delimiter extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
    constructor({ id: id, updateFunction: updateFunction, config: config }){
        super(id, updateFunction, config);
        this.config = {
            style: this.config.style || 'line',
            // line, dots, asterisks
            color: this.config.color || '#E8E8E8',
            width: this.config.width || '100%',
            thickness: this.config.thickness || '1px',
            spacing: this.config.spacing || '20px',
            alignment: this.config.alignment || 'center'
        };
        this.settings = [
            {
                name: 'style',
                label: 'Delimiter Style',
                html: `<select @change="trigger('${this.id}', 'style', $event.target.value)" value="${this.config.style}">
                    <option value="line" ${this.config.style === 'line' ? 'selected' : ''}>Line</option>
                    <option value="dots" ${this.config.style === 'dots' ? 'selected' : ''}>Dots</option>
                    <option value="asterisks" ${this.config.style === 'asterisks' ? 'selected' : ''}>Asterisks</option>
                </select>`
            },
            {
                name: 'appearance',
                label: 'Appearance',
                html: `<div class="delimiter-appearance">
                    <input type="color" 
                        @change="trigger('${this.id}', 'color', $event.target.value)"
                        value="${this.config.color}"
                        title="Color">
                    <input type="text" 
                        @change="trigger('${this.id}', 'width', $event.target.value)"
                        value="${this.config.width}"
                        placeholder="Width (%, px)"
                        title="Width">
                    <input type="text" 
                        @change="trigger('${this.id}', 'thickness', $event.target.value)"
                        value="${this.config.thickness}"
                        placeholder="Thickness (px)"
                        title="Thickness">
                    <input type="text" 
                        @change="trigger('${this.id}', 'spacing', $event.target.value)"
                        value="${this.config.spacing}"
                        placeholder="Spacing (px)"
                        title="Spacing">
                </div>`
            },
            {
                name: 'alignment',
                label: 'Alignment',
                html: `<select @change="trigger('${this.id}', 'alignment', $event.target.value)" value="${this.config.alignment}">
                    <option value="left" ${this.config.alignment === 'left' ? 'selected' : ''}>Left</option>
                    <option value="center" ${this.config.alignment === 'center' ? 'selected' : ''}>Center</option>
                    <option value="right" ${this.config.alignment === 'right' ? 'selected' : ''}>Right</option>
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
            default:
                // Default to line style
                return `<hr style="
                    border: none;
                    height: ${this.config.thickness};
                    background-color: ${this.config.color};
                    margin: ${this.config.spacing} auto;">`;
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
var $e5fc3b2383ff720a$export$2e2bcd8739ae039 = $e5fc3b2383ff720a$var$Delimiter;



class $981f6cf7cc85cc93$var$Button extends (0, $3e6ce1da8d004c46$export$2e2bcd8739ae039) {
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
    /**
   * Render the button as a template element with data attributes
   * @param {string} toolId - The tool ID for data attributes
   * @returns {string} HTML string with data attributes
   */ renderTemplateElement(toolId) {
        const icon = this.getIcon();
        const buttonContent = `
            ${this.config.iconPosition === 'left' && icon ? `<span class="button-icon">${icon}</span>` : ''}
            <span class="button-text">${this.config.text}</span>
            ${this.config.iconPosition === 'right' && icon ? `<span class="button-icon">${icon}</span>` : ''}
        `;
        return `${this.config.url ? `
            <a href="${this.config.url}" 
                data-tool="Button" 
                data-tool-id="${toolId}"
                class="button" 
                style="${this.getButtonStyles()}; cursor: pointer;"
                target="_blank"
                rel="noopener noreferrer">
                ${buttonContent}
            </a>
        ` : `
            <button 
                data-tool="Button" 
                data-tool-id="${toolId}"
                class="button" 
                style="${this.getButtonStyles()}; cursor: pointer;"
                ${this.config.disabled ? 'disabled' : ''}>
                ${buttonContent}
            </button>
        `}`;
    }
}
var $981f6cf7cc85cc93$export$2e2bcd8739ae039 = $981f6cf7cc85cc93$var$Button;


window.Alpine = (0, ($parcel$interopDefault($gXNCa$alpinejs)));
// Tool modules registry
const $4fa36e821943b400$var$toolModules = {
    Paragraph: $80c6fdb5c294ffa6$export$2e2bcd8739ae039,
    Header: $de5191df6222c084$export$2e2bcd8739ae039,
    List: $db7363abc9a57c89$export$2e2bcd8739ae039,
    Code: $f832c373f6c04470$export$2e2bcd8739ae039,
    Image: $27011ebc47b257c8$export$2e2bcd8739ae039,
    Quote: $3c596c9f1e11bbb7$export$2e2bcd8739ae039,
    WYSIWYG: $56ed62fe01aa8034$export$2e2bcd8739ae039,
    Alert: $c6b5f9fc4fa47998$export$2e2bcd8739ae039,
    VideoPlayer: $4399172a73dade70$export$2e2bcd8739ae039,
    AudioPlayer: $6ddc38c087d52cba$export$2e2bcd8739ae039,
    Carousel: $06ccccc81b3eddf4$export$2e2bcd8739ae039,
    Columns: $02817afdb34def6d$export$2e2bcd8739ae039,
    Raw: $dbf99af480fb2d13$export$2e2bcd8739ae039,
    Delimiter: $e5fc3b2383ff720a$export$2e2bcd8739ae039,
    Button: $981f6cf7cc85cc93$export$2e2bcd8739ae039
};
/**
 * Get default tool configuration
 * @returns {Object} Default tool configuration
 */ function $4fa36e821943b400$var$getDefaultToolConfig() {
    const config = {};
    // Add all available tools with their default configurations
    Object.entries($4fa36e821943b400$var$toolModules).forEach(([toolName, ToolClass])=>{
        try {
            // Get the default config from the tool's toolbox() method if it exists
            const toolbox = ToolClass.toolbox ? ToolClass.toolbox() : {};
            config[toolName] = {
                class: ToolClass,
                config: toolbox.config || {}
            };
            (0, $7294c730f5636c35$export$153e5dc2c098b35c).debug(`Loaded tool: ${toolName}`);
        } catch (e) {
            (0, $7294c730f5636c35$export$153e5dc2c098b35c).error(`Error loading tool ${toolName}:`, e);
        }
    });
    return config;
}
/**
 * Extract and parse tool configuration from DOM, with fallback to defaults
 * @returns {Object} Parsed tool configuration
 */ function $4fa36e821943b400$var$getToolConfigFromDOM() {
    const editorElement = document.querySelector('[x-data*="alpineEditor"]');
    if (!editorElement) {
        (0, $7294c730f5636c35$export$153e5dc2c098b35c).info('No editor element found, using default tool config');
        return $4fa36e821943b400$var$getDefaultToolConfig();
    }
    const xDataAttr = editorElement.getAttribute('x-data');
    const match = xDataAttr.match(/alpineEditor\(\{[\s\n]*tools:\s*(\[[\s\S]*?\])\s*\}\)/);
    if (!match) {
        (0, $7294c730f5636c35$export$153e5dc2c098b35c).info('No tools config found in DOM, using default tool config');
        return $4fa36e821943b400$var$getDefaultToolConfig();
    }
    try {
        const toolsConfig = new Function(`return ${match[1]}`)();
        const config = {};
        (0, $7294c730f5636c35$export$153e5dc2c098b35c).debug('toolModules keys:', Object.keys($4fa36e821943b400$var$toolModules));
        toolsConfig.forEach((tool)=>{
            (0, $7294c730f5636c35$export$153e5dc2c098b35c).debug('Loading tool:', tool.class);
            if ($4fa36e821943b400$var$toolModules[tool.class]) {
                config[tool.class] = {
                    class: $4fa36e821943b400$var$toolModules[tool.class],
                    config: tool.config || {}
                };
                (0, $7294c730f5636c35$export$153e5dc2c098b35c).debug(`Successfully loaded tool: ${tool.class}`);
            } else (0, $7294c730f5636c35$export$153e5dc2c098b35c).error(`Tool ${tool.class} not found in available modules`);
        });
        // If no tools were successfully parsed, fall back to defaults
        if (Object.keys(config).length === 0) {
            (0, $7294c730f5636c35$export$153e5dc2c098b35c).info('No tools successfully parsed, using default tool config');
            return $4fa36e821943b400$var$getDefaultToolConfig();
        }
        return config;
    } catch (e) {
        (0, $7294c730f5636c35$export$153e5dc2c098b35c).error('Error parsing tool configuration:', e);
        (0, $7294c730f5636c35$export$153e5dc2c098b35c).info('Using default tool config as fallback');
        return $4fa36e821943b400$var$getDefaultToolConfig();
    }
}
// Initialize Alpine with tool loading
document.addEventListener('alpine:init', ()=>{
    window.Alpine.data('editorToolbar', ()=>new (0, $9aa7d1866d5cf0e4$export$4c260019440d418f)());
    window.Alpine.data('headerToolbar', (editorId)=>({
            toolbarInstance: null,
            canUndo: false,
            canRedo: false,
            init () {
                this.toolbarInstance = new (0, $ebbb859655ae7d1c$export$3c11ee1da7b7384)(editorId);
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
                this.settingsInstance = new (0, $acadc144a2722177$export$c72f6eaae7b9adff)(editorId, this.settings);
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
                    this.toolConfig = $4fa36e821943b400$var$getToolConfigFromDOM();
                    (0, $7294c730f5636c35$export$153e5dc2c098b35c).info('Tool config loaded:', Object.keys(this.toolConfig));
                    this.editor = new (0, $56b81aadc5b5902e$export$7cda8d932e2f33c0)(this.toolConfig);
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
                    // Listen for clear selection events
                    document.addEventListener('editor-clear-selection', ()=>{
                        console.log('Clearing selection - before:', this.selectedBlock);
                        this.selectedBlock = null;
                        if (this.editor) this.editor.selectedBlock = null;
                        console.log('Clearing selection - after:', this.selectedBlock);
                        // Force Alpine to completely re-evaluate by triggering multiple reactive updates
                        this.$nextTick(()=>{
                            this.selectedBlock = null;
                            if (this.editor) this.editor.selectedBlock = null;
                            // Force a complete re-render by updating a dummy reactive property
                            this.blocks = [
                                ...this.blocks
                            ];
                            // Trigger another tick to ensure everything updates
                            this.$nextTick(()=>{
                                this.selectedBlock = null;
                                if (this.editor) this.editor.selectedBlock = null;
                            });
                        });
                    });
                    document.addEventListener('editor-drop', (event)=>{
                        if (event.detail.id === this.editor.id) this.syncBlocksFromEditor();
                    });
                } catch (error) {
                    (0, $7294c730f5636c35$export$153e5dc2c098b35c).error('Error initializing editor:', error);
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
    // Page Management Component
    window.Alpine.data('editorPages', ()=>({
            pages: [
                {
                    id: 'page-1',
                    title: 'Home',
                    blocks: []
                }
            ],
            currentPageId: 'page-1',
            switchingPages: false,
            init () {
                // Load pages from localStorage if available
                const savedPages = localStorage.getItem('alpineblocks-pages');
                if (savedPages) try {
                    this.pages = JSON.parse(savedPages);
                    this.currentPageId = this.pages[0]?.id || 'page-1';
                } catch (e) {
                    console.warn('Failed to load saved pages:', e);
                }
                // Listen for editor changes to update current page blocks
                document.addEventListener('editor-changed', ()=>{
                    this.updateCurrentPageBlocks();
                });
                // Listen for page changes
                document.addEventListener('editor-page-changed', (event)=>{
                    this.$nextTick(()=>{
                        this.refreshCurrentPageBlocks();
                    });
                });
                // Listen for editor ready event to load initial page
                document.addEventListener('editor-ready', ()=>{
                    // Load the current page content when editor is ready
                    setTimeout(()=>{
                        this.loadPageContent(this.currentPageId);
                    }, 200);
                });
                // Listen for deletion confirmations (pages and blocks)
                window.addEventListener('confirm-delete-block', (event)=>{
                    const { blockId: blockId } = event.detail;
                    // Check if this is a page deletion
                    const isPageDeletion = this.pages.some((p)=>p.id === blockId);
                    if (isPageDeletion) {
                        this.confirmDeletePage(blockId);
                        return;
                    }
                    // Check if this is a block deletion from page manager
                    if (blockId.startsWith('block-')) {
                        const blockIndex = parseInt(blockId.replace('block-', ''));
                        this.confirmDeleteBlockFromPage(blockIndex);
                        return;
                    }
                });
                // Listen for add page confirmation
                window.addEventListener('confirm-add-page', (event)=>{
                    const { inputValue: inputValue } = event.detail;
                    this.confirmAddPage(inputValue);
                });
                // Listen for rename page confirmation
                window.addEventListener('confirm-rename-page', (event)=>{
                    const { inputValue: inputValue, pageId: pageId } = event.detail;
                    this.confirmRenamePage(pageId, inputValue);
                });
            },
            addPage () {
                // Use the modal system for adding pages
                window.dispatchEvent(new CustomEvent('show-input-modal', {
                    detail: {
                        title: 'Add New Page',
                        placeholder: 'Enter page name',
                        confirmText: 'Add Page',
                        cancelText: 'Cancel',
                        eventType: 'confirm-add-page',
                        eventData: {},
                        iconType: 'add'
                    }
                }));
            },
            confirmAddPage (pageName) {
                if (pageName && pageName.trim()) {
                    const newPage = {
                        id: `page-${Date.now()}`,
                        title: pageName.trim(),
                        blocks: []
                    };
                    this.pages.push(newPage);
                    this.savePagesToStorage();
                }
            },
            deletePage (pageId) {
                if (this.pages.length <= 1) {
                    alert('Cannot delete the last page');
                    return;
                }
                // Use the modal system for page deletion
                window.dispatchEvent(new CustomEvent('show-delete-confirmation', {
                    detail: {
                        blockId: pageId,
                        type: 'page',
                        title: 'Remove Page',
                        description: 'Are you sure you want to remove this page? All content will be lost and this action cannot be undone.'
                    }
                }));
            },
            confirmDeletePage (pageId) {
                this.pages = this.pages.filter((p)=>p.id !== pageId);
                if (this.currentPageId === pageId) {
                    this.currentPageId = this.pages[0].id;
                    this.switchToPage(this.currentPageId);
                }
                this.savePagesToStorage();
            },
            renamePage (pageId) {
                const page = this.pages.find((p)=>p.id === pageId);
                if (page) // Use the modal system for renaming pages
                window.dispatchEvent(new CustomEvent('show-input-modal', {
                    detail: {
                        title: 'Rename Page',
                        placeholder: 'Enter new page name',
                        defaultValue: page.title,
                        confirmText: 'Rename',
                        cancelText: 'Cancel',
                        eventType: 'confirm-rename-page',
                        eventData: {
                            pageId: pageId
                        },
                        iconType: 'edit'
                    }
                }));
            },
            confirmRenamePage (pageId, newName) {
                const page = this.pages.find((p)=>p.id === pageId);
                if (page && newName && newName.trim()) {
                    page.title = newName.trim();
                    this.savePagesToStorage();
                }
            },
            switchToPage (pageId) {
                if (pageId === this.currentPageId) return;
                // Set flag to prevent re-selection during switch
                this.switchingPages = true;
                // Clear selection immediately when starting page switch
                document.dispatchEvent(new CustomEvent('editor-clear-selection'));
                // Save current page content first
                this.saveCurrentPageContent().then(()=>{
                    // Switch to new page
                    this.currentPageId = pageId;
                    // Clear selection again before loading
                    document.dispatchEvent(new CustomEvent('editor-clear-selection'));
                    // Load new page content
                    this.loadPageContent(pageId);
                    // Force Alpine to update the reactive data
                    this.$nextTick(()=>{
                        // Trigger a reactive update for the current page blocks
                        this.refreshCurrentPageBlocks();
                        // Final clear to make sure selection is gone
                        document.dispatchEvent(new CustomEvent('editor-clear-selection'));
                        // Clear the switching flag after a delay
                        setTimeout(()=>{
                            this.switchingPages = false;
                        }, 200);
                    });
                });
            },
            saveCurrentPageContent () {
                return new Promise((resolve)=>{
                    const currentPage = this.pages.find((p)=>p.id === this.currentPageId);
                    if (currentPage && window.alpineEditors?.editorjs) {
                        const editor = window.alpineEditors.editorjs;
                        try {
                            // Use the blocksJSON method to get current blocks
                            const blocksData = JSON.parse(editor.blocksJSON());
                            currentPage.blocks = blocksData || [];
                            this.savePagesToStorage();
                            resolve();
                        } catch (error) {
                            console.warn('Error saving page content:', error);
                            resolve();
                        }
                    } else resolve();
                });
            },
            loadPageContent (pageId) {
                const page = this.pages.find((p)=>p.id === pageId);
                if (page && window.alpineEditors?.editorjs) {
                    const editor = window.alpineEditors.editorjs;
                    try {
                        // Clear existing blocks
                        editor.blockManager.blocks = [];
                        // Load new blocks if any exist
                        if (page.blocks && page.blocks.length > 0) page.blocks.forEach((blockData)=>{
                            if (blockData.class && editor.toolConfig[blockData.class]) {
                                // Use initBlock to create the block properly
                                const block = editor.initBlock(blockData.class, true, blockData.id);
                                if (block && blockData.data) // Merge the saved data into the block config
                                Object.assign(block.config, blockData.data);
                            }
                        });
                        // If no blocks, add a default paragraph
                        if (editor.blockManager.blocks.length === 0 && editor.toolConfig['Paragraph']) editor.initBlock('Paragraph', true);
                        // Clear the selected block when switching pages
                        document.dispatchEvent(new CustomEvent('editor-clear-selection'));
                        // Immediately clear block selection for properties panel
                        document.dispatchEvent(new CustomEvent('editor-block-changed', {
                            detail: {
                                block_id: null
                            }
                        }));
                        // Trigger a re-render
                        setTimeout(()=>{
                            // Dispatch events to update UI
                            document.dispatchEvent(new CustomEvent('editor-page-changed', {
                                detail: {
                                    pageId: pageId,
                                    blocks: page.blocks || []
                                }
                            }));
                            // Clear block selection again to update properties panel
                            document.dispatchEvent(new CustomEvent('editor-block-changed', {
                                detail: {
                                    block_id: null
                                }
                            }));
                            // Force settings panel to clear directly
                            document.dispatchEvent(new CustomEvent('settings-updated', {
                                detail: {
                                    editorId: 'editorjs',
                                    settings: [],
                                    blockId: null
                                }
                            }));
                            // Force Alpine to update
                            document.dispatchEvent(new CustomEvent('editor-changed'));
                        }, 100);
                    } catch (error) {
                        console.warn('Error loading page content:', error);
                    }
                }
            },
            savePagesToStorage () {
                localStorage.setItem('alpineblocks-pages', JSON.stringify(this.pages));
            },
            updateCurrentPageBlocks () {
                // Update the current page's blocks with the latest from the editor
                if (window.alpineEditors?.editorjs) {
                    const editor = window.alpineEditors.editorjs;
                    try {
                        const currentPage = this.pages.find((p)=>p.id === this.currentPageId);
                        if (currentPage) {
                            // Use the blocksJSON method to get current blocks
                            const blocksData = JSON.parse(editor.blocksJSON());
                            currentPage.blocks = blocksData || [];
                            this.savePagesToStorage();
                            // Force Alpine to update
                            this.$nextTick(()=>{
                                this.refreshCurrentPageBlocks();
                            });
                        }
                    } catch (error) {
                        console.warn('Error updating page blocks:', error);
                    }
                }
            },
            refreshCurrentPageBlocks () {
                // Force Alpine to re-evaluate the current page blocks
                // This is a workaround to ensure reactive updates
                const currentPage = this.pages.find((p)=>p.id === this.currentPageId);
                if (currentPage) // Trigger reactivity by modifying a property
                currentPage._updateTimestamp = Date.now();
            },
            getCurrentPageTitle () {
                const currentPage = this.pages.find((p)=>p.id === this.currentPageId);
                return currentPage ? currentPage.title : '';
            },
            getCurrentPageBlocks () {
                const currentPage = this.pages.find((p)=>p.id === this.currentPageId);
                const blocks = currentPage ? currentPage.blocks || [] : [];
                // Convert the block data format to include type property
                return blocks.map((block)=>({
                        ...block,
                        type: block.class ? block.class.toLowerCase() : 'unknown'
                    }));
            },
            getBlockIcon (type) {
                const icons = {
                    'paragraph': "\xb6",
                    'header': 'H',
                    'list': "\u2022",
                    'image': "\uD83D\uDDBC",
                    'quote': '"',
                    'code': '</>',
                    'wysiwyg': "\uD83D\uDCDD",
                    'alert': "\u26A0",
                    'video': "\u25B6",
                    'audio': "\uD83D\uDD0A",
                    'carousel': "\uD83C\uDFA0",
                    'columns': "\u2AFC",
                    'raw': '{}',
                    'delimiter': '---',
                    'button': "\uD83D\uDD18"
                };
                return icons[type] || "\uD83D\uDCC4";
            },
            getBlockDisplayName (type) {
                if (!type || typeof type !== 'string') return 'Unknown Block';
                const names = {
                    'paragraph': 'Paragraph',
                    'header': 'Header',
                    'list': 'List',
                    'image': 'Image',
                    'quote': 'Quote',
                    'code': 'Code',
                    'wysiwyg': 'Rich Text',
                    'alert': 'Alert',
                    'video': 'Video',
                    'audio': 'Audio',
                    'carousel': 'Carousel',
                    'columns': 'Columns',
                    'raw': 'Raw HTML',
                    'delimiter': 'Delimiter',
                    'button': 'Button'
                };
                return names[type] || type.charAt(0).toUpperCase() + type.slice(1);
            },
            getBlockPreview (block) {
                const data = block.data || {};
                switch(block.type){
                    case 'paragraph':
                        return this.stripHtml(data.content || '').substring(0, 50) + '...';
                    case 'header':
                        return this.stripHtml(data.content || '').substring(0, 30) + '...';
                    case 'list':
                        return data.items?.length ? `${data.items.length} items` : 'Empty list';
                    case 'image':
                        return data.caption || data.alt || 'Image';
                    case 'quote':
                        return this.stripHtml(data.content || '').substring(0, 40) + '...';
                    case 'code':
                        return data.language || 'Code block';
                    case 'wysiwyg':
                        return this.stripHtml(data.content || '').substring(0, 50) + '...';
                    case 'alert':
                        return data.message || 'Alert message';
                    case 'video':
                        return data.caption || 'Video player';
                    case 'audio':
                        return data.caption || 'Audio player';
                    case 'carousel':
                        return `${data.slides?.length || 0} slides`;
                    case 'columns':
                        return `${data.columns?.length || 0} columns`;
                    case 'raw':
                        return 'HTML content';
                    case 'delimiter':
                        return 'Section break';
                    case 'button':
                        return data.text || 'Button';
                    default:
                        return 'Block content';
                }
            },
            stripHtml (html) {
                const doc = new DOMParser().parseFromString(html, 'text/html');
                return doc.body.textContent || '';
            },
            selectBlock (blockIndex) {
                // Don't select blocks during page switching
                if (this.switchingPages) return;
                // Focus on the block in the editor
                if (window.alpineEditors?.editorjs) {
                    const editor = window.alpineEditors.editorjs;
                    try {
                        const block = editor.blockManager.blocks[blockIndex];
                        if (block) {
                            editor.selectedBlock = block.id;
                            // Trigger editor change to update UI
                            document.dispatchEvent(new CustomEvent('editor-block-changed', {
                                detail: {
                                    block_id: block.id
                                }
                            }));
                        }
                    } catch (e) {
                        console.warn('Could not select block:', e);
                    }
                }
            },
            moveBlockUp (blockIndex) {
                if (blockIndex <= 0) return;
                if (window.alpineEditors?.editorjs) {
                    const editor = window.alpineEditors.editorjs;
                    try {
                        const blocks = editor.blockManager.blocks;
                        if (blocks[blockIndex] && blocks[blockIndex - 1]) {
                            // Swap the blocks
                            [blocks[blockIndex], blocks[blockIndex - 1]] = [
                                blocks[blockIndex - 1],
                                blocks[blockIndex]
                            ];
                            // Update immediately and refresh UI
                            setTimeout(()=>{
                                this.updateCurrentPageBlocks();
                                document.dispatchEvent(new CustomEvent('editor-changed'));
                            }, 100);
                        }
                    } catch (e) {
                        console.warn('Could not move block up:', e);
                    }
                }
            },
            moveBlockDown (blockIndex) {
                const blocks = this.getCurrentPageBlocks();
                if (blockIndex >= blocks.length - 1) return;
                if (window.alpineEditors?.editorjs) {
                    const editor = window.alpineEditors.editorjs;
                    try {
                        const editorBlocks = editor.blockManager.blocks;
                        if (editorBlocks[blockIndex] && editorBlocks[blockIndex + 1]) {
                            // Swap the blocks
                            [editorBlocks[blockIndex], editorBlocks[blockIndex + 1]] = [
                                editorBlocks[blockIndex + 1],
                                editorBlocks[blockIndex]
                            ];
                            // Update immediately and refresh UI
                            setTimeout(()=>{
                                this.updateCurrentPageBlocks();
                                document.dispatchEvent(new CustomEvent('editor-changed'));
                            }, 100);
                        }
                    } catch (e) {
                        console.warn('Could not move block down:', e);
                    }
                }
            },
            deleteBlock (blockIndex) {
                if (window.alpineEditors?.editorjs) {
                    const editor = window.alpineEditors.editorjs;
                    const blocks = editor.blockManager.blocks;
                    if (blocks[blockIndex]) // Use the modal system for block deletion from page manager
                    window.dispatchEvent(new CustomEvent('show-delete-confirmation', {
                        detail: {
                            blockId: `block-${blockIndex}`,
                            type: 'block-from-page',
                            title: 'Remove Block',
                            description: 'Are you sure you want to remove this block? This action cannot be undone.'
                        }
                    }));
                }
            },
            confirmDeleteBlockFromPage (blockIndex) {
                if (window.alpineEditors?.editorjs) {
                    const editor = window.alpineEditors.editorjs;
                    try {
                        const blocks = editor.blockManager.blocks;
                        if (blocks[blockIndex]) {
                            // Remove the block
                            blocks.splice(blockIndex, 1);
                            // If no blocks left, add a default paragraph
                            if (blocks.length === 0 && editor.toolConfig['Paragraph']) editor.initBlock('Paragraph', true);
                            // Update immediately and refresh UI
                            setTimeout(()=>{
                                this.updateCurrentPageBlocks();
                                document.dispatchEvent(new CustomEvent('editor-changed'));
                            }, 100);
                        }
                    } catch (e) {
                        console.warn('Could not delete block:', e);
                    }
                }
            }
        }));
    // Templates Component
    window.Alpine.data('editorTemplates', ()=>({
            templates: [],
            init () {
                // Get templates from Layout class
                this.templates = (0, $8ebbeef8d21b3552$export$2e2bcd8739ae039).getAll();
            },
            handleTemplateClick (event, template) {
                event.preventDefault();
                this.addTemplate(template);
            },
            handleTemplateDragStart (event, template) {
                // Extract blocks before serialization to preserve functionality
                const extractedBlocks = template.extractBlocks();
                event.dataTransfer.setData('text/plain', JSON.stringify({
                    type: 'template',
                    data: {
                        id: template.id,
                        name: template.name,
                        description: template.description,
                        blocks: extractedBlocks
                    }
                }));
                event.dataTransfer.effectAllowed = 'copy';
            },
            handleTemplateDragEnd (event) {
            // Clean up drag state if needed
            },
            addTemplate (template) {
                if (window.alpineEditors?.editorjs) {
                    const editor = window.alpineEditors.editorjs;
                    if (editor.editor) {
                        // Create LayoutManager and add the template
                        const layoutManager = new (0, $294ef9f20b3a5b48$export$2e2bcd8739ae039)(editor.editor);
                        layoutManager.addLayout(template.id);
                    }
                }
            }
        }));
});
(0, ($parcel$interopDefault($gXNCa$alpinejs))).start();


//# sourceMappingURL=index.js.map

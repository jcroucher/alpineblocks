/**
 * RichText Loader Utility
 * Centralized rich text editor loading and initialization for AlpineBlocks
 *
 * This provides a custom contenteditable-based WYSIWYG editor as the primary solution.
 * No TinyMCE dependencies - this is a standalone rich text editor.
 */

import { CommonEditorToolbar } from '../core/CommonEditorToolbar';

class RichTextLoader {
    constructor() {
        this.instances = new Map();
        this.alpineBlocksInitialized = false;
        this.defaultConfig = {
            height: 400,
            features: {
                blocks: true,
                bold: true,
                italic: true,
                underline: true,
                strikethrough: true,
                formatBlock: true,
                lists: true,
                links: true,
                alignment: true,
                indentation: true,
                textColor: true,
                backgroundColor: true,
                fontSize: true,
                fontFamily: true
            },
            placeholder: 'Start typing here...',
            className: 'alpineblocks-richtext-editor',
            variables: [] // Array [{label: 'Name', value: '{{var}}'}] OR Object {'Category': [{...}]}
        };
    }

    /**
     * Initialize AlpineBlocks globally (only once)
     * Note: This just ensures the blocks are loaded from the global registry
     * The actual AlpineBlocks library should already be loaded by the page
     */
    initializeAlpineBlocks() {
        if (this.alpineBlocksInitialized) {
            return;
        }

        // Check if AlpineBlocks is already loaded
        if (window.AlpineBlocks) {
            this.alpineBlocksInitialized = true;
            console.log('✅ AlpineBlocks already loaded, ready for RichText editors');
            return;
        }

        // If not loaded yet, listen for the alpineblocks:ready event
        if (typeof window !== 'undefined') {
            window.addEventListener('alpineblocks:ready', () => {
                this.alpineBlocksInitialized = true;
                console.log('✅ AlpineBlocks loaded via event, ready for RichText editors');
            }, { once: true });
        }
    }

    /**
     * Initialize rich text editor on a selector
     * @param {string} selector - CSS selector for element(s) to convert to rich text editors
     * @param {object} config - Editor configuration options
     * @returns {Promise<Array>} Array of initialized editor instances
     */
    async init(selector, config = {}) {
        // Initialize AlpineBlocks globally (only once)
        this.initializeAlpineBlocks();

        const finalConfig = {
            ...this.defaultConfig,
            ...config
        };

        const elements = document.querySelectorAll(selector);
        const instances = [];

        elements.forEach((element) => {
            // Skip if already initialized
            if (this.instances.has(element)) {
                instances.push(this.instances.get(element));
                return;
            }

            const instance = this.initializeSingleEditor(element, finalConfig);
            instances.push(instance);
        });

        return Promise.resolve(instances);
    }

    /**
     * Initialize a single rich text editor
     * @param {HTMLElement} element - Element to convert to editor
     * @param {object} config - Editor configuration
     * @returns {object} Editor instance
     */
    initializeSingleEditor(element, config) {
        const editorId = element.id || `richtext-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        if (!element.id) {
            element.id = editorId;
        }

        // Get initial content from textarea or element
        let initialContent = '';
        if (element.tagName === 'TEXTAREA') {
            initialContent = element.value;

            // Create editor wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'richtext-editor-wrapper';
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.border = '1px solid #d1d5db';
            wrapper.style.borderRadius = '4px';
            wrapper.style.overflow = 'hidden';

            // Hide textarea and insert wrapper after it
            element.style.display = 'none';
            element.parentNode.insertBefore(wrapper, element.nextSibling);

            // Create toolbar
            const toolbar = new CommonEditorToolbar({
                className: config.toolbarClassName || 'richtext-toolbar',
                features: config.features || this.defaultConfig.features,
                variables: config.variables || []
            });

            // Create toolbar container with Alpine x-data
            const toolbarContainer = document.createElement('div');
            toolbarContainer.className = 'richtext-toolbar-container';
            wrapper.appendChild(toolbarContainer);

            // Create contenteditable div
            const editorDiv = document.createElement('div');
            editorDiv.id = `${editorId}-editor`;
            editorDiv.contentEditable = 'true';
            editorDiv.className = config.className || this.defaultConfig.className;
            editorDiv.style.minHeight = `${config.height || this.defaultConfig.height}px`;
            editorDiv.style.padding = '12px';
            editorDiv.style.outline = 'none';
            editorDiv.style.overflowY = 'auto';
            editorDiv.style.backgroundColor = 'white';
            editorDiv.innerHTML = initialContent || `<p>${config.placeholder || this.defaultConfig.placeholder}</p>`;

            // Add inline style to ensure formatting tags work
            const styleEl = document.createElement('style');
            styleEl.textContent = `
                #${editorDiv.id} b, #${editorDiv.id} strong { font-weight: bold !important; }
                #${editorDiv.id} i, #${editorDiv.id} em { font-style: italic !important; }
                #${editorDiv.id} u { text-decoration: underline !important; }
                #${editorDiv.id} strike, #${editorDiv.id} s { text-decoration: line-through !important; }
                #${editorDiv.id} ul { list-style-type: disc !important; margin-left: 20px !important; }
                #${editorDiv.id} ol { list-style-type: decimal !important; margin-left: 20px !important; }
            `;
            document.head.appendChild(styleEl);

            // Create code view textarea (hidden by default)
            const codeTextarea = document.createElement('textarea');
            codeTextarea.id = `${editorId}-code`;
            codeTextarea.className = 'richtext-code-view';
            codeTextarea.style.display = 'none';
            codeTextarea.style.minHeight = `${config.height || this.defaultConfig.height}px`;
            codeTextarea.style.padding = '12px';
            codeTextarea.style.fontFamily = 'monospace';
            codeTextarea.style.fontSize = '13px';
            codeTextarea.style.lineHeight = '1.5';
            codeTextarea.style.border = 'none';
            codeTextarea.style.outline = 'none';
            codeTextarea.style.resize = 'vertical';
            codeTextarea.style.width = '100%';
            codeTextarea.style.backgroundColor = '#f9fafb';

            wrapper.appendChild(editorDiv);
            wrapper.appendChild(codeTextarea);

            // Configure execCommand to use HTML tags instead of CSS styles
            // This makes bold use <b> instead of <span style="font-weight: bold">
            // Also enable undo functionality
            try {
                document.execCommand('styleWithCSS', false, false);
                document.execCommand('defaultParagraphSeparator', false, 'p');
                // Enable undo - this is already enabled by default in modern browsers
                // but we explicitly set it here for clarity
                editorDiv.contentEditable = 'true';
            } catch (e) {
                console.warn('Could not configure execCommand settings:', e);
            }

            // Setup Alpine.js event handlers for toolbar
            this.setupToolbarHandlers(toolbarContainer, editorDiv, codeTextarea, toolbar, editorId);

            // Sync changes back to textarea
            editorDiv.addEventListener('input', () => {
                element.value = editorDiv.innerHTML;
                if (config.onChange) {
                    config.onChange(editorDiv.innerHTML);
                }
            });

            // Handle blur events
            editorDiv.addEventListener('blur', () => {
                element.value = editorDiv.innerHTML;
                if (config.onBlur) {
                    config.onBlur(editorDiv.innerHTML);
                }
            });

            // Handle template drops with visual indicator
            let dropIndicator = null;
            let currentDropTarget = null;
            let insertBefore = true;

            // Add drop animation styles
            if (!document.getElementById('richtext-drop-animation')) {
                const style = document.createElement('style');
                style.id = 'richtext-drop-animation';
                style.textContent = `
                    @keyframes dropPulse {
                        0%, 100% {
                            opacity: 0.9;
                            transform: scaleY(1);
                            box-shadow: 0 0 12px rgba(59, 130, 246, 0.8);
                        }
                        50% {
                            opacity: 1;
                            transform: scaleY(1.3);
                            box-shadow: 0 0 20px rgba(59, 130, 246, 1);
                        }
                    }
                    .richtext-drop-indicator {
                        display: block !important;
                        height: 6px !important;
                        background: linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6) !important;
                        background-size: 200% 100% !important;
                        margin: 8px 0 !important;
                        border-radius: 3px !important;
                        pointer-events: none !important;
                        animation: dropPulse 0.8s ease-in-out infinite, gradientShift 2s linear infinite !important;
                        position: relative !important;
                        box-shadow: 0 0 12px rgba(59, 130, 246, 0.8) !important;
                    }
                    .richtext-drop-indicator::before {
                        content: "DROP HERE" !important;
                        position: absolute !important;
                        top: -24px !important;
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                        background: #3b82f6 !important;
                        color: white !important;
                        padding: 4px 12px !important;
                        border-radius: 4px !important;
                        font-size: 11px !important;
                        font-weight: 600 !important;
                        letter-spacing: 0.5px !important;
                        white-space: nowrap !important;
                        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4) !important;
                    }
                    @keyframes gradientShift {
                        0% { background-position: 0% 50%; }
                        100% { background-position: 200% 50%; }
                    }
                `;
                document.head.appendChild(style);
            }

            editorDiv.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';

                // Find which element we're closest to
                const y = e.clientY;
                const children = Array.from(editorDiv.children).filter(child =>
                    !child.classList.contains('richtext-drop-indicator')
                );

                let closestElement = null;
                let closestDistance = Infinity;
                let shouldInsertBefore = true;

                children.forEach(child => {
                    const rect = child.getBoundingClientRect();
                    const midpoint = rect.top + rect.height / 2;

                    // Distance to top edge
                    const distanceToTop = Math.abs(y - rect.top);
                    // Distance to bottom edge
                    const distanceToBottom = Math.abs(y - rect.bottom);

                    if (distanceToTop < closestDistance) {
                        closestDistance = distanceToTop;
                        closestElement = child;
                        shouldInsertBefore = true;
                    }

                    if (distanceToBottom < closestDistance) {
                        closestDistance = distanceToBottom;
                        closestElement = child;
                        shouldInsertBefore = false;
                    }
                });

                // Create drop indicator if needed
                if (!dropIndicator) {
                    dropIndicator = document.createElement('div');
                    dropIndicator.className = 'richtext-drop-indicator';
                    dropIndicator.contentEditable = 'false';
                }

                // If we have a target element, position the indicator
                if (closestElement) {
                    // Remove indicator from current position
                    if (dropIndicator.parentElement) {
                        dropIndicator.remove();
                    }

                    // Insert indicator at the new position
                    if (shouldInsertBefore) {
                        closestElement.parentNode.insertBefore(dropIndicator, closestElement);
                    } else {
                        if (closestElement.nextSibling) {
                            closestElement.parentNode.insertBefore(dropIndicator, closestElement.nextSibling);
                        } else {
                            closestElement.parentNode.appendChild(dropIndicator);
                        }
                    }

                    currentDropTarget = closestElement;
                    insertBefore = shouldInsertBefore;
                } else if (children.length === 0) {
                    // Empty editor - just append
                    if (!dropIndicator.parentElement) {
                        editorDiv.appendChild(dropIndicator);
                    }
                    currentDropTarget = null;
                    insertBefore = true;
                }
            });

            editorDiv.addEventListener('dragleave', (e) => {
                // Only remove if we're leaving the editor completely
                const relatedTarget = e.relatedTarget;
                if (!editorDiv.contains(relatedTarget)) {
                    if (dropIndicator && dropIndicator.parentElement) {
                        dropIndicator.remove();
                    }
                    currentDropTarget = null;
                }
            });

            editorDiv.addEventListener('drop', async (e) => {
                console.log('[RichText] Drop event triggered');
                const dragDataText = e.dataTransfer.getData('text/plain');
                console.log('[RichText] dataTransfer text/plain:', dragDataText);

                let htmlContent = null;
                let isTemplateDrop = false;
                let templateId = null;
                let templateName = null;

                // Try to parse as JSON first (AlpineBlocks template format)
                try {
                    const dragData = JSON.parse(dragDataText);
                    if (dragData.type === 'template' && dragData.data) {
                        // Check if this is a lazy template that needs loading
                        if (dragData.data._templateRef) {
                            console.log('[RichText] Detected lazy template drop, loading...');

                            // Get the template reference from global storage
                            const template = window._alpineTemplates?.draggedTemplate;

                            if (template) {
                                console.log('[RichText] Found template reference:', template.id);

                                // Load template if not already loaded
                                if (!template.html && template.loadContent) {
                                    console.log('[RichText] Loading template content...');
                                    await template.loadContent();
                                }

                                // Use the raw HTML directly for RichText editor
                                isTemplateDrop = true;
                                templateId = template.id;
                                templateName = template.name;
                                htmlContent = template.html;

                                console.log('[RichText] Loaded template HTML, length:', htmlContent?.length || 0);
                            } else {
                                console.warn('[RichText] Template reference not found in window._alpineTemplates');
                            }
                        } else if (dragData.data.blocks) {
                            // Old format with pre-extracted blocks
                            console.log('[RichText] Detected AlpineBlocks template drop');
                            isTemplateDrop = true;
                            templateId = dragData.data.id || null;
                            templateName = dragData.data.name || null;

                            // Concatenate HTML from all blocks
                            htmlContent = dragData.data.blocks
                                .map(block => block.data.content || '')
                                .join('\n');

                            console.log('[RichText] Extracted HTML from template blocks, length:', htmlContent.length);
                            console.log('[RichText] Template ID:', templateId, 'Name:', templateName);
                        }
                    }
                } catch (parseError) {
                    // Not JSON, check if it's a simple drag type like 'Raw'
                    if (dragDataText === 'Raw' && window.templateDragData) {
                        console.log('[RichText] Detected Raw block drop with window.templateDragData');
                        isTemplateDrop = true;
                        htmlContent = window.templateDragData.config.content;
                        templateId = window.templateDragData.id || null;
                        templateName = window.templateDragData.name || null;
                    }
                }

                if (isTemplateDrop && htmlContent) {
                    e.preventDefault();
                    e.stopPropagation();

                    console.log('[RichText] Inserting template HTML, length:', htmlContent.length);
                    console.log('[RichText] Drop target:', currentDropTarget, 'Insert before:', insertBefore);

                    // Generate unique ID for this template instance
                    const instanceId = `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

                    // Create wrapper div with tracking attributes
                    const templateWrapper = document.createElement('div');
                    templateWrapper.id = instanceId;
                    templateWrapper.setAttribute('data-template-id', templateId || 'unknown');
                    templateWrapper.setAttribute('data-template-name', templateName || 'Unknown Template');
                    templateWrapper.setAttribute('contenteditable', 'true');
                    templateWrapper.innerHTML = htmlContent;

                    // Add escape paragraph AFTER
                    const escapeParagraphAfter = document.createElement('p');
                    escapeParagraphAfter.innerHTML = '<br>';

                    // Use the drop indicator position to insert content
                    if (currentDropTarget) {
                        console.log('[RichText] Inserting at drop indicator position');

                        // Check if we're inserting at the very beginning
                        const isAtStart = insertBefore && !currentDropTarget.previousSibling;

                        // Add escape paragraph BEFORE if at start
                        if (isAtStart) {
                            const escapeParagraphBefore = document.createElement('p');
                            escapeParagraphBefore.innerHTML = '<br>';
                            editorDiv.insertBefore(escapeParagraphBefore, currentDropTarget);
                            console.log('[RichText] Added escape paragraph before block (at start)');
                        }

                        // Insert the template wrapper
                        if (insertBefore) {
                            currentDropTarget.parentNode.insertBefore(templateWrapper, currentDropTarget);
                        } else {
                            if (currentDropTarget.nextSibling) {
                                currentDropTarget.parentNode.insertBefore(templateWrapper, currentDropTarget.nextSibling);
                            } else {
                                currentDropTarget.parentNode.appendChild(templateWrapper);
                            }
                        }

                        // Insert escape paragraph after the template
                        if (templateWrapper.nextSibling) {
                            editorDiv.insertBefore(escapeParagraphAfter, templateWrapper.nextSibling);
                        } else {
                            editorDiv.appendChild(escapeParagraphAfter);
                        }

                        console.log('[RichText] Added template with ID:', instanceId, 'Template ID:', templateId);
                    } else {
                        // No drop target (empty editor or fallback)
                        console.log('[RichText] No drop target, appending to end');
                        const isEmpty = editorDiv.innerHTML.trim() === '' ||
                                       editorDiv.innerHTML === '<p><br></p>' ||
                                       editorDiv.textContent.trim() === '';

                        // If editor is empty, add escape paragraph before
                        if (isEmpty) {
                            const escapeParagraphBefore = document.createElement('p');
                            escapeParagraphBefore.innerHTML = '<br>';
                            editorDiv.innerHTML = ''; // Clear placeholder
                            editorDiv.appendChild(escapeParagraphBefore);
                            console.log('[RichText] Added escape paragraph before block (empty editor)');
                        }

                        // Add the wrapped template
                        editorDiv.appendChild(templateWrapper);

                        // Add escape paragraph at the end
                        editorDiv.appendChild(escapeParagraphAfter);

                        console.log('[RichText] Added template with ID:', instanceId, 'Template ID:', templateId);
                    }

                    // Remove drop indicator and reset state
                    if (dropIndicator && dropIndicator.parentElement) {
                        dropIndicator.remove();
                    }
                    dropIndicator = null;
                    currentDropTarget = null;

                    // Sync to textarea
                    element.value = editorDiv.innerHTML;
                    if (config.onChange) {
                        config.onChange(editorDiv.innerHTML);
                    }

                    // Clear the template data if it was used
                    if (window.templateDragData) {
                        window.templateDragData = null;
                    }

                    console.log('[RichText] Template HTML inserted successfully');
                }
            });

            // Track template clicks - find nearest template wrapper when clicking in editor
            editorDiv.addEventListener('click', (e) => {
                // Get the element that was clicked
                const clickedElement = e.target;

                // Walk up the DOM tree to find a template wrapper
                let currentElement = clickedElement;
                while (currentElement && currentElement !== editorDiv) {
                    if (currentElement.hasAttribute && currentElement.hasAttribute('data-template-id')) {
                        const templateId = currentElement.getAttribute('data-template-id');
                        const instanceId = currentElement.id;
                        const templateName = currentElement.getAttribute('data-template-name');

                        // Get the style attribute of the clicked element (not the wrapper)
                        const currentElementStyle = clickedElement.getAttribute('style') || '';
                        const currentElementTag = clickedElement.tagName ? clickedElement.tagName.toLowerCase() : '';

                        console.log('[RichText] Template clicked:');
                        console.log('  Instance ID:', instanceId);
                        console.log('  Template ID:', templateId);
                        console.log('  Template Name:', templateName);
                        console.log('  Clicked Element:', currentElementTag);
                        console.log('  Element Style:', currentElementStyle);

                        // Dispatch event with current element info
                        editorDiv.dispatchEvent(new CustomEvent('template-selected', {
                            detail: {
                                instanceId: instanceId,
                                templateId: templateId,
                                templateName: templateName,
                                element: currentElement,
                                currentElementStyle: currentElementStyle,
                                currentElementTag: currentElementTag,
                                clickedElement: clickedElement
                            },
                            bubbles: true
                        }));

                        break;
                    }
                    currentElement = currentElement.parentNode;
                }
            });

            // Sync code view changes back to textarea
            codeTextarea.addEventListener('input', () => {
                element.value = codeTextarea.value;
                if (config.onChange) {
                    config.onChange(codeTextarea.value);
                }
            });

            codeTextarea.addEventListener('blur', () => {
                element.value = codeTextarea.value;
                if (config.onBlur) {
                    config.onBlur(codeTextarea.value);
                }
            });

            const instance = {
                id: editorId,
                element: element,
                editorDiv: editorDiv,
                codeTextarea: codeTextarea,
                wrapper: wrapper,
                toolbar: toolbar,
                getContent: () => editorDiv.innerHTML,
                setContent: (content) => {
                    editorDiv.innerHTML = content;
                    codeTextarea.value = content;
                    element.value = content;
                },
                focus: () => editorDiv.focus(),
                remove: () => this.remove(editorId)
            };

            this.instances.set(element, instance);
            this.instances.set(editorId, instance);

            console.log('✅ AlpineBlocks RichText editor initialized:', editorId);

            if (config.onInit) {
                config.onInit(instance);
            }

            return instance;
        } else {
            // For non-textarea elements, just make contenteditable
            element.contentEditable = 'true';
            element.style.minHeight = `${config.height || this.defaultConfig.height}px`;

            const instance = {
                id: editorId,
                element: element,
                editorDiv: element,
                getContent: () => element.innerHTML,
                setContent: (content) => { element.innerHTML = content; },
                focus: () => element.focus(),
                remove: () => this.remove(editorId)
            };

            this.instances.set(element, instance);
            this.instances.set(editorId, instance);

            return instance;
        }
    }

    /**
     * Setup toolbar button handlers
     * @param {HTMLElement} toolbarContainer - Toolbar container element
     * @param {HTMLElement} editorDiv - Editor contenteditable div
     * @param {HTMLElement} codeTextarea - Code view textarea
     * @param {Object} toolbar - Toolbar instance
     * @param {string} editorId - Editor ID
     */
    setupToolbarHandlers(toolbarContainer, editorDiv, codeTextarea, toolbar, editorId) {
        // Store the last selection
        let savedSelection = null;
        let isCodeViewActive = false;
        let isBlocksSidebarOpen = false;

        // Function to save current selection
        const saveCurrentSelection = () => {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                savedSelection = selection.getRangeAt(0).cloneRange();
                console.log('[RichText] Selection saved');
            }
        };

        // Save selection when editor loses focus
        editorDiv.addEventListener('blur', saveCurrentSelection);

        // Save selection when toolbar buttons/dropdowns are interacted with
        toolbarContainer.addEventListener('mousedown', (e) => {
            // Save selection before any toolbar interaction
            saveCurrentSelection();
        });

        // Define the command handler function
        const handleToolbarCommand = (command, value = null) => {
            console.log('[RichText] Executing command:', command, 'value:', value);

            // Handle toggle blocks sidebar command
            if (command === 'toggleBlocksSidebar') {
                this.toggleBlocksSidebar(editorId, !isBlocksSidebarOpen);
                isBlocksSidebarOpen = !isBlocksSidebarOpen;
                return;
            }

            // Handle toggle code view command
            if (command === 'toggleCodeView') {
                if (isCodeViewActive) {
                    // Switch from code view to WYSIWYG
                    editorDiv.innerHTML = codeTextarea.value;
                    editorDiv.style.display = '';
                    codeTextarea.style.display = 'none';
                    isCodeViewActive = false;
                    console.log('[RichText] Switched to WYSIWYG view');
                } else {
                    // Switch from WYSIWYG to code view
                    codeTextarea.value = editorDiv.innerHTML;
                    editorDiv.style.display = 'none';
                    codeTextarea.style.display = 'block';
                    isCodeViewActive = true;
                    codeTextarea.focus();
                    console.log('[RichText] Switched to code view');
                }
                return;
            }

            // For all other commands, ensure we're in WYSIWYG mode
            if (isCodeViewActive) {
                console.warn('[RichText] Cannot execute formatting commands in code view');
                return;
            }

            // Focus the editor
            editorDiv.focus();

            // Get current selection
            const selection = window.getSelection();

            // Check if current selection is collapsed (just a cursor, no text selected)
            const isCollapsed = selection.rangeCount > 0 ? selection.getRangeAt(0).collapsed : true;

            // Restore saved selection if:
            // 1. There's no current selection (rangeCount === 0), OR
            // 2. The current selection is collapsed (just a cursor position)
            // This handles color pickers and dropdowns while preventing overwriting actual text selections
            if (savedSelection && (selection.rangeCount === 0 || isCollapsed)) {
                try {
                    selection.removeAllRanges();
                    selection.addRange(savedSelection.cloneRange());
                    console.log('[RichText] Restored saved selection:', selection.toString());
                } catch (e) {
                    console.warn('[RichText] Failed to restore selection:', e);
                }
            } else {
                console.log('[RichText] Using current selection:', selection.toString());
            }

            console.log('[RichText] Selection range count:', selection.rangeCount);

            try {
                const result = document.execCommand(command, false, value);
                console.log('[RichText] execCommand result:', result);

                // Log the HTML after command to see what changed
                console.log('[RichText] Editor HTML after command:', editorDiv.innerHTML);

                // Save the new selection
                if (selection.rangeCount > 0) {
                    savedSelection = selection.getRangeAt(0);
                }
            } catch (error) {
                console.warn('[RichText] Command execution failed:', command, error);
            }
        };

        // Store the handler in a global registry that Alpine can access
        if (!window.__richTextHandlers) {
            window.__richTextHandlers = {};
        }
        window.__richTextHandlers[editorId] = handleToolbarCommand;

        // Create x-data that references the global handler
        toolbarContainer.setAttribute('x-data', `{
            get handleToolbarCommand() {
                return window.__richTextHandlers['${editorId}'];
            }
        }`);

        // Set the toolbar HTML
        toolbarContainer.innerHTML = toolbar.render(editorId);

        console.log('[RichText] Toolbar initialized with global handler for:', editorId);

        // Prevent toolbar mousedown from stealing focus from editor
        toolbarContainer.addEventListener('mousedown', (e) => {
            // Don't prevent default on select elements - they need to open
            if (e.target.tagName === 'SELECT') {
                return;
            }

            // Don't prevent default on color inputs - they use @input which needs the selection intact
            if (e.target.tagName === 'INPUT' && e.target.type === 'color') {
                return;
            }

            // Prevent default on mousedown to keep editor focused
            // This preserves the selection when clicking toolbar buttons
            e.preventDefault();
        });
    }

    /**
     * Create and toggle the blocks sidebar
     * @param {string} editorId - Editor ID
     * @param {boolean} show - Whether to show or hide the sidebar
     */
    toggleBlocksSidebar(editorId, show) {
        const sidebarId = `blocks-sidebar-${editorId}`;
        let sidebar = document.getElementById(sidebarId);

        if (show) {
            // Create sidebar if it doesn't exist
            if (!sidebar) {
                sidebar = this.createBlocksSidebar(editorId);
                document.body.appendChild(sidebar);
            }

            // Show sidebar with animation
            setTimeout(() => {
                sidebar.classList.add('active');
            }, 10);
        } else {
            // Hide sidebar with animation
            if (sidebar) {
                sidebar.classList.remove('active');
                // Remove from DOM after animation completes
                setTimeout(() => {
                    if (sidebar.parentNode) {
                        sidebar.parentNode.removeChild(sidebar);
                    }
                }, 300);
            }
        }
    }

    /**
     * Create the blocks sidebar HTML
     * @param {string} editorId - Editor ID
     * @returns {HTMLElement} Sidebar element
     */
    createBlocksSidebar(editorId) {
        const sidebar = document.createElement('div');
        sidebar.id = `blocks-sidebar-${editorId}`;
        sidebar.className = 'alpineblocks-sidebar';

        // Initialize Alpine components on the sidebar
        sidebar.setAttribute('x-data', `{
            activeTab: 'templates',
            toolbarData: null,
            templatesData: null,
            selectedTemplate: null,
            currentElementStyle: '',
            currentElementTag: '',
            cssProperties: {},
            init() {
                // Initialize toolbar component
                if (window.editorToolbar) {
                    this.toolbarData = window.editorToolbar;
                }
                // Initialize templates component
                if (window.editorTemplatesWithCategories) {
                    this.templatesData = window.editorTemplatesWithCategories();
                    if (this.templatesData.init) {
                        this.templatesData.init.call(this.templatesData);
                    }
                } else if (window.editorTemplates) {
                    this.templatesData = window.editorTemplates();
                    if (this.templatesData.init) {
                        this.templatesData.init.call(this.templatesData);
                    }
                }

                // Listen for template selection events
                document.addEventListener('template-selected', (e) => {
                    this.selectedTemplate = e.detail;
                    this.currentElementStyle = e.detail.currentElementStyle || '';
                    this.currentElementTag = e.detail.currentElementTag || '';
                    this.activeTab = 'properties';
                    this.parseCSSProperties();
                });
            },
            parseCSSProperties() {
                // Parse inline style into individual properties
                const style = this.currentElementStyle || '';
                const props = {};

                console.log('[parseCSSProperties] Input style:', style);

                // Split by semicolon and parse each property
                style.split(';').forEach(prop => {
                    console.log('[parseCSSProperties] Processing prop:', JSON.stringify(prop));
                    const colonIndex = prop.indexOf(':');
                    if (colonIndex === -1) return;

                    const key = prop.substring(0, colonIndex).trim();
                    const value = prop.substring(colonIndex + 1).trim();
                    console.log('[parseCSSProperties] key:', JSON.stringify(key), 'value:', JSON.stringify(value));

                    if (key && value) {
                        // Handle shorthand border property: "2px solid #3b82f6"
                        if (key === 'border') {
                            console.log('[parseCSSProperties] Found border shorthand:', value);
                            // Use simple space split instead of regex - works better
                            const parts = value.split(' ').filter(p => p);
                            console.log('[parseCSSProperties] Border parts:', parts);
                            // Try to identify width, style, and color from the parts
                            parts.forEach(part => {
                                console.log('[parseCSSProperties] Checking part:', part);

                                // Check if it's a border style first (most specific)
                                if (['solid', 'dashed', 'dotted', 'double', 'none', 'hidden', 'groove', 'ridge', 'inset', 'outset'].includes(part)) {
                                    props['border-style'] = part;
                                    console.log('[parseCSSProperties] Set border-style:', part);
                                }
                                // Check if it's a color
                                else if (part.startsWith('#') || part.startsWith('rgb') || part.startsWith('hsl')) {
                                    props['border-color'] = part;
                                    console.log('[parseCSSProperties] Set border-color:', part);
                                }
                                // Check if it's a width - must end with a unit or be 0
                                else {
                                    const widthRegex = new RegExp('^[0-9]+\\.?[0-9]*(px|em|rem|pt|%|vh|vw|vmin|vmax|ch|ex)$');
                                    const isWidth = widthRegex.test(part);
                                    console.log('[parseCSSProperties] Width regex test for "' + part + '":', isWidth);
                                    if (isWidth || part === '0') {
                                        props['border-width'] = part;
                                        console.log('[parseCSSProperties] Set border-width:', part);
                                    } else {
                                        console.log('[parseCSSProperties] Part did not match any pattern:', part);
                                    }
                                }
                            });
                            // Don't store the shorthand property itself
                        }
                        // Handle shorthand padding: "2rem" or "1rem 2rem" etc
                        else if (key === 'padding' && !key.includes('-')) {
                            const parts = value.split(' ').filter(p => p);
                            if (parts.length === 1) {
                                // All sides
                                props['padding-top'] = parts[0];
                                props['padding-right'] = parts[0];
                                props['padding-bottom'] = parts[0];
                                props['padding-left'] = parts[0];
                            } else if (parts.length === 2) {
                                // top/bottom, left/right
                                props['padding-top'] = parts[0];
                                props['padding-bottom'] = parts[0];
                                props['padding-left'] = parts[1];
                                props['padding-right'] = parts[1];
                            } else if (parts.length === 3) {
                                // top, left/right, bottom
                                props['padding-top'] = parts[0];
                                props['padding-right'] = parts[1];
                                props['padding-left'] = parts[1];
                                props['padding-bottom'] = parts[2];
                            } else if (parts.length === 4) {
                                // top, right, bottom, left
                                props['padding-top'] = parts[0];
                                props['padding-right'] = parts[1];
                                props['padding-bottom'] = parts[2];
                                props['padding-left'] = parts[3];
                            }
                            // Don't store the shorthand property itself
                        }
                        // Handle shorthand margin: "2rem" or "1rem 2rem" etc
                        else if (key === 'margin' && !key.includes('-')) {
                            const parts = value.split(' ').filter(p => p);
                            if (parts.length === 1) {
                                // All sides
                                props['margin-top'] = parts[0];
                                props['margin-right'] = parts[0];
                                props['margin-bottom'] = parts[0];
                                props['margin-left'] = parts[0];
                            } else if (parts.length === 2) {
                                // top/bottom, left/right
                                props['margin-top'] = parts[0];
                                props['margin-bottom'] = parts[0];
                                props['margin-left'] = parts[1];
                                props['margin-right'] = parts[1];
                            } else if (parts.length === 3) {
                                // top, left/right, bottom
                                props['margin-top'] = parts[0];
                                props['margin-right'] = parts[1];
                                props['margin-left'] = parts[1];
                                props['margin-bottom'] = parts[2];
                            } else if (parts.length === 4) {
                                // top, right, bottom, left
                                props['margin-top'] = parts[0];
                                props['margin-right'] = parts[1];
                                props['margin-bottom'] = parts[2];
                                props['margin-left'] = parts[3];
                            }
                            // Don't store the shorthand property itself
                        }
                        else {
                            // Regular property - just store it
                            props[key] = value;
                        }
                    }
                });

                console.log('[parseCSSProperties] Final cssProperties:', props);
                this.cssProperties = props;
            },
            updateCSSProperty(property, value) {
                this.cssProperties[property] = value;
                this.applyStyles();
            },
            applyStyles() {
                if (!this.selectedTemplate?.clickedElement) return;

                // Build style string from properties
                const styleString = Object.entries(this.cssProperties)
                    .filter(([k, v]) => v)
                    .map(([k, v]) => k + ': ' + v)
                    .join('; ');

                this.selectedTemplate.clickedElement.setAttribute('style', styleString);
                this.currentElementStyle = styleString;
            }
        }`);

        sidebar.innerHTML = `
            <style>
                .alpineblocks-sidebar {
                    position: fixed;
                    top: 0;
                    left: -280px;
                    width: 280px;
                    height: 100vh;
                    background: white;
                    border-right: 1px solid #e5e7eb;
                    z-index: 9999;
                    transition: left 0.3s ease-in-out;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
                }

                .alpineblocks-sidebar.active {
                    left: 0;
                }

                .alpineblocks-sidebar .panel-header {
                    padding: 1rem 1.25rem;
                    border-bottom: 1px solid #e5e7eb;
                    background: #f9fafb;
                    font-weight: 600;
                    color: #111827;
                    font-size: 0.875rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .alpineblocks-sidebar .panel-tabs {
                    display: flex;
                    border-bottom: 1px solid #e5e7eb;
                    background: #f9fafb;
                }

                .alpineblocks-sidebar .panel-tab {
                    flex: 1;
                    padding: 0.75rem;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: #6b7280;
                    border-bottom: 2px solid transparent;
                }

                .alpineblocks-sidebar .panel-tab.active {
                    color: #2563eb;
                    border-bottom-color: #2563eb;
                    background: white;
                }

                .alpineblocks-sidebar .panel-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                }

                .alpineblocks-sidebar .close-btn {
                    margin-left: auto;
                    background: transparent;
                    border: none;
                    color: #6b7280;
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: 0.25rem;
                    transition: all 0.2s ease;
                }

                .alpineblocks-sidebar .close-btn:hover {
                    background: #e5e7eb;
                    color: #111827;
                }
            </style>

            <div class="panel-header">
                <svg class="size-4" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                </svg>
                Options
                <button class="close-btn" onclick="window.__richTextHandlers['${editorId}']('toggleBlocksSidebar')" type="button">
                    <svg style="width: 1.25rem; height: 1.25rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div class="panel-tabs">
                <!-- Tools tab hidden for mailer templates -->
                <button class="panel-tab"
                        :class="{ 'active': activeTab === 'tools' }"
                        @click="activeTab = 'tools'"
                        title="Tools"
                        type="button"
                        style="display: none;">
                    <svg style="width: 20px; height: 20px; margin: 0 auto; display: block;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                    </svg>
                </button>
                <button class="panel-tab"
                        :class="{ 'active': activeTab === 'templates' }"
                        @click="activeTab = 'templates'"
                        title="Templates"
                        type="button">
                    <svg style="width: 20px; height: 20px; margin: 0 auto; display: block;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"></path>
                    </svg>
                </button>
                <button class="panel-tab"
                        :class="{ 'active': activeTab === 'properties' }"
                        @click="activeTab = 'properties'"
                        title="Properties"
                        type="button">
                    <svg style="width: 20px; height: 20px; margin: 0 auto; display: block;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                </button>
            </div>

            <div class="panel-content" style="overflow-y: auto; flex: 1; min-height: 0;">
                <!-- Tools Tab - Use actual editorToolbar component -->
                <div id="toolbar-${editorId}"
                     x-show="activeTab === 'tools'"
                     x-data="editorToolbar"
                     x-init="$nextTick(() => {
                         // Try to find an AlpineBlocks editor on the page
                         if (window.alpineEditors && Object.keys(window.alpineEditors).length > 0) {
                             const foundEditorId = Object.keys(window.alpineEditors)[0];
                             editor = window.alpineEditors[foundEditorId];
                             editorId = foundEditorId;
                             // Populate tools from the editor
                             tools = editor.getToolbar();
                             console.log('✅ Sidebar toolbar connected to editor:', foundEditorId, 'with', tools.length, 'tools');
                         } else if (window.AlpineBlocks && window.AlpineBlocks.toolModules) {
                             // Fallback: No full editor, but we can show tools from toolModules
                             console.log('⚠️ No AlpineBlocks editor found. Loading tools from toolModules (drag/drop will not work).');
                             tools = Object.keys(window.AlpineBlocks.toolModules).map(key => {
                                 const Block = window.AlpineBlocks.toolModules[key];
                                 const toolbox = Block.toolbox ? Block.toolbox() : {};
                                 return {
                                     name: toolbox.name || key,
                                     icon: toolbox.icon || '🔧',
                                     class: key
                                 };
                             });
                             console.log('Loaded', tools.length, 'tools from toolModules');
                         } else {
                             console.error('❌ Neither AlpineBlocks editor nor toolModules found');
                         }
                     })"
                     style="padding: 1.25rem;">
                    <template x-for="tool in tools" :key="tool.name">
                        <div class="tool-item"
                             draggable="true"
                             @dragstart="handleDragStart($event, tool)"
                             @dragend="handleDragEnd($event)"
                             @dblclick="handleClick($event, tool)"
                             title="Double-click to append to bottom, or drag to position anywhere"
                             style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.375rem; background: white; cursor: pointer; margin-bottom: 0.5rem; transition: all 0.2s ease;"
                             onmouseover="this.style.borderColor='#93c5fd'; this.style.background='#eff6ff'; this.style.transform='translateY(-1px)'"
                             onmouseout="this.style.borderColor='#e5e7eb'; this.style.background='white'; this.style.transform='translateY(0)'">
                            <div class="tool-icon" x-html="tool.icon" style="font-size: 1.125rem; min-width: 20px; text-align: center;"></div>
                            <div class="tool-name" x-text="tool.name" style="font-size: 0.875rem; font-weight: 500; color: #374151;"></div>
                        </div>
                    </template>
                </div>

                <!-- Templates Tab -->
                <div x-show="activeTab === 'templates'"
                     x-data="window.editorTemplatesWithCategories ? window.editorTemplatesWithCategories() : (window.editorTemplates ? window.editorTemplates() : {templates: [], filteredTemplates: [], selectedCategory: 'all', loading: false, init: function() {}})"
                     x-init="init && init()">
                    <div class="templates-section">
                        <div class="templates-header" style="margin-bottom: 1rem;">
                            <div class="templates-filter-section">
                                <label class="filter-label" style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Category:</label>
                                <select class="category-filter w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                                        x-model="selectedCategory"
                                        @change="filterTemplates && filterTemplates()">
                                    <option value="all">All Templates</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="content">Content</option>
                                    <option value="interactive">Interactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="templates-grid">
                            <template x-for="template in filteredTemplates" :key="template.id">
                                <div class="template-item"
                                     style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.375rem; background: white; margin-bottom: 0.5rem; transition: all 0.2s ease;"
                                     onmouseover="this.style.borderColor='#93c5fd'; this.style.background='#eff6ff'; this.style.transform='translateY(-1px)'"
                                     onmouseout="this.style.borderColor='#e5e7eb'; this.style.background='white'; this.style.transform='translateY(0)'">
                                    <div class="template-preview"
                                         draggable="true"
                                         @dragstart="handleTemplateDragStart && handleTemplateDragStart($event, template)"
                                         @dragend="handleTemplateDragEnd && handleTemplateDragEnd($event)"
                                         @click="handleTemplateClick && handleTemplateClick($event, template)"
                                         :data-template="JSON.stringify(template)"
                                         :title="template.description"
                                         style="flex: 1; cursor: pointer;">
                                        <div class="template-header" style="display: flex; align-items: center; gap: 0.5rem;">
                                            <div class="template-icon" x-html="template.icon" style="font-size: 1.125rem; min-width: 20px;"></div>
                                            <div class="template-name" x-text="template.name" style="font-size: 0.875rem; font-weight: 500; color: #374151;"></div>
                                        </div>
                                        <div class="template-description" x-text="template.description" style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;"></div>
                                    </div>
                                    <button @click.stop="$dispatch('open-template-editor', template.id)"
                                            type="button"
                                            title="Edit template"
                                            style="flex-shrink: 0; padding: 0.375rem; border: 1px solid #d1d5db; border-radius: 0.25rem; background: white; color: #6b7280; cursor: pointer; transition: all 0.2s;"
                                            onmouseover="this.style.borderColor='#2563eb'; this.style.color='#2563eb'; this.style.background='#eff6ff';"
                                            onmouseout="this.style.borderColor='#d1d5db'; this.style.color='#6b7280'; this.style.background='white';">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 16px; height: 16px;">
                                            <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                                        </svg>
                                    </button>
                                </div>
                            </template>
                        </div>
                        <div x-show="filteredTemplates.length === 0" style="text-align: center; padding: 2rem 0; color: #9ca3af;">
                            <p x-show="loading" style="font-size: 0.875rem;">Loading templates...</p>
                            <p x-show="!loading && templates.length === 0" style="font-size: 0.875rem;">No templates found. Please check configuration.</p>
                            <p x-show="!loading && templates.length > 0 && filteredTemplates.length === 0" style="font-size: 0.875rem;">No templates found in this category.</p>
                        </div>
                    </div>
                </div>

                <!-- Properties Tab -->
                <div x-show="activeTab === 'properties'">
                    <div x-show="!selectedTemplate" style="text-align: center; padding: 3rem 1rem; color: #9ca3af;">
                        <svg style="width: 48px; height: 48px; margin: 0 auto 1rem; color: #d1d5db;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p style="font-size: 0.875rem; font-weight: 500; color: #6b7280; margin-bottom: 0.5rem;">No template selected</p>
                        <p style="font-size: 0.75rem; color: #9ca3af;">Click on a template in the editor to view its properties</p>
                    </div>

                    <div x-show="selectedTemplate">
                        <!-- CSS Editor Controls -->
                        <div style="margin-bottom: 1.5rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem; background: #fafbfc;">
                            <h3 style="font-size: 0.875rem; font-weight: 600; color: #111827; margin-bottom: 1rem;">Style Controls</h3>

                            <!-- Font Size -->
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Font Size</label>
                                <div style="display: flex; gap: 0.5rem;">
                                    <input type="text"
                                           :value="cssProperties['font-size'] || ''"
                                           @input="updateCSSProperty('font-size', $event.target.value)"
                                           placeholder="e.g. 16px, 1rem"
                                           style="flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                                </div>
                            </div>

                            <!-- Font Weight -->
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Font Weight</label>
                                <select :value="cssProperties['font-weight'] || 'normal'"
                                        @change="updateCSSProperty('font-weight', $event.target.value)"
                                        style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                                    <option value="normal">Normal</option>
                                    <option value="bold">Bold</option>
                                    <option value="100">100 - Thin</option>
                                    <option value="200">200 - Extra Light</option>
                                    <option value="300">300 - Light</option>
                                    <option value="400">400 - Normal</option>
                                    <option value="500">500 - Medium</option>
                                    <option value="600">600 - Semibold</option>
                                    <option value="700">700 - Bold</option>
                                    <option value="800">800 - Extra Bold</option>
                                    <option value="900">900 - Black</option>
                                </select>
                            </div>

                            <!-- Text Color -->
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Text Color</label>
                                <div style="display: flex; gap: 0.5rem; align-items: center;">
                                    <input type="color"
                                           :value="(cssProperties['color'] || '#000000').startsWith('#') ? cssProperties['color'] : '#000000'"
                                           @input="updateCSSProperty('color', $event.target.value)"
                                           style="width: 50px; height: 36px; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer;">
                                    <input type="text"
                                           :value="cssProperties['color'] || ''"
                                           @input="updateCSSProperty('color', $event.target.value)"
                                           placeholder="#000000 or rgb(0,0,0)"
                                           style="flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                                </div>
                            </div>

                            <!-- Background Color/Gradient -->
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Background</label>
                                <div style="display: flex; gap: 0.5rem; align-items: center;">
                                    <input type="color"
                                           :value="((cssProperties['background'] || cssProperties['background-color'] || '#ffffff').match(/#[0-9a-fA-F]{6}/) || ['#ffffff'])[0]"
                                           @input="updateCSSProperty('background', $event.target.value)"
                                           style="width: 50px; height: 36px; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer;">
                                    <input type="text"
                                           :value="cssProperties['background'] || cssProperties['background-color'] || ''"
                                           @input="updateCSSProperty('background', $event.target.value)"
                                           placeholder="Solid color or gradient"
                                           style="flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                                </div>
                            </div>

                            <!-- Text Alignment -->
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Text Alignment</label>
                                <div style="display: flex; gap: 0.25rem;">
                                    <button @click="updateCSSProperty('text-align', 'left')"
                                            :style="'flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer; background: ' + (cssProperties['text-align'] === 'left' ? '#3b82f6' : 'white') + '; color: ' + (cssProperties['text-align'] === 'left' ? 'white' : '#374151')"
                                            type="button"
                                            title="Align Left">
                                        <svg style="width: 16px; height: 16px; margin: 0 auto; display: block;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h14"></path>
                                        </svg>
                                    </button>
                                    <button @click="updateCSSProperty('text-align', 'center')"
                                            :style="'flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer; background: ' + (cssProperties['text-align'] === 'center' ? '#3b82f6' : 'white') + '; color: ' + (cssProperties['text-align'] === 'center' ? 'white' : '#374151')"
                                            type="button"
                                            title="Align Center">
                                        <svg style="width: 16px; height: 16px; margin: 0 auto; display: block;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M7 12h10M5 18h14"></path>
                                        </svg>
                                    </button>
                                    <button @click="updateCSSProperty('text-align', 'right')"
                                            :style="'flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer; background: ' + (cssProperties['text-align'] === 'right' ? '#3b82f6' : 'white') + '; color: ' + (cssProperties['text-align'] === 'right' ? 'white' : '#374151')"
                                            type="button"
                                            title="Align Right">
                                        <svg style="width: 16px; height: 16px; margin: 0 auto; display: block;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M10 12h10M6 18h14"></path>
                                        </svg>
                                    </button>
                                    <button @click="updateCSSProperty('text-align', 'justify')"
                                            :style="'flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer; background: ' + (cssProperties['text-align'] === 'justify' ? '#3b82f6' : 'white') + '; color: ' + (cssProperties['text-align'] === 'justify' ? 'white' : '#374151')"
                                            type="button"
                                            title="Justify">
                                        <svg style="width: 16px; height: 16px; margin: 0 auto; display: block;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Padding & Margin (Box Layout) -->
                            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                                <div style="flex: 1;">
                                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem;">Padding</label>
                                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.125rem;">
                                        <div></div>
                                        <input type="text"
                                               :value="(cssProperties['padding'] || '').split(' ')[0] || cssProperties['padding-top'] || ''"
                                               @input="updateCSSProperty('padding-top', $event.target.value)"
                                               placeholder="T"
                                               title="Padding Top"
                                               style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                                        <div></div>
                                        <input type="text"
                                               :value="(cssProperties['padding'] || '').split(' ')[3] || cssProperties['padding-left'] || ''"
                                               @input="updateCSSProperty('padding-left', $event.target.value)"
                                               placeholder="L"
                                               title="Padding Left"
                                               style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                                        <div style="display: flex; align-items: center; justify-content: center; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 0.125rem; font-size: 0.5rem; color: #9ca3af;">P</div>
                                        <input type="text"
                                               :value="(cssProperties['padding'] || '').split(' ')[1] || cssProperties['padding-right'] || ''"
                                               @input="updateCSSProperty('padding-right', $event.target.value)"
                                               placeholder="R"
                                               title="Padding Right"
                                               style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                                        <div></div>
                                        <input type="text"
                                               :value="(cssProperties['padding'] || '').split(' ')[2] || cssProperties['padding-bottom'] || ''"
                                               @input="updateCSSProperty('padding-bottom', $event.target.value)"
                                               placeholder="B"
                                               title="Padding Bottom"
                                               style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                                        <div></div>
                                    </div>
                                </div>
                                <div style="flex: 1;">
                                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem;">Margin</label>
                                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.125rem;">
                                        <div></div>
                                        <input type="text"
                                               :value="(cssProperties['margin'] || '').split(' ')[0] || cssProperties['margin-top'] || ''"
                                               @input="updateCSSProperty('margin-top', $event.target.value)"
                                               placeholder="T"
                                               title="Margin Top"
                                               style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                                        <div></div>
                                        <input type="text"
                                               :value="(cssProperties['margin'] || '').split(' ')[3] || cssProperties['margin-left'] || ''"
                                               @input="updateCSSProperty('margin-left', $event.target.value)"
                                               placeholder="L"
                                               title="Margin Left"
                                               style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                                        <div style="display: flex; align-items: center; justify-content: center; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 0.125rem; font-size: 0.5rem; color: #9ca3af;">M</div>
                                        <input type="text"
                                               :value="(cssProperties['margin'] || '').split(' ')[1] || cssProperties['margin-right'] || ''"
                                               @input="updateCSSProperty('margin-right', $event.target.value)"
                                               placeholder="R"
                                               title="Margin Right"
                                               style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                                        <div></div>
                                        <input type="text"
                                               :value="(cssProperties['margin'] || '').split(' ')[2] || cssProperties['margin-bottom'] || ''"
                                               @input="updateCSSProperty('margin-bottom', $event.target.value)"
                                               placeholder="B"
                                               title="Margin Bottom"
                                               style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                                        <div></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Position -->
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Position</label>
                                <select :value="cssProperties['position'] || 'static'"
                                        @change="updateCSSProperty('position', $event.target.value)"
                                        style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                                    <option value="static">Static</option>
                                    <option value="relative">Relative</option>
                                    <option value="absolute">Absolute</option>
                                    <option value="fixed">Fixed</option>
                                    <option value="sticky">Sticky</option>
                                </select>
                            </div>

                            <!-- Border -->
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Border</label>
                                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                                    <input type="text"
                                           :value="cssProperties['border-width'] || ''"
                                           @input="updateCSSProperty('border-width', $event.target.value)"
                                           placeholder="Width (e.g. 2px)"
                                           style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                                    <select :value="cssProperties['border-style'] || 'solid'"
                                            @change="updateCSSProperty('border-style', $event.target.value)"
                                            style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                                        <option value="solid">Solid</option>
                                        <option value="dashed">Dashed</option>
                                        <option value="dotted">Dotted</option>
                                        <option value="double">Double</option>
                                        <option value="none">None</option>
                                    </select>
                                    <div style="display: flex; align-items: center; gap: 0.25rem;">
                                        <input type="color"
                                               :value="(cssProperties['border-color'] || '#000000').startsWith('#') ? cssProperties['border-color'] : '#000000'"
                                               @input="updateCSSProperty('border-color', $event.target.value)"
                                               style="width: 40px; height: 36px; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer;">
                                        <input type="text"
                                               :value="cssProperties['border-color'] || ''"
                                               @input="updateCSSProperty('border-color', $event.target.value)"
                                               placeholder="Color"
                                               style="flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                                    </div>
                                </div>
                            </div>

                            <!-- Border Radius -->
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Border Radius</label>
                                <input type="text"
                                       :value="cssProperties['border-radius'] || ''"
                                       @input="updateCSSProperty('border-radius', $event.target.value)"
                                       placeholder="e.g. 1rem, 8px"
                                       style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                            </div>

                            <!-- Box Shadow -->
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Box Shadow</label>
                                <input type="text"
                                       :value="cssProperties['box-shadow'] || ''"
                                       @input="updateCSSProperty('box-shadow', $event.target.value)"
                                       placeholder="e.g. 0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                       style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                            </div>

                            <!-- Dimensions -->
                            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                                <div style="flex: 1;">
                                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Width</label>
                                    <input type="text"
                                           :value="cssProperties['width'] || ''"
                                           @input="updateCSSProperty('width', $event.target.value)"
                                           placeholder="e.g. 100%, auto"
                                           style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                                </div>
                                <div style="flex: 1;">
                                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Height</label>
                                    <input type="text"
                                           :value="cssProperties['height'] || ''"
                                           @input="updateCSSProperty('height', $event.target.value)"
                                           placeholder="e.g. 100%, auto"
                                           style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                                </div>
                            </div>

                            <!-- Display & Flex -->
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Display</label>
                                <select :value="cssProperties['display'] || 'block'"
                                        @change="updateCSSProperty('display', $event.target.value)"
                                        style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                                    <option value="block">Block</option>
                                    <option value="inline">Inline</option>
                                    <option value="inline-block">Inline Block</option>
                                    <option value="flex">Flex</option>
                                    <option value="grid">Grid</option>
                                    <option value="none">None</option>
                                </select>
                            </div>

                            <!-- Flex Direction (shown when display is flex) -->
                            <div style="margin-bottom: 1rem;" x-show="cssProperties['display'] === 'flex'">
                                <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Flex Direction</label>
                                <select :value="cssProperties['flex-direction'] || 'row'"
                                        @change="updateCSSProperty('flex-direction', $event.target.value)"
                                        style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                                    <option value="row">Row</option>
                                    <option value="column">Column</option>
                                    <option value="row-reverse">Row Reverse</option>
                                    <option value="column-reverse">Column Reverse</option>
                                </select>
                            </div>

                            <!-- Transform -->
                            <div style="margin-bottom: 0;">
                                <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Transform</label>
                                <input type="text"
                                       :value="cssProperties['transform'] || ''"
                                       @input="updateCSSProperty('transform', $event.target.value)"
                                       placeholder="e.g. scale(1.05), rotate(10deg)"
                                       style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                            </div>
                        </div>

                        <!-- Inline CSS Editor -->
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="font-size: 0.875rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">Inline CSS</h3>
                            <textarea
                                x-model="currentElementStyle"
                                @input="parseCSSProperties(); applyStyles();"
                                placeholder="Enter CSS properties (e.g., color: #fff; font-size: 16px;)"
                                style="width: 100%; min-height: 120px; font-size: 0.75rem; color: #111827; padding: 0.75rem; background: #f9fafb; border-radius: 0.375rem; border: 1px solid #e5e7eb; font-family: 'Courier New', monospace; resize: vertical;"></textarea>
                        </div>

                        <div style="border-top: 1px solid #e5e7eb; padding-top: 1.5rem;">
                            <h4 style="font-size: 0.875rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem;">Actions</h4>
                            <button
                                @click="if(selectedTemplate?.element) { selectedTemplate.element.scrollIntoView({behavior: 'smooth', block: 'center'}); selectedTemplate.element.style.outline = '2px solid #3b82f6'; setTimeout(() => selectedTemplate.element.style.outline = '', 2000); }"
                                style="width: 100%; background: #f3f4f6; color: #374151; padding: 0.75rem; border-radius: 0.375rem; border: 1px solid #d1d5db; cursor: pointer; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; transition: all 0.2s;"
                                onmouseover="this.style.background='#e5e7eb'"
                                onmouseout="this.style.background='#f3f4f6'">
                                Scroll to Template
                            </button>
                            <button
                                @click="if(selectedTemplate?.element) { if(confirm('Delete this template block?')) { selectedTemplate.element.remove(); selectedTemplate = null; } }"
                                style="width: 100%; background: #fef2f2; color: #dc2626; padding: 0.75rem; border-radius: 0.375rem; border: 1px solid #fecaca; cursor: pointer; font-size: 0.875rem; font-weight: 500; margin-bottom: 1rem; transition: all 0.2s;"
                                onmouseover="this.style.background='#fee2e2'"
                                onmouseout="this.style.background='#fef2f2'">
                                Delete Template
                            </button>

                            <div style="padding: 0.75rem; background: #f9fafb; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                                <div style="font-size: 0.7rem; font-weight: 600; color: #6b7280; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Template Info</div>
                                <div style="font-size: 0.75rem; color: #374151; margin-bottom: 0.25rem;">
                                    <span style="color: #6b7280;">Name:</span> <span x-text="selectedTemplate?.templateName || 'Unknown'"></span>
                                </div>
                                <div style="font-size: 0.75rem; color: #374151; margin-bottom: 0.25rem;">
                                    <span style="color: #6b7280;">ID:</span> <span style="font-family: monospace;" x-text="selectedTemplate?.templateId || 'unknown'"></span>
                                </div>
                                <div style="font-size: 0.75rem; color: #374151;">
                                    <span style="color: #6b7280;">Instance:</span> <span style="font-family: monospace; word-break: break-all;" x-text="selectedTemplate?.instanceId || 'N/A'"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return sidebar;
    }

    /**
     * Setup auto-initialization for elements matching a selector
     * @param {string} selector - CSS selector for elements to auto-initialize
     * @param {object} config - Editor configuration
     */
    setupAutoInit(selector, config = {}) {
        const initEditors = () => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element) => {
                // Check if editor is in a hidden accordion
                const accordion = element.closest('[data-accordion-target="content"]');
                if (accordion && accordion.classList.contains('hidden')) {
                    // Skip hidden editors - they'll be initialized when accordion opens
                    return;
                }

                // Skip if already initialized
                if (this.instances.has(element)) {
                    return;
                }

                this.init(`#${element.id || 'richtext-' + Date.now()}`, config);
            });
        };

        // Initialize on various events
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initEditors);
        } else {
            initEditors();
        }

        // Turbo compatibility
        document.addEventListener('turbo:load', initEditors);
        document.addEventListener('turbo:render', initEditors);

        // Setup accordion compatibility
        this.setupAccordionCompatibility(selector, config);

        // Setup Turbo cleanup
        this.setupTurboCompatibility();
    }

    /**
     * Setup Turbo compatibility
     * Cleans up editors before page cache
     */
    setupTurboCompatibility() {
        document.addEventListener('turbo:before-cache', () => {
            this.removeAll();
        });
    }

    /**
     * Setup accordion compatibility
     * Initializes editors when accordion panels are opened
     * @param {string} selector - CSS selector for elements
     * @param {object} config - Editor configuration options
     */
    setupAccordionCompatibility(selector, config = {}) {
        document.addEventListener('click', (e) => {
            const accordionButton = e.target.closest('[data-action*="accordion#toggle"]');
            if (accordionButton) {
                setTimeout(() => {
                    const accordionElement = accordionButton.closest('[data-controller="accordion"]');
                    if (accordionElement) {
                        const accordionContent = accordionElement.querySelector('[data-accordion-target="content"]');
                        if (accordionContent && !accordionContent.classList.contains('hidden')) {
                            accordionContent.querySelectorAll(selector).forEach((element) => {
                                if (!this.instances.has(element)) {
                                    this.init(`#${element.id}`, config);
                                }
                            });
                        }
                    }
                }, 50);
            }
        });
    }

    /**
     * Remove all editor instances
     */
    removeAll() {
        this.instances.forEach((instance) => {
            if (instance.wrapper) {
                instance.wrapper.remove();
            }
            if (instance.element && instance.element.style) {
                instance.element.style.display = '';
            }
        });
        this.instances.clear();
    }

    /**
     * Remove a specific editor instance
     * @param {string} id - Editor ID or element
     */
    remove(id) {
        const instance = this.instances.get(id);
        if (instance) {
            if (instance.wrapper) {
                instance.wrapper.remove();
            }
            if (instance.element && instance.element.style) {
                instance.element.style.display = '';
            }
            this.instances.delete(instance.id);
            this.instances.delete(instance.element);
        }
    }

    /**
     * Get an editor instance by ID or element
     * @param {string|HTMLElement} idOrElement - Editor ID or element
     * @returns {object|null} Editor instance or null
     */
    getInstance(idOrElement) {
        return this.instances.get(idOrElement) || null;
    }
}

// Export singleton instance
const richTextLoader = new RichTextLoader();

export default richTextLoader;

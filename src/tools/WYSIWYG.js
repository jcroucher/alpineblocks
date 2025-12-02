import Tool from '../core/Tool';
import { CommonEditorToolbar } from '../core/CommonEditorToolbar';

class WYSIWYG extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            content: this.config.content || '<p>Start typing here...</p>',
            format: this.config.format || 'div',
            features: this.config.features || {
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
            }
        };

        this.editorId = `wysiwyg-${this.id}`;
        this.toolbar = null;

        this.settings = [
            {
                name: 'format',
                label: 'Block Format',
                html: `<select @change="trigger('${this.id}', 'format', $event.target.value)">
                    <option value="div" ${this.config.format === 'div' ? 'selected' : ''}>Plain</option>
                    <option value="p" ${this.config.format === 'p' ? 'selected' : ''}>Paragraph</option>
                    <option value="pre" ${this.config.format === 'pre' ? 'selected' : ''}>Preformatted</option>
                </select>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Rich Text',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>',
            category: 'Basic',
            allowRawPreview: false
        };
    }

    init() {
        // Initialize toolbar
        this.toolbar = new CommonEditorToolbar({
            className: 'wysiwyg-toolbar',
            features: this.config.features
        });

        // Inject drop animation styles (once per page load)
        WYSIWYG.injectDropStyles();

        // Export static methods globally (once)
        if (!window.WYSIWYGTool) {
            window.WYSIWYGTool = {
                processDropZones: WYSIWYG.processDropZones,
                cleanHTML: WYSIWYG.cleanHTML
            };
        }
    }

    /**
     * Inject CSS styles for drop indicators and animations
     * This is called once globally to avoid Alpine.js parsing issues
     */
    static injectDropStyles() {
        if (!document.getElementById('wysiwyg-drop-animation')) {
            const style = document.createElement('style');
            style.id = 'wysiwyg-drop-animation';
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
                    border-radius: 4px !important;
                    margin: 4px 0 !important;
                    pointer-events: none !important;
                    position: relative !important;
                    animation: dropPulse 1s ease-in-out infinite, gradientShift 2s linear infinite !important;
                    z-index: 1000 !important;
                }

                .richtext-drop-indicator::before {
                    content: 'DROP HERE' !important;
                    position: absolute !important;
                    top: -20px !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    background: #3b82f6 !important;
                    color: white !important;
                    padding: 2px 12px !important;
                    border-radius: 12px !important;
                    font-size: 11px !important;
                    font-weight: 600 !important;
                    letter-spacing: 1px !important;
                    white-space: nowrap !important;
                    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4) !important;
                }

                @keyframes gradientShift {
                    0% {
                        background-position: 0% 50%;
                    }
                    100% {
                        background-position: 200% 50%;
                    }
                }
            `;
            document.head.appendChild(style);
            console.log('[WYSIWYG] Drop animation styles injected');
        }
    }

    /**
     * Process template HTML to convert <!-- drop --> markers into drop zones
     * @param {string} html - Template HTML content
     * @param {string} parentId - Parent template instance ID
     * @returns {string} Processed HTML with drop zones
     */
    static processDropZones(html, parentId) {
        if (!html || typeof html !== 'string') {
            return html;
        }

        // Find all <!-- drop --> markers
        const dropMarkerRegex = /<!--\s*drop\s*-->/gi;
        const matches = [...html.matchAll(dropMarkerRegex)];

        if (matches.length === 0) {
            return html; // No drop zones, return as-is
        }

        console.log(`[WYSIWYG] Found ${matches.length} drop zone markers in template ${parentId}`);

        // Replace each <!-- drop --> with a styled drop zone div
        let processedHTML = html;
        let zoneIndex = 0;

        processedHTML = processedHTML.replace(dropMarkerRegex, () => {
            const zoneId = `${parentId}-dropzone-${zoneIndex++}`;
            return `<div class="richtext-nested-dropzone"
                         data-zone-id="${zoneId}"
                         data-parent-id="${parentId}"
                         contenteditable="false"
                         style="min-height: 80px;
                                border: 2px dashed #d1d5db;
                                border-radius: 8px;
                                margin: 12px 0;
                                padding: 20px;
                                text-align: center;
                                color: #9ca3af;
                                background: #f9fafb;
                                transition: all 0.2s ease;
                                cursor: pointer;
                                position: relative;">
                <span style="font-size: 14px; font-weight: 500; pointer-events: none;">Drop template here</span>
            </div>`;
        });

        return processedHTML;
    }

    /**
     * Clean HTML by removing temporary elements like drop indicators
     * and converting drop zones back to comments
     */
    static cleanHTML(html) {
        // Create temp div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Remove all drop indicators
        const dropIndicators = tempDiv.querySelectorAll('.richtext-drop-indicator');
        if (dropIndicators.length > 0) {
            console.log(`[WYSIWYG] cleanHTML: Removing ${dropIndicators.length} drop indicator(s)`);
        }
        dropIndicators.forEach(indicator => indicator.remove());

        // Convert EMPTY nested drop zones back to <!-- drop --> comments
        const dropZones = tempDiv.querySelectorAll('.richtext-nested-dropzone');
        let emptyCount = 0;

        dropZones.forEach(zone => {
            // Check if drop zone is empty (only has the placeholder text)
            const textContent = zone.textContent.trim();
            const hasOnlyPlaceholder = textContent === 'Drop template here' || textContent === '';

            if (hasOnlyPlaceholder) {
                // Replace with comment
                const comment = document.createComment(' drop ');
                zone.parentNode.replaceChild(comment, zone);
                emptyCount++;
            }
            // If zone has content (dropped templates), keep it as-is
        });

        if (emptyCount > 0) {
            console.log(`[WYSIWYG] cleanHTML: Converting ${emptyCount} empty drop zone(s) back to comments`);
        }

        return tempDiv.innerHTML;
    }

    editorRender() {
        // Process initial content for drop zones
        let processedContent = this.config.content;
        if (processedContent && processedContent.includes('<!-- drop -->')) {
            processedContent = WYSIWYG.processDropZones(processedContent, this.editorId);
            console.log('[WYSIWYG] Processed drop zones in initial content for', this.editorId);
        }

        // Return editor with toolbar
        return `<div class="wysiwyg-editor-wrapper"
                     style="border: 1px solid #e5e7eb; border-radius: 4px; overflow: hidden;"
                     x-data="{
                        editorId: '${this.editorId}',
                        dropIndicator: null,
                        currentDropTarget: null,
                        insertBefore: true
                     }"
                     x-init="
                        // Setup toolbar command handler and drop handling
                        $nextTick(() => {
                            const editor = document.getElementById('${this.editorId}');
                            if (!editor) return;

                            // Toolbar command handler
                            $el.handleToolbarCommand = (command, value) => {
                                editor.focus();
                                try {
                                    document.execCommand(command, false, value);
                                } catch (error) {
                                    console.warn('Command execution failed:', command, error);
                                }
                            };

                            // Template drop handler
                            editor._richTextDropHandler = async (e) => {
                                console.log('[WYSIWYG] Drop event triggered');
                                const dragDataText = e.dataTransfer.getData('text/plain');

                                try {
                                    const dragData = JSON.parse(dragDataText);
                                    if (dragData.type === 'template' && dragData.data && dragData.data._templateRef) {
                                        const template = window._alpineTemplates?.draggedTemplate;
                                        if (template) {
                                            console.log('[WYSIWYG] Loading template:', template.id);
                                            if (!template.html && template.loadContent) {
                                                await template.loadContent();
                                            }

                                            if (template.html) {
                                                e.preventDefault();
                                                e.stopPropagation();

                                                console.log('[WYSIWYG] Inserting template HTML');

                                                // Generate unique ID for this template instance
                                                const instanceId = 'template-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

                                                // Process template HTML for nested drop zones
                                                const processedHTML = window.WYSIWYGTool.processDropZones(template.html, instanceId);

                                                // Insert at smart position if we have drop indicator
                                                if ($data.dropIndicator && $data.currentDropTarget) {
                                                    const tempDiv = document.createElement('div');
                                                    tempDiv.innerHTML = processedHTML;

                                                    if ($data.insertBefore) {
                                                        $data.currentDropTarget.parentNode.insertBefore(tempDiv.firstChild, $data.currentDropTarget);
                                                    } else {
                                                        if ($data.currentDropTarget.nextSibling) {
                                                            $data.currentDropTarget.parentNode.insertBefore(tempDiv.firstChild, $data.currentDropTarget.nextSibling);
                                                        } else {
                                                            $data.currentDropTarget.parentNode.appendChild(tempDiv.firstChild);
                                                        }
                                                    }
                                                } else {
                                                    // Fallback: insert at cursor
                                                    editor.focus();
                                                    document.execCommand('insertHTML', false, processedHTML);
                                                }

                                                // Remove drop indicator
                                                if ($data.dropIndicator && $data.dropIndicator.parentElement) {
                                                    $data.dropIndicator.remove();
                                                }
                                                $data.dropIndicator = null;
                                                $data.currentDropTarget = null;

                                                // Update block config with cleaned HTML
                                                if (block) {
                                                    block.config.content = window.WYSIWYGTool.cleanHTML(editor.innerHTML);
                                                }

                                                console.log('[WYSIWYG] Template inserted successfully');
                                            }
                                        }
                                    }
                                } catch (error) {
                                    console.warn('[WYSIWYG] Drop handling error:', error);
                                }
                            };

                            // Dragover handler - show drop indicator
                            editor.addEventListener('dragover', (e) => {
                                e.preventDefault();
                                e.dataTransfer.dropEffect = 'copy';

                                // Find which element we're closest to
                                const y = e.clientY;
                                const children = Array.from(editor.children).filter(child =>
                                    !child.classList.contains('richtext-drop-indicator') &&
                                    !child.classList.contains('richtext-nested-dropzone')
                                );

                                let closestElement = null;
                                let closestDistance = Infinity;
                                let shouldInsertBefore = true;

                                children.forEach(child => {
                                    const rect = child.getBoundingClientRect();

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
                                if (!$data.dropIndicator) {
                                    $data.dropIndicator = document.createElement('div');
                                    $data.dropIndicator.className = 'richtext-drop-indicator';
                                    $data.dropIndicator.contentEditable = 'false';
                                }

                                // Position the indicator
                                if (closestElement) {
                                    // Remove indicator from current position
                                    if ($data.dropIndicator.parentElement) {
                                        $data.dropIndicator.remove();
                                    }

                                    // Insert indicator at the new position
                                    if (shouldInsertBefore) {
                                        closestElement.parentNode.insertBefore($data.dropIndicator, closestElement);
                                    } else {
                                        if (closestElement.nextSibling) {
                                            closestElement.parentNode.insertBefore($data.dropIndicator, closestElement.nextSibling);
                                        } else {
                                            closestElement.parentNode.appendChild($data.dropIndicator);
                                        }
                                    }

                                    $data.currentDropTarget = closestElement;
                                    $data.insertBefore = shouldInsertBefore;
                                } else if (children.length === 0) {
                                    // Empty editor - just append
                                    if (!$data.dropIndicator.parentElement) {
                                        editor.appendChild($data.dropIndicator);
                                    }
                                    $data.currentDropTarget = null;
                                    $data.insertBefore = true;
                                }
                            });

                            // Dragleave handler - remove drop indicator
                            editor.addEventListener('dragleave', (e) => {
                                // Only remove if we're leaving the editor completely
                                const relatedTarget = e.relatedTarget;
                                if (!editor.contains(relatedTarget)) {
                                    if ($data.dropIndicator && $data.dropIndicator.parentElement) {
                                        $data.dropIndicator.remove();
                                    }
                                    $data.currentDropTarget = null;
                                }
                            });

                            // Setup nested drop zones using event delegation
                            editor.addEventListener('dragover', (e) => {
                                const dropZone = e.target.closest('.richtext-nested-dropzone');
                                if (dropZone) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.dataTransfer.dropEffect = 'copy';

                                    // Highlight the drop zone
                                    dropZone.style.borderColor = '#3b82f6';
                                    dropZone.style.backgroundColor = '#eff6ff';
                                }
                            }, true);

                            editor.addEventListener('dragleave', (e) => {
                                const dropZone = e.target.closest('.richtext-nested-dropzone');
                                if (dropZone) {
                                    // Only reset if we're actually leaving the zone
                                    if (!dropZone.contains(e.relatedTarget)) {
                                        dropZone.style.borderColor = '#d1d5db';
                                        dropZone.style.backgroundColor = '#f9fafb';
                                    }
                                }
                            }, true);

                            editor.addEventListener('drop', async (e) => {
                                const dropZone = e.target.closest('.richtext-nested-dropzone');
                                if (dropZone) {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    console.log('[WYSIWYG] Nested drop zone drop event');

                                    // Reset drop zone styling
                                    dropZone.style.borderColor = '#d1d5db';
                                    dropZone.style.backgroundColor = '#f9fafb';

                                    const dragDataText = e.dataTransfer.getData('text/plain');

                                    try {
                                        const dragData = JSON.parse(dragDataText);
                                        if (dragData.type === 'template' && dragData.data && dragData.data._templateRef) {
                                            const template = window._alpineTemplates?.draggedTemplate;
                                            if (template) {
                                                console.log('[WYSIWYG] Loading nested template:', template.id);
                                                if (!template.html && template.loadContent) {
                                                    await template.loadContent();
                                                }

                                                if (template.html) {
                                                    const instanceId = 'template-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
                                                    const processedHTML = window.WYSIWYGTool.processDropZones(template.html, instanceId);

                                                    // Create wrapper with contenteditable
                                                    const templateWrapper = document.createElement('div');
                                                    templateWrapper.id = instanceId;
                                                    templateWrapper.setAttribute('contenteditable', 'true');
                                                    templateWrapper.innerHTML = processedHTML;

                                                    // Replace the drop zone placeholder with the template
                                                    dropZone.innerHTML = '';
                                                    dropZone.appendChild(templateWrapper);
                                                    dropZone.style.padding = '0';
                                                    dropZone.style.border = 'none';
                                                    dropZone.style.background = 'transparent';
                                                    dropZone.style.minHeight = 'auto';

                                                    // Update block config
                                                    if (block) {
                                                        block.config.content = window.WYSIWYGTool.cleanHTML(editor.innerHTML);
                                                    }

                                                    console.log('[WYSIWYG] Nested template inserted successfully');
                                                }
                                            }
                                        }
                                    } catch (error) {
                                        console.warn('[WYSIWYG] Nested drop handling error:', error);
                                    }
                                }
                            }, true);
                        });
                     ">
            <!-- Toolbar -->
            <div class="wysiwyg-toolbar-container">
                ${this.toolbar ? this.toolbar.render(this.editorId) : ''}
            </div>

            <!-- Editor -->
            <div id="${this.editorId}"
                 class="wysiwyg-content"
                 contenteditable="true"
                 @blur="if(block) { block.config.content = window.WYSIWYGTool.cleanHTML($el.innerHTML); }"
                 @input="if(block) { block.config.content = window.WYSIWYGTool.cleanHTML($el.innerHTML); }"
                 style="min-height: 200px; padding: 12px; outline: none; background: white;">${processedContent}</div>
        </div>`;
    }

    render() {
        // Clean HTML before rendering
        const cleanContent = WYSIWYG.cleanHTML(this.config.content);
        return `<${this.config.format} class="wysiwyg-content">${cleanContent}</${this.config.format}>`;
    }
}

export default WYSIWYG;

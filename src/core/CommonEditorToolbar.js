/**
 * CommonEditorToolbar - A reusable rich text editing toolbar
 * Extracted from WYSIWYG tool to be used across multiple components
 */
export class CommonEditorToolbar {
    constructor(options = {}) {
        this.options = {
            features: {
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
                fontFamily: true,
                blocks: true,
                undo: true,
                redo: true,
                codeView: true,
                ...options.features
            },
            customTools: options.customTools || [],
            className: options.className || 'common-editor-toolbar',
            onCommand: options.onCommand || null,
            target: options.target || null
        };
    }

    /**
     * Render the toolbar HTML
     * @param {string} targetId - Optional target element ID for commands
     * @returns {string} HTML string for the toolbar
     */
    render(targetId = null) {
        const features = this.options.features;
        const customTools = this.options.customTools;
        
        let toolbarHTML = `<div class="${this.options.className}" style="display: flex; flex-wrap: wrap; align-items: center; gap: 4px; padding: 8px; border-bottom: 1px solid #e5e7eb; background: #f9fafb;">`;

        // Blocks button (special AlpineBlocks feature)
        if (features.blocks) {
            toolbarHTML += '<div class="toolbar-group" style="display: flex; align-items: center; gap: 2px;">';
            toolbarHTML += this.renderBlocksButton();
            toolbarHTML += '</div>';
            toolbarHTML += '<div class="toolbar-separator" style="width: 1px; height: 20px; background: #d1d5db; margin: 0 4px;"></div>';
        }

        // Undo/Redo group
        if (features.undo || features.redo) {
            toolbarHTML += '<div class="toolbar-group" style="display: flex; align-items: center; gap: 2px;">';

            if (features.undo) {
                toolbarHTML += this.renderButton('undo', 'Undo', this.getIcon('undo'), 'Ctrl+Z');
            }

            if (features.redo) {
                toolbarHTML += this.renderButton('redo', 'Redo', this.getIcon('redo'), 'Ctrl+Y');
            }

            toolbarHTML += '</div>';
            toolbarHTML += '<div class="toolbar-separator" style="width: 1px; height: 20px; background: #d1d5db; margin: 0 4px;"></div>';
        }

        // Text formatting group
        if (features.bold || features.italic || features.underline || features.strikethrough) {
            toolbarHTML += '<div class="toolbar-group" style="display: flex; align-items: center; gap: 2px;">';
            
            if (features.bold) {
                toolbarHTML += this.renderButton('bold', 'Bold', this.getIcon('bold'), 'Ctrl+B');
            }
            
            if (features.italic) {
                toolbarHTML += this.renderButton('italic', 'Italic', this.getIcon('italic'), 'Ctrl+I');
            }
            
            if (features.underline) {
                toolbarHTML += this.renderButton('underline', 'Underline', this.getIcon('underline'), 'Ctrl+U');
            }
            
            if (features.strikethrough) {
                toolbarHTML += this.renderButton('strikeThrough', 'Strikethrough', this.getIcon('strikethrough'));
            }
            
            toolbarHTML += '</div>';
        }
        
        // Separator
        if (features.formatBlock && (features.bold || features.italic || features.underline || features.strikethrough)) {
            toolbarHTML += '<div class="toolbar-separator" style="width: 1px; height: 20px; background: #d1d5db; margin: 0 4px;"></div>';
        }
        
        // Format block group
        if (features.formatBlock) {
            toolbarHTML += '<div class="toolbar-group" style="display: flex; align-items: center;">';
            toolbarHTML += this.renderFormatSelect(targetId);
            toolbarHTML += '</div>';
        }
        
        // Separator
        if (features.lists && features.formatBlock) {
            toolbarHTML += '<div class="toolbar-separator" style="width: 1px; height: 20px; background: #d1d5db; margin: 0 4px;"></div>';
        }
        
        // Lists group
        if (features.lists) {
            toolbarHTML += '<div class="toolbar-group" style="display: flex; align-items: center; gap: 2px;">';
            toolbarHTML += this.renderButton('insertUnorderedList', 'Bullet List', this.getIcon('unorderedList'));
            toolbarHTML += this.renderButton('insertOrderedList', 'Numbered List', this.getIcon('orderedList'));
            toolbarHTML += '</div>';
        }
        
        // Separator
        if (features.links && features.lists) {
            toolbarHTML += '<div class="toolbar-separator" style="width: 1px; height: 20px; background: #d1d5db; margin: 0 4px;"></div>';
        }
        
        // Links group
        if (features.links) {
            toolbarHTML += '<div class="toolbar-group" style="display: flex; align-items: center; gap: 2px;">';
            toolbarHTML += this.renderLinkButton();
            toolbarHTML += this.renderButton('unlink', 'Remove Link', this.getIcon('unlink'));
            toolbarHTML += '</div>';
        }
        
        // Separator
        if (features.alignment && features.links) {
            toolbarHTML += '<div class="toolbar-separator" style="width: 1px; height: 20px; background: #d1d5db; margin: 0 4px;"></div>';
        }
        
        // Alignment group
        if (features.alignment) {
            toolbarHTML += '<div class="toolbar-group" style="display: flex; align-items: center; gap: 2px;">';
            toolbarHTML += this.renderButton('justifyLeft', 'Align Left', this.getIcon('alignLeft'));
            toolbarHTML += this.renderButton('justifyCenter', 'Align Center', this.getIcon('alignCenter'));
            toolbarHTML += this.renderButton('justifyRight', 'Align Right', this.getIcon('alignRight'));
            toolbarHTML += this.renderButton('justifyFull', 'Justify', this.getIcon('alignJustify'));
            toolbarHTML += '</div>';
        }
        
        // Separator
        if (features.indentation && features.alignment) {
            toolbarHTML += '<div class="toolbar-separator" style="width: 1px; height: 20px; background: #d1d5db; margin: 0 4px;"></div>';
        }
        
        // Indentation group
        if (features.indentation) {
            toolbarHTML += '<div class="toolbar-group" style="display: flex; align-items: center; gap: 2px;">';
            toolbarHTML += this.renderButton('outdent', 'Decrease Indent', this.getIcon('outdent'));
            toolbarHTML += this.renderButton('indent', 'Increase Indent', this.getIcon('indent'));
            toolbarHTML += '</div>';
        }
        
        // Separator
        if ((features.textColor || features.backgroundColor) && features.indentation) {
            toolbarHTML += '<div class="toolbar-separator" style="width: 1px; height: 20px; background: #d1d5db; margin: 0 4px;"></div>';
        }
        
        // Color group
        if (features.textColor || features.backgroundColor) {
            toolbarHTML += '<div class="toolbar-group" style="display: flex; align-items: center; gap: 2px;">';
            
            if (features.textColor) {
                toolbarHTML += this.renderColorPicker('foreColor', 'Text Color', this.getIcon('textColor'));
            }
            
            if (features.backgroundColor) {
                toolbarHTML += this.renderColorPicker('backColor', 'Background Color', this.getIcon('backgroundColor'));
            }
            
            toolbarHTML += '</div>';
        }
        
        // Separator
        if ((features.fontSize || features.fontFamily) && (features.textColor || features.backgroundColor)) {
            toolbarHTML += '<div class="toolbar-separator" style="width: 1px; height: 20px; background: #d1d5db; margin: 0 4px;"></div>';
        }
        
        // Font group
        if (features.fontSize || features.fontFamily) {
            toolbarHTML += '<div class="toolbar-group" style="display: flex; align-items: center; gap: 4px;">';
            
            if (features.fontFamily) {
                toolbarHTML += this.renderFontFamilySelect();
            }
            
            if (features.fontSize) {
                toolbarHTML += this.renderFontSizeSelect();
            }
            
            toolbarHTML += '</div>';
        }
        
        // Custom tools
        if (customTools.length > 0) {
            toolbarHTML += '<div class="toolbar-separator" style="width: 1px; height: 20px; background: #d1d5db; margin: 0 4px;"></div>';
            toolbarHTML += '<div class="toolbar-group" style="display: flex; align-items: center; gap: 2px;">';

            customTools.forEach(tool => {
                toolbarHTML += this.renderCustomTool(tool);
            });

            toolbarHTML += '</div>';
        }

        // Code View button (always last, on the right)
        if (features.codeView) {
            toolbarHTML += '<div class="toolbar-separator" style="width: 1px; height: 20px; background: #d1d5db; margin: 0 4px;"></div>';
            toolbarHTML += '<div class="toolbar-group" style="display: flex; align-items: center; gap: 2px;">';
            toolbarHTML += this.renderCodeViewButton();
            toolbarHTML += '</div>';
        }

        toolbarHTML += '</div>';

        return toolbarHTML;
    }

    /**
     * Render a toolbar button
     * @param {string} command - The execCommand command
     * @param {string} title - Button title/tooltip
     * @param {string} icon - SVG icon
     * @param {string} shortcut - Keyboard shortcut (optional)
     * @returns {string} Button HTML
     */
    renderButton(command, title, icon, shortcut = '') {
        const tooltipText = shortcut ? `${title} (${shortcut})` : title;

        return `
            <button class="toolbar-btn"
                    @click="handleToolbarCommand('${command}')"
                    title="${tooltipText}"
                    type="button"
                    style="width: 32px; height: 32px; padding: 6px; border: 1px solid #d1d5db; background: white; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                ${icon}
            </button>
        `;
    }

    /**
     * Render the format block selector
     * @param {string} targetId - Target element ID
     * @returns {string} Select HTML
     */
    renderFormatSelect(targetId) {
        return `
            <select class="toolbar-select toolbar-format-block"
                    @change="if ($event.target.value) handleToolbarCommand('formatBlock', $event.target.value)"
                    title="Format"
                    style="width: 100px; height: 32px; padding: 4px 8px; border: 1px solid #d1d5db; background: white; border-radius: 4px; font-size: 12px; flex-shrink: 0;">
                <option value="">Format</option>
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="h5">Heading 5</option>
                <option value="h6">Heading 6</option>
                <option value="blockquote">Quote</option>
            </select>
        `;
    }

    /**
     * Render the blocks button (AlpineBlocks special feature)
     * @returns {string} Button HTML
     */
    renderBlocksButton() {
        return `
            <button class="toolbar-btn toolbar-btn-blocks"
                    @click="alert('🧱 AlpineBlocks Editor Active!')"
                    title="AlpineBlocks Editor"
                    type="button"
                    style="width: auto; min-width: 32px; height: 32px; padding: 6px 12px; border: 1px solid #3b82f6; background: #eff6ff; border-radius: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; flex-shrink: 0; color: #1d4ed8; font-weight: 500; font-size: 13px;">
                ${this.getIcon('blocks')}
                <span>Blocks</span>
            </button>
        `;
    }

    /**
     * Render the code view toggle button
     * @returns {string} Button HTML
     */
    renderCodeViewButton() {
        return `
            <button class="toolbar-btn toolbar-btn-codeview"
                    @click="handleToolbarCommand('toggleCodeView')"
                    title="Toggle Code View"
                    type="button"
                    style="width: 32px; height: 32px; padding: 6px; border: 1px solid #d1d5db; background: white; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                ${this.getIcon('code')}
            </button>
        `;
    }

    /**
     * Render the link button with prompt
     * @returns {string} Button HTML
     */
    renderLinkButton() {
        return `
            <button class="toolbar-btn"
                    @click="handleToolbarCommand('createLink', prompt('Enter link URL'))"
                    title="Insert Link"
                    type="button">
                ${this.getIcon('link')}
            </button>
        `;
    }

    /**
     * Render a color picker button
     * @param {string} command - The color command (foreColor or backColor)
     * @param {string} title - Button title
     * @param {string} icon - Button icon
     * @returns {string} Color picker HTML
     */
    renderColorPicker(command, title, icon) {
        return `
            <div class="toolbar-color-wrapper" style="position: relative; flex-shrink: 0;">
                <input type="color"
                       class="toolbar-color-input toolbar-color-${command}"
                       @input="handleToolbarCommand('${command}', $event.target.value)"
                       title="${title}"
                       value="#000000"
                       style="position: absolute; opacity: 0; width: 32px; height: 32px; cursor: pointer; left: 0; top: 0;">
                <button class="toolbar-btn toolbar-color-btn"
                        onclick="this.previousElementSibling.click(); return false;"
                        title="${title}"
                        type="button"
                        style="width: 32px; height: 32px; padding: 6px; border: 1px solid #d1d5db; background: white; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative;">
                    ${icon}
                </button>
            </div>
        `;
    }

    /**
     * Render font family selector
     * @returns {string} Font family select HTML
     */
    renderFontFamilySelect() {
        return `
            <select class="toolbar-select toolbar-font-family"
                    @change="if ($event.target.value) handleToolbarCommand('fontName', $event.target.value)"
                    title="Font Family"
                    style="width: 120px; height: 32px; padding: 4px 8px; border: 1px solid #d1d5db; background: white; border-radius: 4px; font-size: 12px; flex-shrink: 0;">
                <option value="">Font Family</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Courier New">Courier New</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Arial Black">Arial Black</option>
                <option value="Impact">Impact</option>
            </select>
        `;
    }

    /**
     * Render font size selector
     * @returns {string} Font size select HTML
     */
    renderFontSizeSelect() {
        return `
            <select class="toolbar-select toolbar-font-size"
                    @change="if ($event.target.value) handleToolbarCommand('fontSize', $event.target.value)"
                    title="Font Size"
                    style="width: 70px; height: 32px; padding: 4px 8px; border: 1px solid #d1d5db; background: white; border-radius: 4px; font-size: 12px; flex-shrink: 0;">
                <option value="">Size</option>
                <option value="1">8pt</option>
                <option value="2">10pt</option>
                <option value="3">12pt</option>
                <option value="4">14pt</option>
                <option value="5">18pt</option>
                <option value="6">24pt</option>
                <option value="7">36pt</option>
            </select>
        `;
    }

    /**
     * Render a custom tool
     * @param {Object} tool - Custom tool configuration
     * @returns {string} Tool HTML
     */
    renderCustomTool(tool) {
        const clickHandler = tool.callback || 'console.log("Custom tool clicked")';
        
        return `
            <button class="toolbar-btn toolbar-btn-custom" 
                    @click="${clickHandler}" 
                    title="${tool.title || tool.name}"
                    type="button"
                    style="width: 32px; height: 32px; padding: 6px; border: 1px solid #d1d5db; background: white; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                ${tool.icon || '🔧'}
            </button>
        `;
    }

    /**
     * Get FontAwesome SVG icon for a command
     * @param {string} command - Command name
     * @returns {string} FontAwesome SVG icon
     */
    getIcon(command) {
        const icons = {
            blocks: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512" fill="currentColor"><path d="M192 64v64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H224c-17.7 0-32 14.3-32 32zM82.7 207c-15.3 8.8-20.5 28.4-11.7 43.7l32 55.4c8.8 15.3 28.4 20.5 43.7 11.7l55.4-32c15.3-8.8 20.5-28.4 11.7-43.7l-32-55.4c-8.8-15.3-28.4-20.5-43.7-11.7L82.7 207zM288 192c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H288zM64 352c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V384c0-17.7-14.3-32-32-32H64zM320 384v64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V384c0-17.7-14.3-32-32-32H352c-17.7 0-32 14.3-32 32z"/></svg>',
            code: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 640 512" fill="currentColor"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>',
            bold: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 384 512" fill="currentColor"><path d="M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z"/></svg>',
            italic: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 384 512" fill="currentColor"><path d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"/></svg>',
            underline: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512" fill="currentColor"><path d="M16 64c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H128V224c0 53 43 96 96 96s96-43 96-96V96H304c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H384V224c0 88.4-71.6 160-160 160s-160-71.6-160-160V96H48C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"/></svg>',
            strikethrough: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512" fill="currentColor"><path d="M161.3 144c3.2-17.2 14-30.1 33.7-38.6c21.1-9 51.8-12.3 88.6-6.5c11.9 1.9 48.8 9.1 60.1 12c17.1 4.5 34.6-5.6 39.2-22.7s-5.6-34.6-22.7-39.2c-14.3-3.8-53.6-11.4-66.6-13.4c-44.7-7-88.3-4.2-123.7 10.9c-36.5 15.6-64.4 44.8-71.8 87.3c-.1 .6-.2 1.1-.2 1.7c-2.8 23.9 .5 45.6 10.1 64.6c4.5 9 10.2 16.9 16.7 23.9H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H270.1c-.1 0-.3-.1-.4-.1l-1.1-.3c-36-10.8-65.2-19.6-85.2-33.1c-9.3-6.3-15-12.6-18.2-19.1c-2.8-5.8-3.2-10.8-2.7-14.5zM348.9 337.2c2.7 6.5 4.4 15.8 1.9 25.9c-3.2 17.2-14 30.1-33.7 38.6c-21.1 9-51.8 12.3-88.6 6.5c-18-2.9-49.1-13.5-74.4-22.1c-5.6-1.9-11-3.7-15.9-5.4c-16.8-5.6-34.9 3.5-40.5 20.3s3.5 34.9 20.3 40.5c3.6 1.2 7.9 2.7 12.7 4.3c0 0 0 0 0 0s0 0 0 0c24.9 8.5 63.6 21.7 87.6 25.6c0 0 .1 0 .1 0c44.7 7 88.3 4.2 123.7-10.9c36.5-15.6 64.4-44.8 71.8-87.3c3.6-21 2.7-40.4-3.1-58.1H348.9z"/></svg>',
            unorderedList: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512" fill="currentColor"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>',
            orderedList: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512" fill="currentColor"><path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H48c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48c-13.3 0-24-10.7-24-24zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H48c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>',
            link: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 640 512" fill="currentColor"><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372.1 74 321.1 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>',
            unlink: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 640 512" fill="currentColor"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L489.3 358.2l90.5-90.5c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0l12.5-12.5L38.8 5.1zm149 187.8L235.5 230c-11.8 33-3.9 70 23.3 96.9c31.5 31.5 82.5 31.5 114 0L422.3 277.2c31.5-31.5 31.5-82.5 0-114c-27.9-27.9-71.8-31.5-103.8-8.6l-1.6 1.1c-14.4 10.3-34.4 6.9-44.6-7.4c-10.3-14.4-6.9-34.4 7.4-44.6l1.6-1.1c57.5-41.1 136.3-34.6 186.3 15.4c56.5 56.5 56.5 148 0 204.5L354.5 435.1c-56.5 56.5-148 56.5-204.5 0c-50-50-56.5-128.8-15.4-186.3z"/></svg>',
            alignLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512" fill="currentColor"><path d="M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>',
            alignCenter: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512" fill="currentColor"><path d="M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z"/></svg>',
            alignRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512" fill="currentColor"><path d="M448 64c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>',
            alignJustify: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512" fill="currentColor"><path d="M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z"/></svg>',
            indent: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512" fill="currentColor"><path d="M0 64C0 46.3 14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64zM192 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32zm32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM127.8 268.6L25.8 347.9C15.3 356.1 0 348.6 0 335.3V176.7c0-13.3 15.3-20.8 25.8-12.6l101.9 79.3c8.2 6.4 8.2 18.9 0 25.3z"/></svg>',
            outdent: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512" fill="currentColor"><path d="M0 64C0 46.3 14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64zM192 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32zm32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM25.8 268.6c-8.2-6.4-8.2-18.9 0-25.3L127.8 164c10.5-8.2 25.8-.7 25.8 12.6V335.3c0 13.3-15.3 20.8-25.8 12.6L25.8 268.6z"/></svg>',
            textColor: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 384 512" fill="currentColor"><path d="M221.5 51.7C216.6 39.8 204.9 32 192 32s-24.6 7.8-29.5 19.7l-120 288-40 96c-6.8 16.3 .9 35 17.2 41.8s35-.9 41.8-17.2L93.3 384H290.7l31.8 76.3c6.8 16.3 25.5 24 41.8 17.2s24-25.5 17.2-41.8l-40-96-120-288zM264 320H120l72-172.8L264 320z"/></svg>',
            backgroundColor: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 576 512" fill="currentColor"><path d="M339.3 367.1c27.3-3.9 51.9-19.4 67.2-42.9L568.2 74.1c12.6-19.5 9.4-45.3-7.6-61.2S517.7-4.4 494.1 9.2L262.4 187.2c-24 18-38.2 46.1-38.2 76.1v73.1L339.3 367.1zm-19.6 25.4l-116-104.4C143.9 304.3 96 356.4 96 416c0 53 43 96 96 96s96-43 96-96c0-30.4-14.2-57.7-36.3-75.5zM406.2 416c0 79.5-64.5 144-144 144s-144-64.5-144-144c0-27.7 22.3-50 50-50s50 22.3 50 50c0 30.9 25.1 56 56 56s56-25.1 56-56c0-27.7 22.3-50 50-50s50 22.3 50 50zM192 128c-17.7 0-32-14.3-32-32V32c0-17.7 14.3-32 32-32s32 14.3 32 32V96c0 17.7-14.3 32-32 32z"/></svg>',
            undo: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512" fill="currentColor"><path d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/></svg>',
            redo: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512" fill="currentColor"><path d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/></svg>'
        };
        
        return icons[command] || '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512" fill="currentColor"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>';
    }

    /**
     * Execute a formatting command
     * @param {string} command - The command to execute
     * @param {*} value - Optional value for the command
     * @param {HTMLElement} target - Target element (optional)
     */
    executeCommand(command, value = null, target = null) {
        if (target) {
            target.focus();
        }
        
        try {
            document.execCommand(command, false, value);
        } catch (error) {
            console.warn('Command execution failed:', command, error);
        }
        
        if (this.options.onCommand) {
            this.options.onCommand(command, value);
        }
    }

    /**
     * Add a custom tool to the toolbar
     * @param {Object} tool - Tool configuration
     */
    addCustomTool(tool) {
        if (!tool.name || !tool.callback) {
            console.warn('Custom tool requires name and callback properties');
            return;
        }
        
        this.options.customTools.push({
            name: tool.name,
            title: tool.title || tool.name,
            icon: tool.icon || '🔧',
            callback: tool.callback
        });
    }

    /**
     * Remove a custom tool from the toolbar
     * @param {string} name - Tool name to remove
     */
    removeCustomTool(name) {
        this.options.customTools = this.options.customTools.filter(tool => tool.name !== name);
    }

    /**
     * Enable or disable specific features
     * @param {Object} features - Features to enable/disable
     */
    setFeatures(features) {
        this.options.features = {
            ...this.options.features,
            ...features
        };
    }
}
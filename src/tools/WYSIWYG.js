import Tool from '../core/Tool';
import richTextLoader from '../utils/RichTextLoader';

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

    init(editor) {
        // Call parent init
        super.init(editor);

        // Initialize RichTextLoader on the textarea once it's in the DOM
        if (editor && editor.$nextTick) {
            editor.$nextTick(() => {
                const textarea = document.getElementById(this.editorId);
                if (textarea) {
                    richTextLoader.init(`#${this.editorId}`, {
                        features: this.config.features,
                        height: 200,
                        onChange: (content) => {
                            // Update block config when content changes
                            if (this.config) {
                                this.config.content = content;
                            }
                        }
                    });
                }
            });
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
        }

        return tempDiv.innerHTML;
    }

    editorRender() {
        // Return a simple textarea - RichTextLoader will convert it to a full editor
        // Escape HTML entities for textarea content
        const escapedContent = (this.config.content || '<p>Start typing here...</p>')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

        return `<textarea id="${this.editorId}"
                          style="width: 100%; min-height: 200px; display: none;">${escapedContent}</textarea>`;
    }

    render() {
        // For output rendering, just return the content wrapped in the configured format
        return `<${this.config.format} class="wysiwyg-content">${this.config.content}</${this.config.format}>`;
    }
}

export default WYSIWYG;

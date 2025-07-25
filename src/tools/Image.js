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

import Tool from '../core/Tool';
import { escapeHtml } from '../utils/HtmlEscape';

class Image extends Tool {
    constructor({id, updateFunction, config}) {
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
                name: 'imageUpload',
                label: 'Upload Image',
                html: `<div class="image-upload-section">
                    <input type="file" 
                        id="upload-${this.id}"
                        accept="image/*"
                        @change="uploadImage($event, '${this.id}')"
                        style="display: none;">
                    <button type="button" 
                        class="upload-btn"
                        @click="document.getElementById('upload-${this.id}').click()"
                        style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; margin-bottom: 0.5rem; cursor: pointer;">
                        📁 Choose File
                    </button>
                    <div id="upload-status-${this.id}" style="font-size: 0.875rem; color: #666;"></div>
                </div>`
            },
            {
                name: 'mediaLibrary',
                label: 'Media Library',
                html: `<button type="button" 
                    class="media-library-btn"
                    @click="openMediaLibrary('${this.id}', 'image')"
                    style="background: #10b981; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; margin-bottom: 0.5rem; cursor: pointer; width: 100%;">
                    📚 Browse Media Library
                </button>`
            },
            {
                name: 'imageUrl',
                label: 'Or Image URL',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'src', $event.target.value)"
                    value="${escapeHtml(this.config.src)}"
                    placeholder="Enter image URL">`
            },
            {
                name: 'altText',
                label: 'Alt Text',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'alt', $event.target.value)"
                    value="${escapeHtml(this.config.alt)}"
                    placeholder="Enter alt text">`
            },
            {
                name: 'caption',
                label: 'Caption',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'caption', $event.target.value)"
                    value="${escapeHtml(this.config.caption)}"
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
                    value="${escapeHtml(this.config.width)}"
                    placeholder="auto, 100%, or specific px">`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Image',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>',
            category: 'Media',
            allowRawPreview: true
        };
    }

    editorRender() {
        return `<figure class="image-block" style="text-align: ${this.config.alignment}">
            <img src="${this.config.src}" 
                alt="${this.config.alt}"
                style="width: ${this.config.width}"
                @error="$event.target.src = \`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E\`">
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
                style="width: ${this.config.width}"
                onerror="this.src=&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E&quot;">
            <figcaption>${this.config.caption}</figcaption>
        </figure>`;
    }

    /**
     * Render the image as a template element with data attributes
     * @param {string} toolId - The tool ID for data attributes
     * @returns {string} HTML string with data attributes
     */
    renderTemplateElement(toolId) {
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

export default Image;
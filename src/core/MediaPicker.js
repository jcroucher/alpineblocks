/**
 * MediaPicker modal component for browsing and selecting remote media files
 */
export class MediaPicker {
    constructor(config = {}) {
        this.config = {
            apiUrl: config.apiUrl || null,
            allowUpload: config.allowUpload !== false,
            fileTypes: config.fileTypes || ['all', 'image', 'video'],
            onSelect: config.onSelect || null,
            onUpload: config.onUpload || null
        };
        
        this.currentPath = '/';
        this.currentFilter = 'all';
        this.isOpen = false;
        this.isLoading = false;
        this.items = [];
        this.breadcrumbs = [];
        this.selectedItem = null;
        this.uploadProgress = 0;
    }

    /**
     * Initialize the media picker
     */
    init() {
        this.generateModal();
        this.bindEvents();
    }

    /**
     * Generate the modal HTML
     */
    generateModal() {
        const modalHtml = `
            <div x-data="mediaPicker" 
                 x-show="isOpen" 
                 x-transition:enter="transition ease-out duration-300"
                 x-transition:enter-start="opacity-0"
                 x-transition:enter-end="opacity-100"
                 x-transition:leave="transition ease-in duration-200"
                 x-transition:leave-start="opacity-100"
                 x-transition:leave-end="opacity-0"
                 class="media-picker-overlay"
                 @click.self="close()">
                
                <div class="media-picker-modal"
                     x-transition:enter="transition ease-out duration-300"
                     x-transition:enter-start="opacity-0 transform scale-90"
                     x-transition:enter-end="opacity-100 transform scale-100"
                     x-transition:leave="transition ease-in duration-200"
                     x-transition:leave-start="opacity-100 transform scale-100"
                     x-transition:leave-end="opacity-0 transform scale-90">
                    
                    <div class="media-picker-header">
                        <h2>Media Library</h2>
                        <button @click="close()" class="media-picker-close">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div class="media-picker-toolbar">
                        <div class="media-picker-breadcrumbs">
                            <button @click="navigateToPath('/')" 
                                    class="breadcrumb-item"
                                    :class="{ 'active': currentPath === '/' }">
                                Home
                            </button>
                            <template x-for="(crumb, index) in breadcrumbs" :key="index">
                                <span>
                                    <span class="breadcrumb-separator">/</span>
                                    <button @click="navigateToBreadcrumb(index)" 
                                            class="breadcrumb-item"
                                            :class="{ 'active': index === breadcrumbs.length - 1 }"
                                            x-text="crumb.name"></button>
                                </span>
                            </template>
                        </div>

                        <div class="media-picker-filters">
                            <select @change="filterByType($event.target.value)" 
                                    class="filter-select">
                                <option value="all">All Files</option>
                                <option value="image">Images</option>
                                <option value="video">Videos</option>
                            </select>
                            
                            <button x-show="config.allowUpload" 
                                    @click="showUpload()" 
                                    class="upload-button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                                </svg>
                                Upload
                            </button>
                        </div>
                    </div>

                    <div class="media-picker-content">
                        <div x-show="isLoading" class="media-picker-loading">
                            <div class="spinner"></div>
                            <p>Loading media...</p>
                        </div>

                        <div x-show="!isLoading && items.length === 0" class="media-picker-empty">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                            <p>No media files found</p>
                        </div>

                        <div x-show="!isLoading && items.length > 0" class="media-picker-grid">
                            <template x-for="item in items" :key="item.path">
                                <div @click="selectItem(item)" 
                                     class="media-item"
                                     :class="{ 'selected': selectedItem && selectedItem.path === item.path, 'folder': item.type === 'folder' }">
                                    
                                    <div class="media-item-preview">
                                        <template x-if="item.type === 'folder'">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
                                            </svg>
                                        </template>
                                        
                                        <template x-if="item.type === 'image'">
                                            <img :src="item.thumbnail || item.url" 
                                                 :alt="item.name"
                                                 @error="$event.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\'%3E%3Crect x=\'3\' y=\'3\' width=\'18\' height=\'18\' rx=\'2\' ry=\'2\'/%3E%3Ccircle cx=\'8.5\' cy=\'8.5\' r=\'1.5\'/%3E%3Cpolyline points=\'21 15 16 10 5 21\'/%3E%3C/svg%3E'">
                                        </template>
                                        
                                        <template x-if="item.type === 'video'">
                                            <div class="video-preview">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                                                </svg>
                                            </div>
                                        </template>
                                    </div>
                                    
                                    <div class="media-item-info">
                                        <p class="media-item-name" x-text="item.name"></p>
                                        <p class="media-item-size" x-text="item.size || 'Folder'"></p>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <div x-show="showUploadPanel" class="media-picker-upload">
                            <div class="upload-dropzone" 
                                 @dragover.prevent="dragOver = true"
                                 @dragleave.prevent="dragOver = false"
                                 @drop.prevent="handleDrop($event)"
                                 :class="{ 'drag-over': dragOver }">
                                
                                <input type="file" 
                                       id="media-upload-input"
                                       multiple
                                       :accept="currentFilter === 'image' ? 'image/*' : currentFilter === 'video' ? 'video/*' : '*'"
                                       @change="handleFileSelect($event)"
                                       style="display: none;">
                                
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                                </svg>
                                
                                <h3>Drop files here or click to browse</h3>
                                <p>Supported formats: Images (JPG, PNG, GIF) and Videos (MP4, WebM)</p>
                                
                                <button @click="document.getElementById('media-upload-input').click()" 
                                        class="browse-button">
                                    Browse Files
                                </button>
                            </div>
                            
                            <div x-show="uploadProgress > 0" class="upload-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" :style="'width: ' + uploadProgress + '%'"></div>
                                </div>
                                <p x-text="'Uploading... ' + uploadProgress + '%'"></p>
                            </div>
                        </div>
                    </div>

                    <div class="media-picker-footer">
                        <div class="selected-info">
                            <template x-if="selectedItem && selectedItem.type !== 'folder'">
                                <span>Selected: <strong x-text="selectedItem.name"></strong></span>
                            </template>
                        </div>
                        
                        <div class="action-buttons">
                            <button @click="close()" class="btn-cancel">Cancel</button>
                            <button @click="confirmSelection()" 
                                    :disabled="!selectedItem || selectedItem.type === 'folder'"
                                    class="btn-confirm">
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHtml;
        document.body.appendChild(modalContainer.firstElementChild);
    }

    /**
     * Register Alpine.js component globally
     */
    static registerAlpineComponent() {
        if (window.Alpine && window.Alpine.data && !MediaPicker._registered) {
            MediaPicker._registered = true;
            window.Alpine.data('mediaPicker', () => ({
                isOpen: false,
                isLoading: false,
                items: [],
                breadcrumbs: [],
                currentPath: '/',
                currentFilter: 'all',
                selectedItem: null,
                config: { allowUpload: true },
                showUploadPanel: false,
                uploadProgress: 0,
                dragOver: false,

                init() {
                    // Listen for open events
                    window.addEventListener('open-media-picker', (event) => {
                        this.config = { ...this.config, ...event.detail };
                        this.open();
                    });
                },

                async open() {
                    this.isOpen = true;
                    this.selectedItem = null;
                    this.showUploadPanel = false;
                    await this.loadItems(this.currentPath);
                },

                close() {
                    this.isOpen = false;
                    this.selectedItem = null;
                    this.showUploadPanel = false;
                },

                async loadItems(path) {
                    if (!this.config.browse) {
                        console.error('No browse URL configured for media picker');
                        return;
                    }

                    this.isLoading = true;
                    this.currentPath = path;
                    this.updateBreadcrumbs(path);

                    try {
                        const response = await fetch(this.config.browse, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                path: path,
                                filter: this.currentFilter
                            })
                        });

                        if (!response.ok) throw new Error('Failed to load media');

                        const data = await response.json();
                        this.items = data.items || [];
                    } catch (error) {
                        console.error('Error loading media:', error);
                        this.items = [];
                    } finally {
                        this.isLoading = false;
                    }
                },

                updateBreadcrumbs(path) {
                    if (path === '/') {
                        this.breadcrumbs = [];
                        return;
                    }

                    const parts = path.split('/').filter(p => p);
                    this.breadcrumbs = parts.map((part, index) => ({
                        name: part,
                        path: '/' + parts.slice(0, index + 1).join('/')
                    }));
                },

                navigateToPath(path) {
                    this.loadItems(path);
                },

                navigateToBreadcrumb(index) {
                    const path = this.breadcrumbs[index].path;
                    this.loadItems(path);
                },

                filterByType(type) {
                    this.currentFilter = type;
                    this.loadItems(this.currentPath);
                },

                selectItem(item) {
                    if (item.type === 'folder') {
                        this.loadItems(item.path);
                    } else {
                        this.selectedItem = item;
                    }
                },

                confirmSelection() {
                    if (this.selectedItem && this.config.onSelect) {
                        this.config.onSelect(this.selectedItem);
                    }
                    this.close();
                },

                showUpload() {
                    this.showUploadPanel = true;
                },

                hideUpload() {
                    this.showUploadPanel = false;
                },

                handleDrop(event) {
                    this.dragOver = false;
                    const files = Array.from(event.dataTransfer.files);
                    this.uploadFiles(files);
                },

                handleFileSelect(event) {
                    const files = Array.from(event.target.files);
                    this.uploadFiles(files);
                },

                async uploadFiles(files) {
                    if (!this.config.upload) {
                        console.error('No upload URL configured');
                        return;
                    }

                    for (const file of files) {
                        try {
                            const formData = new FormData();
                            formData.append('file', file);
                            formData.append('path', this.currentPath);

                            this.uploadProgress = 0;

                            const xhr = new XMLHttpRequest();

                            xhr.upload.addEventListener('progress', (event) => {
                                if (event.lengthComputable) {
                                    this.uploadProgress = Math.round((event.loaded / event.total) * 100);
                                }
                            });

                            xhr.addEventListener('load', () => {
                                if (xhr.status === 200) {
                                    this.uploadProgress = 0;
                                    this.loadItems(this.currentPath); // Refresh the list
                                    if (this.config.onUpload) {
                                        this.config.onUpload(JSON.parse(xhr.responseText));
                                    }
                                }
                            });

                            xhr.open('POST', this.config.upload);
                            xhr.send(formData);
                        } catch (error) {
                            console.error('Error uploading files:', error);
                            this.uploadProgress = 0;
                        }
                    }
                }
            }));
        }
    }

    /**
     * Bind Alpine.js data and events
     */
    bindEvents() {
        // Register the component if not already registered
        if (!MediaPicker._registered) {
            MediaPicker.registerAlpineComponent();
        }
    }

    /**
     * Open the media picker
     */
    open(options = {}) {
        window.dispatchEvent(new CustomEvent('open-media-picker', {
            detail: options
        }));
    }
}

// Create singleton instance
export const mediaPicker = new MediaPicker();
/**
 * RemoteLayoutManager - Handles loading layouts from remote sources
 * Supports both JSON block structures and HTML with automatic detection
 */
export class RemoteLayoutManager {
    constructor(config = {}) {
        this.config = {
            source: config.source || 'static', // 'remote' | 'local' | 'static'
            url: config.url || null,
            index: config.index || 'index.json',
            cache: config.cache !== false,
            lazy: config.lazy !== false,
            fallbackLayouts: config.fallbackLayouts || [],
            data: config.data || null // For local data source
        };
        
        this.layoutIndex = null;
        this.layoutCache = new Map();
        this.loading = false;
        this.loadPromise = null;
    }

    /**
     * Initialize the layout manager and load the index
     */
    async init() {
        if (this.loading) {
            return this.loadPromise;
        }

        this.loading = true;
        this.loadPromise = this._loadIndex();
        
        try {
            await this.loadPromise;
        } finally {
            this.loading = false;
        }
        
        return this.layoutIndex;
    }

    /**
     * Load the layout index from remote or local source
     */
    async _loadIndex() {
        try {
            if (this.config.source === 'static') {
                // Use static fallback layouts
                this.layoutIndex = this._createStaticIndex();
                return this.layoutIndex;
            } else if (this.config.source === 'local' && this.config.data) {
                // Use locally provided data
                this.layoutIndex = this.config.data;
                return this.layoutIndex;
            }

            const indexUrl = this._buildUrl(this.config.index);
            console.log(`[RemoteLayoutManager] Loading layout index from: ${indexUrl}`);
            
            const response = await fetch(indexUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            this.layoutIndex = await response.json();
            console.log(`[RemoteLayoutManager] Loaded ${this.layoutIndex.categories?.length || 0} layout categories`);
            
            return this.layoutIndex;
            
        } catch (error) {
            console.warn(`[RemoteLayoutManager] Failed to load remote layouts: ${error.message}`);
            console.log('[RemoteLayoutManager] Falling back to static layouts');
            
            // Fallback to static layouts
            this.layoutIndex = this._createStaticIndex();
            return this.layoutIndex;
        }
    }

    /**
     * Create a static index from fallback layouts
     */
    _createStaticIndex() {
        return {
            version: "1.0",
            source: "static",
            categories: [
                {
                    id: "templates",
                    name: "Templates",
                    description: "Pre-built layout templates",
                    layouts: this.config.fallbackLayouts.map(layout => ({
                        id: layout.id,
                        name: layout.name,
                        description: layout.description,
                        icon: layout.icon,
                        content: layout.content || layout.html,
                        contentType: this._detectContentType(layout.content || layout.html),
                        tags: layout.tags || [],
                        cached: true
                    }))
                }
            ]
        };
    }

    /**
     * Get all available layouts organized by category
     */
    async getLayouts() {
        if (!this.layoutIndex) {
            await this.init();
        }
        
        return this.layoutIndex.categories || [];
    }

    /**
     * Get a specific layout by ID
     */
    async getLayout(layoutId) {
        if (!this.layoutIndex) {
            await this.init();
        }

        // Check cache first
        if (this.layoutCache.has(layoutId)) {
            return this.layoutCache.get(layoutId);
        }

        // Find layout in index
        let layoutInfo = null;
        for (const category of this.layoutIndex.categories || []) {
            layoutInfo = category.layouts.find(l => l.id === layoutId);
            if (layoutInfo) break;
        }

        if (!layoutInfo) {
            throw new Error(`Layout '${layoutId}' not found`);
        }

        // If content is already loaded (static layouts), return it
        if (layoutInfo.content) {
            const layout = this._createLayoutObject(layoutInfo);
            if (this.config.cache) {
                this.layoutCache.set(layoutId, layout);
            }
            return layout;
        }

        // Load content from remote file or local import
        try {
            let layoutData;
            
            if (this.config.source === 'local' && this.config.data) {
                // For local data source, import the JSON file directly
                const layoutModule = await import(`/layouts/layouts/${layoutId}.json`);
                layoutData = layoutModule.default;
            } else {
                // For remote source, fetch from URL
                // If file is null/undefined (database-backed templates), construct URL from layoutId
                let contentUrl;
                if (layoutInfo.file) {
                    contentUrl = this._buildUrl(layoutInfo.file);
                } else {
                    // Database-backed template: use layoutId + template_json endpoint
                    contentUrl = this._buildUrl(`${layoutId}/template_json`);
                }

                console.log(`[RemoteLayoutManager] Loading layout content: ${contentUrl}`);

                const response = await fetch(contentUrl);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                layoutData = await response.json();
            }
            const layout = this._createLayoutObject({
                ...layoutInfo,
                ...layoutData
            });
            
            if (this.config.cache) {
                this.layoutCache.set(layoutId, layout);
            }
            
            return layout;
            
        } catch (error) {
            console.error(`[RemoteLayoutManager] Failed to load layout '${layoutId}': ${error.message}`);
            throw error;
        }
    }

    /**
     * Create a layout object with proper structure
     */
    _createLayoutObject(layoutInfo) {
        const contentType = layoutInfo.contentType || this._detectContentType(layoutInfo.content || layoutInfo.html);
        
        return {
            id: layoutInfo.id,
            name: layoutInfo.name,
            description: layoutInfo.description,
            icon: layoutInfo.icon,
            content: layoutInfo.content || layoutInfo.html,
            contentType: contentType,
            blocks: contentType === 'html' ? null : layoutInfo.blocks,
            tags: layoutInfo.tags || [],
            version: layoutInfo.version || '1.0',
            extractBlocks: () => {
                if (contentType === 'html') {
                    return this._convertHtmlToBlocks(layoutInfo.content || layoutInfo.html);
                }
                return layoutInfo.blocks || [];
            }
        };
    }

    /**
     * Detect whether content is HTML or block structure
     */
    _detectContentType(content) {
        if (!content) return 'blocks';
        
        if (typeof content === 'string') {
            // Check if it looks like HTML
            const trimmed = content.trim();
            if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
                return 'html';
            }
        }
        
        if (Array.isArray(content)) {
            return 'blocks';
        }
        
        return 'html'; // Default to HTML for string content
    }

    /**
     * Convert HTML content to block structure for compatibility
     */
    _convertHtmlToBlocks(htmlContent) {
        // Create a temporary Raw block that contains the HTML
        return [
            {
                type: 'raw',
                data: {
                    content: htmlContent,
                    mode: 'html',
                    showPreview: true,
                    validateHtml: false
                }
            }
        ];
    }

    /**
     * Build full URL for remote resources
     */
    _buildUrl(path) {
        if (!path) return null;
        
        // If path is already a full URL, return as-is
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        
        // If no base URL configured, treat as local path
        if (!this.config.url) {
            return path;
        }
        
        // Combine base URL with path
        const baseUrl = this.config.url.endsWith('/') ? this.config.url : `${this.config.url}/`;
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        
        return `${baseUrl}${cleanPath}`;
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.layoutCache.clear();
    }

    /**
     * Get cache stats
     */
    getCacheStats() {
        return {
            size: this.layoutCache.size,
            keys: Array.from(this.layoutCache.keys())
        };
    }
}
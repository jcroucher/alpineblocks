import Tool from '../core/Tool';

class VideoPlayer extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            url: this.config.url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            type: this.config.type || 'youtube', // youtube, vimeo, direct
            autoplay: this.config.autoplay || false,
            controls: this.config.controls || true,
            muted: this.config.muted || false,
            loop: this.config.loop || false,
            aspectRatio: this.config.aspectRatio || '16:9', // 16:9, 4:3, 1:1
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

        switch (this.config.type) {
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
        return (match && match[2].length === 11) ? match[2] : '';
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

export default VideoPlayer;

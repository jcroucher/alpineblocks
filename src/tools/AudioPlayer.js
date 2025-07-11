import Tool from '../core/Tool';

class AudioPlayer extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            url: this.config.url || 'https://open.spotify.com/track/0ouSkB2t2fGeW60MPcvmXl',
            type: this.config.type || 'spotify', // file, spotify, soundcloud
            autoplay: this.config.autoplay || false,
            controls: this.config.controls || true,
            loop: this.config.loop || false,
            title: this.config.title || 'Never Gonna Give You Up',
            artist: this.config.artist || 'Rick Astley',
            showMetadata: this.config.showMetadata || true
        };

        this.settings = [
            {
                name: 'url',
                label: 'Audio URL',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'url', $event.target.value)"
                    :value="block.config.url"
                    placeholder="Enter audio URL">`
            },
            {
                name: 'type',
                label: 'Audio Type',
                html: `<select @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="file">Audio File</option>
                    <option value="spotify">Spotify</option>
                    <option value="soundcloud">SoundCloud</option>
                </select>`
            },
            {
                name: 'metadata',
                label: 'Metadata',
                html: `<div>
                    <input type="text" 
                        @change="trigger('${this.id}', 'title', $event.target.value)"
                        :value="block.config.title"
                        placeholder="Title">
                    <input type="text" 
                        @change="trigger('${this.id}', 'artist', $event.target.value)"
                        :value="block.config.artist"
                        placeholder="Artist">
                </div>`
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
                name: 'showMetadata',
                label: 'Show Metadata',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showMetadata', $event.target.checked)"
                        :checked="block.config.showMetadata">
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

        switch (this.config.type) {
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

export default AudioPlayer;

import Tool from '../core/Tool';

class Carousel extends Tool {
    constructor({id, updateFunction, config}) {
        super(id, updateFunction, config);

        this.config = {
            slides: this.config.slides || [
                { image: '', caption: '' }
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
                        :checked="block.config.autoplay">
                    Autoplay
                </label>`
            },
            {
                name: 'interval',
                label: 'Interval (ms)',
                html: `<input type="number" 
                    @change="trigger('${this.id}', 'interval', $event.target.value)"
                    :value="block.config.interval"
                    min="1000"
                    step="500">`
            },
            {
                name: 'showArrows',
                label: 'Show Arrows',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showArrows', $event.target.checked)"
                        :checked="block.config.showArrows">
                    Show Arrows
                </label>`
            },
            {
                name: 'showDots',
                label: 'Show Dots',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showDots', $event.target.checked)"
                        :checked="block.config.showDots">
                    Show Dots
                </label>`
            },
            {
                name: 'showCaptions',
                label: 'Show Captions',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showCaptions', $event.target.checked)"
                        :checked="block.config.showCaptions">
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
        const slides = this.config.slides.map((slide, index) => {
            const imageInput = `
                <div class="image-input" x-show="!block.config.slides[${index}].image">
                    <input type="text" 
                        placeholder="Enter image URL"
                        @change="block.config.slides[${index}].image = $event.target.value">
                </div>`;
            
            const image = `
                <img x-show="block.config.slides[${index}].image"
                    :src="block.config.slides[${index}].image"
                    alt="Slide ${index + 1}">`;
            
            const caption = this.config.showCaptions ? `
                <div class="carousel-caption"
                    contenteditable="true"
                    x-html="block.config.slides[${index}].caption"
                    @blur="block.config.slides[${index}].caption = $event.target.innerHTML">${slide.caption || ''}</div>` : '';

            return `
                <div class="carousel-slide" x-show="currentSlide === ${index}">
                    ${imageInput}
                    ${image}
                    ${caption}
                </div>`;
        }).join('');

        const arrows = this.config.showArrows ? `
            <button class="carousel-prev" 
                @click="currentSlide = (currentSlide - 1 + block.config.slides.length) % block.config.slides.length">
                ←
            </button>
            <button class="carousel-next" 
                @click="currentSlide = (currentSlide + 1) % block.config.slides.length">
                →
            </button>` : '';

        const dots = this.config.showDots ? `
            <div class="carousel-dots">
                ${this.config.slides.map((_, index) => `
                    <button class="carousel-dot"
                        :class="{ active: currentSlide === ${index} }"
                        @click="currentSlide = ${index}"></button>
                `).join('')}
            </div>` : '';

        return `
            <div class="carousel-block" x-data="{ currentSlide: 0 }">
                <div class="carousel-container">
                    ${slides}
                    ${arrows}
                </div>
                ${dots}
                <div class="carousel-controls">
                    <button @click="block.config.slides.push({ image: '', caption: '' })">Add Slide</button>
                    <button x-show="block.config.slides.length > 1"
                        @click="block.config.slides.splice(currentSlide, 1); currentSlide = Math.min(currentSlide, block.config.slides.length - 1)">
                        Remove Current Slide
                    </button>
                </div>
            </div>`;
    }

    render() {
        const slides = this.config.slides.map((slide, index) => `
            <div class="carousel-slide">
                <img src="${slide.image}" alt="Slide ${index + 1}">
                ${this.config.showCaptions && slide.caption ? `
                    <div class="carousel-caption">${slide.caption}</div>
                ` : ''}
            </div>
        `).join('');

        const arrows = this.config.showArrows ? `
            <button class="carousel-prev">←</button>
            <button class="carousel-next">→</button>
        ` : '';

        const dots = this.config.showDots ? `
            <div class="carousel-dots">
                ${this.config.slides.map((_, index) => `
                    <button class="carousel-dot"></button>
                `).join('')}
            </div>
        ` : '';

        return `
            <div class="carousel-block">
                <div class="carousel-container">
                    ${slides}
                    ${arrows}
                </div>
                ${dots}
            </div>`;
    }
}

export default Carousel;

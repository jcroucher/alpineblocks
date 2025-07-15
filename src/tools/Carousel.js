import Tool from '../core/Tool';
import { escapeHtml } from '../utils/HtmlEscape';

// Define global Alpine.js functions for carousel functionality
if (typeof window !== 'undefined') {
    window.carouselEditor = function() {
        return {
            currentSlide: 0,
            slides: [],
            autoplayInterval: null,
            
            init(slidesData, autoplay, interval) {
                this.slides = slidesData || [];
                if (autoplay && this.slides.length > 1) {
                    this.startAutoplay(interval);
                }
            },
            
            initFromData() {
                const slidesData = JSON.parse(this.$el.getAttribute('data-slides') || '[]');
                const autoplay = this.$el.getAttribute('data-autoplay') === 'true';
                const interval = parseInt(this.$el.getAttribute('data-interval') || '5000');
                this.init(slidesData, autoplay, interval);
            },
            
            startAutoplay(interval = 5000) {
                if (this.autoplayInterval) clearInterval(this.autoplayInterval);
                this.autoplayInterval = setInterval(() => {
                    this.nextSlide();
                }, interval);
            },
            
            stopAutoplay() {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                    this.autoplayInterval = null;
                }
            },
            
            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            },
            
            prevSlide() {
                this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            },
            
            goToSlide(index) {
                this.currentSlide = index;
            },
            
            updateSlideImage(index, value) {
                if (this.slides[index]) {
                    this.slides[index] = { ...this.slides[index], image: value };
                    this.$dispatch('slide-updated', { slides: this.slides });
                }
            },
            
            updateSlideCaption(index, value) {
                if (this.slides[index]) {
                    this.slides[index] = { ...this.slides[index], caption: value };
                    this.$dispatch('slide-updated', { slides: this.slides });
                }
            },
            
            addSlide() {
                this.slides.push({ image: '', caption: '' });
                this.$dispatch('slide-updated', { slides: this.slides });
            },
            
            removeSlide() {
                if (this.slides.length > 1) {
                    this.slides.splice(this.currentSlide, 1);
                    this.currentSlide = Math.min(this.currentSlide, this.slides.length - 1);
                    this.$dispatch('slide-updated', { slides: this.slides });
                }
            }
        };
    };
    
    window.carouselViewer = function() {
        return {
            currentSlide: 0,
            slidesCount: 0,
            autoplayInterval: null,
            
            init(count, autoplay, interval) {
                this.slidesCount = count;
                if (autoplay && count > 1) {
                    this.startAutoplay(interval);
                }
            },
            
            initFromData() {
                const count = parseInt(this.$el.getAttribute('data-slides-count') || '0');
                const autoplay = this.$el.getAttribute('data-autoplay') === 'true';
                const interval = parseInt(this.$el.getAttribute('data-interval') || '5000');
                this.init(count, autoplay, interval);
            },
            
            startAutoplay(interval = 5000) {
                if (this.autoplayInterval) clearInterval(this.autoplayInterval);
                this.autoplayInterval = setInterval(() => {
                    this.nextSlide();
                }, interval);
            },
            
            stopAutoplay() {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                    this.autoplayInterval = null;
                }
            },
            
            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.slidesCount;
            },
            
            prevSlide() {
                this.currentSlide = (this.currentSlide - 1 + this.slidesCount) % this.slidesCount;
            },
            
            goToSlide(index) {
                this.currentSlide = index;
            }
        };
    };
}

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
                        ${this.config.autoplay ? 'checked' : ''}>
                    Autoplay
                </label>`
            },
            {
                name: 'interval',
                label: 'Interval (ms)',
                html: `<input type="number" 
                    @change="trigger('${this.id}', 'interval', $event.target.value)"
                    value="${this.config.interval}"
                    min="1000"
                    step="500">`
            },
            {
                name: 'showArrows',
                label: 'Show Arrows',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showArrows', $event.target.checked)"
                        ${this.config.showArrows ? 'checked' : ''}>
                    Show Arrows
                </label>`
            },
            {
                name: 'showDots',
                label: 'Show Dots',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showDots', $event.target.checked)"
                        ${this.config.showDots ? 'checked' : ''}>
                    Show Dots
                </label>`
            },
            {
                name: 'showCaptions',
                label: 'Show Captions',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showCaptions', $event.target.checked)"
                        ${this.config.showCaptions ? 'checked' : ''}>
                    Show Captions
                </label>`
            }
        ];
    }

    static toolbox() {
        return {
            name: 'Carousel',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>',
            category: 'Media',
            allowRawPreview: false
        };
    }

    editorRender() {
        const slides = this.config.slides.map((slide, index) => {
            const imageInput = `
                <div class="image-input" ${!slide.image ? '' : 'style="display: none;"'}>
                    <input type="text" 
                        placeholder="Enter image URL"
                        value="${slide.image || ''}"
                        @change="updateSlideImage(${index}, $event.target.value)">
                </div>`;
            
            const image = slide.image ? `
                <img src="${slide.image}" alt="Slide ${index + 1}">
            ` : '';
            
            const caption = this.config.showCaptions ? `
                <div class="carousel-caption"
                    contenteditable="true"
                    @blur="updateSlideCaption(${index}, $event.target.innerHTML)">${slide.caption || ''}</div>
            ` : '';

            return `
                <div class="carousel-slide" x-show="currentSlide === ${index}">
                    ${imageInput}
                    ${image}
                    ${caption}
                </div>`;
        }).join('');

        const arrows = this.config.showArrows ? `
            <button class="carousel-prev" @click="prevSlide()">
                ←
            </button>
            <button class="carousel-next" @click="nextSlide()">
                →
            </button>
        ` : '';

        const dots = this.config.showDots ? `
            <div class="carousel-dots">
                ${this.config.slides.map((_, index) => `
                    <button class="carousel-dot"
                        :class="{ active: currentSlide === ${index} }"
                        @click="goToSlide(${index})"></button>
                `).join('')}
            </div>
        ` : '';

        // Store slides data in a data attribute instead of passing as parameter
        const slideDataAttr = JSON.stringify(this.config.slides).replace(/"/g, '&quot;');
        
        return `
            <div class="carousel-block" 
                 x-data="carouselEditor()" 
                 data-slides='${slideDataAttr}'
                 data-autoplay="${this.config.autoplay}"
                 data-interval="${this.config.interval}"
                 x-init="initFromData()"
                 ${this.config.autoplay ? '@mouseenter="stopAutoplay()" @mouseleave="startAutoplay(' + this.config.interval + ')"' : ''}>
                
                <div class="carousel-container">
                    ${slides}
                    ${arrows}
                </div>
                
                ${dots}
                
                <div class="carousel-controls">
                    <button @click="addSlide()" class="btn btn-primary">
                        Add Slide
                    </button>
                    <button x-show="slides.length > 1" 
                            @click="removeSlide()" 
                            class="btn btn-secondary">
                        Remove Current Slide
                    </button>
                </div>
            </div>`;
    }

    render() {
        const slides = this.config.slides
            .filter(slide => slide.image) // Only show slides with images
            .map((slide, index) => `
                <div class="carousel-slide">
                    <img src="${slide.image}" alt="Slide ${index + 1}" loading="lazy">
                    ${this.config.showCaptions && slide.caption ? `
                        <div class="carousel-caption">${slide.caption}</div>
                    ` : ''}
                </div>
            `).join('');

        const arrows = this.config.showArrows ? `
            <button class="carousel-prev" 
                    @click="prevSlide()" 
                    aria-label="Previous slide">←</button>
            <button class="carousel-next" 
                    @click="nextSlide()" 
                    aria-label="Next slide">→</button>
        ` : '';

        const dots = this.config.showDots ? `
            <div class="carousel-dots" role="tablist">
                ${this.config.slides
                    .filter(slide => slide.image)
                    .map((_, index) => `
                        <button class="carousel-dot" 
                                :class="{ active: currentSlide === ${index} }"
                                @click="goToSlide(${index})"
                                role="tab" 
                                aria-label="Go to slide ${index + 1}"></button>
                    `).join('')}
            </div>
        ` : '';

        const validSlides = this.config.slides.filter(slide => slide.image);
        const slidesCount = validSlides.length;

        if (slidesCount === 0) {
            return `<div class="carousel-block carousel-empty">
                <p>No images added to carousel</p>
            </div>`;
        }

        return `
            <div class="carousel-block" 
                 x-data="carouselViewer()" 
                 data-slides-count="${slidesCount}"
                 data-autoplay="${this.config.autoplay}"
                 data-interval="${this.config.interval}"
                 x-init="initFromData()"
                 ${this.config.autoplay ? '@mouseenter="stopAutoplay()" @mouseleave="startAutoplay(' + this.config.interval + ')"' : ''}
                 role="region" 
                 aria-label="Image carousel">
                
                <div class="carousel-container">
                    ${slides}
                    ${arrows}
                </div>
                
                ${dots}
            </div>`;
    }

    /**
     * Render the carousel as a template element with data attributes
     * @param {string} toolId - The tool ID for data attributes
     * @returns {string} HTML string with data attributes
     */
    renderTemplateElement(toolId) {
        const slides = this.config.slides
            .filter(slide => slide.image) // Only show slides with images
            .map((slide, index) => `
                <div class="carousel-slide">
                    <img src="${slide.image}" alt="Slide ${index + 1}" loading="lazy">
                    ${this.config.showCaptions && slide.caption ? `
                        <div class="carousel-caption">${slide.caption}</div>
                    ` : ''}
                </div>
            `).join('');

        const arrows = this.config.showArrows ? `
            <button class="carousel-prev" aria-label="Previous slide">←</button>
            <button class="carousel-next" aria-label="Next slide">→</button>
        ` : '';

        const dots = this.config.showDots ? `
            <div class="carousel-dots" role="tablist">
                ${this.config.slides
                    .filter(slide => slide.image)
                    .map((_, index) => `
                        <button class="carousel-dot${index === 0 ? ' active' : ''}" 
                                role="tab" 
                                aria-label="Go to slide ${index + 1}"></button>
                    `).join('')}
            </div>
        ` : '';

        const validSlides = this.config.slides.filter(slide => slide.image);
        const slidesCount = validSlides.length;

        if (slidesCount === 0) {
            return `<div 
                data-tool="Carousel" 
                data-tool-id="${toolId}"
                class="carousel-block carousel-empty" 
                style="cursor: pointer;">
                <p>No images added to carousel</p>
            </div>`;
        }

        return `<div 
            data-tool="Carousel" 
            data-tool-id="${toolId}"
            class="carousel-block" 
            style="cursor: pointer;"
            role="region" 
            aria-label="Image carousel">
            
            <div class="carousel-container">
                ${slides}
                ${arrows}
            </div>
            
            ${dots}
        </div>`;
    }
}

export default Carousel;

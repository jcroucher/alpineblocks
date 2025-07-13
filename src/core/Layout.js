class Layout {
    constructor(id, name, icon, html, description = '') {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.html = html;
        this.description = description;
    }

    // Method to parse the HTML and extract tool blocks
    extractBlocks() {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.html, 'text/html');
        const blocks = [];
        
        // Find all elements with data-block attribute
        const blockElements = doc.querySelectorAll('[data-block]');
        
        blockElements.forEach((element, index) => {
            const blockType = element.getAttribute('data-block');
            const config = {};
            
            // Extract configuration from data attributes
            Array.from(element.attributes).forEach(attr => {
                if (attr.name.startsWith('data-config-')) {
                    const configKey = attr.name.replace('data-config-', '');
                    config[configKey] = attr.value;
                }
            });
            
            // Special handling for different block types
            switch (blockType) {
                case 'paragraph':
                    config.content = element.innerHTML;
                    break;
                case 'header':
                    config.content = element.textContent;
                    config.level = element.tagName.toLowerCase();
                    break;
                case 'image':
                    const img = element.querySelector('img');
                    if (img) {
                        config.src = img.src;
                        config.alt = img.alt;
                    }
                    const caption = element.querySelector('figcaption');
                    if (caption) {
                        config.caption = caption.textContent;
                    }
                    break;
                case 'quote':
                    const quoteContent = element.querySelector('.quote-content');
                    const quoteAttribution = element.querySelector('.quote-attribution');
                    if (quoteContent) config.content = quoteContent.textContent;
                    if (quoteAttribution) config.attribution = quoteAttribution.textContent;
                    break;
            }
            
            blocks.push({
                type: blockType,
                data: config
            });
        });
        
        return blocks;
    }

    // Static method to get all predefined layouts
    static getAll() {
        return [
            new Layout(
                'hero-section',
                'Hero Section',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>',
                `<div class="hero-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4rem 2rem; text-align: center; color: white;">
                    <h1 data-block="header" data-config-level="h1" data-config-textColor="#ffffff" data-config-fontSize="xlarge" data-config-alignment="center">Welcome to Our Platform</h1>
                    <p data-block="paragraph" data-config-fontSize="large" data-config-textColor="#ffffff" data-config-alignment="center">Discover amazing features and unleash your creativity with our powerful tools.</p>
                    <div data-block="button" data-config-text="Get Started" data-config-style="primary" data-config-size="large" data-config-alignment="center"></div>
                </div>`,
                'A complete hero section with headline, description, and call-to-action button'
            ),
            new Layout(
                'feature-grid',
                'Feature Grid',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
                `<div class="feature-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; padding: 2rem;">
                    <div class="feature-card" style="background: #f8f9fa; padding: 2rem; border-radius: 8px; text-align: center;">
                        <div data-block="image" data-config-src="https://placecats.com/millie/300/200" data-config-alt="Feature 1" data-config-width="100%"></div>
                        <h3 data-block="header" data-config-level="h3" data-config-alignment="center">Feature One</h3>
                        <p data-block="paragraph" data-config-alignment="center">Description of your amazing feature goes here.</p>
                    </div>
                    <div class="feature-card" style="background: #f8f9fa; padding: 2rem; border-radius: 8px; text-align: center;">
                        <div data-block="image" data-config-src="https://placecats.com/millie/300/200" data-config-alt="Feature 2" data-config-width="100%"></div>
                        <h3 data-block="header" data-config-level="h3" data-config-alignment="center">Feature Two</h3>
                        <p data-block="paragraph" data-config-alignment="center">Description of your amazing feature goes here.</p>
                    </div>
                    <div class="feature-card" style="background: #f8f9fa; padding: 2rem; border-radius: 8px; text-align: center;">
                        <div data-block="image" data-config-src="https://placecats.com/millie/300/200" data-config-alt="Feature 3" data-config-width="100%"></div>
                        <h3 data-block="header" data-config-level="h3" data-config-alignment="center">Feature Three</h3>
                        <p data-block="paragraph" data-config-alignment="center">Description of your amazing feature goes here.</p>
                    </div>
                </div>`,
                'A responsive grid layout showcasing three features with images and descriptions'
            ),
            new Layout(
                'testimonial-section',
                'Testimonial Section',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>',
                `<div class="testimonial-section" style="background: #f8f9fa; padding: 4rem 2rem;">
                    <h2 data-block="header" data-config-level="h2" data-config-alignment="center" data-config-fontSize="large">What Our Customers Say</h2>
                    <div style="max-width: 800px; margin: 0 auto;">
                        <div data-block="quote" data-config-style="testimonial" data-config-alignment="center" data-config-fontSize="large" data-config-content="This platform has completely transformed how we work. The tools are intuitive and powerful." data-config-attribution="Sarah Johnson, CEO at TechCorp"></div>
                        <div style="margin-top: 2rem;">
                            <div data-block="quote" data-config-style="testimonial" data-config-alignment="center" data-config-fontSize="large" data-config-content="Incredible user experience and fantastic support team. Highly recommended!" data-config-attribution="Mike Chen, Designer"></div>
                        </div>
                    </div>
                </div>`,
                'A section featuring customer testimonials with quotes and attributions'
            ),
            new Layout(
                'content-with-sidebar',
                'Content + Sidebar',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="21" y2="9"/><line x1="9" y1="15" x2="21" y2="15"/><line x1="3" y1="9" x2="6" y2="9"/><line x1="3" y1="15" x2="6" y2="15"/></svg>',
                `<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; padding: 2rem;">
                    <div class="main-content">
                        <h1 data-block="header" data-config-level="h1">Main Article Title</h1>
                        <p data-block="paragraph" data-config-fontSize="medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                        <div data-block="image" data-config-src="https://placecats.com/millie/600/400" data-config-alt="Article image" data-config-caption="A beautiful landscape that complements our story"></div>
                        <p data-block="paragraph">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div class="sidebar" style="background: #f8f9fa; padding: 2rem; border-radius: 8px;">
                        <h3 data-block="header" data-config-level="h3">Related Topics</h3>
                        <div data-block="list" data-config-style="unordered" data-config-items='["Topic One", "Topic Two", "Topic Three"]'></div>
                        <h3 data-block="header" data-config-level="h3">Quick Links</h3>
                        <div data-block="button" data-config-text="Learn More" data-config-style="secondary"></div>
                    </div>
                </div>`,
                'A two-column layout with main content area and sidebar for additional information'
            ),
            new Layout(
                'call-to-action',
                'Call to Action',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>',
                `<div class="cta-section" style="background: linear-gradient(45deg, #ff6b6b, #ee5a24); padding: 4rem 2rem; text-align: center; color: white; border-radius: 12px; margin: 2rem 0;">
                    <h2 data-block="header" data-config-level="h2" data-config-textColor="#ffffff" data-config-alignment="center" data-config-fontSize="xlarge">Ready to Get Started?</h2>
                    <p data-block="paragraph" data-config-textColor="#ffffff" data-config-alignment="center" data-config-fontSize="large">Join thousands of satisfied customers and transform your workflow today.</p>
                    <div style="margin-top: 2rem;">
                        <div data-block="button" data-config-text="Start Free Trial" data-config-style="light" data-config-size="large"></div>
                    </div>
                </div>`,
                'An eye-catching call-to-action section with compelling headline and button'
            ),
            new Layout(
                'image-text-split',
                'Image + Text Split',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 3v18"/><circle cx="6" cy="6" r="1"/><line x1="12" y1="8" x2="20" y2="8"/><line x1="12" y1="12" x2="20" y2="12"/><line x1="12" y1="16" x2="20" y2="16"/></svg>',
                `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; padding: 3rem 2rem;">
                    <div data-block="image" data-config-src="https://placecats.com/millie/500/400" data-config-alt="Feature showcase" data-config-width="100%"></div>
                    <div class="text-content">
                        <h2 data-block="header" data-config-level="h2" data-config-fontSize="large">Powerful Features</h2>
                        <p data-block="paragraph" data-config-fontSize="medium">Discover the advanced capabilities that make our platform stand out from the competition. With intuitive design and robust functionality, you'll accomplish more in less time.</p>
                        <div data-block="list" data-config-style="unordered" data-config-items='["Advanced analytics and reporting", "Seamless team collaboration", "Enterprise-grade security", "24/7 customer support"]'></div>
                        <div style="margin-top: 2rem;">
                            <div data-block="button" data-config-text="Learn More" data-config-style="primary"></div>
                        </div>
                    </div>
                </div>`,
                'A balanced layout with image on one side and descriptive content on the other'
            )
        ];
    }
}

export default Layout;
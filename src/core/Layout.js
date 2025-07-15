import { TemplateGenerator } from "../utils/TemplateGenerator";

class Layout {
    constructor(id, name, icon, html, description = '') {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.html = html;
        this.description = description;
    }

    // Helper method to HTML encode content for safe storage in attributes
    static htmlEncode(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
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
                    let configKey = attr.name.replace('data-config-', '');
                    // Convert kebab-case to camelCase for consistency
                    configKey = configKey.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    let value = attr.value;
                    
                    // Try to parse JSON values and booleans
                    if (value.startsWith('[') || value.startsWith('{')) {
                        try {
                            value = JSON.parse(value);
                        } catch (e) {
                            // Keep as string if JSON parsing fails
                        }
                    } else if (value === 'true') {
                        value = true;
                    } else if (value === 'false') {
                        value = false;
                    }
                    
                    // Decode HTML entities for content attribute
                    if (configKey === 'content' && typeof value === 'string') {
                        const textarea = document.createElement('textarea');
                        textarea.innerHTML = value;
                        value = textarea.value;
                    }
                    
                    config[configKey] = value;
                }
            });
            
            // Special handling for different block types
            switch (blockType) {
                case 'paragraph':
                    if (!config.content) {
                        config.content = element.innerHTML;
                    }
                    break;
                case 'header':
                    if (!config.content) {
                        config.content = element.textContent;
                    }
                    if (!config.level) {
                        config.level = element.tagName.toLowerCase();
                    }
                    break;
                case 'image':
                    const img = element.querySelector('img');
                    if (img && !config.src) {
                        config.src = img.src;
                        config.alt = img.alt;
                    }
                    const caption = element.querySelector('figcaption');
                    if (caption && !config.caption) {
                        config.caption = caption.textContent;
                    }
                    break;
                case 'quote':
                    const quoteContent = element.querySelector('.quote-content');
                    const quoteAttribution = element.querySelector('.quote-attribution');
                    if (quoteContent && !config.content) config.content = quoteContent.textContent;
                    if (quoteAttribution && !config.attribution) config.attribution = quoteAttribution.textContent;
                    break;
                case 'raw':
                    // For raw blocks, the content is in the data-config-content attribute
                    break;
                case 'columns':
                    // For columns, the configuration is already in the data-config-columns attribute
                    break;
            }
            
            blocks.push({
                type: blockType,
                data: config
            });
        });
        
        return blocks;
    }

    // Helper method to create a template using tool instances
    static createTemplateWithTools(toolConfig, elements, wrapperConfig = {}) {
        if (!toolConfig) {
            console.warn('No tool configuration provided for template generation');
            return '';
        }

        const generator = new TemplateGenerator(toolConfig);
        return generator.generateRawTemplate(elements, wrapperConfig);
    }

    // Static method to get all predefined layouts
    static getAll(toolConfig = null) {
        return [
            // Test Template
            new Layout(
                'test-template',
                'Test Template',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>',
                `<div data-block="raw" data-config-show-preview="true" data-config-mode="html" data-config-content="&lt;div style='padding: 2rem; text-align: center;'&gt;&lt;h1 data-tool='Header' data-tool-id='header-1' style='font-size: 2rem; margin-bottom: 1rem; cursor: pointer; border: 2px dashed transparent;' onmouseover='this.style.border=&quot;2px dashed #3b82f6&quot;' onmouseout='this.style.border=&quot;2px dashed transparent&quot;'&gt;Interactive Template&lt;/h1&gt;&lt;img data-tool='Image' data-tool-id='image-1' src='https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&amp;fit=crop' alt='Sample image' style='width: 100%; max-width: 400px; border-radius: 0.5rem; margin: 1rem 0; cursor: pointer; border: 2px dashed transparent;' onmouseover='this.style.border=&quot;2px dashed #3b82f6&quot;' onmouseout='this.style.border=&quot;2px dashed transparent&quot;' /&gt;&lt;p data-tool='Paragraph' data-tool-id='paragraph-1' style='margin: 1rem 0; cursor: pointer; border: 2px dashed transparent; padding: 0.5rem;' onmouseover='this.style.border=&quot;2px dashed #3b82f6&quot;' onmouseout='this.style.border=&quot;2px dashed transparent&quot;'&gt;Click any element to edit its properties. This creates reusable, interactive templates!&lt;/p&gt;&lt;button data-tool='Button' data-tool-id='button-1' style='background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; border: 2px dashed transparent;' onmouseover='this.style.border=&quot;2px dashed #3b82f6&quot;' onmouseout='this.style.border=&quot;2px dashed transparent&quot;'&gt;Edit Me&lt;/button&gt;&lt;/div&gt;">
                </div>`,
                'Interactive template with clickable elements that show tool properties'
            ),
            // 1. Modern Hero Section
            new Layout(
                'modern-hero',
                'Modern Hero',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
                toolConfig ? Layout.createTemplateWithTools(toolConfig, [
                    {
                        toolName: 'Header',
                        toolId: 'hero-title',
                        config: {
                            content: 'Transform Your Business Today',
                            level: 'h1',
                            fontSize: 'xlarge',
                            fontWeight: 'bold',
                            textColor: '#ffffff',
                            alignment: 'center'
                        }
                    },
                    {
                        toolName: 'Paragraph',
                        toolId: 'hero-subtitle',
                        config: {
                            content: 'Discover the power of innovation with our cutting-edge platform designed to accelerate your growth and streamline your operations.',
                            fontSize: 'large',
                            textColor: 'rgba(255,255,255,0.9)',
                            alignment: 'center',
                            margin: 'large'
                        }
                    },
                    {
                        toolName: 'Button',
                        toolId: 'hero-cta',
                        config: {
                            text: 'Get Started Free',
                            type: 'primary',
                            size: 'large',
                            customStyles: {
                                backgroundColor: '#3b82f6',
                                textColor: 'white',
                                padding: '1rem 2rem',
                                borderRadius: '0.5rem'
                            }
                        }
                    }
                ], {
                    wrapperStyles: {
                        'background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        'padding': '5rem 2rem',
                        'text-align': 'center',
                        'color': 'white'
                    }
                }) : `<div data-block="raw" data-config-show-preview="true" data-config-mode="html" data-config-content="&lt;div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 5rem 2rem; text-align: center; color: white;'&gt;&lt;h1 style='font-size: 48px; font-weight: bold; color: #ffffff; text-align: center; margin-bottom: 1rem;'&gt;Transform Your Business Today&lt;/h1&gt;&lt;p style='font-size: 20px; color: rgba(255,255,255,0.9); text-align: center; margin-bottom: 2rem;'&gt;Discover the power of innovation with our cutting-edge platform designed to accelerate your growth and streamline your operations.&lt;/p&gt;&lt;button style='background: #3b82f6; color: white; padding: 1rem 2rem; border-radius: 0.5rem; font-size: 18px; font-weight: 600; border: none; cursor: pointer;'&gt;Get Started Free&lt;/button&gt;&lt;/div&gt;"></div>`,
                'Professional hero section with gradient background, compelling copy, and CTA'
            ),

            // 2. Three Column Feature Grid
            new Layout(
                'feature-grid',
                'Feature Grid',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/></svg>',
                `<div data-block="columns" data-config-columns='[
                    {
                        "blocks": [
                            {
                                "type": "image",
                                "data": {
                                    "src": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
                                    "alt": "Fast Performance",
                                    "width": "100%",
                                    "alignment": "center"
                                }
                            },
                            {
                                "type": "header",
                                "data": {
                                    "level": "h3",
                                    "content": "Lightning Fast",
                                    "fontSize": "24px",
                                    "alignment": "center",
                                    "fontWeight": "bold"
                                }
                            },
                            {
                                "type": "paragraph",
                                "data": {
                                    "content": "Experience blazing fast performance with our optimized platform built for speed and efficiency.",
                                    "alignment": "center",
                                    "fontSize": "16px",
                                    "textColor": "#64748b"
                                }
                            }
                        ],
                        "width": "1fr",
                        "padding": "2rem",
                        "background": "#ffffff",
                        "borderRadius": "1rem",
                        "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "textAlign": "center"
                    },
                    {
                        "blocks": [
                            {
                                "type": "image",
                                "data": {
                                    "src": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
                                    "alt": "Secure Platform",
                                    "width": "100%",
                                    "alignment": "center"
                                }
                            },
                            {
                                "type": "header",
                                "data": {
                                    "level": "h3",
                                    "content": "Bank-Level Security",
                                    "fontSize": "24px",
                                    "alignment": "center",
                                    "fontWeight": "bold"
                                }
                            },
                            {
                                "type": "paragraph",
                                "data": {
                                    "content": "Your data is protected with enterprise-grade security measures and industry-leading encryption.",
                                    "alignment": "center",
                                    "fontSize": "16px",
                                    "textColor": "#64748b"
                                }
                            }
                        ],
                        "width": "1fr",
                        "padding": "2rem",
                        "background": "#ffffff",
                        "borderRadius": "1rem",
                        "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "textAlign": "center"
                    },
                    {
                        "blocks": [
                            {
                                "type": "image",
                                "data": {
                                    "src": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
                                    "alt": "Team Collaboration",
                                    "width": "100%",
                                    "alignment": "center"
                                }
                            },
                            {
                                "type": "header",
                                "data": {
                                    "level": "h3",
                                    "content": "Team Collaboration",
                                    "fontSize": "24px",
                                    "alignment": "center",
                                    "fontWeight": "bold"
                                }
                            },
                            {
                                "type": "paragraph",
                                "data": {
                                    "content": "Work seamlessly with your team using our collaborative tools and real-time synchronization.",
                                    "alignment": "center",
                                    "fontSize": "16px",
                                    "textColor": "#64748b"
                                }
                            }
                        ],
                        "width": "1fr",
                        "padding": "2rem",
                        "background": "#ffffff",
                        "borderRadius": "1rem",
                        "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "textAlign": "center"
                    }
                ]' data-config-gap="2rem" data-config-responsive="true">
                </div>`,
                'Three feature cards with images, headings, and descriptions in a responsive grid'
            ),

            // 3. Two Column Testimonial
            new Layout(
                'testimonials',
                'Testimonials',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
                `<div data-block="columns" data-config-columns='[
                    {
                        "blocks": [
                            {
                                "type": "quote",
                                "data": {
                                    "content": "This platform has completely transformed how we work. The tools are intuitive and powerful, making our team more productive than ever.",
                                    "attribution": "Sarah Johnson, CEO at TechCorp",
                                    "style": "modern",
                                    "fontSize": "18px",
                                    "textColor": "#1f2937"
                                }
                            }
                        ],
                        "width": "1fr",
                        "padding": "2.5rem",
                        "background": "#ffffff",
                        "borderRadius": "1.5rem",
                        "boxShadow": "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        "border": "1px solid #e5e7eb"
                    },
                    {
                        "blocks": [
                            {
                                "type": "quote",
                                "data": {
                                    "content": "Incredible user experience and fantastic support team. The onboarding was smooth and we saw results immediately. Highly recommended!",
                                    "attribution": "Mike Chen, Product Designer",
                                    "style": "modern",
                                    "fontSize": "18px",
                                    "textColor": "#1f2937"
                                }
                            }
                        ],
                        "width": "1fr",
                        "padding": "2.5rem",
                        "background": "#ffffff",
                        "borderRadius": "1.5rem",
                        "boxShadow": "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        "border": "1px solid #e5e7eb"
                    }
                ]' data-config-gap="2rem" data-config-responsive="true">
                </div>`,
                'Two testimonial cards with quotes and attribution in elegant card design'
            ),

            // 4. Article with Sidebar
            (() => {
                const articleContent = `<div style='display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; padding: 2rem;'>
                    <div style='padding-right: 2rem;'>
                        <h1 style='font-size: 36px; font-weight: bold; color: #111827; margin-bottom: 1rem;'>Understanding Modern Web Development</h1>
                        <p style='font-size: 18px; color: #374151; line-height: 1.7; margin-bottom: 2rem;'>The landscape of web development has evolved dramatically over the past decade. Modern frameworks and tools have made it possible to create sophisticated applications with improved performance and user experience.</p>
                        <img src='https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop' alt='Modern web development' style='width: 100%; border-radius: 0.5rem; margin-bottom: 1rem;' />
                        <p style='font-size: 14px; color: #6b7280; text-align: center; margin-bottom: 2rem;'>Modern development tools and practices</p>
                        <p style='font-size: 18px; color: #374151; line-height: 1.7;'>Today's developers have access to an unprecedented array of tools and frameworks that streamline the development process and enable rapid prototyping and deployment.</p>
                    </div>
                    <div style='padding: 2rem; background: #f9fafb; border-radius: 1rem; border: 1px solid #e5e7eb; height: fit-content;'>
                        <h3 style='font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 1rem;'>Related Topics</h3>
                        <ul style='list-style-type: disc; padding-left: 1.5rem; margin-bottom: 2rem;'>
                            <li style='margin-bottom: 0.5rem;'>JavaScript Frameworks</li>
                            <li style='margin-bottom: 0.5rem;'>CSS Preprocessors</li>
                            <li style='margin-bottom: 0.5rem;'>Build Tools</li>
                            <li style='margin-bottom: 0.5rem;'>Testing Strategies</li>
                            <li style='margin-bottom: 0.5rem;'>Deployment Automation</li>
                        </ul>
                        <h3 style='font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 1rem;'>Quick Links</h3>
                        <button style='background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: 600;'>Learn More</button>
                    </div>
                </div>`;
                
                return new Layout(
                    'article-sidebar',
                    'Article + Sidebar',
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10"/><path d="M7 11h10"/><path d="M7 15h6"/></svg>',
                    `<div data-block="raw" data-config-show-preview="true" data-config-mode="html" data-config-content="${Layout.htmlEncode(articleContent)}">
                    </div>`,
                    'Article layout with main content area and styled sidebar with links'
                );
            })(),

            // 5. Premium Pricing Table
            (() => {
                const pricingContent = `<div style='padding: 4rem 2rem; background: linear-gradient(to bottom, #f8fafc, #ffffff);'>
                    <div style='text-align: center; margin-bottom: 3rem;'>
                        <h2 style='font-size: 36px; font-weight: bold; color: #111827; margin-bottom: 1rem;'>Choose the right plan for you</h2>
                        <p style='font-size: 20px; color: #6b7280;'>Start building for free, then add a site plan to go live. Account plans unlock additional features.</p>
                    </div>
                    <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; align-items: stretch;'>
                        <div style='position: relative; padding: 2rem; background: #ffffff; border-radius: 1rem; border: 1px solid #e5e7eb; height: 100%; display: flex; flex-direction: column;'>
                            <h3 style='font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 0.5rem;'>Starter</h3>
                            <p style='font-size: 16px; color: #6b7280; margin-bottom: 2rem;'>Perfect for side projects and experimentation.</p>
                            <div style='display: flex; align-items: baseline; margin-bottom: 2rem;'>
                                <span style='font-size: 48px; font-weight: 800; color: #111827;'>$9</span>
                                <span style='font-size: 16px; color: #6b7280; margin-left: 0.25rem;'>/month</span>
                            </div>
                            <a href='#' style='display: inline-block; background: #f3f4f6; color: #374151; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; text-align: center; margin-bottom: 2rem; transition: all 0.2s;'>Get started</a>
                        </div>
                        <div style='position: relative; padding: 2rem; background: #ffffff; border-radius: 1rem; border: 2px solid #3b82f6; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); height: 100%; display: flex; flex-direction: column; transform: scale(1.05);'>
                            <div style='position: absolute; top: -1rem; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 0.5rem 1.5rem; border-radius: 9999px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);'>Most popular</div>
                            <h3 style='font-size: 20px; font-weight: 600; color: #111827; margin: 1rem 0 0.5rem 0;'>Pro</h3>
                            <p style='font-size: 16px; color: #6b7280; margin-bottom: 2rem;'>A plan that scales with your rapidly growing business.</p>
                            <div style='display: flex; align-items: baseline; margin-bottom: 2rem;'>
                                <span style='font-size: 48px; font-weight: 800; color: #111827;'>$29</span>
                                <span style='font-size: 16px; color: #6b7280; margin-left: 0.25rem;'>/month</span>
                            </div>
                            <a href='#' style='display: inline-block; background: #3b82f6; color: white; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; text-align: center; margin-bottom: 2rem; transition: all 0.2s;'>Get started</a>
                        </div>
                        <div style='position: relative; padding: 2rem; background: #ffffff; border-radius: 1rem; border: 1px solid #e5e7eb; height: 100%; display: flex; flex-direction: column;'>
                            <h3 style='font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 0.5rem;'>Enterprise</h3>
                            <p style='font-size: 16px; color: #6b7280; margin-bottom: 2rem;'>Dedicated support and infrastructure for your company.</p>
                            <div style='display: flex; align-items: baseline; margin-bottom: 2rem;'>
                                <span style='font-size: 48px; font-weight: 800; color: #111827;'>$99</span>
                                <span style='font-size: 16px; color: #6b7280; margin-left: 0.25rem;'>/month</span>
                            </div>
                            <a href='#' style='display: inline-block; background: #f3f4f6; color: #374151; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; text-align: center; margin-bottom: 2rem; transition: all 0.2s;'>Contact sales</a>
                        </div>
                    </div>
                </div>`;
                
                return new Layout(
                    'pricing-table',
                    'Premium Pricing',
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="6" height="14" rx="1"/><rect x="9" y="3" width="6" height="18" rx="1"/><rect x="15" y="7" width="6" height="10" rx="1"/></svg>',
                    `<div data-block="raw" data-config-show-preview="true" data-config-mode="html" data-config-content="${Layout.htmlEncode(pricingContent)}">
                    </div>`,
                    'Professional three-tier pricing table with TailwindUI-inspired design as a single cohesive block'
                );
            })(),

            // 6. CTA Section
            new Layout(
                'cta-section',
                'Call to Action',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>',
                `<div data-block="raw" data-config-show-preview="true" data-config-mode="html" data-config-content="&lt;div style='background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 4rem 2rem; border-radius: 2rem; text-align: center; color: white;'&gt;&lt;h2 style='font-size: 42px; font-weight: bold; color: #ffffff; text-align: center; margin-bottom: 1rem;'&gt;Ready to Get Started?&lt;/h2&gt;&lt;p style='font-size: 20px; color: rgba(255,255,255,0.8); text-align: center; margin-bottom: 2rem;'&gt;Join over 10,000 companies that have accelerated their growth with our platform. Start your free trial today.&lt;/p&gt;&lt;button style='background: #3b82f6; color: white; padding: 1rem 2rem; border-radius: 0.5rem; font-size: 18px; font-weight: 600; border: none; cursor: pointer; margin-bottom: 2rem;'&gt;Start Free Trial&lt;/button&gt;&lt;p style='margin-top: 2rem; font-size: 14px; color: rgba(255,255,255,0.6);'&gt;No credit card required • 14-day free trial • Cancel anytime&lt;/p&gt;&lt;/div&gt;">
                </div>`,
                'High-converting call-to-action section with trust indicators'
            )
        ];
    }
}

export default Layout;
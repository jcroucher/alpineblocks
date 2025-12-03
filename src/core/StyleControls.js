/**
 * StyleControls
 * Provides comprehensive CSS styling controls for block elements
 * Used in the Properties panel to allow users to style blocks directly
 */

export class StyleControls {
    /**
     * Generates the HTML for the Style Controls section
     * @returns {string} HTML string for the Style Controls UI
     */
    static renderHTML() {
        return `
            <!-- CSS Editor Controls -->
            <div style="margin-bottom: 1.5rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem; background: #fafbfc;">
                <h3 style="font-size: 0.875rem; font-weight: 600; color: #111827; margin-bottom: 1rem;">Style Controls</h3>

                <!-- Font Size -->
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Font Size</label>
                    <div style="display: flex; gap: 0.5rem;">
                        <input type="text"
                               :value="cssProperties['font-size'] || ''"
                               @input="updateCSSProperty('font-size', $event.target.value)"
                               placeholder="e.g. 16px, 1rem"
                               style="flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                    </div>
                </div>

                <!-- Font Weight -->
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Font Weight</label>
                    <select :value="cssProperties['font-weight'] || 'normal'"
                            @change="updateCSSProperty('font-weight', $event.target.value)"
                            style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="100">100 - Thin</option>
                        <option value="200">200 - Extra Light</option>
                        <option value="300">300 - Light</option>
                        <option value="400">400 - Normal</option>
                        <option value="500">500 - Medium</option>
                        <option value="600">600 - Semibold</option>
                        <option value="700">700 - Bold</option>
                        <option value="800">800 - Extra Bold</option>
                        <option value="900">900 - Black</option>
                    </select>
                </div>

                <!-- Text Color -->
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Text Color</label>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <input type="color"
                               :value="(cssProperties['color'] || '#000000').startsWith('#') ? cssProperties['color'] : '#000000'"
                               @input="updateCSSProperty('color', $event.target.value)"
                               style="width: 50px; height: 36px; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer;">
                        <input type="text"
                               :value="cssProperties['color'] || ''"
                               @input="updateCSSProperty('color', $event.target.value)"
                               placeholder="#000000 or rgb(0,0,0)"
                               style="flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                    </div>
                </div>

                <!-- Background Color/Gradient -->
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Background</label>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <input type="color"
                               :value="((cssProperties['background'] || cssProperties['background-color'] || '#ffffff').match(/#[0-9a-fA-F]{6}/) || ['#ffffff'])[0]"
                               @input="updateCSSProperty('background', $event.target.value)"
                               style="width: 50px; height: 36px; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer;">
                        <input type="text"
                               :value="cssProperties['background'] || cssProperties['background-color'] || ''"
                               @input="updateCSSProperty('background', $event.target.value)"
                               placeholder="Solid color or gradient"
                               style="flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                    </div>
                </div>

                <!-- Text Alignment -->
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Text Alignment</label>
                    <div style="display: flex; gap: 0.25rem;">
                        <button @click="updateCSSProperty('text-align', 'left')"
                                :style="'flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer; background: ' + (cssProperties['text-align'] === 'left' ? '#3b82f6' : 'white') + '; color: ' + (cssProperties['text-align'] === 'left' ? 'white' : '#374151')"
                                type="button"
                                title="Align Left">
                            <svg style="width: 16px; height: 16px; margin: 0 auto; display: block;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h14"></path>
                            </svg>
                        </button>
                        <button @click="updateCSSProperty('text-align', 'center')"
                                :style="'flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer; background: ' + (cssProperties['text-align'] === 'center' ? '#3b82f6' : 'white') + '; color: ' + (cssProperties['text-align'] === 'center' ? 'white' : '#374151')"
                                type="button"
                                title="Align Center">
                            <svg style="width: 16px; height: 16px; margin: 0 auto; display: block;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M7 12h10M5 18h14"></path>
                            </svg>
                        </button>
                        <button @click="updateCSSProperty('text-align', 'right')"
                                :style="'flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer; background: ' + (cssProperties['text-align'] === 'right' ? '#3b82f6' : 'white') + '; color: ' + (cssProperties['text-align'] === 'right' ? 'white' : '#374151')"
                                type="button"
                                title="Align Right">
                            <svg style="width: 16px; height: 16px; margin: 0 auto; display: block;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M10 12h10M6 18h14"></path>
                            </svg>
                        </button>
                        <button @click="updateCSSProperty('text-align', 'justify')"
                                :style="'flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer; background: ' + (cssProperties['text-align'] === 'justify' ? '#3b82f6' : 'white') + '; color: ' + (cssProperties['text-align'] === 'justify' ? 'white' : '#374151')"
                                type="button"
                                title="Justify">
                            <svg style="width: 16px; height: 16px; margin: 0 auto; display: block;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Padding & Margin (Box Layout) -->
                <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                    <div style="flex: 1;">
                        <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem;">Padding</label>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.125rem;">
                            <div></div>
                            <input type="text"
                                   :value="(cssProperties['padding'] || '').split(' ')[0] || cssProperties['padding-top'] || ''"
                                   @input="updateCSSProperty('padding-top', $event.target.value)"
                                   placeholder="T"
                                   title="Padding Top"
                                   style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                            <div></div>
                            <input type="text"
                                   :value="(cssProperties['padding'] || '').split(' ')[3] || cssProperties['padding-left'] || ''"
                                   @input="updateCSSProperty('padding-left', $event.target.value)"
                                   placeholder="L"
                                   title="Padding Left"
                                   style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                            <div style="display: flex; align-items: center; justify-content: center; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 0.125rem; font-size: 0.5rem; color: #9ca3af;">P</div>
                            <input type="text"
                                   :value="(cssProperties['padding'] || '').split(' ')[1] || cssProperties['padding-right'] || ''"
                                   @input="updateCSSProperty('padding-right', $event.target.value)"
                                   placeholder="R"
                                   title="Padding Right"
                                   style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                            <div></div>
                            <input type="text"
                                   :value="(cssProperties['padding'] || '').split(' ')[2] || cssProperties['padding-bottom'] || ''"
                                   @input="updateCSSProperty('padding-bottom', $event.target.value)"
                                   placeholder="B"
                                   title="Padding Bottom"
                                   style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                            <div></div>
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem;">Margin</label>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.125rem;">
                            <div></div>
                            <input type="text"
                                   :value="(cssProperties['margin'] || '').split(' ')[0] || cssProperties['margin-top'] || ''"
                                   @input="updateCSSProperty('margin-top', $event.target.value)"
                                   placeholder="T"
                                   title="Margin Top"
                                   style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                            <div></div>
                            <input type="text"
                                   :value="(cssProperties['margin'] || '').split(' ')[3] || cssProperties['margin-left'] || ''"
                                   @input="updateCSSProperty('margin-left', $event.target.value)"
                                   placeholder="L"
                                   title="Margin Left"
                                   style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                            <div style="display: flex; align-items: center; justify-content: center; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 0.125rem; font-size: 0.5rem; color: #9ca3af;">M</div>
                            <input type="text"
                                   :value="(cssProperties['margin'] || '').split(' ')[1] || cssProperties['margin-right'] || ''"
                                   @input="updateCSSProperty('margin-right', $event.target.value)"
                                   placeholder="R"
                                   title="Margin Right"
                                   style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                            <div></div>
                            <input type="text"
                                   :value="(cssProperties['margin'] || '').split(' ')[2] || cssProperties['margin-bottom'] || ''"
                                   @input="updateCSSProperty('margin-bottom', $event.target.value)"
                                   placeholder="B"
                                   title="Margin Bottom"
                                   style="padding: 0.125rem; border: 1px solid #d1d5db; border-radius: 0.125rem; font-size: 0.625rem; text-align: center; width: 100%;">
                            <div></div>
                        </div>
                    </div>
                </div>

                <!-- Position -->
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Position</label>
                    <select :value="cssProperties['position'] || 'static'"
                            @change="updateCSSProperty('position', $event.target.value)"
                            style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                        <option value="static">Static</option>
                        <option value="relative">Relative</option>
                        <option value="absolute">Absolute</option>
                        <option value="fixed">Fixed</option>
                        <option value="sticky">Sticky</option>
                    </select>
                </div>

                <!-- Border -->
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Border</label>
                    <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                        <input type="text"
                               :value="cssProperties['border-width'] || ''"
                               @input="updateCSSProperty('border-width', $event.target.value)"
                               placeholder="Width (e.g. 2px)"
                               style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                        <select :value="cssProperties['border-style'] || 'solid'"
                                @change="updateCSSProperty('border-style', $event.target.value)"
                                style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                            <option value="double">Double</option>
                            <option value="none">None</option>
                        </select>
                        <div style="display: flex; align-items: center; gap: 0.25rem;">
                            <input type="color"
                                   :value="(cssProperties['border-color'] || '#000000').startsWith('#') ? cssProperties['border-color'] : '#000000'"
                                   @input="updateCSSProperty('border-color', $event.target.value)"
                                   style="width: 40px; height: 36px; border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer;">
                            <input type="text"
                                   :value="cssProperties['border-color'] || ''"
                                   @input="updateCSSProperty('border-color', $event.target.value)"
                                   placeholder="Color"
                                   style="flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                        </div>
                    </div>
                </div>

                <!-- Border Radius -->
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Border Radius</label>
                    <input type="text"
                           :value="cssProperties['border-radius'] || ''"
                           @input="updateCSSProperty('border-radius', $event.target.value)"
                           placeholder="e.g. 1rem, 8px"
                           style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                </div>

                <!-- Box Shadow -->
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Box Shadow</label>
                    <input type="text"
                           :value="cssProperties['box-shadow'] || ''"
                           @input="updateCSSProperty('box-shadow', $event.target.value)"
                           placeholder="e.g. 0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                           style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                </div>

                <!-- Dimensions -->
                <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                    <div style="flex: 1;">
                        <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Width</label>
                        <input type="text"
                               :value="cssProperties['width'] || ''"
                               @input="updateCSSProperty('width', $event.target.value)"
                               placeholder="e.g. 100%, auto"
                               style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                    </div>
                    <div style="flex: 1;">
                        <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Height</label>
                        <input type="text"
                               :value="cssProperties['height'] || ''"
                               @input="updateCSSProperty('height', $event.target.value)"
                               placeholder="e.g. 100%, auto"
                               style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                    </div>
                </div>

                <!-- Display & Flex -->
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Display</label>
                    <select :value="cssProperties['display'] || 'block'"
                            @change="updateCSSProperty('display', $event.target.value)"
                            style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                        <option value="block">Block</option>
                        <option value="inline">Inline</option>
                        <option value="inline-block">Inline Block</option>
                        <option value="flex">Flex</option>
                        <option value="grid">Grid</option>
                        <option value="none">None</option>
                    </select>
                </div>

                <!-- Flex Direction (shown when display is flex) -->
                <div style="margin-bottom: 1rem;" x-show="cssProperties['display'] === 'flex'">
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Flex Direction</label>
                    <select :value="cssProperties['flex-direction'] || 'row'"
                            @change="updateCSSProperty('flex-direction', $event.target.value)"
                            style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                        <option value="row">Row</option>
                        <option value="column">Column</option>
                        <option value="row-reverse">Row Reverse</option>
                        <option value="column-reverse">Column Reverse</option>
                    </select>
                </div>

                <!-- Transform -->
                <div style="margin-bottom: 0;">
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.375rem;">Transform</label>
                    <input type="text"
                           :value="cssProperties['transform'] || ''"
                           @input="updateCSSProperty('transform', $event.target.value)"
                           placeholder="e.g. scale(1.05), rotate(10deg)"
                           style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.75rem;">
                </div>
            </div>
        `;
    }

    /**
     * Parses inline style string into individual CSS properties
     * Handles shorthand properties (border, padding, margin)
     * @param {string} styleString - The inline style string to parse
     * @returns {Object} Object containing individual CSS properties
     */
    static parseCSSProperties(styleString) {
        const props = {};

        if (!styleString) return props;

        // Split by semicolon and parse each property
        styleString.split(';').forEach(prop => {
            const colonIndex = prop.indexOf(':');
            if (colonIndex === -1) return;

            const key = prop.substring(0, colonIndex).trim();
            const value = prop.substring(colonIndex + 1).trim();

            if (key && value) {
                // Handle shorthand border property: "2px solid #3b82f6"
                if (key === 'border') {
                    const parts = value.split(' ').filter(p => p);
                    // Try to identify width, style, and color from the parts
                    parts.forEach(part => {
                        // Check if it's a border style first (most specific)
                        if (['solid', 'dashed', 'dotted', 'double', 'none', 'hidden', 'groove', 'ridge', 'inset', 'outset'].includes(part)) {
                            props['border-style'] = part;
                        }
                        // Check if it's a color
                        else if (part.startsWith('#') || part.startsWith('rgb') || part.startsWith('hsl')) {
                            props['border-color'] = part;
                        }
                        // Check if it's a width - must end with a unit or be 0
                        else {
                            const widthRegex = /^[0-9]+\.?[0-9]*(px|em|rem|pt|%|vh|vw|vmin|vmax|ch|ex)$/;
                            if (widthRegex.test(part) || part === '0') {
                                props['border-width'] = part;
                            }
                        }
                    });
                }
                // Handle shorthand padding: "2rem" or "1rem 2rem" etc
                else if (key === 'padding' && !key.includes('-')) {
                    const parts = value.split(' ').filter(p => p);
                    if (parts.length === 1) {
                        // All sides
                        props['padding-top'] = parts[0];
                        props['padding-right'] = parts[0];
                        props['padding-bottom'] = parts[0];
                        props['padding-left'] = parts[0];
                    } else if (parts.length === 2) {
                        // top/bottom, left/right
                        props['padding-top'] = parts[0];
                        props['padding-bottom'] = parts[0];
                        props['padding-left'] = parts[1];
                        props['padding-right'] = parts[1];
                    } else if (parts.length === 3) {
                        // top, left/right, bottom
                        props['padding-top'] = parts[0];
                        props['padding-right'] = parts[1];
                        props['padding-left'] = parts[1];
                        props['padding-bottom'] = parts[2];
                    } else if (parts.length === 4) {
                        // top, right, bottom, left
                        props['padding-top'] = parts[0];
                        props['padding-right'] = parts[1];
                        props['padding-bottom'] = parts[2];
                        props['padding-left'] = parts[3];
                    }
                }
                // Handle shorthand margin: "2rem" or "1rem 2rem" etc
                else if (key === 'margin' && !key.includes('-')) {
                    const parts = value.split(' ').filter(p => p);
                    if (parts.length === 1) {
                        // All sides
                        props['margin-top'] = parts[0];
                        props['margin-right'] = parts[0];
                        props['margin-bottom'] = parts[0];
                        props['margin-left'] = parts[0];
                    } else if (parts.length === 2) {
                        // top/bottom, left/right
                        props['margin-top'] = parts[0];
                        props['margin-bottom'] = parts[0];
                        props['margin-left'] = parts[1];
                        props['margin-right'] = parts[1];
                    } else if (parts.length === 3) {
                        // top, left/right, bottom
                        props['margin-top'] = parts[0];
                        props['margin-right'] = parts[1];
                        props['margin-left'] = parts[1];
                        props['margin-bottom'] = parts[2];
                    } else if (parts.length === 4) {
                        // top, right, bottom, left
                        props['margin-top'] = parts[0];
                        props['margin-right'] = parts[1];
                        props['margin-bottom'] = parts[2];
                        props['margin-left'] = parts[3];
                    }
                }
                else {
                    // Regular property - just store it
                    props[key] = value;
                }
            }
        });

        return props;
    }

    /**
     * Builds a style string from CSS properties object
     * @param {Object} cssProperties - Object containing CSS property key-value pairs
     * @returns {string} CSS style string
     */
    static buildStyleString(cssProperties) {
        return Object.entries(cssProperties)
            .filter(([k, v]) => v)
            .map(([k, v]) => `${k}: ${v}`)
            .join('; ');
    }
}

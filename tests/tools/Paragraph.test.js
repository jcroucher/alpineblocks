import Paragraph from '../../src/tools/Paragraph';

describe('Paragraph Tool', () => {
  let paragraph;
  let mockUpdateFunction;

  beforeEach(() => {
    mockUpdateFunction = jest.fn();
    paragraph = new Paragraph({
      id: 'test-paragraph',
      updateFunction: mockUpdateFunction,
      config: {
        content: 'Test paragraph content',
        fontSize: '18px',
        color: 'blue'
      }
    });
  });

  describe('constructor', () => {
    it('should initialize with provided config', () => {
      expect(paragraph.id).toBe('test-paragraph');
      expect(paragraph.config.content).toBe('Test paragraph content');
      expect(paragraph.config.fontSize).toBe('18px');
      expect(paragraph.config.color).toBe('blue');
    });

    it('should use default values when config is missing', () => {
      const defaultParagraph = new Paragraph({
        id: 'default-paragraph',
        updateFunction: mockUpdateFunction,
        config: {}
      });

      expect(defaultParagraph.config.content).toBe('Enter your paragraph text here...');
      expect(defaultParagraph.config.fontSize).toBe('16px');
      expect(defaultParagraph.config.color).toBe('#333333');
      expect(defaultParagraph.config.textAlign).toBe('left');
      expect(defaultParagraph.config.lineHeight).toBe('1.5');
      expect(defaultParagraph.config.fontWeight).toBe('normal');
    });

    it('should have proper settings configuration', () => {
      expect(paragraph.settings).toBeInstanceOf(Array);
      expect(paragraph.settings.length).toBeGreaterThan(0);
      
      const contentSetting = paragraph.settings.find(s => s.name === 'content');
      expect(contentSetting).toBeDefined();
      expect(contentSetting.label).toBe('Content');
      expect(contentSetting.html).toContain('textarea');
      
      const fontSizeSetting = paragraph.settings.find(s => s.name === 'fontSize');
      expect(fontSizeSetting).toBeDefined();
      expect(fontSizeSetting.label).toBe('Font Size');
      expect(fontSizeSetting.html).toContain('input');
    });
  });

  describe('static toolbox', () => {
    it('should return correct toolbox configuration', () => {
      const toolbox = Paragraph.toolbox();
      
      expect(toolbox).toEqual({
        name: 'Paragraph',
        icon: expect.stringContaining('svg'),
        category: 'Basic'
      });
    });
  });

  describe('render', () => {
    it('should render paragraph with correct content and styles', () => {
      const html = paragraph.render();
      
      expect(html).toContain('<p');
      expect(html).toContain('Test paragraph content');
      expect(html).toContain('font-size: 18px');
      expect(html).toContain('color: blue');
      expect(html).toContain('class="paragraph-block"');
    });

    it('should handle empty content', () => {
      paragraph.config.content = '';
      const html = paragraph.render();
      
      expect(html).toContain('<p');
      expect(html).toContain('');
    });

    it('should apply all style properties', () => {
      paragraph.config = {
        content: 'Styled paragraph',
        fontSize: '20px',
        color: 'red',
        textAlign: 'center',
        lineHeight: '2.0',
        fontWeight: 'bold'
      };
      
      const html = paragraph.render();
      
      expect(html).toContain('font-size: 20px');
      expect(html).toContain('color: red');
      expect(html).toContain('text-align: center');
      expect(html).toContain('line-height: 2.0');
      expect(html).toContain('font-weight: bold');
    });
  });

  describe('editorRender', () => {
    it('should render paragraph for editor with contenteditable', () => {
      const html = paragraph.editorRender();
      
      expect(html).toContain('<p');
      expect(html).toContain('contenteditable="true"');
      expect(html).toContain('Test paragraph content');
      expect(html).toContain('x-html="block.config.content"');
      expect(html).toContain('@blur="block.config.content = $event.target.innerHTML"');
    });

    it('should include all styles in editor render', () => {
      const html = paragraph.editorRender();
      
      expect(html).toContain('font-size: 18px');
      expect(html).toContain('color: blue');
    });

    it('should handle Alpine.js directives correctly', () => {
      const html = paragraph.editorRender();
      
      expect(html).toContain('x-html="block.config.content"');
      expect(html).toContain('@blur="block.config.content = $event.target.innerHTML"');
      expect(html).toContain('@keydown="if ($event.key === \'Enter\') { $event.preventDefault(); }');
    });
  });

  describe('settings validation', () => {
    it('should have all required settings fields', () => {
      const settingNames = paragraph.settings.map(s => s.name);
      
      expect(settingNames).toContain('content');
      expect(settingNames).toContain('fontSize');
      expect(settingNames).toContain('color');
      expect(settingNames).toContain('textAlign');
      expect(settingNames).toContain('lineHeight');
      expect(settingNames).toContain('fontWeight');
    });

    it('should have proper trigger calls in settings HTML', () => {
      const contentSetting = paragraph.settings.find(s => s.name === 'content');
      expect(contentSetting.html).toContain(`trigger('${paragraph.id}', 'content'`);
      
      const fontSizeSetting = paragraph.settings.find(s => s.name === 'fontSize');
      expect(fontSizeSetting.html).toContain(`trigger('${paragraph.id}', 'fontSize'`);
    });

    it('should use correct Alpine.js template syntax', () => {
      const contentSetting = paragraph.settings.find(s => s.name === 'content');
      expect(contentSetting.html).toContain('${this.config.content}');
      
      const fontSizeSetting = paragraph.settings.find(s => s.name === 'fontSize');
      expect(fontSizeSetting.html).toContain('${this.config.fontSize}');
    });
  });

  describe('config updates', () => {
    it('should handle content updates', () => {
      paragraph.config.content = 'Updated content';
      const html = paragraph.render();
      
      expect(html).toContain('Updated content');
    });

    it('should handle style updates', () => {
      paragraph.config.fontSize = '24px';
      paragraph.config.color = 'green';
      
      const html = paragraph.render();
      
      expect(html).toContain('font-size: 24px');
      expect(html).toContain('color: green');
    });

    it('should handle boolean and numeric values', () => {
      paragraph.config.lineHeight = 1.8;
      paragraph.config.fontWeight = 'bold';
      
      const html = paragraph.render();
      
      expect(html).toContain('line-height: 1.8');
      expect(html).toContain('font-weight: bold');
    });
  });

  describe('error handling', () => {
    it('should handle missing config gracefully', () => {
      const paragraphWithoutConfig = new Paragraph({
        id: 'test',
        updateFunction: mockUpdateFunction,
        config: null
      });
      
      expect(() => paragraphWithoutConfig.render()).not.toThrow();
    });

    it('should handle undefined config properties', () => {
      paragraph.config.content = undefined;
      paragraph.config.fontSize = undefined;
      
      const html = paragraph.render();
      
      expect(html).toContain('<p');
      expect(html).not.toContain('undefined');
    });
  });
});
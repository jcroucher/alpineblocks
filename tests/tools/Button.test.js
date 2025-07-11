import Button from '../../src/tools/Button';

describe('Button Tool', () => {
  let button;
  let mockUpdateFunction;

  beforeEach(() => {
    mockUpdateFunction = jest.fn();
    button = new Button({
      id: 'test-button',
      updateFunction: mockUpdateFunction,
      config: {
        text: 'Test Button',
        url: 'https://example.com',
        type: 'primary',
        size: 'medium'
      }
    });
  });

  describe('constructor', () => {
    it('should initialize with provided config', () => {
      expect(button.id).toBe('test-button');
      expect(button.config.text).toBe('Test Button');
      expect(button.config.url).toBe('https://example.com');
      expect(button.config.type).toBe('primary');
      expect(button.config.size).toBe('medium');
    });

    it('should use default values when config is missing', () => {
      const defaultButton = new Button({
        id: 'default-button',
        updateFunction: mockUpdateFunction,
        config: {}
      });

      expect(defaultButton.config.text).toBe('Click me');
      expect(defaultButton.config.url).toBe('');
      expect(defaultButton.config.type).toBe('primary');
      expect(defaultButton.config.size).toBe('medium');
      expect(defaultButton.config.icon).toBe('');
      expect(defaultButton.config.iconPosition).toBe('left');
      expect(defaultButton.config.fullWidth).toBe(false);
      expect(defaultButton.config.disabled).toBe(false);
    });

    it('should have proper settings configuration', () => {
      expect(button.settings).toBeInstanceOf(Array);
      expect(button.settings.length).toBeGreaterThan(0);
      
      const textSetting = button.settings.find(s => s.name === 'text');
      expect(textSetting).toBeDefined();
      expect(textSetting.label).toBe('Button Text');
      
      const urlSetting = button.settings.find(s => s.name === 'url');
      expect(urlSetting).toBeDefined();
      expect(urlSetting.label).toBe('URL');
    });
  });

  describe('static toolbox', () => {
    it('should return correct toolbox configuration', () => {
      const toolbox = Button.toolbox();
      
      expect(toolbox).toEqual({
        name: 'Button',
        icon: expect.stringContaining('svg'),
        category: 'Interactive'
      });
    });
  });

  describe('getIcon', () => {
    it('should return correct icon for arrow-right', () => {
      button.config.icon = 'arrow-right';
      const icon = button.getIcon();
      
      expect(icon).toContain('svg');
      expect(icon).toContain('viewBox');
    });

    it('should return correct icon for download', () => {
      button.config.icon = 'download';
      const icon = button.getIcon();
      
      expect(icon).toContain('svg');
      expect(icon).toContain('viewBox');
    });

    it('should return correct icon for external-link', () => {
      button.config.icon = 'external-link';
      const icon = button.getIcon();
      
      expect(icon).toContain('svg');
      expect(icon).toContain('viewBox');
    });

    it('should return empty string for unknown icon', () => {
      button.config.icon = 'unknown-icon';
      const icon = button.getIcon();
      
      expect(icon).toBe('');
    });

    it('should return empty string for empty icon', () => {
      button.config.icon = '';
      const icon = button.getIcon();
      
      expect(icon).toBe('');
    });
  });

  describe('getButtonStyles', () => {
    it('should return correct styles for primary button', () => {
      button.config.type = 'primary';
      button.config.size = 'medium';
      
      const styles = button.getButtonStyles();
      
      expect(styles).toContain('background-color: #007bff');
      expect(styles).toContain('color: white');
      expect(styles).toContain('padding: 0.5rem 1rem');
      expect(styles).toContain('font-size: 1rem');
    });

    it('should return correct styles for secondary button', () => {
      button.config.type = 'secondary';
      
      const styles = button.getButtonStyles();
      
      expect(styles).toContain('background-color: #6c757d');
      expect(styles).toContain('color: white');
    });

    it('should return correct styles for outline button', () => {
      button.config.type = 'outline';
      
      const styles = button.getButtonStyles();
      
      expect(styles).toContain('background-color: transparent');
      expect(styles).toContain('color: #007bff');
      expect(styles).toContain('border: 1px solid #007bff');
    });

    it('should return correct styles for link button', () => {
      button.config.type = 'link';
      
      const styles = button.getButtonStyles();
      
      expect(styles).toContain('background-color: transparent');
      expect(styles).toContain('color: #007bff');
      expect(styles).toContain('text-decoration: underline');
    });

    it('should apply size styles correctly', () => {
      button.config.size = 'small';
      let styles = button.getButtonStyles();
      expect(styles).toContain('padding: 0.25rem 0.5rem');
      expect(styles).toContain('font-size: 0.875rem');
      
      button.config.size = 'large';
      styles = button.getButtonStyles();
      expect(styles).toContain('padding: 0.75rem 1.5rem');
      expect(styles).toContain('font-size: 1.125rem');
    });

    it('should apply full width style', () => {
      button.config.fullWidth = true;
      const styles = button.getButtonStyles();
      
      expect(styles).toContain('width: 100%');
    });

    it('should apply disabled style', () => {
      button.config.disabled = true;
      const styles = button.getButtonStyles();
      
      expect(styles).toContain('opacity: 0.65');
      expect(styles).toContain('pointer-events: none');
    });

    it('should apply custom styles', () => {
      button.config.customStyles = {
        backgroundColor: '#ff0000',
        textColor: '#ffffff',
        borderColor: '#00ff00',
        borderRadius: '10px',
        padding: '20px'
      };
      
      const styles = button.getButtonStyles();
      
      expect(styles).toContain('background-color: #ff0000 !important');
      expect(styles).toContain('color: #ffffff !important');
      expect(styles).toContain('border-color: #00ff00 !important');
      expect(styles).toContain('border-radius: 10px !important');
      expect(styles).toContain('padding: 20px !important');
    });
  });

  describe('render', () => {
    it('should render button element when no URL is provided', () => {
      button.config.url = '';
      const html = button.render();
      
      expect(html).toContain('<button');
      expect(html).toContain('Test Button');
      expect(html).toContain('class="button"');
      expect(html).not.toContain('<a');
    });

    it('should render anchor element when URL is provided', () => {
      button.config.url = 'https://example.com';
      const html = button.render();
      
      expect(html).toContain('<a');
      expect(html).toContain('href="https://example.com"');
      expect(html).toContain('Test Button');
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
      expect(html).not.toContain('<button');
    });

    it('should render with icon on left', () => {
      button.config.icon = 'arrow-right';
      button.config.iconPosition = 'left';
      
      const html = button.render();
      
      expect(html).toContain('<span class="button-icon">');
      expect(html).toContain('svg');
      // Icon should appear before text
      expect(html.indexOf('button-icon')).toBeLessThan(html.indexOf('button-text'));
    });

    it('should render with icon on right', () => {
      button.config.icon = 'arrow-right';
      button.config.iconPosition = 'right';
      
      const html = button.render();
      
      expect(html).toContain('<span class="button-icon">');
      expect(html).toContain('svg');
      // Icon should appear after text
      expect(html.indexOf('button-text')).toBeLessThan(html.lastIndexOf('button-icon'));
    });

    it('should apply disabled attribute when disabled', () => {
      button.config.disabled = true;
      button.config.url = ''; // Ensure it's a button element
      
      const html = button.render();
      
      expect(html).toContain('disabled');
    });

    it('should apply button styles', () => {
      const html = button.render();
      
      expect(html).toContain('style="');
      expect(html).toContain('background-color: #007bff');
    });
  });

  describe('editorRender', () => {
    it('should render button for editor with contenteditable text', () => {
      const html = button.editorRender();
      
      expect(html).toContain('contenteditable="true"');
      expect(html).toContain('x-html="block.config.text"');
      expect(html).toContain('@blur="block.config.text = $event.target.innerHTML"');
    });

    it('should include all button functionality in editor', () => {
      button.config.url = 'https://example.com';
      button.config.icon = 'arrow-right';
      
      const html = button.editorRender();
      
      expect(html).toContain('href="https://example.com"');
      expect(html).toContain('svg');
      expect(html).toContain('target="_blank"');
    });
  });

  describe('settings validation', () => {
    it('should have all required settings fields', () => {
      const settingNames = button.settings.map(s => s.name);
      
      expect(settingNames).toContain('text');
      expect(settingNames).toContain('url');
      expect(settingNames).toContain('type');
      expect(settingNames).toContain('size');
      expect(settingNames).toContain('icon');
      expect(settingNames).toContain('iconPosition');
      expect(settingNames).toContain('fullWidth');
      expect(settingNames).toContain('disabled');
      expect(settingNames).toContain('customStyles');
    });

    it('should have proper trigger calls in settings HTML', () => {
      const textSetting = button.settings.find(s => s.name === 'text');
      expect(textSetting.html).toContain(`trigger('${button.id}', 'text'`);
      
      const urlSetting = button.settings.find(s => s.name === 'url');
      expect(urlSetting.html).toContain(`trigger('${button.id}', 'url'`);
    });

    it('should use correct input types', () => {
      const textSetting = button.settings.find(s => s.name === 'text');
      expect(textSetting.html).toContain('type="text"');
      
      const urlSetting = button.settings.find(s => s.name === 'url');
      expect(urlSetting.html).toContain('type="text"');
      
      const fullWidthSetting = button.settings.find(s => s.name === 'fullWidth');
      expect(fullWidthSetting.html).toContain('type="checkbox"');
    });

    it('should have proper select options', () => {
      const typeSetting = button.settings.find(s => s.name === 'type');
      expect(typeSetting.html).toContain('<option value="primary">Primary</option>');
      expect(typeSetting.html).toContain('<option value="secondary">Secondary</option>');
      expect(typeSetting.html).toContain('<option value="outline">Outline</option>');
      expect(typeSetting.html).toContain('<option value="link">Link</option>');
      
      const sizeSetting = button.settings.find(s => s.name === 'size');
      expect(sizeSetting.html).toContain('<option value="small">Small</option>');
      expect(sizeSetting.html).toContain('<option value="medium">Medium</option>');
      expect(sizeSetting.html).toContain('<option value="large">Large</option>');
    });
  });

  describe('error handling', () => {
    it('should handle missing config gracefully', () => {
      const buttonWithoutConfig = new Button({
        id: 'test',
        updateFunction: mockUpdateFunction,
        config: null
      });
      
      expect(() => buttonWithoutConfig.render()).not.toThrow();
    });

    it('should handle undefined config properties', () => {
      button.config.text = undefined;
      button.config.url = undefined;
      
      const html = button.render();
      
      expect(html).toContain('<button');
      expect(html).not.toContain('undefined');
    });

    it('should handle empty customStyles object', () => {
      button.config.customStyles = {};
      
      const styles = button.getButtonStyles();
      
      expect(styles).not.toContain('undefined');
      expect(styles).not.toContain('!important');
    });
  });
});
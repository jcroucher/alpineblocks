import Columns from '../../src/tools/Columns';
import { createMockBlock, createMockDragEvent } from '../helpers/testUtils';

describe('Columns Tool', () => {
  let columns;
  let mockUpdateFunction;

  beforeEach(() => {
    mockUpdateFunction = jest.fn();
    columns = new Columns({
      id: 'test-columns',
      updateFunction: mockUpdateFunction,
      config: {
        columns: [
          { blocks: [], width: '1fr' },
          { blocks: [], width: '1fr' }
        ],
        gap: '20px',
        alignment: 'top'
      }
    });
  });

  describe('constructor', () => {
    it('should initialize with provided config', () => {
      expect(columns.id).toBe('test-columns');
      expect(columns.config.columns).toHaveLength(2);
      expect(columns.config.columns[0].blocks).toEqual([]);
      expect(columns.config.gap).toBe('20px');
      expect(columns.config.alignment).toBe('top');
    });

    it('should use default values when config is missing', () => {
      const defaultColumns = new Columns({
        id: 'default-columns',
        updateFunction: mockUpdateFunction,
        config: {}
      });

      expect(defaultColumns.config.columns).toHaveLength(2);
      expect(defaultColumns.config.columns[0]).toEqual({ blocks: [], width: '1fr' });
      expect(defaultColumns.config.gap).toBe('20px');
      expect(defaultColumns.config.alignment).toBe('top');
      expect(defaultColumns.config.responsive).toBe(true);
      expect(defaultColumns.config.breakpoint).toBe('768px');
    });

    it('should have proper settings configuration', () => {
      expect(columns.settings).toBeInstanceOf(Array);
      expect(columns.settings.length).toBeGreaterThan(0);
      
      const columnCountSetting = columns.settings.find(s => s.name === 'columnCount');
      expect(columnCountSetting).toBeDefined();
      expect(columnCountSetting.label).toBe('Column Layout');
      
      const gapSetting = columns.settings.find(s => s.name === 'gap');
      expect(gapSetting).toBeDefined();
      expect(gapSetting.label).toBe('Column Gap');
    });
  });

  describe('static toolbox', () => {
    it('should return correct toolbox configuration', () => {
      const toolbox = Columns.toolbox();
      
      expect(toolbox).toEqual({
        name: 'Columns',
        icon: expect.stringContaining('svg'),
        category: 'Layout'
      });
    });
  });

  describe('updateColumnCount', () => {
    it('should update number of columns', () => {
      columns.updateColumnCount(3);
      
      expect(columns.config.columns).toHaveLength(3);
      expect(columns.config.columns[0]).toEqual({ blocks: [], width: '1fr' });
      expect(columns.config.columns[1]).toEqual({ blocks: [], width: '1fr' });
      expect(columns.config.columns[2]).toEqual({ blocks: [], width: '1fr' });
      expect(mockUpdateFunction).toHaveBeenCalled();
    });

    it('should handle reducing column count', () => {
      columns.updateColumnCount(1);
      
      expect(columns.config.columns).toHaveLength(1);
      expect(mockUpdateFunction).toHaveBeenCalled();
    });

    it('should ignore custom option', () => {
      const originalColumns = [...columns.config.columns];
      columns.updateColumnCount('custom');
      
      expect(columns.config.columns).toEqual(originalColumns);
      expect(mockUpdateFunction).not.toHaveBeenCalled();
    });
  });

  describe('getColumnStyles', () => {
    it('should return correct CSS grid styles', () => {
      const styles = columns.getColumnStyles();
      
      expect(styles).toContain('display: grid');
      expect(styles).toContain('grid-template-columns: 1fr 1fr');
      expect(styles).toContain('gap: 20px');
      expect(styles).toContain('align-items: start');
    });

    it('should map alignment values correctly', () => {
      columns.config.alignment = 'center';
      let styles = columns.getColumnStyles();
      expect(styles).toContain('align-items: center');
      
      columns.config.alignment = 'bottom';
      styles = columns.getColumnStyles();
      expect(styles).toContain('align-items: end');
      
      columns.config.alignment = 'stretch';
      styles = columns.getColumnStyles();
      expect(styles).toContain('align-items: stretch');
    });

    it('should handle custom column widths', () => {
      columns.config.columns = [
        { blocks: [], width: '2fr' },
        { blocks: [], width: '1fr' },
        { blocks: [], width: '200px' }
      ];
      
      const styles = columns.getColumnStyles();
      expect(styles).toContain('grid-template-columns: 2fr 1fr 200px');
    });
  });

  describe('handleColumnDrop', () => {
    it('should add block to specified column', () => {
      const blockData = {
        class: 'Paragraph',
        config: { content: 'Test paragraph' }
      };
      
      columns.handleColumnDrop(0, blockData);
      
      expect(columns.config.columns[0].blocks).toHaveLength(1);
      expect(columns.config.columns[0].blocks[0]).toMatchObject({
        class: 'Paragraph',
        config: { content: 'Test paragraph' }
      });
      expect(mockUpdateFunction).toHaveBeenCalled();
    });

    it('should handle non-existent column gracefully', () => {
      const blockData = { class: 'Paragraph', config: {} };
      
      expect(() => columns.handleColumnDrop(5, blockData)).not.toThrow();
      expect(mockUpdateFunction).not.toHaveBeenCalled();
    });

    it('should insert at beginning when position is start', () => {
      // Add existing block
      columns.config.columns[0].blocks = [{ id: 'existing' }];
      
      const blockData = { class: 'Paragraph', config: {} };
      columns.handleColumnDrop(0, blockData, 'start');
      
      expect(columns.config.columns[0].blocks).toHaveLength(2);
      expect(columns.config.columns[0].blocks[0].class).toBe('Paragraph');
      expect(columns.config.columns[0].blocks[1].id).toBe('existing');
    });

    it('should generate unique IDs for nested blocks', () => {
      const blockData = { class: 'Paragraph', config: {} };
      
      columns.handleColumnDrop(0, blockData);
      columns.handleColumnDrop(0, blockData);
      
      const block1 = columns.config.columns[0].blocks[0];
      const block2 = columns.config.columns[0].blocks[1];
      
      expect(block1.id).toBeDefined();
      expect(block2.id).toBeDefined();
      expect(block1.id).not.toBe(block2.id);
    });
  });

  describe('getToolDefaults', () => {
    it('should return defaults for known tools', () => {
      const paragraphDefaults = columns.getToolDefaults('Paragraph');
      expect(paragraphDefaults.config.content).toBe('Enter paragraph text...');
      expect(paragraphDefaults.config.fontSize).toBe('16px');
      
      const headerDefaults = columns.getToolDefaults('Header');
      expect(headerDefaults.config.content).toBe('Header text');
      expect(headerDefaults.config.level).toBe('h2');
      
      const buttonDefaults = columns.getToolDefaults('Button');
      expect(buttonDefaults.config.text).toBe('Button');
      expect(buttonDefaults.config.type).toBe('primary');
    });

    it('should return empty config for unknown tools', () => {
      const unknownDefaults = columns.getToolDefaults('UnknownTool');
      expect(unknownDefaults).toEqual({ config: {} });
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = columns.generateId();
      const id2 = columns.generateId();
      
      expect(id1).toMatch(/^nested-[a-z0-9]{9}$/);
      expect(id2).toMatch(/^nested-[a-z0-9]{9}$/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('renderNestedBlocks', () => {
    it('should render placeholder when no blocks', () => {
      const html = columns.renderNestedBlocks(0);
      
      expect(html).toContain('column-placeholder');
      expect(html).toContain('Drop blocks here');
    });

    it('should render nested blocks', () => {
      columns.config.columns[0].blocks = [
        {
          id: 'nested-1',
          class: 'Paragraph',
          config: { content: 'Test paragraph' }
        }
      ];
      
      const html = columns.renderNestedBlocks(0);
      
      expect(html).toContain('nested-block');
      expect(html).toContain('nested-block-Paragraph');
      expect(html).toContain('data-block-id="nested-1"');
      expect(html).toContain('Test paragraph');
    });
  });

  describe('renderNestedBlockContent', () => {
    it('should render paragraph blocks', () => {
      const block = {
        class: 'Paragraph',
        config: { content: 'Test paragraph', fontSize: '18px' }
      };
      
      const html = columns.renderNestedBlockContent(block);
      
      expect(html).toContain('<p>Test paragraph</p>');
      expect(html).toContain('font-size: 18px');
      expect(html).toContain('nested-paragraph');
    });

    it('should render header blocks', () => {
      const block = {
        class: 'Header',
        config: { content: 'Test header', level: 'h3', color: 'blue' }
      };
      
      const html = columns.renderNestedBlockContent(block);
      
      expect(html).toContain('<h3');
      expect(html).toContain('Test header');
      expect(html).toContain('color: blue');
      expect(html).toContain('</h3>');
    });

    it('should render image blocks', () => {
      const block = {
        class: 'Image',
        config: { 
          src: 'https://example.com/image.jpg',
          alt: 'Test image',
          caption: 'Test caption',
          alignment: 'center'
        }
      };
      
      const html = columns.renderNestedBlockContent(block);
      
      expect(html).toContain('<img');
      expect(html).toContain('src="https://example.com/image.jpg"');
      expect(html).toContain('alt="Test image"');
      expect(html).toContain('text-align: center');
      expect(html).toContain('Test caption');
    });

    it('should render image placeholder when no src', () => {
      const block = {
        class: 'Image',
        config: { src: '', alt: 'Test' }
      };
      
      const html = columns.renderNestedBlockContent(block);
      
      expect(html).toContain('image-placeholder');
      expect(html).toContain('📷 Click to add image');
    });

    it('should render button blocks', () => {
      const block = {
        class: 'Button',
        config: { text: 'Click me', type: 'primary', size: 'large' }
      };
      
      const html = columns.renderNestedBlockContent(block);
      
      expect(html).toContain('<button');
      expect(html).toContain('Click me');
      expect(html).toContain('btn-primary');
      expect(html).toContain('btn-large');
    });

    it('should render quote blocks', () => {
      const block = {
        class: 'Quote',
        config: { content: 'Test quote', attribution: 'Test Author' }
      };
      
      const html = columns.renderNestedBlockContent(block);
      
      expect(html).toContain('<blockquote>Test quote</blockquote>');
      expect(html).toContain('— Test Author');
      expect(html).toContain('border-left: 4px solid #ddd');
    });

    it('should render generic block preview for unknown types', () => {
      const block = {
        class: 'UnknownBlock',
        config: {}
      };
      
      const html = columns.renderNestedBlockContent(block);
      
      expect(html).toContain('block-preview');
      expect(html).toContain('📦');
      expect(html).toContain('UnknownBlock');
    });
  });

  describe('removeNestedBlock', () => {
    beforeEach(() => {
      columns.config.columns[0].blocks = [
        { id: 'block-1', class: 'Paragraph' },
        { id: 'block-2', class: 'Header' },
        { id: 'block-3', class: 'Button' }
      ];
    });

    it('should remove specified block', () => {
      columns.removeNestedBlock(0, 'block-2');
      
      expect(columns.config.columns[0].blocks).toHaveLength(2);
      expect(columns.config.columns[0].blocks.find(b => b.id === 'block-2')).toBeUndefined();
      expect(mockUpdateFunction).toHaveBeenCalled();
    });

    it('should handle non-existent block gracefully', () => {
      columns.removeNestedBlock(0, 'non-existent');
      
      expect(columns.config.columns[0].blocks).toHaveLength(3);
      expect(mockUpdateFunction).not.toHaveBeenCalled();
    });

    it('should handle non-existent column gracefully', () => {
      expect(() => columns.removeNestedBlock(5, 'block-1')).not.toThrow();
    });
  });

  describe('editorRender', () => {
    it('should render columns for editor with drag and drop functionality', () => {
      const html = columns.editorRender();
      
      expect(html).toContain('columns-block');
      expect(html).toContain('x-data=');
      expect(html).toContain('handleColumnDragOver');
      expect(html).toContain('handleColumnDrop');
      expect(html).toContain('column-drop-zone');
    });

    it('should include column headers with width inputs', () => {
      const html = columns.editorRender();
      
      expect(html).toContain('column-header');
      expect(html).toContain('Column 1');
      expect(html).toContain('Column 2');
      expect(html).toContain('column-width-input');
      expect(html).toContain('value="1fr"');
    });

    it('should apply grid styles', () => {
      const html = columns.editorRender();
      
      expect(html).toContain('display: grid');
      expect(html).toContain('grid-template-columns: 1fr 1fr');
      expect(html).toContain('gap: 20px');
    });

    it('should handle different column configurations', () => {
      columns.config.columns = [
        { blocks: [], width: '2fr' },
        { blocks: [], width: '1fr' },
        { blocks: [], width: '200px' }
      ];
      
      const html = columns.editorRender();
      
      expect(html).toContain('Column 1');
      expect(html).toContain('Column 2');
      expect(html).toContain('Column 3');
      expect(html).toContain('value="2fr"');
      expect(html).toContain('value="200px"');
    });
  });

  describe('render', () => {
    it('should render columns for output', () => {
      const html = columns.render();
      
      expect(html).toContain('columns-block');
      expect(html).toContain('column');
      expect(html).toContain('column-content');
      expect(html).not.toContain('column-header');
      expect(html).not.toContain('x-data');
    });

    it('should apply grid styles in render', () => {
      const html = columns.render();
      
      expect(html).toContain('display: grid');
      expect(html).toContain('grid-template-columns: 1fr 1fr');
      expect(html).toContain('gap: 20px');
    });
  });

  describe('error handling', () => {
    it('should handle missing config gracefully', () => {
      const columnsWithoutConfig = new Columns({
        id: 'test',
        updateFunction: mockUpdateFunction,
        config: null
      });
      
      expect(() => columnsWithoutConfig.render()).not.toThrow();
    });

    it('should handle corrupted columns array', () => {
      columns.config.columns = null;
      
      expect(() => columns.render()).not.toThrow();
    });

    it('should handle missing blocks array in column', () => {
      columns.config.columns[0].blocks = null;
      
      const html = columns.renderNestedBlocks(0);
      expect(html).toContain('Drop blocks here');
    });
  });
});
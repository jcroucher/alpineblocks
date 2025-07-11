import { BlockManager } from '../../../src/core/editor_modules/BlockManager';

describe('BlockManager', () => {
  let blockManager;
  let mockBlockClass;
  let mockBlock;

  beforeEach(() => {
    mockBlock = {
      id: 'test-block-id',
      config: { content: 'test content' },
      render: jest.fn(() => '<div>Test Block</div>'),
      editorRender: jest.fn(() => '<div>Editor Test Block</div>')
    };

    mockBlockClass = jest.fn(() => mockBlock);

    blockManager = new BlockManager();
  });

  describe('constructor', () => {
    it('should initialize with empty blocks array', () => {
      expect(blockManager.blocks).toEqual([]);
    });
  });

  describe('addBlock', () => {
    it('should create and add a new block', () => {
      const config = { content: 'new content' };
      const updateFunction = jest.fn();
      
      const addedBlock = blockManager.addBlock(mockBlockClass, config, updateFunction);
      
      expect(mockBlockClass).toHaveBeenCalledWith({
        id: 'test-uuid-1234', // From mocked uuid
        updateFunction: updateFunction,
        config: config
      });
      
      expect(blockManager.blocks).toHaveLength(1);
      expect(blockManager.blocks[0]).toBe(mockBlock);
      expect(addedBlock).toBe(mockBlock);
    });

    it('should handle adding multiple blocks', () => {
      const config1 = { content: 'content 1' };
      const config2 = { content: 'content 2' };
      
      blockManager.addBlock(mockBlockClass, config1);
      blockManager.addBlock(mockBlockClass, config2);
      
      expect(blockManager.blocks).toHaveLength(2);
    });

    it('should pass updateFunction to block constructor', () => {
      const updateFunction = jest.fn();
      
      blockManager.addBlock(mockBlockClass, {}, updateFunction);
      
      expect(mockBlockClass).toHaveBeenCalledWith(
        expect.objectContaining({
          updateFunction: updateFunction
        })
      );
    });

    it('should handle missing updateFunction', () => {
      expect(() => {
        blockManager.addBlock(mockBlockClass, {});
      }).not.toThrow();
      
      expect(mockBlockClass).toHaveBeenCalledWith(
        expect.objectContaining({
          updateFunction: blockManager.updateBlock
        })
      );
    });
  });

  describe('findBlockById', () => {
    beforeEach(() => {
      blockManager.addBlock(mockBlockClass, { content: 'test' });
    });

    it('should find block by id', () => {
      const foundBlock = blockManager.findBlockById('test-block-id');
      expect(foundBlock).toBe(mockBlock);
    });

    it('should return undefined for non-existent block', () => {
      const foundBlock = blockManager.findBlockById('non-existent-id');
      expect(foundBlock).toBeUndefined();
    });

    it('should handle empty blocks array', () => {
      const emptyBlockManager = new BlockManager();
      const foundBlock = emptyBlockManager.findBlockById('any-id');
      expect(foundBlock).toBeUndefined();
    });
  });

  describe('updateBlock', () => {
    beforeEach(() => {
      blockManager.addBlock(mockBlockClass, { content: 'original' });
    });

    it('should update block config', () => {
      const newConfig = { content: 'updated content' };
      
      blockManager.updateBlock('test-block-id', newConfig);
      
      expect(mockBlock.config).toEqual(newConfig);
    });

    it('should handle non-existent block gracefully', () => {
      expect(() => {
        blockManager.updateBlock('non-existent-id', { content: 'new' });
      }).not.toThrow();
    });

    it('should handle null config', () => {
      blockManager.updateBlock('test-block-id', null);
      expect(mockBlock.config).toBeNull();
    });

    it('should handle undefined config', () => {
      blockManager.updateBlock('test-block-id', undefined);
      expect(mockBlock.config).toBeUndefined();
    });
  });

  describe('removeBlock', () => {
    beforeEach(() => {
      // Add multiple blocks
      blockManager.addBlock(mockBlockClass, { content: 'block 1' });
      blockManager.addBlock(mockBlockClass, { content: 'block 2' });
      blockManager.addBlock(mockBlockClass, { content: 'block 3' });
    });

    it('should remove block by id', () => {
      const initialLength = blockManager.blocks.length;
      
      blockManager.removeBlock('test-block-id');
      
      expect(blockManager.blocks).toHaveLength(initialLength - 1);
      expect(blockManager.findBlockById('test-block-id')).toBeUndefined();
    });

    it('should handle non-existent block gracefully', () => {
      const initialLength = blockManager.blocks.length;
      
      blockManager.removeBlock('non-existent-id');
      
      expect(blockManager.blocks).toHaveLength(initialLength);
    });

    it('should handle empty blocks array', () => {
      const emptyBlockManager = new BlockManager();
      
      expect(() => {
        emptyBlockManager.removeBlock('any-id');
      }).not.toThrow();
    });
  });

  describe('renderBlocks', () => {
    it('should render all blocks', () => {
      const block1 = { render: jest.fn(() => '<div>Block 1</div>') };
      const block2 = { render: jest.fn(() => '<div>Block 2</div>') };
      
      blockManager.blocks = [block1, block2];
      
      const result = blockManager.renderBlocks();
      
      expect(block1.render).toHaveBeenCalled();
      expect(block2.render).toHaveBeenCalled();
      expect(result).toBe('<div>Block 1</div><div>Block 2</div>');
    });

    it('should return empty string for no blocks', () => {
      const result = blockManager.renderBlocks();
      expect(result).toBe('');
    });

    it('should handle blocks without render method', () => {
      const blockWithoutRender = { id: 'test' };
      blockManager.blocks = [blockWithoutRender];
      
      expect(() => {
        blockManager.renderBlocks();
      }).toThrow();
    });

    it('should handle blocks that return null from render', () => {
      const blockWithNullRender = { render: jest.fn(() => null) };
      blockManager.blocks = [blockWithNullRender];
      
      const result = blockManager.renderBlocks();
      expect(result).toBe('null');
    });
  });

  describe('renderBlocksForEditor', () => {
    it('should render blocks for editor', () => {
      const block1 = { editorRender: jest.fn(() => '<div>Editor Block 1</div>') };
      const block2 = { editorRender: jest.fn(() => '<div>Editor Block 2</div>') };
      
      blockManager.blocks = [block1, block2];
      
      const result = blockManager.renderBlocksForEditor();
      
      expect(block1.editorRender).toHaveBeenCalled();
      expect(block2.editorRender).toHaveBeenCalled();
      expect(result).toBe('<div>Editor Block 1</div><div>Editor Block 2</div>');
    });

    it('should fallback to render method if editorRender is not available', () => {
      const blockWithoutEditorRender = { render: jest.fn(() => '<div>Fallback</div>') };
      blockManager.blocks = [blockWithoutEditorRender];
      
      const result = blockManager.renderBlocksForEditor();
      
      expect(blockWithoutEditorRender.render).toHaveBeenCalled();
      expect(result).toBe('<div>Fallback</div>');
    });

    it('should return empty string for no blocks', () => {
      const result = blockManager.renderBlocksForEditor();
      expect(result).toBe('');
    });
  });

  describe('getBlocksData', () => {
    it('should return blocks data as JSON serializable format', () => {
      const mockConstructor = function() {};
      mockConstructor.name = 'TestBlock';
      
      const block1 = {
        id: 'block-1',
        config: { content: 'test 1' },
        constructor: mockConstructor
      };
      
      const block2 = {
        id: 'block-2',
        config: { content: 'test 2' },
        constructor: mockConstructor
      };
      
      blockManager.blocks = [block1, block2];
      
      const result = blockManager.getBlocksData();
      
      expect(result).toEqual([
        {
          id: 'block-1',
          class: 'TestBlock',
          data: { content: 'test 1' }
        },
        {
          id: 'block-2',
          class: 'TestBlock',
          data: { content: 'test 2' }
        }
      ]);
    });

    it('should return empty array for no blocks', () => {
      const result = blockManager.getBlocksData();
      expect(result).toEqual([]);
    });

    it('should handle blocks without constructor name', () => {
      const blockWithoutName = {
        id: 'block-1',
        config: { content: 'test' },
        constructor: {}
      };
      
      blockManager.blocks = [blockWithoutName];
      
      const result = blockManager.getBlocksData();
      
      expect(result[0]).toEqual({
        id: 'block-1',
        class: undefined,
        data: { content: 'test' }
      });
    });
  });

  describe('insertBlock', () => {
    beforeEach(() => {
      // Add initial blocks
      blockManager.addBlock(mockBlockClass, { content: 'block 1' });
      blockManager.addBlock(mockBlockClass, { content: 'block 2' });
      blockManager.addBlock(mockBlockClass, { content: 'block 3' });
    });

    it('should insert block at specified index', () => {
      const newBlock = { id: 'new-block', config: { content: 'new' } };
      
      blockManager.insertBlock(1, newBlock);
      
      expect(blockManager.blocks).toHaveLength(4);
      expect(blockManager.blocks[1]).toBe(newBlock);
    });

    it('should insert at end if index is greater than length', () => {
      const newBlock = { id: 'new-block', config: { content: 'new' } };
      
      blockManager.insertBlock(10, newBlock);
      
      expect(blockManager.blocks).toHaveLength(4);
      expect(blockManager.blocks[3]).toBe(newBlock);
    });

    it('should insert at beginning if index is 0', () => {
      const newBlock = { id: 'new-block', config: { content: 'new' } };
      
      blockManager.insertBlock(0, newBlock);
      
      expect(blockManager.blocks).toHaveLength(4);
      expect(blockManager.blocks[0]).toBe(newBlock);
    });

    it('should handle negative index by inserting at beginning', () => {
      const newBlock = { id: 'new-block', config: { content: 'new' } };
      
      blockManager.insertBlock(-1, newBlock);
      
      expect(blockManager.blocks).toHaveLength(4);
      expect(blockManager.blocks[0]).toBe(newBlock);
    });
  });
});
import { Debug } from '../../../src/core/utils/Debug';
import { DebugConfig } from '../../../src/config/debug';

describe('Debug Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset debug state
    Debug.setEnabled(true);
    Debug.setLevel(3);
  });

  describe('setEnabled', () => {
    it('should enable debug output', () => {
      Debug.setEnabled(true);
      Debug.log('test message');
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('[AlpineBlocks] test message'),
        expect.any(String)
      );
    });

    it('should disable debug output', () => {
      Debug.setEnabled(false);
      Debug.log('test message');
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('setLevel', () => {
    it('should set debug level and update config', () => {
      Debug.setLevel(2);
      expect(Debug.currentLevel).toBe(2);
      expect(DebugConfig.level).toBe(2);
    });

    it('should respect debug levels', () => {
      Debug.setLevel(1); // WARN level
      
      Debug.error('error message');
      Debug.warn('warn message');
      Debug.info('info message');
      Debug.debug('debug message');
      
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[AlpineBlocks ERROR] error message'),
        expect.any(String)
      );
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[AlpineBlocks WARN] warn message'),
        expect.any(String)
      );
      expect(console.info).not.toHaveBeenCalled();
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('logging methods', () => {
    it('should log error messages with proper styling', () => {
      Debug.error('test error', { details: 'extra' });
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[AlpineBlocks ERROR] test error'),
        expect.any(String),
        { details: 'extra' }
      );
    });

    it('should log warning messages with proper styling', () => {
      Debug.warn('test warning');
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[AlpineBlocks WARN] test warning'),
        expect.any(String)
      );
    });

    it('should log info messages with proper styling', () => {
      Debug.info('test info');
      expect(console.info).toHaveBeenCalledWith(
        expect.stringContaining('[AlpineBlocks INFO] test info'),
        expect.any(String)
      );
    });

    it('should log debug messages with proper styling', () => {
      Debug.debug('test debug');
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('[AlpineBlocks DEBUG] test debug'),
        expect.any(String)
      );
    });

    it('should log general messages with proper styling', () => {
      Debug.log('test log');
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('[AlpineBlocks] test log'),
        expect.any(String)
      );
    });
  });

  describe('global access', () => {
    it('should expose Debug utility globally in browser environment', () => {
      expect(window.AlpineBlocksDebug).toBeDefined();
      expect(window.AlpineBlocksDebug).toBe(Debug);
    });
  });

  describe('disabled state', () => {
    beforeEach(() => {
      Debug.setEnabled(false);
    });

    it('should not log when disabled', () => {
      Debug.error('error');
      Debug.warn('warn');
      Debug.info('info');
      Debug.debug('debug');
      Debug.log('log');
      
      expect(console.error).not.toHaveBeenCalled();
      expect(console.warn).not.toHaveBeenCalled();
      expect(console.info).not.toHaveBeenCalled();
      expect(console.log).not.toHaveBeenCalled();
    });
  });
});
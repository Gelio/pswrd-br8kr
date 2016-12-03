const Logger = require('./logger');
const LOG_LEVELS = require('./log-levels');

describe('Logger', () => {
  let logDestination;

  beforeEach(() => {
    logDestination = jasmine.createSpyObj('logDestination', ['log', 'info', 'warn', 'error']);
  });

  describe('init', () => {
    it('should instantiate without errors', () => {
      let logger = new Logger();
      expect(logger).toBeDefined();
    });

    it('should instantiate with default logging level', () => {
      let logger = new Logger();
      expect(logger._loggingLevel).toBeDefined();
    });
  });

  describe('general', () => {
    it('should respect logging levels hierarchy', () => {
      let logger = new Logger(LOG_LEVELS.SILENT, logDestination);
      logger.error('message');

      expect(logDestination.error).not.toHaveBeenCalled();
    });

    it('should log to the logging destination', () => {
      let logger = new Logger(LOG_LEVELS.REGULAR, logDestination);
      logger.log('message');

      expect(logDestination.log).toHaveBeenCalledWith('message');
    });
  });
});

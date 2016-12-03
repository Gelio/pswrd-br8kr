const LoggerModule = require('./Logger.module');
const Logger = LoggerModule.Logger;

describe('Logger', () => {
  it('should instantiate without errors', () => {
    let logger = new Logger();
    expect(logger).toBeDefined();
  });

  it('should instantiate with default logging level', () => {
    let logger = new Logger();
    expect(logger.loggingLevel).toBeDefined();
  });

  it('should respect logging levels hierarchy', () => {
    spyOn(console, 'error');

    let logger = new Logger(LoggerModule.LOGGING_LEVEL.SILENT);
    logger.error('message');

    expect(console.error).not.toHaveBeenCalled();
  });

  it('should log to the logging destination', () => {
    let logDestination = {
      log() {
        // Mock logger
      }
    };
    spyOn(logDestination, 'log');

    let logger = new Logger(LoggerModule.LOGGING_LEVEL.REGULAR, logDestination);
    logger.log('message');

    expect(logDestination.log).toHaveBeenCalledWith('message');
  });
});

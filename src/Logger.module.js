const LOGGING_LEVEL = {
  SILENT: 1,
  ERROR: 2,
  WARN: 3,
  REGULAR: 4,
  VERBOSE: 5
};

class Logger {
  constructor(loggingLevel, logDestination = console) {
    this.loggingLevel = loggingLevel || LOGGING_LEVEL.REGULAR;
    this.logDestination = logDestination;
  }

  log(...params) {
    if (this.loggingLevel >= LOGGING_LEVEL.REGULAR)
      this.logDestination.log(...params);
  }

  error(...params) {
    if (this.loggingLevel >= LOGGING_LEVEL.ERROR)
      this.logDestination.error(...params);
  }

  warn(...params) {
    if (this.loggingLevel >= LOGGING_LEVEL.WARN)
      this.logDestination.warn(...params);
  }

  verbose(...params) {
    if (this.loggingLevel >= LOGGING_LEVEL.VERBOSE)
      this.logDestination.info(...params);
  }
}

module.exports = {
  LOGGING_LEVEL,
  Logger
}

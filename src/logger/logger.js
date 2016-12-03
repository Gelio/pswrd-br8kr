const LOG_LEVELS = require('./log-levels');

module.exports = class Logger {
  constructor(loggingLevel, logDestination = console) {
    this.loggingLevel = loggingLevel || LOG_LEVELS.REGULAR;
    this.logDestination = logDestination;
  }

  log(...params) {
    if (this.loggingLevel >= LOG_LEVELS.REGULAR)
      this.logDestination.log(...params);
  }

  error(...params) {
    if (this.loggingLevel >= LOG_LEVELS.ERROR)
      this.logDestination.error(...params);
  }

  warn(...params) {
    if (this.loggingLevel >= LOG_LEVELS.WARN)
      this.logDestination.warn(...params);
  }

  verbose(...params) {
    if (this.loggingLevel >= LOG_LEVELS.VERBOSE)
      this.logDestination.info(...params);
  }
}

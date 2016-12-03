const LOG_LEVELS = require('./log-levels');

module.exports = class Logger {
  constructor(loggingLevel = LOG_LEVELS.REGULAR, logDestination = console) {
    this._loggingLevel = loggingLevel;
    this._logDestination = logDestination;
  }

  log(...params) {
    if (this._loggingLevel >= LOG_LEVELS.REGULAR)
      this._logDestination.log(...params);
  }

  error(...params) {
    if (this._loggingLevel >= LOG_LEVELS.ERROR)
      this._logDestination.error(...params);
  }

  warn(...params) {
    if (this._loggingLevel >= LOG_LEVELS.WARN)
      this._logDestination.warn(...params);
  }

  verbose(...params) {
    if (this._loggingLevel >= LOG_LEVELS.VERBOSE)
      this._logDestination.info(...params);
  }
}

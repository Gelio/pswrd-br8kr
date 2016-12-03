const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const LOG_LEVELS = require('../logger').LOG_LEVELS;


class CLIManager {
  parse(optionDefinitions) {
    const options = commandLineArgs(optionDefinitions);

    if (options.verbose) {
      options.log = LOG_LEVELS.VERBOSE;
    }

    return options;
  }

  getHelp(usageSections) {
    return commandLineUsage(usageSections);
  }
}


module.exports = CLIManager;

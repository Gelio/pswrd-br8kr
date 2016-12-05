const Authenticator = require('./src/authenticator');
const Logger = require('./src/logger').Logger;
const PasswordManager = require('./src/password-manager');
const {CLIManager, OPTION_DEFINITIONS, generateUsageSections} = require('./src/cli-manager');

let cliManager = new CLIManager();
let options = cliManager.parse(OPTION_DEFINITIONS);

if (options.help || process.argv.length == 2) {
  let usageSections = generateUsageSections(OPTION_DEFINITIONS);
  let help = cliManager.getHelp(usageSections);
  console.log(help);
  process.exit(1);
}


let logger = new Logger(options.log);
let pm = new PasswordManager(logger, {
  passwordFile: options['pass-file'],
  passwordPrefix: options['pass-prefix'],
  bufferSize: options['max-requests']
});

let authenticator = new Authenticator(pm, logger, {
  url: options.url,
  user: options.user,
  maxRequests: options['max-requests']
});

authenticator.init();
pm.fillBuffer();

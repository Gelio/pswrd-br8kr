const Authenticator = require('./src/authenticator');
const Logger = require('./src/logger').Logger;
const PasswordManager = require('./src/password-manager');
const {CLIManager, OPTION_DEFINITIONS, USAGE_SECTIONS} = require('./src/cli-manager');

let cliManager = new CLIManager();
let options = cliManager.parse(OPTION_DEFINITIONS);

if (options.help || process.argv.length == 2) {
  let help = cliManager.getHelp(USAGE_SECTIONS);
  console.log(help);
  process.exit(1);
}


let logger = new Logger(options.log);
let pm = new PasswordManager(logger, {
  passwordFile: options['pass-file'],
  bufferSize: options['max-requests']
});
pm.prepareBuffer();

let authenticator = new Authenticator(pm, logger, {
  url: options.url,
  user: options.user,
  maxRequests: options['max-requests']
});
// 4YIbe15P
authenticator.makeSingleRequest('4YIbe1');

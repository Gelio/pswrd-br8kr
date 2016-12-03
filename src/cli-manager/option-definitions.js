const LOG_LEVELS = require('../logger').LOG_LEVELS;

const DEFAULT_OPTIONS = {
  url: 'http://mini.pw.edu.pl/~brodka/PZ/zad_A/zadanie_a.zip',
  user: 's3-pz',
  maxRequests: 100,
  passPrefix: ''
};

const OPTION_DEFINITIONS = [
  { name: 'verbose', alias: 'v', type: Boolean, description: 'Set logging level to verbose' },
  { name: 'log', alias: 'l', type: Number, defaultValue: LOG_LEVELS.REGULAR, description: 'Set logging level (1 - silent, 2 - error, 3 - warn, 4 - regular, 5 - verbose)' },
  { name: 'url', type: String, defaultValue: DEFAULT_OPTIONS.url, description: 'URL to a resource that required authorization' },
  { name: 'user', type: String, defaultValue: DEFAULT_OPTIONS.user, description: 'Username to try to authorize with' },
  { name: 'pass-file', type: String, description: 'Path to a file with passwords' },
  { name: 'pass-prefix', type: String, defaultValue: DEFAULT_OPTIONS.passPrefix, description: 'Password prefix' },
  { name: 'max-requests', type: Number, defaultValue: DEFAULT_OPTIONS.maxRequests, description: 'Upper limit for concurrent requests amount' },
  { name: 'help', alias: 'h', type: Boolean, description: 'Print this usage guide' }
];

module.exports = OPTION_DEFINITIONS;

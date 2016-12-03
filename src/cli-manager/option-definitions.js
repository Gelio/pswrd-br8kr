const LOG_LEVELS = require('../logger').LOG_LEVELS;

const DEFAULT_OPTIONS = {
  url: 'http://mini.pw.edu.pl/~brodka/PZ/zad_A/zadanie_a.zip',
  user: 's3-pz',
  maxRequests: 100
};

const OPTION_DEFINITIONS = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'log', alias: 'l', type: Number, defaultValue: LOG_LEVELS.REGULAR },
  { name: 'url', type: String, defaultValue: DEFAULT_OPTIONS.url },
  { name: 'user', type: String, defaultValue: DEFAULT_OPTIONS.user },
  { name: 'max-requests', type: Number, defaultValue: DEFAULT_OPTIONS.maxRequests },
  { name: 'pass-file', type: String },
  { name: 'help', alias: 'h', type: Boolean }
];

module.exports = OPTION_DEFINITIONS;

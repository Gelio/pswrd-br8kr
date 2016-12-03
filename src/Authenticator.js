const request = require('request-promise');

class Authenticator {
  constructor(passwordManager, logger, options) {
    if (!passwordManager)
      throw new Error('Missing password manager');
    this.passwordManager = passwordManager;

    if (!logger)
      throw new Error('Missing logger');
    this.logger = logger;

    if (!options)
      throw new Error('Missing options');

    if (!options.user)
      throw new Error('Missing auth user');
    this.user = options.user;

    if (!options.url)
      throw new Error('Missing url');
    this.url = options.url;

    this.maxRequests = options.maxRequests || 100;
    this.logger.log('Authenticator set up');
  }

  getAuthorizationHash(password) {
    return new Buffer(this.user + ':' + password).toString('base64');
  }

  getAuthorizationHeader(password) {
    return 'Basic ' + this.getAuthorizationHash(password);
  }

  makeSingleRequest(password) {
    let options = {
      uri: this.url,
      headers: {
        'Authorization': this.getAuthorizationHeader(password)
      }
    };

    return request(options)
      .then(response => {
        console.log(response);
      });
  }
}

module.exports = Authenticator;

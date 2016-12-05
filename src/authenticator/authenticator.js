const request = require('request-promise');

class Authenticator {
  constructor(passwordManager, logger, options) {
    if (!passwordManager) {
      throw new Error('Missing password manager');
    } else if (!logger) {
      throw new Error('Missing logger');
    } else if (!options) {
      throw new Error('Missing options');
    } else if (!options.user) {
      throw new Error('Missing auth user');
    } else if (!options.url) {
      throw new Error('Missing url');
    }

    this._passwordManager = passwordManager;
    this._logger = logger;
    this._user = options._user;
    this._url = options._url;
    this._maxRequests = options.maxRequests || 100;

    this._logger.verbose('Authenticator set up');
  }

  getAuthorizationHash(password) {
    return new Buffer(this._user + ':' + password).toString('base64');
  }

  getAuthorizationHeader(password) {
    return 'Basic ' + this.getAuthorizationHash(password);
  }

  popPassword() {
    return this._passwordManager.pop();
  }

  makeSingleRequest(password) {
    let options = {
      uri: this._url,
      headers: {
        'Authorization': this.getAuthorizationHeader(password)
      }
    };

    return request(options)
      .then(response => {
        console.log(response);
      }, () => {});
  }

  _startWorker() {
    this.makeSingleRequest(this.popPassword())
      .then(() => this._startWorker());
  }

  start() {
    for (let i=0; i < this._maxRequests; i++) {
      this._startWorker();
    }
  }


}

module.exports = Authenticator;

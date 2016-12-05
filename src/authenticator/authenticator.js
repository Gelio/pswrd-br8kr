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
    this._user = options.user;
    this._url = options.url;
    this._maxRequests = options.maxRequests || 100;
    this._workerCount = 0;

    this._logger.verbose('Authenticator set up');
  }

  getAuthorizationHash(password) {
    return new Buffer(this._user + ':' + password).toString('base64');
  }

  getAuthorizationHeader(password) {
    return 'Basic ' + this.getAuthorizationHash(password);
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
        return password;
      }, () => {
        this._logger.verbose(password + ' failed');
        return false;
      });
  }

  _canStartWorker() {
    return !this._passwordManager.isEmpty() && this._workerCount < this._maxRequests;
  }

  _startWorker() {
    if (!this._canStartWorker()) {
      this._logger.verbose('Cannot start a new worker.');
      return;
    }

    this._workerCount++;
    let password = this._passwordManager.pop();
    this.makeSingleRequest(password)
      .then(matchingPassword => {
        this._workerCount--;
        if (matchingPassword) {
          this._logger.log(`Success: password '${matchingPassword}' matches`);
        }

        if (this._workerCount < this._maxRequests) {
          this._startWorker();
        }
      });
  }

  start() {
    for (let i=0; i < this._maxRequests; i++) {
      this._startWorker();
    }
  }


}

module.exports = Authenticator;

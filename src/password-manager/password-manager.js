const fs = require('fs');
const readline = require('readline');

/**
 * Reads passwords from file line by line with a buffer.
 *
 * @class PasswordManager
 */
class PasswordManager {
  constructor(logger, options) {
    if (!options) {
      throw new Error('Missing options');
    } else if (!options.passwordFile) {
      throw new Error('Missing password file');
    }


    /** @type {number} */
    this._bufferSize = options.bufferSize || 100;
    /** @type {string[]} */
    this._passwordList = [];


    this._init(options.passwordFile);
  }

  /**
   * Fills the buffer with passwords from the readline.
   *
   * @returns {Promise<number>}  Amount of passwords appended to the buffer
   *
   * @memberOf PasswordManager
   */
  fillBuffer() {
    if (this._passwordList.length >= this._bufferSize) {
      return Promise.resolve(0);
    }

    return new Promise(resolve => {
      this._passwordReadline.resume();

      this._passwordReadline.once('pause', () => resolve(this.linesRead));
    });
  }

  /**
   * Returns the first element in the list and removes it
   *
   * @throws {RangeError} When password list is empty
   * @returns {string}
   *
   * @memberOf PasswordManager
   */
  pop() {
    if (this.isEmpty()) {
      throw new RangeError('Password list is empty');
    }

    const firstElement = this._passwordList[0];
    this._passwordList.splice(0, 1);

    if (this._passwordReadline.isPaused()) {
      this._passwordReadline.resume();
    }
    return firstElement;
  }

  /**
   * Checks if the password list is empty
   *
   * @returns {boolean}
   *
   * @memberOf PasswordManager
   */
  isEmpty() {
    return this._passwordList.length == 0;
  }




  _init(passwordFile) {
    this._passwordStream = this._createPasswordStream(passwordFile);
    this._passwordReadline = this._createReadlineInterface(this._passwordStream);
    this._readlineInterfaceSubscribe(this._passwordReadline);
  }

  _createPasswordStream(passwordFile) {
    return fs.createReadStream(passwordFile, {
      flags: 'r',
      encoding: 'utf8'
    });
  }

  _createReadlineInterface(passwordStream) {
    const passwordReadline = readline.createInterface({
      input: passwordStream
    });
    passwordReadline.pause();

    return passwordReadline;
  }

  _readlineInterfaceSubscribe(readline) {
    readline.on('line', this._onNewPassword.bind(this));
    readline.on('resume', this._onReadlineResume.bind(this));
    readline.on('close', this._readlineInterfaceUnsubscribe.bind(this));
  }

  _readlineInterfaceUnsubscribe(readline) {
    // TODO: check if event listeners are unsubscribed
    this.logger.log('File ended. No more lines to read.');
    readline.removeEventListener('line', this._onNewPassword);
    readline.removeEventListener('resume', this._onReadlineResume);
  }

  _onNewPassword(line) {
    this.linesRead++;
    this._passwordList.push(line);

    this.logger.verbose(`Read password #${this.linesRead}: ${line}`);

    if (this._passwordList.length >= this._bufferSize) {
      this._passwordReadline.pause();

      this.logger.verbose(`Buffer full. Bulk read ${this.linesRead} passwords`);
    }
  }

  _onReadlineResume() {
    this.linesRead = 0;
    this.logger.verbose(`Pasword readline resumed (${this._passwordList.length} passwords buffered)`);
  }
}

module.exports = PasswordManager;

const fs = require('fs');
const os = require('os');
const tmp = require('tmp');
const randomString = require('randomstring');

const LINE_COUNT = 1000,
  WORD_LENGTH = 8;

module.exports = function createMockPasswordFile() {
  return new Promise((resolve, reject) => {
    tmp.file((err, path, fd, cleanupCallback) => {
      if (err) {
        return reject(err);
      }

      // Add mock data
      let linesWritten = 0;
      writeRandomWord();

      function writeRandomWord() {
        if (linesWritten === LINE_COUNT) {
          resolve(path);
          cleanupCallback();
          return;
        }

        fs.write(fd, randomString.generate(WORD_LENGTH) + os.EOL, err => {
          if (err) {
            return reject(err);
          }
          linesWritten++;

          writeRandomWord();
        });
      }
    });
  })
}

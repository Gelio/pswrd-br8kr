const PasswordManager = require('./PasswordManager');
const createMockPasswordFile = require('./createMockPasswordFile');

describe('PasswordManager', () => {
  let logger;
  beforeEach(() => {
    logger = jasmine.createSpyObj('logger', ['verbose', 'error', 'warn', 'log']);
  });

  describe('init', () => {
    it('should require options', () => {
      expect(() => new PasswordManager(logger)).toThrow();
    });

    it('should require password file in options', () => {
      expect(() => new PasswordManager(logger, {})).toThrow();
    });

    it('should instantiate with a valid password file', done => {
      createMockPasswordFile()
        .then(path => {
          const pm = new PasswordManager(logger, {
            passwordFile: path
          });

          expect(pm).toBeDefined();
          done();
        })
        .catch(error => done.fail(error));
    });
  });

  xit('should give back pushed elements', () => {
    let pm = new PasswordManager(logger);
    pm.push(1);
    expect(pm.pop()).toEqual(1);
  });

  xit('should give back pushed elements in reverse order', () => {
    let pm = new PasswordManager(logger);
    pm.push(1);
    pm.push(2);
    expect(pm.pop()).toEqual(2);
    expect(pm.pop()).toEqual(1);
  });
});

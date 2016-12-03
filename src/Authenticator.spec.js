const Authenticator = require('./Authenticator');
const PasswordManager = require('./PasswordManager');
const LoggerModule = require('./LoggerModule');

describe('Authenticator', () => {
  let pm;
  let logger;

  beforeEach(() => {
    pm = new PasswordManager();
    logger = new LoggerModule.Logger(LoggerModule.LOGGING_LEVEL.SILENT);
  });

  describe('initialization', () => {
    it('should instantiate', () => {
      const authenticator = new Authenticator(pm, logger, {
        user: 'user',
        url: '127.0.0.1'
      });

      expect(authenticator).toBeDefined();
    });

    it('should throw if no options are provided', () => {
      expect(() => new Authenticator(pm, logger)).toThrow();
    });

    it('should throw if user is not provided', () => {
      let options = {
        url: '127.0.0.1'
      };

      expect(() => new Authenticator(pm, logger, options)).toThrow();
    });

    it('should throw if url is not provided', () => {
      let options = {
        user: 'user'
      };

      expect(() => new Authenticator(pm, logger, options)).toThrow();
    });
  });

  describe('getAuthorizationHash', () => {
    it('should return valid authorization hash', () => {
      const authenticator = new Authenticator(pm, logger, {
        user: 'user',
        url: '127.0.0.1'
      });

      let authHash = authenticator.getAuthorizationHash('123');
      expect(authHash).toEqual('dXNlcjoxMjM=');
    });

    it('should return valid authorization hash (another test)', () => {
      const authenticator = new Authenticator(pm, logger, {
        user: 'user',
        url: '127.0.0.1'
      });

      let authHash = authenticator.getAuthorizationHash('hello');
      expect(authHash).toEqual('dXNlcjpoZWxsbw==');
    });

    it('should return valid authorization hash based on user', () => {
      const authenticator = new Authenticator(pm, logger, {
        user: 's3-pz',
        url: '127.0.0.1'
      });

      let authHash = authenticator.getAuthorizationHash('z3rffv');
      expect(authHash).toEqual('czMtcHo6ejNyZmZ2');
    });
  });

  describe('getAuthorizationHeader', () => {
    it('should prepend \'Basic\' to returned auth hash', () => {
      const authenticator = new Authenticator(pm, logger, {
        user: 'user',
        url: '127.0.0.1'
      });

      let password = '3sdef';
      let authHash = authenticator.getAuthorizationHash(password);
      let authHeader = authenticator.getAuthorizationHeader(password);

      expect(authHeader).toEqual('Basic ' + authHash);
    });
  });
});

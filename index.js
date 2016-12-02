const request = require('request');

const config = {
  url: 'http://mini.pw.edu.pl/~brodka/PZ/zad_A/zadanie_a.zip',
  user: 's3-pz',
  passwordPrefix: '',
  maxRequests: 100,
  requestCount: 0
};
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';


switch (process.argv.length) {
  case 2:
    break;
  
  case 3:
    config.passwordPrefix = process.argv[2];
    break;
  
  default:
    console.info('Usage:', process.argv0, 'password-prefix');
    console.info('Password prefix is optional');
    process.exit(1);
}

request.get(config.url)
  .auth(config.user, config.passwordPrefix, true)
  .on('response', response => {
    if (response.statusCode === 200) {
      console.log('Found match!');
      process.exit(0);
    }
    else {
      console.log('Wrong password');
    }
  });

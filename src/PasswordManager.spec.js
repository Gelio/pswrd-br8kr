const PasswordManager = require('./PasswordManager');

describe('PasswordManager', () => {
  it('should instantiate with no parameters', () => {
    let pm = new PasswordManager();
    expect(pm).toBeDefined();
  });

  it('should intantiate with an array', () => {
    let pm = new PasswordManager([1, 2, 3]);
    expect(pm.pop()).toEqual(3);
  });

  it('should give back pushed elements', () => {
    let pm = new PasswordManager();
    pm.push(1);
    expect(pm.pop()).toEqual(1);
  });

  it('should give back pushed elements in reverse order', () => {
    let pm = new PasswordManager();
    pm.push(1);
    pm.push(2);
    expect(pm.pop()).toEqual(2);
    expect(pm.pop()).toEqual(1);
  });
});

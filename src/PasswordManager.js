class PasswordManager {
  constructor(passwordList) {
    this.passwordList = passwordList || [];
  }

  push(password) {
    this.passwordList.push(password);
  }

  pop() {
    return this.passwordList.pop();
  }
}

module.exports = PasswordManager;

const BasePage = require('./BasePage');
const locators = require('./locators/LoginPageLocators');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators;
  }

  async navigate() {
    await this.goto('/');
  }

  async login(username, password) {
    await this.fill(this.locators.usernameInput, username);
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }

  async assertLoginPageDisplayed() {
    await this.assertElementVisible(this.locators.usernameInput);
    await this.assertElementVisible(this.locators.passwordInput);
    await this.assertElementVisible(this.locators.loginButton);
  }
}

module.exports = LoginPage;

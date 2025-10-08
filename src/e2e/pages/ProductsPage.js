const BasePage = require('./BasePage');
const locators = require('./locators/ProductsPageLocators');
const { PAGE_TITLES, TIMEOUTS } = require('../constants/testData.constants');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators;
  }

  async assertProductsPageDisplayed() {
    await this.assertPageTitle(this.locators.pageTitle, PAGE_TITLES.PRODUCTS);
  }

  async openMenu() {
    await this.click(this.locators.burgerMenu);
    await this.waitForElement(this.locators.logoutLink, TIMEOUTS.MENU_OPEN);
    await this.page.waitForTimeout(TIMEOUTS.MENU_ANIMATION);
  }

  async logout() {
    await this.openMenu();
    await this.click(this.locators.logoutLink);
  }
}

module.exports = ProductsPage;

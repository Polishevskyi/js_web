const BasePage = require('./BasePage');
const locators = require('./locators/CartPageLocators');
const { PAGE_TITLES } = require('../constants/testData.constants');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators;
  }

  async assertCartPageDisplayed() {
    await this.assertPageTitle(this.locators.pageTitle, PAGE_TITLES.YOUR_CART);
  }

  async assertCartContainsProduct(productName) {
    const items = await this.getAllTexts(this.locators.cartItemName);
    this.assertArrayContains(items, productName);
  }

  async assertCartItemsCount(expectedCount) {
    const count = await this.getElementCount(this.locators.cartItem);
    this.assertEqual(count, expectedCount);
  }
}

module.exports = CartPage;

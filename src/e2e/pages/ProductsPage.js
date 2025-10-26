import BasePage, { COMMON_LOCATORS } from './BasePage.js';
import Constants from '../utils/constants.js';

const PRODUCTS_PAGE_LOCATORS = {
  ...COMMON_LOCATORS,
  shoppingCartLink: '.shopping_cart_link',
  burgerMenu: '#react-burger-menu-btn',
  logoutLink: '#logout_sidebar_link',
  inventoryItem: '.inventory_item',
  inventoryItemName: '.inventory_item_name',
  firstInventoryItem: '.inventory_item:first-child',
  addToCartButton: (productName) => `[data-test="add-to-cart-${productName}"]`,
  addToCartButtonFirst: '[data-test^="add-to-cart"]',
  sortDropdown: '[data-test="product_sort_container"]',
};

class ProductsPage extends BasePage {
  async openMenu() {
    await this.tapWhenVisible(PRODUCTS_PAGE_LOCATORS.burgerMenu);
    await this.assertElementIsVisible(PRODUCTS_PAGE_LOCATORS.logoutLink, Constants.TIMEOUTS.MENU_OPEN);
    await this.page.waitForTimeout(Constants.TIMEOUTS.MENU_ANIMATION);
  }

  async logout() {
    await this.openMenu();
    await this.tapWhenVisible(PRODUCTS_PAGE_LOCATORS.logoutLink);
  }

  async addProductAndVerifyCart(productName, expectedCount) {
    await this.tapWhenVisible(PRODUCTS_PAGE_LOCATORS.addToCartButton(productName));
    await this.assertElementTextEquals(PRODUCTS_PAGE_LOCATORS.shoppingCartBadge, expectedCount);
  }
}

export { ProductsPage, PRODUCTS_PAGE_LOCATORS };

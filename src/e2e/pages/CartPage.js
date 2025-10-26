import BasePage, { COMMON_LOCATORS } from './BasePage.js';

const CART_PAGE_LOCATORS = {
  ...COMMON_LOCATORS,
  cartItemName: '.inventory_item_name',
  continueShoppingButton: '#continue-shopping',
  checkoutButton: '#checkout',
  cartQuantity: '.cart_quantity',
};

class CartPage extends BasePage {}

export { CartPage, CART_PAGE_LOCATORS };

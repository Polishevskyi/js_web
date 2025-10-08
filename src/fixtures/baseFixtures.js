const { test: base } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const Logger = require('../helpers/logger');

const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    Logger.testStart(testInfo.title);
    await use(page);
    const status = testInfo.status === 'passed' ? 'passed' : 'failed';
    Logger.testEnd(testInfo.title, status);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

module.exports = { test };

import { test as base } from '@playwright/test';
import Logger from '../../../helpers/logger.js';
import BasePage from '../pages/BasePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage, PRODUCTS_PAGE_LOCATORS } from '../pages/ProductsPage.js';
import { CartPage, CART_PAGE_LOCATORS } from '../pages/CartPage.js';
import { CheckoutPage, CHECKOUT_PAGE_LOCATORS } from '../pages/CheckoutPage.js';
import DataGenerator from '../utils/dataGenerator.js';

const createScreenFixture =
  (locators, screenName) =>
  async ({}, use) => {
    await use({ locators, screen: screenName });
  };

const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    Logger.testStart(testInfo.title);
    await use(page);
    const status = testInfo.status === 'passed' ? 'passed' : 'failed';
    Logger.testEnd(testInfo.title, status);
  },

  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
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

  userInfo: async ({}, use) => {
    const userInfo = DataGenerator.generateUserInfo();
    await use(userInfo);
  },

  productsScreen: createScreenFixture(PRODUCTS_PAGE_LOCATORS, 'Products'),

  cartScreen: createScreenFixture(CART_PAGE_LOCATORS, 'Cart'),

  checkoutScreen: createScreenFixture(CHECKOUT_PAGE_LOCATORS, 'Checkout'),
});

export { test };

import { expect } from '@playwright/test';
import Logger from '../../../helpers/logger.js';
import Constants from '../utils/constants.js';

const COMMON_LOCATORS = {
  pageTitle: '.title',
  errorMessage: '[data-test="error"]',
  cartItem: '.cart_item',
  shoppingCartBadge: '.shopping_cart_badge',
  removeButton: (productName) => `[data-test="remove-${productName}"]`,
  removeButtonFirst: '[data-test^="remove"]',
  PRODUCTS: {
    BACKPACK: 'sauce-labs-backpack',
    BIKE_LIGHT: 'sauce-labs-bike-light',
    BOLT_TSHIRT: 'sauce-labs-bolt-t-shirt',
    FLEECE_JACKET: 'sauce-labs-fleece-jacket',
  },
};

class BasePage {
  constructor(page) {
    this.page = page;
    this.logger = Logger;
    return this.createProxy();
  }

  /* eslint-disable no-underscore-dangle */
  createProxy() {
    return new Proxy(this, {
      get: (target, prop) => {
        const original = target[prop];
        const shouldLog = this.shouldLogMethod(original, prop);

        if (shouldLog) {
          return async (...args) => {
            const methodName = `${target.constructor.name}.${prop}`;
            Logger.step(`${methodName}()`);
            return original.apply(target, args);
          };
        }
        return original;
      },
    });
  }

  shouldLogMethod(method, propName) {
    return (
      typeof method === 'function' &&
      propName !== 'constructor' &&
      !propName.startsWith('_') &&
      propName !== 'createProxy'
    );
  }

  goto(url) {
    return this.page.goto(url);
  }

  async assertElementIsVisible(selector, timeout = Constants.TIMEOUTS.DEFAULT_TIMEOUT) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    return this.page.locator(selector);
  }

  async assertElementIsNotVisible(selector, timeout = Constants.TIMEOUTS.DEFAULT_TIMEOUT) {
    await this.page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  async tapWhenVisible(selector, timeout = Constants.TIMEOUTS.DEFAULT_TIMEOUT) {
    const element = await this.assertElementIsVisible(selector, timeout);
    return element.click();
  }

  async setValue(selector, text, timeout = Constants.TIMEOUTS.DEFAULT_TIMEOUT) {
    const element = await this.assertElementIsVisible(selector, timeout);
    return element.fill(text);
  }

  async getElementText(selector, timeout = Constants.TIMEOUTS.DEFAULT_TIMEOUT) {
    const element = await this.assertElementIsVisible(selector, timeout);
    return element.textContent();
  }

  async assertElementTextEquals(selector, expectedText, timeout = Constants.TIMEOUTS.DEFAULT_TIMEOUT) {
    const element = await this.assertElementIsVisible(selector, timeout);
    const actualText = await element.textContent();

    if (actualText !== expectedText) {
      throw new Error(Constants.ERROR_MESSAGES.textAssertionFailed(selector, expectedText, actualText));
    }
    return element;
  }

  async assertContainsText(selector, text) {
    return expect(this.page.locator(selector)).toContainText(text);
  }

  async waitForUrl(urlPart) {
    return this.page.waitForURL(`**/${urlPart}**`);
  }

  async getElementCount(selector) {
    return this.page.locator(selector).count();
  }

  async getAllTexts(selector) {
    return this.page.locator(selector).allTextContents();
  }

  assertArrayContains(array, item) {
    expect(array).toContain(item);
  }

  assertEqual(actual, expected) {
    expect(actual).toBe(expected);
  }
}

export default BasePage;
export { COMMON_LOCATORS };

const { expect } = require('@playwright/test');
const Logger = require('../helpers/logger');

class BasePage {
  constructor(page) {
    this.page = page;
    return this.createProxy();
  }

  createProxy() {
    return new Proxy(this, {
      get(target, prop) {
        const original = target[prop];
        if (typeof original === 'function' && prop !== 'constructor' && !prop.startsWith('_')) {
          return async function (...args) {
            const methodName = `${target.constructor.name}.${prop}`;
            Logger.step(`${methodName}()`);
            return original.apply(target, args);
          };
        }
        return original;
      },
    });
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  async click(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.click(selector);
  }

  async fill(selector, text) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.fill(selector, text);
  }

  async waitForUrl(urlPart) {
    await this.page.waitForURL(`**/${urlPart}**`);
  }

  async assertElementVisible(selector) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async assertText(selector, expectedText) {
    await expect(this.page.locator(selector)).toHaveText(expectedText);
  }

  async assertPageTitle(selector, expectedTitle) {
    await this.waitForElement(selector);
    await this.assertText(selector, expectedTitle);
  }

  async assertElementNotVisible(selector) {
    await expect(this.page.locator(selector)).toBeHidden();
  }

  async assertContainsText(selector, text) {
    await expect(this.page.locator(selector)).toContainText(text);
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

module.exports = BasePage;

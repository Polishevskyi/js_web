const BasePage = require('./BasePage');
const locators = require('./locators/CheckoutPageLocators');
const { PAGE_TITLES, MESSAGES } = require('../constants/testData.constants');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators;
  }

  async fillCheckoutInformation({ firstName, lastName, postalCode }) {
    await this.fill(this.locators.firstNameInput, firstName);
    await this.fill(this.locators.lastNameInput, lastName);
    await this.fill(this.locators.postalCodeInput, postalCode);
  }

  async assertCheckoutStepOneDisplayed() {
    await this.waitForElement(this.locators.firstNameInput);
    await this.assertPageTitle(this.locators.pageTitle, PAGE_TITLES.CHECKOUT_INFORMATION);
  }

  async assertCheckoutOverviewDisplayed() {
    await this.waitForElement(this.locators.finishButton);
    await this.assertPageTitle(this.locators.pageTitle, PAGE_TITLES.CHECKOUT_OVERVIEW);
  }

  async assertOrderComplete() {
    await this.assertPageTitle(this.locators.completeHeader, PAGE_TITLES.ORDER_COMPLETE);
    await this.assertContainsText(this.locators.completeText, MESSAGES.ORDER_DISPATCHED);
  }
}

module.exports = CheckoutPage;

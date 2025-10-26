import BasePage from './BasePage.js';

const CHECKOUT_PAGE_LOCATORS = {
  firstNameInput: '#first-name',
  lastNameInput: '#last-name',
  postalCodeInput: '#postal-code',
  continueButton: '#continue',
  cancelButton: '#cancel',
  errorMessage: '[data-test="error"]',
  pageTitle: '.title',
  cartItem: '.cart_item',
  subtotalLabel: '.summary_subtotal_label',
  taxLabel: '.summary_tax_label',
  totalLabel: '.summary_total_label',
  finishButton: '#finish',
  completeHeader: '.complete-header',
  completeText: '.complete-text',
  backHomeButton: '#back-to-products',
};

class CheckoutPage extends BasePage {
  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.setValue(CHECKOUT_PAGE_LOCATORS.firstNameInput, firstName);
    await this.setValue(CHECKOUT_PAGE_LOCATORS.lastNameInput, lastName);
    await this.setValue(CHECKOUT_PAGE_LOCATORS.postalCodeInput, postalCode);
  }
}

export { CheckoutPage, CHECKOUT_PAGE_LOCATORS };

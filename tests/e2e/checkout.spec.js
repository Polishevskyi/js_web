const { test } = require('../../fixtures/e2eFixtures');
const TestData = require('../../data/testData');
const DataGenerator = require('../../data/e2eGenerators');
const { CART_COUNTS } = require('../../src/e2e/constants/testData.constants');

test.describe('Checkout flow', () => {
  test('Complete checkout process with generated user data', async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    const userInfo = DataGenerator.generateUserInfo();

    await loginPage.navigate();
    await loginPage.login(TestData.USERS.STANDARD.username, TestData.USERS.STANDARD.password);
    await productsPage.assertProductsPageDisplayed();

    await productsPage.click(productsPage.locators.addToCartButton(TestData.PRODUCTS.BACKPACK));
    await productsPage.assertText(productsPage.locators.shoppingCartBadge, CART_COUNTS.ONE_ITEM);

    await productsPage.click(productsPage.locators.addToCartButton(TestData.PRODUCTS.FLEECE_JACKET));
    await productsPage.assertText(productsPage.locators.shoppingCartBadge, CART_COUNTS.TWO_ITEMS);

    await productsPage.click(productsPage.locators.shoppingCartLink);
    await cartPage.assertCartPageDisplayed();
    await cartPage.assertCartItemsCount(2);

    await cartPage.click(cartPage.locators.checkoutButton);

    await checkoutPage.assertCheckoutStepOneDisplayed();
    await checkoutPage.fillCheckoutInformation({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      postalCode: userInfo.postalCode,
    });

    await checkoutPage.click(checkoutPage.locators.continueButton);
    await checkoutPage.assertCheckoutOverviewDisplayed();

    await checkoutPage.click(checkoutPage.locators.finishButton);

    await checkoutPage.assertOrderComplete();
    await checkoutPage.waitForUrl('checkout-complete.html');

    await checkoutPage.click(checkoutPage.locators.backHomeButton);
    await productsPage.assertProductsPageDisplayed();

    await productsPage.assertElementNotVisible(productsPage.locators.shoppingCartBadge);
  });
});

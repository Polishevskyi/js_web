const { test } = require('../../src/fixtures/baseFixtures');
const TestData = require('../../src/data/testData');
const { CART_COUNTS } = require('../../src/constants/testData.constants');

test.describe('Shopping cart functionality', () => {
  test('Add multiple products to cart and remove one', async ({
    loginPage,
    productsPage,
    cartPage,
  }) => {
    await loginPage.navigate();
    await loginPage.login(TestData.USERS.STANDARD.username, TestData.USERS.STANDARD.password);
    await productsPage.assertProductsPageDisplayed();

    await productsPage.click(productsPage.locators.addToCartButton(TestData.PRODUCTS.BACKPACK));
    await productsPage.assertText(productsPage.locators.shoppingCartBadge, CART_COUNTS.ONE_ITEM);

    await productsPage.click(productsPage.locators.addToCartButton(TestData.PRODUCTS.BIKE_LIGHT));
    await productsPage.assertText(productsPage.locators.shoppingCartBadge, CART_COUNTS.TWO_ITEMS);

    await productsPage.click(productsPage.locators.addToCartButton(TestData.PRODUCTS.BOLT_TSHIRT));
    await productsPage.assertText(productsPage.locators.shoppingCartBadge, CART_COUNTS.THREE_ITEMS);

    await productsPage.click(productsPage.locators.shoppingCartLink);
    await cartPage.assertCartPageDisplayed();

    await cartPage.assertCartItemsCount(3);
    await cartPage.assertCartContainsProduct(TestData.PRODUCT_NAMES.BACKPACK);
    await cartPage.assertCartContainsProduct(TestData.PRODUCT_NAMES.BIKE_LIGHT);
    await cartPage.assertCartContainsProduct(TestData.PRODUCT_NAMES.BOLT_TSHIRT);

    await cartPage.click(cartPage.locators.removeButton(TestData.PRODUCTS.BIKE_LIGHT));
    await cartPage.assertCartItemsCount(2);

    await cartPage.click(cartPage.locators.continueShoppingButton);
    await productsPage.assertProductsPageDisplayed();
    await productsPage.assertText(productsPage.locators.shoppingCartBadge, CART_COUNTS.TWO_ITEMS);
  });
});

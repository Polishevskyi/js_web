import { test } from '../../src/e2e/fixtures/e2eFixtures.js';
import Constants from '../../src/e2e/utils/constants.js';

const { CART_COUNTS, PAGE_TITLES, PRODUCT_NAMES, URLS, ITEM_COUNTS } = Constants;

test.describe('Shopping cart functionality', () => {
  test('Add multiple products to cart and remove one', async ({
    basePage,
    loginPage,
    productsPage,
    cartPage,
    productsScreen,
    cartScreen,
  }) => {
    await basePage.goto(URLS.ROOT);
    await loginPage.login(process.env.STANDARD_USER, process.env.STANDARD_PASSWORD);
    await productsPage.assertElementTextEquals(productsScreen.locators.pageTitle, PAGE_TITLES.PRODUCTS);

    await productsPage.addProductAndVerifyCart(productsScreen.locators.PRODUCTS.BACKPACK, CART_COUNTS.ONE_ITEM);
    await productsPage.addProductAndVerifyCart(productsScreen.locators.PRODUCTS.BIKE_LIGHT, CART_COUNTS.TWO_ITEMS);
    await productsPage.addProductAndVerifyCart(productsScreen.locators.PRODUCTS.BOLT_TSHIRT, CART_COUNTS.THREE_ITEMS);

    await productsPage.tapWhenVisible(productsScreen.locators.shoppingCartLink);
    await cartPage.assertElementTextEquals(cartScreen.locators.pageTitle, PAGE_TITLES.YOUR_CART);

    const itemsCount = await cartPage.getElementCount(cartScreen.locators.cartItem);
    cartPage.assertEqual(itemsCount, ITEM_COUNTS.THREE);

    const items = await cartPage.getAllTexts(cartScreen.locators.cartItemName);
    cartPage.assertArrayContains(items, PRODUCT_NAMES.BACKPACK);
    cartPage.assertArrayContains(items, PRODUCT_NAMES.BIKE_LIGHT);
    cartPage.assertArrayContains(items, PRODUCT_NAMES.BOLT_TSHIRT);

    await cartPage.tapWhenVisible(cartScreen.locators.removeButton(productsScreen.locators.PRODUCTS.BIKE_LIGHT));
    const itemsCountAfterRemoval = await cartPage.getElementCount(cartScreen.locators.cartItem);
    cartPage.assertEqual(itemsCountAfterRemoval, ITEM_COUNTS.TWO);

    await cartPage.tapWhenVisible(cartScreen.locators.continueShoppingButton);
    await productsPage.assertElementTextEquals(productsScreen.locators.pageTitle, PAGE_TITLES.PRODUCTS);
    await productsPage.assertElementTextEquals(productsScreen.locators.shoppingCartBadge, CART_COUNTS.TWO_ITEMS);
  });
});

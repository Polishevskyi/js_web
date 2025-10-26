import { test } from '../../src/e2e/fixtures/e2eFixtures.js';
import Constants from '../../src/e2e/utils/constants.js';

const { PAGE_TITLES, URLS } = Constants;

test.describe('Login and logout functionality', () => {
  test('Successful login and logout', async ({ basePage, loginPage, productsPage, productsScreen }) => {
    await basePage.goto(URLS.ROOT);
    await loginPage.assertLoginPageDisplayed();
    await loginPage.login(process.env.STANDARD_USER, process.env.STANDARD_PASSWORD);

    await productsPage.assertElementTextEquals(productsScreen.locators.pageTitle, PAGE_TITLES.PRODUCTS);
    await productsPage.waitForUrl(URLS.INVENTORY);
    await productsPage.logout();

    await loginPage.waitForUrl(URLS.ROOT);
    await loginPage.assertLoginPageDisplayed();
  });
});

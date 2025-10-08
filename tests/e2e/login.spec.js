const { test } = require('../../fixtures/e2eFixtures');
const TestData = require('../../data/testData');

test.describe('Login and logout functionality', () => {
  test('Successful login and logout', async ({ loginPage, productsPage }) => {
    await loginPage.navigate();
    await loginPage.assertLoginPageDisplayed();

    await loginPage.login(TestData.USERS.STANDARD.username, TestData.USERS.STANDARD.password);

    await productsPage.assertProductsPageDisplayed();
    await productsPage.waitForUrl('inventory.html');

    await productsPage.logout();

    await loginPage.waitForUrl('/');
    await loginPage.assertLoginPageDisplayed();
  });
});

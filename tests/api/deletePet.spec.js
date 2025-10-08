const { test, expect, HTTP_STATUS } = require('../../fixtures/apiFixtures');

test.describe('DELETE Pet Test', () => {
  test('should delete a pet and validate status code', async ({ petSteps }) => {
    const { responseData: createdPet } = await petSteps.createPet();

    const { status } = await petSteps.deletePet(createdPet.id);

    expect([HTTP_STATUS.OK, HTTP_STATUS.NOT_FOUND]).toContain(status);
  });
});

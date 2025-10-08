const { test, expect, HTTP_STATUS, CreatePetResponse, assertThatModels } = require('../../fixtures/apiFixtures');

test.describe('READ Pet Test', () => {
  test('should create and read pet data from response', async ({ petSteps }) => {
    const { requestData, responseData, status } = await petSteps.createPet();

    expect(status).toBe(HTTP_STATUS.OK);

    const expectedResponse = new CreatePetResponse(requestData);
    await assertThatModels(expectedResponse, responseData).match();
  });
});

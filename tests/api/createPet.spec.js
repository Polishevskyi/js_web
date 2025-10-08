const { test, expect, HTTP_STATUS, CreatePetResponse, assertThatModels } = require('../../fixtures/apiFixtures');

test.describe('CREATE Pet Test', () => {
  test('should create a pet and validate status code and model', async ({ petSteps }) => {
    const { requestData, responseData, status } = await petSteps.createPet();

    expect(status).toBe(HTTP_STATUS.OK);

    const expectedResponse = new CreatePetResponse(requestData);
    await assertThatModels(expectedResponse, responseData).match();
  });
});

const { test, expect, HTTP_STATUS, CreatePetResponse, assertThatModels } = require('../../fixtures/apiFixtures');

test.describe('UPDATE Pet Test', () => {
  test('should update a pet and validate status code and model', async ({ petSteps }) => {
    const { responseData: createdPet } = await petSteps.createPet();

    const updatedData = {
      ...createdPet,
      name: 'UpdatedName',
      status: 'sold',
    };

    const { requestData, responseData, status } = await petSteps.updatePet(updatedData);

    expect(status).toBe(HTTP_STATUS.OK);

    const expectedResponse = new CreatePetResponse(requestData);
    await assertThatModels(expectedResponse, responseData).match();
  });
});

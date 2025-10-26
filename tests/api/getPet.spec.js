import {
  test,
  expect,
  HTTP_STATUS,
  CreatePetResponse,
  assertThatModels,
  PetSteps,
} from '../../src/api/fixtures/apiFixtures.js';

test.describe('READ Pet Test', () => {
  test('should create and read pet data from response', async ({ request }) => {
    const petSteps = new PetSteps(request);
    const { requestData, responseData, status } = await petSteps.createPet();

    expect(status).toBe(HTTP_STATUS.OK);

    const expectedResponse = new CreatePetResponse(requestData);
    await assertThatModels(expectedResponse, responseData).match();
  });
});

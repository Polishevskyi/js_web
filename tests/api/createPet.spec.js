import {
  test,
  expect,
  HTTP_STATUS,
  CreatePetResponse,
  assertThatModels,
  PetSteps,
} from '../../src/api/fixtures/apiFixtures.js';

test.describe('CREATE Pet Test', () => {
  test('should create a pet and validate status code and model', async ({ request }) => {
    const petSteps = new PetSteps(request);
    const { requestData, responseData, status } = await petSteps.createPet();

    expect(status).toBe(HTTP_STATUS.OK);

    const expectedResponse = new CreatePetResponse(requestData);
    await assertThatModels(expectedResponse, responseData).match();
  });
});

import {
  test,
  expect,
  HTTP_STATUS,
  CreatePetResponse,
  assertThatModels,
  PetSteps,
} from '../../src/api/fixtures/apiFixtures.js';
import { generatePetUpdate } from '../../src/api/utils/dataGenerator.js';

test.describe('UPDATE Pet Test', () => {
  test('should update a pet and validate status code and model', async ({ request }) => {
    const petSteps = new PetSteps(request);
    const { responseData: createdPet } = await petSteps.createPet();

    const updatedData = generatePetUpdate(createdPet);
    const { requestData, responseData, status } = await petSteps.updatePet(updatedData);

    expect(status).toBe(HTTP_STATUS.OK);

    const expectedResponse = new CreatePetResponse(requestData);
    await assertThatModels(expectedResponse, responseData).match();
  });
});

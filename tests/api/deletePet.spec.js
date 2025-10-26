import { test, expect, HTTP_STATUS, PetSteps } from '../../src/api/fixtures/apiFixtures.js';

test.describe('DELETE Pet Test', () => {
  test('should delete a pet and validate status code', async ({ request }) => {
    const petSteps = new PetSteps(request);
    const { responseData: createdPet } = await petSteps.createPet();

    const { status } = await petSteps.deletePet(createdPet.id);

    expect([HTTP_STATUS.OK, HTTP_STATUS.NOT_FOUND]).toContain(status);
  });
});

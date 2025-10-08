const base = require('@playwright/test');
const { PetSteps } = require('../src/api/steps/petSteps');
const HTTP_STATUS = require('../src/api/utils/httpStatus');
const CreatePetResponse = require('../src/api/models/CreatePetResponse');
const { assertThatModels } = require('../src/api/models/comparison/modelAssertions');

const test = base.test.extend({
  petSteps: async ({ request }, use) => {
    const petSteps = new PetSteps(request);
    await use(petSteps);
  },
});

module.exports = {
  test,
  expect: base.expect,
  HTTP_STATUS,
  CreatePetResponse,
  assertThatModels,
};

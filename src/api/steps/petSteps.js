const { generatePet } = require('../../../data/apiGenerators');
const Requester = require('../utils/requester');
const { ENDPOINTS_KEY } = require('../utils/endpoints');
const CreatePetRequest = require('../models/CreatePetRequest');
const Logger = require('../../../helpers/logger');

class PetSteps {
  constructor(requestContext) {
    this.requester = new Requester(requestContext);

    return new Proxy(this, {
      get(target, prop) {
        const original = target[prop];
        if (typeof original === 'function' && prop !== 'constructor') {
          return async function (...args) {
            const methodName = `PetSteps.${prop}`;
            Logger.step(`${methodName}()`);
            return original.apply(target, args);
          };
        }
        return original;
      },
    });
  }

  async createPet(petData = null) {
    const data = petData || generatePet();

    const response = await this.requester.request(ENDPOINTS_KEY.CREATE_PET, {
      data: new CreatePetRequest(data),
    });

    return {
      requestData: data,
      responseData: response.data,
      status: response.status,
    };
  }

  async getPetById(petId) {
    const response = await this.requester.request(ENDPOINTS_KEY.GET_PET, {
      pathParams: { petId },
    });

    return {
      responseData: response.data,
      status: response.status,
    };
  }

  async updatePet(petData) {
    const response = await this.requester.request(ENDPOINTS_KEY.UPDATE_PET, {
      data: new CreatePetRequest(petData),
    });

    return {
      requestData: petData,
      responseData: response.data,
      status: response.status,
    };
  }

  async deletePet(petId) {
    const response = await this.requester.request(ENDPOINTS_KEY.DELETE_PET, {
      pathParams: { petId },
    });

    return {
      status: response.status,
    };
  }

  async createAndGetPet(petData = null) {
    const createResult = await this.createPet(petData);
    const getResult = await this.getPetById(createResult.responseData.id);

    return {
      createResponse: createResult,
      getResponse: getResult,
    };
  }
}

module.exports = { PetSteps };

import CreatePetRequest from '../models/CreatePetRequest.js';
import CreatePetResponse from '../models/CreatePetResponse.js';
import { ENDPOINTS_KEY } from './constants.js';

const endpoints = {
  [ENDPOINTS_KEY.CREATE_PET]: {
    url: '/pet',
    method: 'post',
    requestModel: CreatePetRequest,
    responseModel: CreatePetResponse,
  },
  [ENDPOINTS_KEY.UPDATE_PET]: {
    url: '/pet',
    method: 'put',
    requestModel: CreatePetRequest,
    responseModel: CreatePetResponse,
  },
  [ENDPOINTS_KEY.DELETE_PET]: {
    url: (petId) => `/pet/${petId}`,
    method: 'delete',
  },
};

export { endpoints };

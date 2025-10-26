const ENDPOINTS_KEY = {
  CREATE_PET: 'CREATE_PET',
  UPDATE_PET: 'UPDATE_PET',
  DELETE_PET: 'DELETE_PET',
};

const HEADERS = {
  CONTENT_TYPE: 'application/json',
  ACCEPT: 'application/json',
};

const PET_STATUS = {
  AVAILABLE: 'available',
  PENDING: 'pending',
  SOLD: 'sold',
};

const PET_CATEGORIES = ['Dogs', 'Cats', 'Birds', 'Fish', 'Reptiles'];

export { ENDPOINTS_KEY, HEADERS, PET_STATUS, PET_CATEGORIES };

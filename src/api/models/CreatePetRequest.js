import BaseModel from './BaseModel.js';

class CreatePetRequest extends BaseModel {
  constructor({ id, category, name, photoUrls, tags, status }) {
    super({
      id,
      category,
      name,
      photoUrls,
      tags,
      status,
    });
  }
}

export default CreatePetRequest;

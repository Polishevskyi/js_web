import BaseModel from './BaseModel.js';

class CreatePetResponse extends BaseModel {
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

export default CreatePetResponse;

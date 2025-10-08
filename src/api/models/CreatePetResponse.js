const BaseModel = require('./BaseModel');

class CreatePetResponse extends BaseModel {
  constructor({
    id,
    category,
    name,
    photoUrls,
    tags,
    status,
  }) {
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

module.exports = CreatePetResponse;

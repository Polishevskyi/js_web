class BaseModel {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  static fromJson(json) {
    return new this(json);
  }

  toJson() {
    const json = { ...this };
    return json;
  }
}

export default BaseModel;

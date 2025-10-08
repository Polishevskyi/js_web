const { faker } = require('@faker-js/faker');

class DataGenerator {
  static generateUserInfo() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  }
}

module.exports = DataGenerator;

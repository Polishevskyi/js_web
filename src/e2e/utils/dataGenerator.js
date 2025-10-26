import { faker } from '@faker-js/faker';

class DataGenerator {
  static generateUserInfo() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  }
}

export default DataGenerator;

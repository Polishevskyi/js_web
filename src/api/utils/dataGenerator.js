import { faker } from '@faker-js/faker';
import { PET_STATUS, PET_CATEGORIES } from './constants.js';

const generatePet = () => ({
  id: faker.number.int({ min: 1, max: 100000 }),
  category: {
    id: faker.number.int({ min: 1, max: 100 }),
    name: faker.helpers.arrayElement(PET_CATEGORIES),
  },
  name: faker.person.firstName(),
  photoUrls: [faker.image.urlLoremFlickr({ category: 'animals' })],
  tags: [
    {
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.word.noun(),
    },
  ],
  status: faker.helpers.arrayElement(Object.values(PET_STATUS)),
});

const generatePetUpdate = (existingPet) => ({
  ...existingPet,
  name: faker.person.firstName(),
  status: PET_STATUS.SOLD,
});

export { generatePet, generatePetUpdate };

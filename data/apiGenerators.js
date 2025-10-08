const { faker } = require('@faker-js/faker');

const generatePet = () => {
  const categories = ['Dogs', 'Cats', 'Birds', 'Fish', 'Reptiles'];
  const statuses = ['available', 'pending', 'sold'];

  return {
    id: faker.number.int({ min: 1, max: 100000 }),
    category: {
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.helpers.arrayElement(categories),
    },
    name: faker.person.firstName(),
    photoUrls: [faker.image.urlLoremFlickr({ category: 'animals' })],
    tags: [
      {
        id: faker.number.int({ min: 1, max: 100 }),
        name: faker.word.noun(),
      },
    ],
    status: faker.helpers.arrayElement(statuses),
  };
};

module.exports = { generatePet };

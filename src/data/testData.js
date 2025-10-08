require('dotenv').config();

const TestData = {
  USERS: {
    STANDARD: {
      username: process.env.STANDARD_USER,
      password: process.env.STANDARD_PASSWORD,
    },
  },

  PRODUCTS: {
    BACKPACK: 'sauce-labs-backpack',
    BIKE_LIGHT: 'sauce-labs-bike-light',
    BOLT_TSHIRT: 'sauce-labs-bolt-t-shirt',
    FLEECE_JACKET: 'sauce-labs-fleece-jacket',
  },

  PRODUCT_NAMES: {
    BACKPACK: 'Sauce Labs Backpack',
    BIKE_LIGHT: 'Sauce Labs Bike Light',
    BOLT_TSHIRT: 'Sauce Labs Bolt T-Shirt',
  },
};

module.exports = TestData;

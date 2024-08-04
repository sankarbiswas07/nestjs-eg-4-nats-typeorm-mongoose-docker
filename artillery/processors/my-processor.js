const fs = require('fs');

// Load data from JSON files
const categories = JSON.parse(fs.readFileSync('../__mocks__/categories.mock.ts'));
const products = JSON.parse(fs.readFileSync('../__mocks__/products.mock.ts'));

module.exports = {
  // Choose a random item from an array
  chooseRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  // Generate a list of products to add to the cart
  generateRandomCart() {
    const numProducts = Math.floor(Math.random() * 3) + 2; // 2 to 4 products
    const selectedProducts = [];
    for (let i = 0; i < numProducts; i++) {
      selectedProducts.push(this.chooseRandom(products));
    }
    return selectedProducts;
  },

  // Return random user data for registration
  getRandomUser() {
    return this.chooseRandom(users);
  }
};

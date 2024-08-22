const { products } = require('../db/data.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.bulkInsert(
        'products',
        products.map((i) => {
          const item = JSON.parse(JSON.stringify(i));
          delete item.stars;
          item.created_at = new Date();
          item.updated_at = new Date();

          return item;
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  },
  async down(queryInterface) {
    try {
      queryInterface.bulkDelete('products', null, {});
    } catch (err) {
      console.log(err.message);
    }
  },
};

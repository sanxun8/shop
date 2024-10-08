const { reviews } = require('../db/data.json');
const { processError } = require('../utils/error');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.bulkInsert(
        'reviews',
        reviews.map((i) => {
          const item = JSON.parse(JSON.stringify(i));
          item.stars = Math.ceil(Math.random() * 5);
          item.created_at = new Date();
          item.updated_at = new Date();

          return item;
        })
      );
    } catch (err) {
      processError(err);
    }
  },
  async down(queryInterface) {
    try {
      queryInterface.bulkDelete('reviews', null, {});
    } catch (err) {
      processError(err);
    }
  },
};

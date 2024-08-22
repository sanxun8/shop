const bcrypt = require('bcrypt');
const { generateRandomName, generateLowercaseChars } = require('../utils/mock');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users = [];
    const hashedPassword = await bcrypt.hash(generateLowercaseChars(6, 10), 10);

    for (let i = 0; i < 10; i += 1) {
      users.push({
        username: generateRandomName(),
        email: `${generateLowercaseChars(6, 10)}@163.com`,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    try {
      await queryInterface.bulkInsert('users', users);
    } catch (err) {
      console.log(err.message);
    }
  },

  async down(queryInterface) {
    try {
      queryInterface.bulkDelete('users', null, {});
    } catch (err) {
      console.log(err.message);
    }
  },
};

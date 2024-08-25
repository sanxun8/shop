const bcrypt = require('bcrypt');
const { getFullName, getEmail } = require('../utils/mock');
const { processError } = require('../utils/error');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users = [];
    const hashedPassword = await bcrypt.hash('123456', 10);

    users.push({
      username: 'admin',
      email: `admin@163.com`,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    });

    for (let i = 0; i < 10; i += 1) {
      users.push({
        username: getFullName(),
        email: getEmail(),
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    try {
      await queryInterface.bulkInsert('users', users);
    } catch (err) {
      processError(err);
    }
  },

  async down(queryInterface) {
    try {
      queryInterface.bulkDelete('users', null, {});
    } catch (err) {
      processError(err);
    }
  },
};

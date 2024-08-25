const { processError } = require('../utils/error');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    try {
      await queryInterface.createTable('reviews', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        stars: {
          type: DataTypes.TINYINT(1),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      });
    } catch (err) {
      processError(err);
    }
  },
  async down(queryInterface) {
    try {
      await queryInterface.dropTable('reviews');
    } catch (err) {
      processError(err);
    }
  },
};

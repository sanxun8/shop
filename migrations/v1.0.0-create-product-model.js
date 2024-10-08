const { processError } = require('../utils/error');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, DataTypes) {
    try {
      await queryInterface.createTable('products', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          ALLOWnULL: false,
        },
        category: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        img: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(8, 2),
          allowNull: false,
        },
        is_hot: {
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
      await queryInterface.dropTable('products');
    } catch (err) {
      processError(err);
    }
  },
};

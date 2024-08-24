/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, DataTypes) {
    try {
      await queryInterface.createTable(
        'shopping_carts',
        {
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
          amount: {
            type: DataTypes.INTEGER,
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
        },
        {
          uniqueKeys: {
            uniqueUserIdProductId: {
              fields: ['user_id', 'product_id'],
            },
          },
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  },
  async down(queryInterface) {
    try {
      await queryInterface.dropTable('shopping_carts');
    } catch (err) {
      console.log(err.message);
    }
  },
};

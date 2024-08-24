const { Model } = require('sequelize');

/**
 * @param {typeof import('sequelize').Sequelize} sequelize - Sequelize 实例
 * @param {typeof import('sequelize').DataTypes} DataTypes - DataTypes 工具
 * @returns {typeof import('sequelize').Model} - 返回一个 Sequelize 模型构造函数
 */
module.exports = (sequelize, DataTypes) => {
  class ChildModel extends Model {
    static associate(db) {
      ChildModel.belongsTo(db.user, { foreignKey: 'user_id' });
      ChildModel.belongsTo(db.product, { foreignKey: 'product_id' });
    }
  }

  ChildModel.init(
    {
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
    },
    {
      sequelize,
      modelName: 'shopping_cart',
      underscored: true, // 启用蛇形命名
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'product_id'],
        },
      ],
    }
  );

  return ChildModel;
};

const { Model } = require('sequelize');

/**
 * @param {typeof import('sequelize').Sequelize} sequelize - Sequelize 实例
 * @param {typeof import('sequelize').DataTypes} DataTypes - DataTypes 工具
 * @returns {typeof import('sequelize').Model} - 返回一个 Sequelize 模型构造函数
 */
module.exports = (sequelize, DataTypes) => {
  class ChildModel extends Model {
    static associate(db) {
      ChildModel.hasMany(db.shopping_cart, { foreignKey: 'product_id' });
      ChildModel.hasMany(db.review, { foreignKey: 'product_id' });
    }
  }

  ChildModel.init(
    {
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
    },
    {
      sequelize,
      modelName: 'product',
      underscored: true, // 启用蛇形命名
    }
  );

  return ChildModel;
};

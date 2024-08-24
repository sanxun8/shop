const { Model } = require('sequelize');

/**
 * @param {typeof import('sequelize').Sequelize} sequelize - Sequelize 实例
 * @param {typeof import('sequelize').DataTypes} DataTypes - DataTypes 工具
 * @returns {typeof import('sequelize').Model} - 返回一个 Sequelize 模型构造函数
 */
module.exports = (sequelize, DataTypes) => {
  class ChildModel extends Model {
    static associate(db) {
      ChildModel.hasMany(db.review, { foreignKey: 'user_id' });
      ChildModel.hasMany(db.shopping_cart, { foreignKey: 'user_id' });
      ChildModel.hasMany(db.review, { foreignKey: 'user_id' });
    }
  }

  ChildModel.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'user',
      underscored: true, // 启用蛇形命名
    }
  );

  return ChildModel;
};

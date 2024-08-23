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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stars: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'review',
      underscored: true, // 启用蛇形命名
    }
  );

  return ChildModel;
};

const { Model } = require('sequelize');

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

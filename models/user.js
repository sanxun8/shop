const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChildModel extends Model {
    static associate(db) {
      ChildModel.hasMany(db.review, { foreignKey: 'user_id' });
    }
  }

  ChildModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
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
      sequelize,
      modelName: 'user',
      underscored: true, // 启用蛇形命名
    }
  );

  return ChildModel;
};

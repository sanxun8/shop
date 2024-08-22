const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserModel extends Model {}

  UserModel.init(
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

  function createUser(data) {
    return UserModel.create(data);
  }

  function getUser(where) {
    return UserModel.findOne({
      where,
    });
  }

  return {
    createUser,
    getUser,
  };
};

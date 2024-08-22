const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewModel extends Model {}

  ReviewModel.init(
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
    },
    {
      sequelize,
      modelName: 'review',
      underscored: true, // 启用蛇形命名
    }
  );

  function createReview(data) {
    return ReviewModel.create(data);
  }
  function getAllReview(where) {
    return ReviewModel.findAll({
      where,
      raw: true,
    });
  }

  return {
    createReview,
    getAllReview,
  };
};

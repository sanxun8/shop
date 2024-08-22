const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductModel extends Model {}

  ProductModel.init(
    {
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
    },
    {
      sequelize,
      modelName: 'product',
      underscored: true, // 启用蛇形命名
    }
  );

  function createProduct(data) {
    return ProductModel.create(data);
  }

  function getHotProducts() {
    return ProductModel.findAll({
      raw: true,
      where: {
        is_hot: 1,
      },
    });
  }

  function getAllProducts(where, order) {
    return ProductModel.findAll({
      raw: true,
      where,
      order,
    });
  }

  function getProduct(id) {
    return ProductModel.findOne({
      where: {
        id,
      },
      raw: true,
    });
  }

  return {
    createProduct,
    getHotProducts,
    getAllProducts,
    getProduct,
  };
};

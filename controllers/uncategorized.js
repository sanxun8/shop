const { sequelize } = require('../models');
const { processError } = require('../utils/error');

exports.createShoppingCart = async function (req, res) {
  const { user_id } = req.cookies;
  const { amount, product_id } = req.body;

  try {
    await sequelize.models.shopping_cart.findOrCreate({
      where: {
        user_id,
        product_id,
      },
      defaults: {
        user_id,
        product_id,
        amount,
      },
      raw: true,
    });

    res.json({});
  } catch (err) {
    processError(err);
    res.status(500).json({ message: '添加到购物车失败' });
  }
};

exports.delShoppingCarts = async function (req, res) {
  try {
    await sequelize.models.shopping_cart.destroy({
      where: {
        id: req.body.ids,
      },
    });

    res.json({});
  } catch (err) {
    processError(err);
    res.status(500).json({ message: err.message });
  }
};

exports.clearShoppingCart = async function (req, res) {
  const { user_id } = req.cookies;

  try {
    await sequelize.models.shopping_cart.destroy({
      where: {
        user_id,
      },
    });

    res.json({});
  } catch (err) {
    processError(err);
    res.status(500).json({ message: err.message });
  }
};

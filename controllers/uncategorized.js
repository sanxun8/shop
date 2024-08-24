/**
 * @param {import('express-serve-static-core').Request} req 请求实例
 * @param {import('express-serve-static-core').Response} res 响应实例
 */
function createShoppingCart(req, res) {
  const { user_id } = req.cookies;
  const { amount, product_id } = req.body;

  db.shopping_cart
    .findOrCreate({
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
    })
    .then(
      (data) => {
        res.json({});
      },
      (err) => {
        console.error(err.message);
        res.status(500).json({ message: '添加到购物车失败' });
      }
    );
}

function delShoppingCarts(req, res) {
  db.shopping_cart
    .destroy({
      where: {
        id: req.body.ids,
      },
    })
    .then(
      (value) => {
        res.json({});
      },
      (err) => {
        console.error(err.message);
        res.status(500).json({ message: err.message });
      }
    );
}

async function clearShoppingCart(req, res) {
  const { user_id } = req.cookies;

  try {
    await db.shopping_cart.destroy({
      where: {
        user_id,
      },
    });

    res.json({});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
}

// 导出控制器
module.exports = {
  createShoppingCart,
  delShoppingCarts,
  clearShoppingCart,
};

function createShoppingCart(_req, res) {
  db.shoppingCart.create().then(
    (data) => {
      const x = data;
      res.end();
    },
    (err) => {
      console.error(err.message);
      const x = err;
    }
  );
}

// 导出控制器
module.exports = {
  createShoppingCart,
};

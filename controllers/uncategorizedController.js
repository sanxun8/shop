function createShoppingCart(_req, res) {
  db.shoppingCart.createShoppingCart().then(
    (data) => {
      const x = data;
      res.end();
    },
    (err) => {
      console.error(err.message);
      console.trace(err.stack);
      const x = err;
    }
  );
}

// 导出控制器
module.exports = {
  createShoppingCart,
};

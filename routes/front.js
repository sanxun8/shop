const express = require('express');

const router = express.Router();
const {
  showHome,
  showLogin,
  showRegister,
  showProducts,
  showProduct,
  showShoppingCarts,
  showReviews,
  showOrders,
  showAccount,
} = require('../controllers/front');

router.get('/', showHome);
router.get('/login', showLogin);
router.get('/register', showRegister);

router.get('/products', showProducts);
router.get('/products/:id', showProduct);

router.get('/user/shoppingCarts', showShoppingCarts);
router.get('/user/reviews', showReviews);
router.get('/user/orders', showOrders);
router.get('/user/account', showAccount);

module.exports = router;

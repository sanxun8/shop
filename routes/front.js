const express = require('express');

const router = express.Router();
const {
  showHome,
  showProducts,
  showProduct,
} = require('../controllers/frontController');

/* GET home page. */
router.get('/', showHome);

/* product */
router.get('/products', showProducts);
router.get('/products/:id', showProduct);

/* user */
router.get('/shoppingCart', (req, res, next) => {
  res.render('user/shoppingCart', {
    title: '我的购物车',
    partials: {
      nav: true,
      footer: true,
    },
  });
});
router.get('/reviews', (req, res, next) => {
  res.render('user/reviews', {
    title: '我的评论',
    partials: {
      nav: true,
      footer: true,
    },
  });
});
router.get('/orders', (req, res, next) => {
  res.render('user/orders', {
    title: '我的订单',
    partials: {
      nav: true,
      footer: true,
    },
  });
});
router.get('/account', (req, res, next) => {
  res.render('user/account', {
    title: '我的账户',
    partials: {
      nav: true,
      footer: true,
    },
  });
});

module.exports = router;

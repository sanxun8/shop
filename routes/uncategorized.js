const express = require('express');

const router = express.Router();
const {
  createShoppingCart,
} = require('../controllers/uncategorizedController');

router.post('/api/shoppingCarts', createShoppingCart);

module.exports = router;

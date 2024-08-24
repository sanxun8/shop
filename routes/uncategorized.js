const express = require('express');

const router = express.Router();
const {
  createShoppingCart,
  delShoppingCarts,
  clearShoppingCart,
} = require('../controllers/uncategorized');

const authMiddleware = require('../middleware/authMiddleware');

router.use('/api/shoppingCarts', authMiddleware);

router.post('/api/shoppingCarts', createShoppingCart);
router.delete('/api/shoppingCarts', clearShoppingCart);
router.delete('/api/shoppingCarts/selected', delShoppingCarts);

module.exports = router;

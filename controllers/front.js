const { Op } = require('sequelize');
const { sequelize } = require('../models');
const { processError } = require('../utils/error');

exports.showHome = async function (req, res) {
  try {
    const hotProducts = await sequelize.models.product.findAll({
      raw: true,
      where: {
        is_hot: 1,
      },
    });
    res.render('index', {
      title: '首页',
      hotProducts,
      partials: {
        nav: true,
        footer: true,
      },
    });
  } catch (err) {
    res.render('error', {
      err,
    });
    processError(err);
  }
};

exports.showLogin = async function (req, res) {
  res.render('login');
};

exports.showRegister = async function (req, res) {
  res.render('register');
};

exports.showAccount = async function (req, res, next) {
  res.render('user/account', {
    title: '我的账户',
    partials: {
      nav: true,
      footer: true,
    },
  });
};

exports.showShoppingCarts = async function (req, res, next) {
  const { user_id } = req.cookies;

  try {
    const shoppingCarts = await sequelize.models.shopping_cart.findAll({
      raw: true,
      include: [
        {
          model: sequelize.models.product,
        },
      ],
      where: {
        user_id,
      },
    });

    res.render('user/shoppingCarts', {
      title: '我的购物车',
      partials: {
        nav: true,
        footer: true,
      },
      shoppingCarts,
    });
  } catch (err) {
    res.render('error', {
      err,
    });
    processError(err);
  }
};

exports.showReviews = async function (req, res, next) {
  res.render('user/reviews', {
    title: '我的评论',
    partials: {
      nav: true,
      footer: true,
    },
  });
};

exports.showOrders = async function (req, res, next) {
  res.render('user/orders', {
    title: '我的订单',
    partials: {
      nav: true,
      footer: true,
    },
  });
};

exports.showProducts = async function (req, res) {
  const { category, keyword, priceRange, sort } = req.query;
  const where = {};
  const order = [];

  if (category) {
    const map = {
      electronics: 1,
      fashion: 2,
      kitchen: 3,
      beauty: 4,
    };

    where.category = map[category];
  }

  if (keyword) {
    where.title = {
      [Op.like]: `%${keyword}%`,
    };
  }

  if (priceRange) {
    const [min, max] = priceRange.split('-');
    where.price = {
      [Op.gte]: min,
      [Op.lte]: max,
    };
  }

  if (sort) {
    const value = sort.split('-');
    order.push(value);
  }

  try {
    const products = await sequelize.models.product.findAll({
      raw: true,
      where,
      order,
    });

    res.render('product/products', {
      title: '产品列表',
      partials: {
        nav: true,
        footer: true,
      },
      products,
    });
  } catch (err) {
    processError(err);
  }
};

exports.showProduct = async function (req, res) {
  const { id } = req.params;

  try {
    const [product, reviews] = await Promise.all([
      sequelize.models.product.findOne({
        where: {
          id,
        },
        raw: true,
      }),
      sequelize.models.review.findAll({
        where: { product_id: id },
        raw: true,
        include: [{ model: sequelize.models.user, attributes: ['username'] }],
      }),
    ]);

    res.render('product/product', {
      title: '产品详情',
      partials: {
        nav: true,
        footer: true,
      },
      product,
      reviews,
    });
  } catch (err) {
    processError(err);
  }
};

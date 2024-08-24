const { Op } = require('sequelize');
const createError = require('http-errors');

async function showHome(req, res) {
  db.product
    .findAll({
      raw: true,
      where: {
        is_hot: 1,
      },
    })
    .then(
      (hotProducts) => {
        res.render('index', {
          title: '首页',
          hotProducts,
          partials: {
            nav: true,
            footer: true,
          },
        });
      },
      (err) => {
        res.render('error', {
          err,
        });
        console.log(err.message);
      }
    );
}

function showLogin(req, res) {
  res.render('login');
}

function showRegister(req, res) {
  res.render('register');
}

function showAccount(req, res, next) {
  res.render('user/account', {
    title: '我的账户',
    partials: {
      nav: true,
      footer: true,
    },
  });
}

function showShoppingCarts(req, res, next) {
  const { user_id } = req.cookies;

  db.shopping_cart
    .findAll({
      raw: true,
      include: [
        {
          model: db.product,
        },
      ],
      where: {
        user_id,
      },
    })
    .then(
      (shoppingCarts) => {
        res.render('user/shoppingCarts', {
          title: '我的购物车',
          partials: {
            nav: true,
            footer: true,
          },
          shoppingCarts,
        });
      },
      (err) => {
        res.render('error', {
          err,
        });
        console.error(err.message);
      }
    );
}

function showReviews(req, res, next) {
  res.render('user/reviews', {
    title: '我的评论',
    partials: {
      nav: true,
      footer: true,
    },
  });
}
function showOrders(req, res, next) {
  res.render('user/orders', {
    title: '我的订单',
    partials: {
      nav: true,
      footer: true,
    },
  });
}

async function showProducts(req, res) {
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

  db.product
    .findAll({
      raw: true,
      where,
      order,
    })
    .then(
      (products) => {
        res.render('product/products', {
          title: '产品列表',
          partials: {
            nav: true,
            footer: true,
          },
          products,
        });
      },
      (err) => {
        console.log(err.message);
      }
    );
}

async function showProduct(req, res) {
  const { id } = req.params;

  Promise.all([
    db.product.findOne({
      where: {
        id,
      },
      raw: true,
    }),
    db.review.findAll({
      where: { product_id: id },
      raw: true,
      include: [{ model: db.user, attributes: ['username'] }],
    }),
  ]).then(
    ([product, reviews]) => {
      res.render('product/product', {
        title: '产品详情',
        partials: {
          nav: true,
          footer: true,
        },
        product,
        reviews,
      });
    },
    (err) => {
      console.log(err.message);
    }
  );
}

module.exports = {
  showAccount,
  showOrders,
  showShoppingCarts,
  showReviews,
  showHome,
  showProducts,
  showProduct,
  showLogin,
  showRegister,
};

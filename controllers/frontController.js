const { Op } = require('sequelize');

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
        console.log(err.message);
      }
    );
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
  showHome,
  showProducts,
  showProduct,
};

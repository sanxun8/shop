const { sequelize } = require('../models');
const { showHome } = require('./front');

jest.mock('../models');

describe('front - showHome', function () {
  it('should render home page', async function () {
    const hotProducts = [
      {
        title: '产品1',
        description: '描述',
        category: 1,
        img: '/img/product.jgp',
        price: 100,
        is_hot: 1,
      },
    ];

    sequelize.models.product.findAll.mockImplementation(function () {
      return hotProducts;
    });

    const req = {};
    const res = {
      render: jest.fn(),
    };

    await showHome(req, res);

    expect(sequelize.models.product.findAll).toHaveBeenCalledWith({
      raw: true,
      where: {
        is_hot: 1,
      },
    });

    expect(res.render).toHaveBeenCalledWith('index', {
      title: '首页',
      hotProducts,
      partials: {
        nav: true,
        footer: true,
      },
    });
  });
});

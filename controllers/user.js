const bcrypt = require('bcrypt');
const createError = require('http-errors');
const { processError } = require('../utils/error');
const { sequelize } = require('../models');

// 用户注册
exports.registerUser = async function (req, res) {
  try {
    const { username, email, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await sequelize.models.user.count({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const user = await sequelize.models.user.create({
      username,
      email,
      password: hashedPassword,
    });

    // 返回成功响应
    res.status(200).json({});
  } catch (err) {
    processError(err.message);
    res.status(500).json({ message: err.message });
  }
};

// 用户登录
exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await sequelize.models.user.findOne({
      where: { email },
      raw: true,
    });
    if (!user) {
      return res.render('error', { err: createError(400, '无效邮箱或密码') });
    }

    // 检查密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('error', { err: createError(400, '无效邮箱或密码') });
    }

    res.cookie('user_id', user.id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
    const referer = req.headers.referer || req.headers.referrer;

    if (referer) {
      const url = new URL(referer);
      const params = new URLSearchParams(url.search);
      const from = params.get('from');

      return from ? res.redirect(`${from}`) : res.redirect('/');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    processError(err);
  }
};

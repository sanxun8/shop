const bcrypt = require('bcrypt');
const createError = require('http-errors');

// 用户注册
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await db.user.count({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const user = await db.user.create({
      username,
      email,
      password: hashedPassword,
    });

    // 返回成功响应
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 用户登录
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await db.user.findOne({ where: { email }, raw: true });
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
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 导出控制器
module.exports = {
  registerUser,
  loginUser,
};

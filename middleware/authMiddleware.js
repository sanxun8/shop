const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config.json'); // 从配置文件中获取密钥

function authMiddleware(req, res, next) {
  // 获取请求头中的 Token
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Token 格式为 "Bearer <token>"

  if (token == null) {
    return res.status(401).json({ message: 'Token is required' });
  }

  function verifyCallBack(err, user) {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    // 将解码后的用户信息附加到请求对象上
    req.user = user;

    // 调用下一个中间件或路由处理函数
    next();
  }

  // 验证 Token
  jwt.verify(token, secretKey, verifyCallBack);
}

module.exports = authMiddleware;

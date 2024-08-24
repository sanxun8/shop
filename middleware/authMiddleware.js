function authMiddleware(req, res, next) {
  const { user_id } = req.cookies;

  if (!user_id) {
    return res.status(401).json({
      message: '未授权或授权已过期',
    });
  } else {
    next();
  }
}

module.exports = authMiddleware;

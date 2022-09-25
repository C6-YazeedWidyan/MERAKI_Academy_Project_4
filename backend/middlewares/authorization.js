const authorization = (str) => {
  return (req, res, next) => {
    if (!req.token.role.permissions.includes(str)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    next();
  };
};

module.exports = authorization;

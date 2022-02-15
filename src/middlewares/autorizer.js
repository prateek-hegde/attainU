const authorize =
  (roles = []) =>
  (req, res, next) => {
    if (roles.length && !roles.includes(req.decoded.role)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  };

module.exports = { authorize };

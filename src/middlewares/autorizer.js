const authorize =
  (roles = []) =>
  (req, res, next) => {

    if (roles.length && !roles.includes(req.decoded.role)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // authentication and authorization successful
    next();
  };

module.exports = { authorize };

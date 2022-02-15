const jwt = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
  if (!req.originalUrl.includes("private")) {
    return next();
  }

  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).send({
      message: "No token provided",
    });
  }

  if (!bearerToken.startsWith("Bearer")) {
    return res.status(401).send({
      message: "Invalid token type",
    });
  }

  const token = bearerToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);

    req.decoded = decoded;
    return next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized access",
    });
  }
};

module.exports = tokenValidator;

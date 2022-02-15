require("dotenv").config();
require("./src/utils/database");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { logger } = require("./src/utils");
const { tokenValidator, errorHandler } = require("./src/middlewares");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// cors
app.use(cors());

// log HTTP requests
app.use(morgan("dev"));

app.use((_req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers
  res.setHeader(
    "Access-control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );

  next();
});

// user authentication
app.use(tokenValidator);

app.use("/", require("./src/routes"));

// Catch 404
app.use((_req, res) => {
  res.status(404).send({
    error: "Invaid Route",
  });
});

// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`server is running on port ${PORT}`);
});

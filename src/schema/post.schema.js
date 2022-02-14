const joi = require("joi");

const postSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().max(255).required(),
});

module.exports = { postSchema };

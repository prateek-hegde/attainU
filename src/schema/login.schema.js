const joi = require('joi');

module.exports.loginSchema = joi.object({
	userName: joi.string().required(),
	password: joi.string().required(),
});

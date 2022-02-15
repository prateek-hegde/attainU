const joi = require('joi')
const { joiStringErrorMessage } = require('../utils/error_codes')

module.exports.loginSchema = joi.object({
    userName: joi
        .string()
        .required()
        .max(10)
        .messages(joiStringErrorMessage('userName', true, 10)),
    password: joi
        .string()
        .required()
        .messages(joiStringErrorMessage('password', true)),
})

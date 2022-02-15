const joi = require('joi')
const { joiStringErrorMessage } = require('../utils/error_codes')

const postSchema = joi.object({
    title: joi
        .string()
        .required()
        .max(50)
        .messages(joiStringErrorMessage('title', true, 50)),
    content: joi
        .string()
        .max(255)
        .required()
        .messages(joiStringErrorMessage('content', true, 255)),
})

module.exports = { postSchema }

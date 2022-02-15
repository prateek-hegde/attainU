const jwt = require('jsonwebtoken')
const { config } = require('../utils')

module.exports.generateAccessToken = async ({ _id, role }) => {
    const token = jwt.sign(
        {
            sub: _id,
            role,
        },
        process.env.JWT_SECRETE_KEY,
        {
            expiresIn: config.jwtExpiry,
        }
    )

    return token
}

module.exports.config = {
    logLevel: process.env.LOG_LEVEL || 'debug',
    jwtExpiry: process.env.JWT_EXPIRY || '1d',
}

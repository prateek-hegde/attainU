const bcrypt = require('bcryptjs')

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    } catch (error) {
        throw error.message
    }
}

const verifyPassword = async (password, hash) =>
    await bcrypt.compare(password, hash)

module.exports = {
    encryptPassword,
    verifyPassword,
}

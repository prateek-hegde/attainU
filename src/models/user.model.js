const mongoose = require('mongoose')
const { CONST } = require('../utils/constants')

const { Schema } = mongoose

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
})

const User = mongoose.model(CONST.models.User, UserSchema)
module.exports = User

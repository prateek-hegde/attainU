const mongoose = require('mongoose')
const { CONST } = require('../utils/constants')

const { Schema } = mongoose

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
    },
    { versionKey: false }
)

const Post = mongoose.model(CONST.models.Post, PostSchema)
module.exports = Post

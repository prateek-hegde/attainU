const { Post } = require('../models')
const { ErrorCodes, logger } = require('../utils')
const { createPageMetaData, createPagination } = require('../helpers')

const createPosts = async (req, res, next) => {
    const { sub } = req.decoded
    try {
        const post = await Post.create({ ...req.body, createdBy: sub })
        return res.status(201).send({
            success: true,
            message: 'Post created',
            data: post,
        })
    } catch (error) {
        logger.error(
            `business_logic/posts.js: createPosts() | ${error} | ${JSON.stringify(
                error
            )}`
        )
        return next(ErrorCodes.INTERNAL_SERVER_ERROR)
    }
}

const fetchPosts = async (req, res, next) => {
    try {
        const pagination = createPagination(req.query)
        const result = await Promise.all([
            Post.find({}, { createdBy: 0 }, pagination)
                .sort({ _id: -1 })
                .lean(),
            Post.find().countDocuments(),
        ])

        const totalRecords = result[1]

        const pageMetaData = createPageMetaData(totalRecords, req.query)
        return res.send({
            pageMetaData,
            results: result[0] || [],
        })
    } catch (error) {
        logger.error(
            `business_logic/posts.js: fetchPosts() | ${error} | ${JSON.stringify(
                error
            )}`
        )
        return next(ErrorCodes.INTERNAL_SERVER_ERROR)
    }
}

const editPost = async (req, res, next) => {
    const { postId } = req.params

    try {
        await Post.updateOne({ _id: postId }, { $set: req.body })
        return res.send({
            success: true,
            message: 'Post edited',
        })
    } catch (error) {
        logger.error(
            `business_logic/posts.js: editPost() | ${error} | ${JSON.stringify(
                error
            )}`
        )
        return next(ErrorCodes.INTERNAL_SERVER_ERROR)
    }
}

const deletePosts = async (req, res, next) => {
    const { postId } = req.params
    try {
        await Post.deleteOne({ _id: postId })
        return res.send({
            success: true,
            message: 'Post deleted',
        })
    } catch (error) {
        logger.error(
            `business_logic/posts.js: deletePosts() | ${error} | ${JSON.stringify(
                error
            )}`
        )
        return next(ErrorCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createPosts,
    fetchPosts,
    editPost,
    deletePosts,
}

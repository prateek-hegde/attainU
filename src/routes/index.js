const router = require('express').Router()

router.use('/', require('./auth.routes'))
router.use('/private/posts', require('./post.routes'))

module.exports = router

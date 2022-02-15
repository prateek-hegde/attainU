const router = require('express').Router()
const { login } = require('../business_logic/authentication')
const { loginSchema } = require('../schema')
const { validateBodySchema } = require('../middlewares')

// Authentication
router.post('/login', validateBodySchema(loginSchema), login)

module.exports = router

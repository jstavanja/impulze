const express = require('express')
const router = express()
const userController = require('../controllers/userController')
const authUtils = require('../utils/authUtil')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/info', authUtils.verifyToken, userController.info)

module.exports = router
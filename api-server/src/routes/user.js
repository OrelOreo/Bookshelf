const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')
const userControllers = require('../controllers/user')

router.post('/signup', multer.uploadAvatar, userControllers.signup)
router.post('/login', userControllers.login)
router.put('/profile/:id', auth, multer.uploadAvatar, userControllers.modifyProfile)

module.exports = router
const express = require('express')
const router = express.Router()

const guard = require('./../../helpers/guard')
const upload = require('./../../helpers/upload');

const authController = require('./../../controllers/auth') 
const {validateUpdateAvatar} = require('./validation');
const { createAccountLimiter } = require('./../../helpers/rate-limit-reg')



router.post('/register', createAccountLimiter, authController.register)
router.post('/login', authController.login)
router.post('/logout', guard, authController.logout)
router.patch(
    '/avatars', 
    [guard, upload.single('avatar'), validateUpdateAvatar], 
    authController.avatars
)


module.exports = router
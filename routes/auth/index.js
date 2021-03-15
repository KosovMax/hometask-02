const express = require('express')
const router = express.Router()
// const Contacts = require('./../../model/contacts');
const authController = require('./../../controllers/auth') 
const validate = require('./validation');


const guard = require('./../../helpers/guard')
const { createAccountLimiter } = require('./../../helpers/rate-limit-reg')

router.post('/register', createAccountLimiter, authController.register)
router.post('/login', authController.login)
router.post('/logout', guard, authController.logout)
// router.post('/current', authController.current)

module.exports = router
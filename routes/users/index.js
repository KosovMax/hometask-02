const express = require('express')
const router = express.Router()
// const Contacts = require('./../../model/contacts');
const authController = require('./../../controllers/users') 
const validate = require('./validation');


const guard = require('./../../helpers/guard')

// router.post('/register', authController.register)
// router.post('/login', authController.login)
// router.post('/logout', guard, authController.logout)
router.get('/current', guard, authController.current)

module.exports = router
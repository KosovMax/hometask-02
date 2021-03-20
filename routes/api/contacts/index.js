const express = require('express')
const router = express.Router()
// const Contacts = require('./../../model/contacts');
const contactsController = require('./../../../controllers/contacts') 
const validate = require('./validation');

const guard = require('./../../../helpers/guard')

router
  .get('/', guard, contactsController.get)
  .post('/', guard, validate.createContact, contactsController.create)

router.get('/:id', guard, validate.idContact, contactsController.getById)
    .delete('/:id', guard, contactsController.remove)
    .put('/:id', 
    [guard, validate.updateContact, validate.idContact], 
    contactsController.update)


module.exports = router

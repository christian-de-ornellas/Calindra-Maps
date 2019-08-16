const express = require('express')

const AddressController = require('../controllers/AddressController')

const routes = express.Router()

routes.get('/address/:end', AddressController.findAddress)


module.exports = routes
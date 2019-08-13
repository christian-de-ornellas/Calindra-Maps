const express = require('express')

const AddressController = require('../controllers/AddressController')

const routes = express.Router()

routes.get('/', AddressController.findAddress)


module.exports = routes
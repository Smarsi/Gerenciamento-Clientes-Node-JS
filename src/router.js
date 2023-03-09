const express = require('express');
const customerModel = require('./models/customerModel');

const router = express.Router();

router.get('/', async (request, response) => response.status(200).json(await customerModel.getAllCustomers()));

module.exports = router;
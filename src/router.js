const express = require('express');

//Import Controllers
const costumersController = require('./controllers/customerController');

const router = express.Router();

router.get('/', costumersController.getAllCostumers);

module.exports = router;
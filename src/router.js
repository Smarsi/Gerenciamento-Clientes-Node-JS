const express = require('express');

//Import Controllers
const costumersController = require('./controllers/customerController');

const router = express.Router();

// ROTAS DA API (Endpoints)
router.get('/cliente', costumersController.getAllCostumers);
router.post('/cliente', costumersController.createCostumer);

module.exports = router;
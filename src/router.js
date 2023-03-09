const express = require('express');

//Import Controllers
const costumersController = require('./controllers/customerController');

//Import Middlewares
const validatecostumerfields_middleware = require('./middlewares/validatecostumerfields_middleware');
const validatecpf_middleware = require('./middlewares/validatecpf_middleware');

const router = express.Router();

// ROTAS DA API (Endpoints)
router.get('/cliente', costumersController.getAllCostumers);
router.post('/cliente', validatecostumerfields_middleware, costumersController.createCostumer);

module.exports = router;
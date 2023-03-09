const express = require('express');

//Import Controllers
const costumersController = require('./controllers/customerController');

//Import Middlewares
const validatecostumer_middleware = require('./middlewares/validatecostumer_middleware');
const validatecpf_middleware = require('./middlewares/validatecpf_middleware');

const router = express.Router();

// ROTAS DA API (Endpoints)
router.get('/cliente', costumersController.getAllCostumers);
router.post('/cliente', validatecostumer_middleware.validateFields, //middleware
    validatecostumer_middleware.validateValues, //middleware
    costumersController.createCostumer //model
    );
router.delete('/cliente/:id', costumersController.deleteCustomer);

module.exports = router;
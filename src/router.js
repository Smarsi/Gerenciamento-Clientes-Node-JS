const express = require('express');

//Import Controllers
const CustomerController = require('./controllers/CustomerController');
const AddressController = require('./controllers/AddressController');

//Import Middlewares
const validatecostumer_middleware = require('./middlewares/validatecostumer_middleware');
const validatecpf_middleware = require('./middlewares/validatecpf_middleware');

const router = express.Router();

//ROTA TESTE SEQUELIZE
router.get('/cliente', CustomerController.getAll); 
router.post('/cliente', CustomerController.create);

router.get('/cliente/:cliente_id/endereco', AddressController.get);
router.post('/cliente/:cliente_id/endereco', AddressController.create);

// ROTAS DA API (Endpoints)
/*
router.get('/cliente', costumersController.getAllCostumers);
router.post('/cliente', 
    validatecostumer_middleware.validateFields, //middleware
    validatecostumer_middleware.validateValues, //middleware
    validatecpf_middleware.validateCPF, //middleware
    costumersController.createCostumer //model
    );
router.delete('/cliente/:id', costumersController.deleteCustomer);
*/

module.exports = router;
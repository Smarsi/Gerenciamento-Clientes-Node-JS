const express = require('express');
const router = express.Router();

//Import Controllers
const CustomerController = require('./controllers/CustomerController');
const AddressController = require('./controllers/AddressController');
const AuthController = require('./controllers/AuthController');

//Import Middlewares
const validatecostumer_middleware = require('./middlewares/validatecostumer_middleware');
const validatecpf_middleware = require('./middlewares/validatecpf_middleware');
const check_token_middleware = require('./middlewares/check_token_middleware');


// --- Endpoints Cliente ---
router.get('/cliente', CustomerController.getAll); 
router.post('/cliente',
                validatecpf_middleware.validateCPF,
                validatecostumer_middleware.validateFields,
                validatecostumer_middleware.validateValues, 
                CustomerController.create
            );
router.get('/cliente/:id-cliente', CustomerController.getById);
router.put('/cliente/:id-cliente', CustomerController.updateById);
router.delete('/cliente/:id-cliente', CustomerController.deleteById);
// --- FIM Endpoints Cliente ---

// --- Endpoints Endereco ---
router.get('/cliente/:id-cliente/endereco', AddressController.getCostumerAddress);
router.post('/cliente/:id-cliente/endereco', AddressController.createCostumerAddress);
router.put('/endereco/:id-endereco', AddressController.updateAddress);
router.delete('/endereco/:id-endereco', AddressController.deleteAddress);
// --- FIM Endpoints Endereco ---

// --- Endpoints Auth/Login
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
// --- FIM Endpoints Auth/Login


module.exports = router;
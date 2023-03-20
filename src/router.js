const express = require('express');
const router = express.Router();

//Import Controllers
const CustomerController = require('./controllers/CustomerController');
const AddressController = require('./controllers/AddressController');
const AuthController = require('./controllers/AuthController');

//Import Middlewares
const validatecostumer_middleware = require('./middlewares/validatecostumer_middleware');
const validate_address_middleware = require('./middlewares/validate_address_middleware');
const validatecpf_middleware = require('./middlewares/validatecpf_middleware');
const check_token_middleware = require('./middlewares/check_token_middleware');


// --- Endpoints Cliente ---
router.get('/cliente', CustomerController.getAll); 
router.post('/cliente',
                check_token_middleware.checkToken,
                validatecpf_middleware.validateCPF,
                validatecostumer_middleware.validateFieldsAndValuesOnPost,
                validatecostumer_middleware.checkIfAlreadyRegistred,
                CustomerController.create
            );
router.get('/cliente/:id_cliente', 
                check_token_middleware.checkToken, 
                validatecostumer_middleware.checkIfIdExists, 
                CustomerController.getById
          );
router.put('/cliente/:id_cliente', 
                check_token_middleware.checkToken,
                validatecostumer_middleware.checkIfIdExists,
                validatecostumer_middleware.validateFieldsAndValuesOnPut,
                validatecostumer_middleware.checkEmailOnUpdate,
                CustomerController.updateById
          );
router.delete('/cliente/:id_cliente',
                check_token_middleware.checkToken,
                validatecostumer_middleware.checkIfIdExists,
                CustomerController.deleteById);
// --- FIM Endpoints Cliente ---

// --- Endpoints Endereco ---
router.get('/cliente/:id_cliente/endereco',
                check_token_middleware.checkToken,
                validatecostumer_middleware.checkIfIdExists,
                AddressController.getCostumerAddress
          );
router.post('/cliente/:id_cliente/endereco', 
                check_token_middleware.checkToken,
                validatecostumer_middleware.checkIfIdExists,
                validate_address_middleware.validateFieldsAndValuesOnPost,
                AddressController.createCostumerAddress
           );
router.put('/endereco/:id_endereco', 
                check_token_middleware.checkToken,
                validate_address_middleware.checkIfIdExists,
                validate_address_middleware.validateFieldsAndValuesOnPut,
                AddressController.updateAddress
          );
router.delete('/endereco/:id_endereco', 
                check_token_middleware.checkToken,
                validate_address_middleware.checkIfIdExists,
                AddressController.deleteAddress
             );
// --- FIM Endpoints Endereco ---

// --- Endpoints Auth/Login
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.post('/auth/changePassword', AuthController.changePassword);
router.get('/auth/checkToken', AuthController.teste);
// --- FIM Endpoints Auth/Login

// --- Endpoint Documentação
router.get('/swagger', (request, response) => {
      return response.sendFile(process.cwd() + "/docs/swagger.json");
});

router.get('/docs', (request, response) => {
      return response.sendFile(process.cwd() + "/docs/index.html");
});


module.exports = router;
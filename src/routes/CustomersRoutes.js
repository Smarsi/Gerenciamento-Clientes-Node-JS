const express = require('express');
const router = express.Router();

//Import Controllers
const CustomerController = require('../controllers/CustomerController');
const AddressController = require('../controllers/AddressController');

//Import Middlewares
const validatecostumer_middleware = require('../middlewares/validatecostumer_middleware');
const validate_address_middleware = require('../middlewares/validate_address_middleware')
const validatecpf_middleware = require('../middlewares/validatecpf_middleware');
const check_token_middleware = require('../middlewares/check_token_middleware');
const onlyWhoCan_middleware = require('../middlewares/can');


//Get all customers
router.get('/', CustomerController.getAll);

//Create a new customer
router.post('/',
      check_token_middleware.checkTokenAndSetupPermissions,
      onlyWhoCan_middleware.can(['create-clientes']),
      validatecpf_middleware.validateCPF,
      validatecostumer_middleware.validateFieldsAndValuesOnPost,
      validatecostumer_middleware.checkIfAlreadyRegistred,
      CustomerController.create
);

//Get a specific customer
router.get('/:id_cliente',
      check_token_middleware.checkTokenAndSetupPermissions,
      validatecostumer_middleware.checkIfIdExists,
      CustomerController.getById
);

//Alter specific customer info
router.put('/:id_cliente',
      check_token_middleware.checkTokenAndSetupPermissions,
      validatecostumer_middleware.checkIfIdExists,
      validatecostumer_middleware.validateFieldsAndValuesOnPut,
      validatecostumer_middleware.checkEmailOnUpdate,
      CustomerController.updateById
);

//Remove specific customer
router.delete('/:id_cliente',
      check_token_middleware.checkTokenAndSetupPermissions,
      validatecostumer_middleware.checkIfIdExists,
      CustomerController.deleteById
);

//Get addresses from a specific customer 
router.get('/:id_cliente/endereco',
      check_token_middleware.checkTokenAndSetupPermissions,
      validatecostumer_middleware.checkIfIdExists,
      AddressController.getCostumerAddress
);

//Create a address for a specific customer
router.post('/:id_cliente/endereco',
      check_token_middleware.checkTokenAndSetupPermissions,
      validatecostumer_middleware.checkIfIdExists,
      validate_address_middleware.validateFieldsAndValuesOnPost,
      AddressController.createCostumerAddress
);


module.exports = router;
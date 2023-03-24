const express = require('express');
const router = express.Router();

//Import Controllers
const AddressController = require('../controllers/AddressController');

//Import Middlewares
const validate_address_middleware = require('../middlewares/validate_address_middleware');
const check_token_middleware = require('../middlewares/check_token_middleware');
const onlyWhoCan_middleware = require('../middlewares/can');
const error_handler_middleware = require('../middlewares/error_handler_middleware');

router.put('/:id_endereco',      
      check_token_middleware.checkTokenAndSetupPermissions,
      onlyWhoCan_middleware.can(['alter-enderecos']),
      validate_address_middleware.checkIfIdExists,
      validate_address_middleware.validateFieldsAndValuesOnPut,
      AddressController.updateAddress,

      error_handler_middleware
);
router.delete('/:id_endereco',
      check_token_middleware.checkTokenAndSetupPermissions,
      onlyWhoCan_middleware.can(['delete-enderecos']),
      validate_address_middleware.checkIfIdExists,
      AddressController.deleteAddress,

      error_handler_middleware
);

module.exports = router;
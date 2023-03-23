const express = require('express');
const router = express.Router();

//Import Controllers
const AddressController = require('../controllers/AddressController');

//Import Middlewares
const validate_address_middleware = require('../middlewares/validate_address_middleware');
const check_token_middleware = require('../middlewares/check_token_middleware');

router.put('/:id_endereco',
      check_token_middleware.checkTokenAndSetupPermissions,
      validate_address_middleware.checkIfIdExists,
      validate_address_middleware.validateFieldsAndValuesOnPut,
      AddressController.updateAddress
);
router.delete('/:id_endereco',
      check_token_middleware.checkTokenAndSetupPermissions,
      validate_address_middleware.checkIfIdExists,
      AddressController.deleteAddress
);

module.exports = router;
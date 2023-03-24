const express = require('express');
const router = express.Router();

//Import Controllers
const PermissionsController = require('../controllers/PermissionsController');

//Import Middlewares
const validate_permissions_middleware = require('../middlewares/validate_permissions_middleware');
const check_token_middleware = require('../middlewares/check_token_middleware');
const onlyWhoCan_middleware = require('../middlewares/can');

//Register a new permission
router.post('/',
      check_token_middleware.checkTokenAndSetupPermissions,
      onlyWhoCan_middleware.can(['create-permissions']),
      validate_permissions_middleware.validateFieldsAndValuesOnPost,
      validate_permissions_middleware.checkIfAlreadyRegistred,
      PermissionsController.create
);

//Get all registred permissions
router.get('/',
      PermissionsController.getAll
);

//Remove a specific permission
router.delete('/:id_permission',
      check_token_middleware.checkTokenAndSetupPermissions,
      onlyWhoCan_middleware.can(['delete-permissions']),
      validate_permissions_middleware.checkIfIdExists,
      PermissionsController.deleteById
);


module.exports = router;
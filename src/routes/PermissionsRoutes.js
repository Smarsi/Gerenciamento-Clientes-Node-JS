const express = require('express');
const router = express.Router();

//Import Controllers
const PermissionsController = require('../controllers/PermissionsController');

//Import Middlewares
const validate_permissions_middleware = require('../middlewares/validate_permissions_middleware');

//Register a new permission
router.post('/',
      validate_permissions_middleware.checkIfAlreadyRegistred,
      validate_permissions_middleware.validateFieldsAndValuesOnPost,
      PermissionsController.create
);

//Get all registred permissions
router.get('/',
      PermissionsController.getAll
);

//Remove a specific permission
router.delete('/:id_permission',
      validate_permissions_middleware.checkIfIdExists,
      PermissionsController.deleteById
);


module.exports = router;
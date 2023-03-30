const express = require('express');
const router = express.Router();

//Import Controllers
const AdminController = require('../controllers/AdminController');

//Import Middlewares
const validate_admin_middleware = require('../middlewares/validate_admin_middleware');
const check_token_middleware = require('../middlewares/check_token_middleware');
const onlyWhoCan_middleware = require('../middlewares/can');

//Get all Admins accounts
router.get('/listAccounts',
    check_token_middleware.checkTokenAndSetupPermissions,
    onlyWhoCan_middleware.can(['list-admin']),
    AdminController.list
);

//Create a new Admin
router.post('/register',
    check_token_middleware.checkTokenAndSetupPermissions,
    onlyWhoCan_middleware.can(['create-admin']),
    validate_admin_middleware.validateFieldsAndValuesOnPost,
    validate_admin_middleware.checkIfAlreadyRegistred,
    AdminController.register
);

//Alter infos from a admin
router.put('/update/:id_admin',
    check_token_middleware.checkTokenAndSetupPermissions,
    onlyWhoCan_middleware.can(['alter-admin']),
    validate_admin_middleware.validateFieldsAndValuesOnPut,
    validate_admin_middleware.checkIfIdExists,
    validate_admin_middleware.checkIfAlreadyRegistred,
    AdminController.update
);

//Get all permissions from a specific admin
router.get('/:id_admin/permissions',
    check_token_middleware.checkTokenAndSetupPermissions,
    onlyWhoCan_middleware.can(['list-permissions']),
    validate_admin_middleware.checkIfIdExists,
    AdminController.getPermissionsByAdminId
);

//Relate new permissions for a admin
router.post('/:id_admin/give-permissions',
    check_token_middleware.checkTokenAndSetupPermissions,
    onlyWhoCan_middleware.can(['give-permissions']),
    validate_admin_middleware.validateFieldsAndValuesOnGiveAdminPermissions,
    validate_admin_middleware.findPermissionsAndSetupRequest,
    AdminController.givePermissions
);

//Remove permissions for a specific admin
router.post('/:id_admin/remove-permissions',
    check_token_middleware.checkTokenAndSetupPermissions,
    onlyWhoCan_middleware.can(['give-permissions']),
    validate_admin_middleware.validateFieldsAndValuesOnGiveAdminPermissions,
    validate_admin_middleware.findPermissionsAndSetupRequest,
    AdminController.removePermissions
);

//Login for admins
router.post('/login',    
    validate_admin_middleware.validateFieldsAndValuesOnLogin,
    validate_admin_middleware.checkEmailOnLogin,
    AdminController.login
);

module.exports = router;
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

//Login for admins
router.post('/login', AdminController.login);

//Get all permissions from a specific admin
router.get('/:id_admin/permissions', 
    check_token_middleware.checkTokenAndSetupPermissions,
    onlyWhoCan_middleware.can(['list-permissions']),
    AdminController.getPermissionsByAdminId
);

//Relate new permissions for a admin
router.post('/:id_admin/permissions',
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

//Alter infos from a admin
router.put('/update/:id_admin',
    check_token_middleware.checkTokenAndSetupPermissions,
    onlyWhoCan_middleware.can(['alter-admin']),
    AdminController.update
);


module.exports = router;
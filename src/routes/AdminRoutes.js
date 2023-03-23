const express = require('express');
const router = express.Router();

//Import Controllers
const AdminController = require('../controllers/AdminController');

//Import Middlewares
const onlyWhoCan_middleware = require('../middlewares/can');
const validate_admin_middleware = require('../middlewares/validate_admin_middleware');

//Get all Admins accounts
router.get('/listAccounts', AdminController.list);

//Create a new Admin
router.post('/register', AdminController.register);

//Login for admins
router.post('/login', AdminController.login);

//Get all permissions from a specific admin
router.get('/:id_admin/permissions', 
    AdminController.getPermissionsByAdminId
);

//Relate new permissions for a admin
router.post('/:id_admin/permissions',
    validate_admin_middleware.validateFieldsAndValuesOnGivePermissions,
    validate_admin_middleware.checkPermissionsAndSetupRequest,
    AdminController.givePermissions
);

//Remove permissions for a specific admin
router.post('/:id_admin/remove-permissions',
    validate_admin_middleware.checkPermissionsAndSetupRequest,
    AdminController.removePermissions
);

//Alter infos from a admin
router.put('/update/:id_admin', AdminController.update);


module.exports = router;
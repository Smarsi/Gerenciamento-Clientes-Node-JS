const express = require('express');
const router = express.Router();

//Import Controllers
const AdminController = require('../controllers/AdminController');

//Import Middlewares
const onlyWhoCan_middleware = require('../middlewares/can');
const PermissionsController = require('../controllers/PermissionsController');

//Get all Admins accounts
router.get('/listAccounts', AdminController.list);

//Create a new Admin
router.post('/register', AdminController.register);

//Login for admins
router.post('/login', AdminController.login);

//Relate new permissions for a admin
router.post('/givepermissions/:id_admin', AdminController.givePermissions);

//Alter infos from a admin
router.put('/update/:id_admin', AdminController.update);



module.exports = router;
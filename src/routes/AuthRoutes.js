const express = require('express');
const router = express.Router();

//Import Controllers
const AuthController = require('../controllers/AuthController');

//Import Middlewares
const validate_auth_middleware = require('../middlewares/validate_auth_middleware'); 

//Default login
router.post('/login',
    validate_auth_middleware.validateFieldsAndValuesOnLogin,
    validate_auth_middleware.checkEmailOnLogin,
    AuthController.login
);

//Register new Account
router.post('/register', AuthController.register);

//Alter password for a Account
router.post('/changePassword', AuthController.changePassword);

module.exports = router;
const express = require('express');
const router = express.Router();

//Import Controllers
const AuthController = require('../controllers/AuthController');

//Import Middlewares

//Default login
router.post('/login', AuthController.login);

//Register new Account
router.post('/register', AuthController.register);

//Alter password for a Account
router.post('/changePassword', AuthController.changePassword);

//Teste check token
router.get('/checkToken', AuthController.teste);

module.exports = router;
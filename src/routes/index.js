const express = require('express');
const router = express.Router();

const CustomerRoutes = require('./CustomersRoutes');
const AddressesRoutes = require('./AddressesRoutes');
const AdminRoutes = require('./AdminRoutes');
const AuthRoutes = require('./AuthRoutes');
const PermissionsRoutes = require('./PermissionsRoutes');
const DocsRoutes = require('./DocsRoutes');

router.use('/cliente', CustomerRoutes);
router.use('/endereco', AddressesRoutes);
router.use('/admin', AdminRoutes);
router.use('/auth', AuthRoutes);
router.use('/permissions', PermissionsRoutes);
router.use('/docs', DocsRoutes);


module.exports = router;
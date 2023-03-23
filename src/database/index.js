const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Customer = require('../models/Customer');
const Address = require('../models/Address');
const Admin = require('../models/Admin');
const Permissions = require('../models/Permissions');
const Account = require('../models/Account');

const connection = new Sequelize(dbConfig);

//Iniciando tabelas
Customer.init(connection);
Address.init(connection);
Permissions.init(connection);
Admin.init(connection);
Account.init(connection);

//Fazendo relacionamentos de tabelas
Customer.associate(connection.models);
Address.associate(connection.models);
Permissions.associate(connection.models);
Admin.associate(connection.models);
Account.associate(connection.models);

module.exports = connection;
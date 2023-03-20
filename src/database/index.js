const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Customer = require('../models/Customer');
const Address = require('../models/Address');
const Account = require('../models/Account');

const connection = new Sequelize(dbConfig);

Customer.init(connection);
Address.init(connection);
Account.init(connection);

Customer.associate(connection.models);
Address.associate(connection.models);
Account.associate(connection.models);

module.exports = connection;
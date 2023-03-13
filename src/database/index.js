const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Customer = require('../models/Customer');
const Address = require('../models/Address');

const connection = new Sequelize(dbConfig);

Customer.init(connection);
Address.init(connection);

Customer.associate(connection.models);
Address.associate(connection.models);

module.exports = connection;
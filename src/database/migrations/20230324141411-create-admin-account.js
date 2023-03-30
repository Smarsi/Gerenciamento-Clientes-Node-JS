const Password = require('../../utils/Passwords');

'use strict';
module.exports = {
  up: async function(queryInterface, Sequelize) {
    var password = await Password.newPassword('admin');
    return queryInterface.bulkInsert('conta', [{
      cliente_id: null,
      admin_id: 1,
      senha: password,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  down: async function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('conta', null, {});
  }
};
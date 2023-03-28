'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('admin', [{
      nome: 'admin',
      email: 'admin@admin.com',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('admin', null, {});
  }
};
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('permissions', [{
      titulo: 'list-clientes',
      descricao: 'permite listar todos os clientes do sistema',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      titulo: 'create-clientes',
      descricao: 'permite criar um novo cliente no sistema',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      titulo: 'alter-clientes',
      descricao: 'permite alterar dados de um cliente no sistema',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      titulo: 'delete-clientes',
      descricao: 'permite deletar um cliente do sistema',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('permissions', null, {});
  }
};
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
    },{
      titulo: 'list-enderecos',
      descricao: 'permite listar todos os endereços do sistema',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      titulo: 'create-enderecos',
      descricao: 'permite criar um novo endereço no sistema',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      titulo: 'alter-enderecos',
      descricao: 'permite alterar dados de um endereço no sistema',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      titulo: 'delete-enderecos',
      descricao: 'permite deletar um endereço do sistema',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      titulo: 'give-permissions',
      descricao: 'permite atribuir permissions para um admin',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      titulo: 'list-permissions',
      descricao: 'permite listar as permissions cadastradas no sistema',
      created_at: new Date(),
      updated_at: new Date()
    },{
      titulo: 'create-permissions',
      descricao: 'permite criar permissões no sistema',
      created_at: new Date(),
      updated_at: new Date()
    },{
      titulo: 'delete-permissions',
      descricao: 'permite deletar permissões do sistema',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      titulo: 'list-admin',
      descricao: 'permite listar administradores cadastrados no sistema',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      titulo: 'create-admin',
      descricao: 'permite criar um novo admin no sistema',
      created_at: new Date(),
      updated_at: new Date()
    },{
      titulo: 'alter-admin',
      descricao: 'permite alterar dados de um admin cadastrado no sistema',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('permissions', null, {});
  }
};
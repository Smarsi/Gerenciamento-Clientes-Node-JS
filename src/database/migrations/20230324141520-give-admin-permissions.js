'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('admin_permissions', [
      {
        admin_id: 1,
        permission_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        admin_id: 1,
        permission_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        admin_id: 1,
        permission_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        admin_id: 1,
        permission_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        admin_id: 1,
        permission_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        admin_id: 1,
        permission_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        admin_id: 1,
        permission_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        admin_id: 1,
        permission_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },{
        admin_id: 1,
        permission_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },{
        admin_id: 1,
        permission_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },{
        admin_id: 1,
        permission_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },{
        admin_id: 1,
        permission_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },{
        admin_id: 1,
        permission_id: 13,
        created_at: new Date(),
        updated_at: new Date()
      },{
        admin_id: 1,
        permission_id: 14,
        created_at: new Date(),
        updated_at: new Date()
      },{
        admin_id: 1,
        permission_id: 15,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('admin_permissions', null, {});
  }
};
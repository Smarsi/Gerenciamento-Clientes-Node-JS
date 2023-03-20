const { Model, DataTypes } = require('sequelize');

class Admin extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: 'admin'
        })
    }

    static associate(models) {
        this.hasOne(models.Account, { foreignKey: 'admin_id', as: 'conta' });
        this.belongsToMany(models.Permissions, { foreignKey: 'permission_id', through: 'admin_permissions', as: 'permissions' });
    }
}

module.exports = Admin;
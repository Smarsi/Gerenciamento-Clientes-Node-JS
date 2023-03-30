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
        this.belongsToMany(models.Permissions, { foreignKey: 'admin_id', through: 'admin_permissions', as: 'permissions' });
        this.hasOne(models.Account, { foreignKey: 'admin_id', as: 'conta' });
    }
}

module.exports = Admin;
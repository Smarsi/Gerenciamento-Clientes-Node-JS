const { Model, DataTypes } = require('sequelize');

class Permissions extends Model {
    static init(connection){
        super.init({      
            titulo: DataTypes.STRING,   
            descricao: DataTypes.STRING         
        }, {
            sequelize: connection,
            tableName: 'permissions'
        })
    }

    static associate(models){
        this.belongsToMany(models.Admin, { foreignKey: 'permission_id', through: 'admin_permissions', as: 'admin'});
    }
}

module.exports = Permissions;
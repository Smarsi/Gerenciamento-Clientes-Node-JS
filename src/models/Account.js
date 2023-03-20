const { Model, DataTypes } = require('sequelize');

class Account extends Model {
    static init(connection){
        super.init({            
            email: DataTypes.STRING,
            senha: DataTypes.STRING,            
        }, {
            sequelize: connection,
            tableName: 'conta'
        })
    }

    static associate(models){
        this.belongsTo(models.Customer, { foreignKey: 'cliente_id', as: 'cliente'});
    }
}

module.exports = Account;
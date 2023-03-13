const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING(11),
            email: DataTypes.STRING,
            senha: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: 'customer'
        })
    }
}

module.exports = Customer;
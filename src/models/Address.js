const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    static init(connection){
        super.init({
            titulo_endereco: DataTypes.STRING,
            cep: DataTypes.STRING(8),
            logradouro: DataTypes.STRING,
            numero: DataTypes.INTEGER,
            complemento: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cidade: DataTypes.STRING,
            estado: DataTypes.STRING(2)
        }, {
            sequelize: connection,
            tableName: 'endereco'
        })
    }

    static associate(models){
        this.belongsTo(models.Customer, { foreignKey: 'cliente_id', as: 'cliente'});
    }
}

module.exports = Address;
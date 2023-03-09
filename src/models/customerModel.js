const connection = require("./connection");

const getAllCustomers = async () =>{
    const query = "SELECT * FROM cliente";
    const [costumers] = await connection.execute(query);
    return costumers;
};

const createCostumer = async (costumer) =>{
    const {nome, cpf, profissao} = costumer;

    const query = "INSERT into cliente (nome, cpf, profissao) values (?, ?, ?)";
    const [createdCostumer] = await connection.execute(query, [nome, cpf, profissao]);

    return {insertId: createdCostumer.insertId};
};

module.exports = {
    getAllCustomers,
    createCostumer
}
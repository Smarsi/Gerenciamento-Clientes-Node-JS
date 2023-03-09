const connection = require("./connection");
const createPassword = require("../utils/createPassword")

const getAllCustomers = async () =>{
    const query = "SELECT * FROM cliente";
    //const queryteste = "SELECT * FROM cliente INNER JOIN endereco";
    const [costumers] = await connection.execute(query);
    return costumers;
};

const createCostumer = async (costumer) =>{
    var response = {
        costumerId: null,
        addressId: null
    }

    const {email, nome, cpf, senha, confirmasenha} = costumer;

    //Criptografia de senha
    if(senha === confirmasenha){
        senhatratada = await createPassword.newPassword(senha);
    }
    //FIM -- criptografia de senha

    var queryUsuario = "INSERT into cliente (email, senha, nome, cpf) values (?, ?, ?, ?);"
    const [createdCostumer] = await connection.execute(queryUsuario, [email, senhatratada, nome, cpf]);
    var costumerId = createdCostumer.insertId;

    response.costumerId = costumerId;

    if(costumer.endereco){
        const {titulo, cep, logradouro, numero, complemento, bairro, cidade, estado} = costumer.endereco;

        //Criando o endereco
        var queryEndereco = "INSERT into endereco(titulo_endereco, cep, logradouro, numero, complemento, bairro, cidade, estado, cliente_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const [createdAddress] = await connection.execute(queryEndereco, [titulo, cep, logradouro, numero, complemento, bairro, cidade, estado, costumerId]);
        response.addressId = createdAddress.insertId;
        
        return response;
    } else{
        response.msg = "O endereço não foi enviado. Para cadastrar um usuário é necessário enviar os campos de endereço";
        return response;
    }
};

const deleteCustomer = async (customerId) =>{
    const query = "DELETE FROM cliente WHERE id=?;";
    const [removedCustomer] = await connection.execute(query, [customerId]);
    return removedCustomer;
    
};

const checkIfCustomerExists = async (customerId) => {
    const consult = "SELECT * FROM gerenciamentoclientes.cliente WHERE id=?";
    var [customer] = await connection.execute(consult, [customerId]);
    
    if(customer.length > 0){
        return true;
    } else{
        return false;
    }
};

// Validações para evitar duplicidades no sistema.
const checkIfCpfAlreadyExists = async (cpf) => {
    const query = "SELECT * FROM gerenciamentoclientes.cliente WHERE cpf=?";
    var [cpf] = await connection.execute(query, [cpf]);

    if(cpf.length > 0){
        return true;
    } else{
        return false;
    }
};

const checkIfEmailAreadyInUse = async (email) => {
    const query = "SELECT * FROM gerenciamentoclientes.cliente WHERE email=?";
    var [email] = await connection.execute(query, [email]);

    if(email.length > 0){
        return true;
    } else{
        return false;
    }
};

module.exports = {
    getAllCustomers,
    createCostumer,
    deleteCustomer,
    checkIfCustomerExists,
    checkIfCpfAlreadyExists,
    checkIfEmailAreadyInUse,
}
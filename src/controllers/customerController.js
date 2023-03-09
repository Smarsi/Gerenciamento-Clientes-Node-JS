const customerModel = require('../models/customerModel');

//Função GET para pegar todos os clientes cadastrados
const getAllCostumers = async(request, response) => {
    try {
        allCostumers = await customerModel.getAllCustomers();
        return response.status(200).json(allCostumers);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Ocorreu um erro no sistema. Por favor tente novamente mais tarde." })
    }
};

//Função POST para criar um novo cliente
const createCostumer = async(request, response) => {
    try {
        const createdCostumer = await customerModel.createCostumer(request.body);
        return response.status(201).json(createdCostumer); 
    } catch (error) {
        return response.status(500).json({ mensagem: "Erro interno. Tente novamente mais tarde." })
    }
};

//Função DELETE para excluir um cliente
const deleteCustomer = async(request, response) => {
    const { id } = request.params;

    try {
        await customerModel.deleteCustomer(id);
        return response.status(200).json({ mensagem: "Cliente removido com sucesso." });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ mensagem: "Erro interno. Tente novamente mais tarde." });
    }   
};

module.exports = {
    getAllCostumers,
    createCostumer,
    deleteCustomer,
}
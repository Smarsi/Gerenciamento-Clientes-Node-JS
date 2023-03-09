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

    //Check if the customer exists
    const exists = await customerModel.checkIfCustomerExists(id);
    if(exists){
        try {
            await customerModel.deleteCustomer(id);
            return response.status(200).json({ mensagem: "Cliente removido com sucesso." });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ mensagem: "Erro interno. Tente novamente mais tarde." });
        }   
    } else{
        return response.status(404).json({ mensagem: "Erro. Não existe um cliente com o ID passado no sistema." });
    }

    
};

module.exports = {
    getAllCostumers,
    createCostumer,
    deleteCustomer,
}
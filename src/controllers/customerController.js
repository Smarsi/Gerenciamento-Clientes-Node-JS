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
    const createdCostumer = await customerModel.createCostumer(request.body);
    return response.status(201).json(createdCostumer);
};

module.exports = {
    getAllCostumers,
    createCostumer,
}
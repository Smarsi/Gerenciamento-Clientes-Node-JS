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

module.exports = {
    getAllCostumers
}
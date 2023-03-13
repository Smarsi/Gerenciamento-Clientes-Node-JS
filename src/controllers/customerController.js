const Cliente = require("../models/Customer");

const getAll = async(request, response) =>{
    const Clientes = await Cliente.findAll();
    return response.status(200).json(Clientes);
}

const create = async(request, response) =>{
    const Clientes = await Cliente.findAll();
    return response.status(200).json(Clientes);
}

module.exports = {
    getAll,
    create
};
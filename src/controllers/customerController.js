const Cliente = require("../models/Customer");

const getAll = async(request, response) =>{
    const Clientes = await Cliente.findAll();
    return response.status(200).json(Clientes);
}

const create = async(request, response) =>{
    const { nome, cpf, email, senha, confirmasenha } = request.body;

    if(senha === confirmasenha){
        const cliente = await Cliente.create({nome, cpf, email, senha});
        return response.status(200).json(cliente);
    } else{
        return response.status(400).json({ mensagem: "As senhas são diferentes" });
    }
}

module.exports = {
    getAll,
    create
};
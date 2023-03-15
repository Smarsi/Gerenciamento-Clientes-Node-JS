const { response } = require("express");
const Endereco = require("../models/Address");
const Cliente = require("../models/Customer");

const getCostumerAddress = async(request, response) =>{
    const { id_cliente } = request.params;

    const cliente = await Cliente.findByPk(id_cliente, {
        include: { association: 'enderecos' }
    });
    
    if(!cliente){
        return response.status(404).json({mensagem: "Não há cliente com o ID informado."})
    }else{
        if(cliente.enderecos !== null && cliente.enderecos !== ""){
            return response.status(200).json(cliente.enderecos);
        }else{
            return response.status(400).json({ mensagem: "O cliente não contém um endereço cadastrado" });
        }
    }
}

const createCostumerAddress = async(request, response) =>{
    const { id_cliente } = request.params;
    const { titulo_endereco, cep, logradouro, numero, complemento, bairro, cidade, estado } = request.body;
    const cliente = await Cliente.findByPk(id_cliente);

    if(!cliente){
        return response.status(404).json({mensagem: "ERRO - Usuário não encontrado"});       
    }
    const endereco = await Endereco.create({
        titulo_endereco,
        cep, 
        logradouro, 
        numero, 
        complemento, 
        bairro, 
        cidade, 
        estado,
        id_cliente,
    });

    return response.status(200).json(endereco);
}

const _internalCreate = async(request, response) => { //Usado durante a criação de cliente
    const { id_cliente } = request.params;
    const { titulo_endereco, cep, logradouro, numero, complemento, bairro, cidade, estado } = request.body.endereco;
    const cliente = await Cliente.findByPk(id_cliente);

    if(!cliente){
        return response = "Erro";       
    }else{
        const endereco = await Endereco.create({
            titulo_endereco,
            cep, 
            logradouro, 
            numero, 
            complemento, 
            bairro, 
            cidade, 
            estado,
            id_cliente,
        });

        return endereco;
    }
}

const updateAddress = async (request, response) => {
    return response.status(200).json({mensagem: "Endepoint funcionando corretamente."});
}

const deleteAddress = async (request, response) => {
    return response.status(200).json({mensagem: "Endepoint funcionando corretamente."});
}

module.exports = {
    getCostumerAddress,
    createCostumerAddress,
    updateAddress,
    deleteAddress,


    _internalCreate,
};
const { response } = require("express");
const Error = require('../errors');

const Endereco = require("../models/Address");
const Cliente = require("../models/Customer");

const getCostumerAddress = async (request, response, next) => {
    const { id_cliente } = request.params;

    const cliente = await Cliente.findByPk(id_cliente, {
        include: { association: 'enderecos' }
    });

    if (cliente.enderecos.length > 0 && cliente.enderecos !== null && cliente.enderecos !== "") {
        return response.status(200).json(cliente.enderecos);
    } else {
        next(new Error.ConflictError("ERRO - O cliente não contém nenhum endereço cadastrado."));
        return
    }
}

const createCostumerAddress = async (request, response) => {
    const { id_cliente } = request.params;
    const { titulo_endereco, cep, logradouro, numero, complemento, bairro, cidade, estado } = request.body;

    const endereco = await Endereco.create({
        titulo_endereco,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cliente_id: id_cliente,
    });

    return response.status(200).json(endereco);
}

const _internalCreate = async (request, response) => { //Usado durante a criação de cliente
    const { id_cliente } = request.params;
    const { titulo_endereco, cep, logradouro, numero, complemento, bairro, cidade, estado } = request.body.endereco;
    const cliente = await Cliente.findByPk(id_cliente);

    if (!cliente) {
        return response = "Erro";
    } else {
        try {
            const endereco = await Endereco.create({
                titulo_endereco,
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cliente_id: id_cliente,
            });

            return endereco;
        } catch (error) {
            console.log(error);

            return "Erro";
        }

    }
}

const updateAddress = async (request, response, next) => {
    const { id_endereco } = request.params;
    const { titulo_endereco, numero, complemento } = request.body;

    try {
        await Endereco.update({
            titulo_endereco: titulo_endereco,
            numero: numero,
            complemento: complemento
        }, {
            where: { id: id_endereco },
            returning: true,
            plain: true,
        });
        const newEndereco = await Endereco.findByPk(id_endereco);

        return response.status(200).json(newEndereco);
    } catch (error) {
        console.log(error);
        next(new Error.InternalError("Erro - Tente novamente mais tarde."));
        return
    }
}

const deleteAddress = async (request, response) => {
    const { id_endereco } = request.params;

    try {        
        const deleteEndereco = await Endereco.destroy({
            where: {
              id: id_endereco
            },
            force: true
          });

        return response.status(200).json();

    } catch (error) {
        console.log(error);
        next(new Error.InternalError("Erro interno. Tente novamente mais tarde."));
        return
    }
}

module.exports = {
    getCostumerAddress,
    createCostumerAddress,
    updateAddress,
    deleteAddress,


    _internalCreate,
};
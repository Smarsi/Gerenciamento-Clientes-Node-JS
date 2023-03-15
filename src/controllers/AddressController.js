const { response } = require("express");
const Endereco = require("../models/Address");
const Cliente = require("../models/Customer");

const getCostumerAddress = async (request, response) => {
    const { id_cliente } = request.params;

    const cliente = await Cliente.findByPk(id_cliente, {
        include: { association: 'enderecos' }
    });

    if (cliente.enderecos.length > 0 && cliente.enderecos !== null && cliente.enderecos !== "") {
        return response.status(200).json(cliente.enderecos);
    } else {
        return response.status(404).json({ mensagem: "ERRO - O cliente não contém nenhum endereço cadastrado" });
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

const updateAddress = async (request, response) => {
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
        return response.status(500).json({ mensagem: "ERRO - Tente novamente mais tarde." });
    }
}

const deleteAddress = async (request, response) => {
    return response.status(200).json({ mensagem: "Endepoint funcionando corretamente." });
}

module.exports = {
    getCostumerAddress,
    createCostumerAddress,
    updateAddress,
    deleteAddress,


    _internalCreate,
};
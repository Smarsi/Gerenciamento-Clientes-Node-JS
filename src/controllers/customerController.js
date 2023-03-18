const { Op } = require("sequelize");

const Cliente = require("../models/Customer");

//Import Relacionamentos
const EnderecoController = require("../controllers/AddressController"); //Um cliente não pode ser registrado sem um endereço

const getAll = async (request, response) => {
    const Clientes = await Cliente.findAll({ attributes: ['id', 'nome', 'email'] });
    return response.status(200).json(Clientes);
}

const create = async (request, response) => {
    const { nome, cpf, email, senha, confirmasenha } = request.body;

    if (senha === confirmasenha) {
        try {
            const cliente = await Cliente.create({ nome, cpf, email, senha });

            //preparando parametros para criação do endereco
            request.params = { id_cliente: cliente.id }

            const endereco = await EnderecoController._internalCreate(request, response);
            if (endereco != "Erro") {
                return response.status(200).json({ cliente, endereco });
            } else {
                const error = _internalDeleteById(cliente.id);
                return response.status(500).json({ mensagem: "Erro interno. Tente novamente mais tarde." });
            }
        } catch (error) {
            console.log(error);

            return response.status(500).json({ mensagem: "Erro interno. Tente novamente mais tarde." })
        }

    } else {
        return response.status(401).json({ mensagem: "A senha e confirmação de senha não conferem." });
    }
}

const getById = async (request, response) => {
    const { id_cliente } = request.params;
    const cliente = await Cliente.findByPk(id_cliente);

    return response.status(200).json(cliente);
}

const updateById = async (request, response) => {
    const { id_cliente } = request.params;
    const { nome, email } = request.body;

    try {
        const update_cliente = await Cliente.update({ nome, email }, {
            where: {
                id: id_cliente
            }
        });

        return response.status(200).json({ mensagem: `Cliente com id ${id_cliente} atualizado com sucesso.` });
    } catch (error) {
        console.log(error);

        return response.status(500).json({ mensagem: "Erro interno. Tente novamente mais tarde" });
    }


}

const deleteById = async (request, response) => {
    const { id_cliente } = request.params;

    try {
        await Cliente.destroy({
            where: {
                id: id_cliente
            },
            force: true
        });

        return response.status(200).json();
    } catch (error) {
        console.log(error);
        return response.status(500).json({ mensagem: "ERRO - Tente novamente mais tarde." });
    }
}

const _internalDeleteById = async (cliente_id) => {

    try {
        await Cliente.destroy({
            where: {
                id: cliente_id
            },
            force: true
        });

        return "Success";
    } catch (error) {
        console.log("Erro ao deletar cliente passado");
        console.log(error);
        return "Erro ao deletar cliente passado";
    }

}

module.exports = {
    getAll,
    create,
    getById,
    updateById,
    deleteById
};
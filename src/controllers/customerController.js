const { Op } = require("sequelize");
const Error = require('../errors');

const Cliente = require("../models/Customer");
const Conta = require("../models/Account");

//Import Relacionamentos
const EnderecoController = require("./AddressController"); //Um cliente não pode ser registrado sem um endereço
const AuthController = require("./AuthController"); //Um cliente não pode ser registrado sem uma conta do sistema

const getAll = async (request, response) => {
    const Clientes = await Cliente.findAll({ attributes: ['id', 'nome', 'email'] });
    return response.status(200).json(Clientes);
}

const create = async (request, response, next) => {
    var { nome, cpf, email, senha, confirmasenha } = request.body;

    if (senha === confirmasenha) {
        try {
            const cliente = await Cliente.create({ nome, cpf, email });

            //preparando parametros para criação do endereco e conta
            request.params = { id_cliente: cliente.id }

            const endereco = await EnderecoController._internalCreate(request, response);
            const conta = await AuthController.register(request, response);
            if (endereco != "Erro" && conta != "Erro") {
                return response.status(200).json({ cliente, endereco, id_conta: conta });
            } else {
                const error = _internalDeleteById(cliente.id);
                next(new Error.InternalError("Erro interno. Tente novamente mais tarde."));
            }
        } catch (error) {
            console.log(error);
            next(new Error.InternalError("Erro interno. Tente novamente mais tarde."));
        }

    } else {
        next(new Error.ForbiddenError("A senha e confirmação de senha não conferem."));
        return
    }
}

const getById = async (request, response) => {
    try {
        const { id_cliente } = request.params;
        const cliente = await Cliente.findByPk(id_cliente, { attributes: ['id', 'nome', 'email', 'cpf'] });
        return response.status(200).json(cliente);
    } catch (error) {
        console.log(error);
        next(new Error.InternalError("Erro interno. Tente novamente mais tarde."));
        return
    }
}

const updateById = async (request, response, next) => {
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

        next(new Error.InternalError("Erro interno. Tente novamente mais tarde."));
        return
    }
}

const deleteById = async (request, response) => {
    const { id_cliente } = request.params;

    try {
        //Deletando a conta do usuário
        await Conta.destroy({
            where: {
                cliente_id: id_cliente
            }
        });

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
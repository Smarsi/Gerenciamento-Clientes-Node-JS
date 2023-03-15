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

    //============ Validations ============
    if (senha !== confirmasenha) {
        return response.status(400).json({ mensagem: "As senhas são diferentes" });
    }
    const clienteJaRegistrado = await Cliente.findAll({
        where: {
            [Op.or]: [
                { cpf: cpf },
                { email: email }
            ]
        }
    });

    if (clienteJaRegistrado.length > 0) {
        if (clienteJaRegistrado[0].cpf == cpf) {
            return response.status(400).json({ mensagem: "ERRO - CPF já registrado" });
        }
        if (clienteJaRegistrado[0].email == email) {
            return response.status(400).json({ mensagem: "ERRO - Email já registrado" });
        }
    }
    //============ END Validations ============

    if (senha === confirmasenha) {
        try {
            const cliente = await Cliente.create({ nome, cpf, email, senha });

            //preparando parametros para criação do endereco
            request.params = { cliente_id: cliente.id }

            const endereco = await EnderecoController._internalCreate(request, response);
            return response.status(200).json({ cliente, endereco });
        } catch (error) {
            console.log(error);

            return response.status(500).json({ mensagem: "Erro interno. Tente novamente mais tarde." })
        }

    } else {
        return response.status(400).json({ mensagem: "As senhas são diferentes" });
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

    if (nome, email) {
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

    } else {
        return response.status(400).json({ mensagem: "Os campos 'nome' e 'email' são obrigatórios." });
    }
}

const deleteById = async (request, response) => {
    return response.status(200).json({ mensagem: "Endpoint funcionando corretamente." });
}

module.exports = {
    getAll,
    create,
    getById,
    updateById,
    deleteById
};
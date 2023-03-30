//Imports
const Password = require('../utils/Passwords');
const Token = require('../utils/Token');
const Error = require('../errors');

const Conta = require('../models/Account');

const login = async (request, response, next) => {
    const {email, senha} = request.body;

    const cliente = request.conta_cliente;
    const conta = request.conta_cliente.conta;

    registredPassword = conta.senha;
    const checkPassword = await Password.checkPassword(senha, registredPassword, cliente.id);
    if (checkPassword) {
        const token = await Token.generateToken(cliente.id);
        if (token) {
            return response.status(200).json({ token });
        }
    } else {
        next(new Error.UnauthorizedError("ERRO - Senha incorreta."));
        return
    }
}

const changePassword = async (request, response) => {
    return response.status(200).json({ mensagem: "Endpoint funcionando corretamente" });
}

const register = async (request, response) => {
    const { id_cliente, id_admin } = request.params;
    var { senha, confirmasenha } = request.body;

    if (senha === confirmasenha) {
        try {
            //Building Password
            buildedPassword = await Password.newPassword(senha);
            senha = buildedPassword;
            const conta = await Conta.create({
                cliente_id: id_cliente,
                admin_id: id_admin,
                senha
            });
            return conta.id;
        } catch (error) {
            console.log(error);
            return "Erro";
        }

    }
}

module.exports = {
    login,
    register,
    changePassword,
}
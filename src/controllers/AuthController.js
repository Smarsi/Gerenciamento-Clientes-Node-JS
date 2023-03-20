//Imports
const Password = require('../utils/Passwords');

const Conta = require('../models/Account');

const login = async (request, response) => {
    return response.status(200).json({ mensagem: "Endpoint funcionando corretamente." });
}

const changePassword = async (request, response) => {
    return response.status(200).json({ mensagem: "Endpoint funcionando corretamente" });
}

const register = async (request, response) => {
    const { id_cliente } = request.params;
    var { senha, confirmasenha } = request.body;

    if (senha === confirmasenha) {
        try {
            //Building Password
            buildedPassword = await Password.newPassword(senha);
            senha = buildedPassword;

            const conta = await Conta.create({
                cliente_id: id_cliente,
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
    changePassword
}
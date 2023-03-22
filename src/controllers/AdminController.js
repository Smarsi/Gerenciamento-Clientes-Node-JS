const Admin = require('../models/Admin');
const Conta = require('../models/Account');

//Imports controllers dos relacionamentos
const AuthController = require('../controllers/AuthController');

//Imports modulo de autenticação e permissões
const Password = require('../utils/Passwords');
const Token = require('../utils/Token');
const { where } = require('sequelize');

const register = async (request, response) => {
    var { nome, email, senha, confirmasenha } = request.body;

    if (senha === confirmasenha) {
        try {
            const newAdmin = await Admin.create({ nome, email });
            console.log("Aqui id newAdmin");
            console.log(newAdmin);
            if (newAdmin) {
                request.params = { id_admin: newAdmin.id };
                newPassword = await Password.newPassword(senha);
                senha = newPassword;

                conta = await AuthController.register(request, response);
                if (conta != "Erro") {
                    return response.status(200).json({ newAdmin, id_conta: conta });
                }
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json({ mensagem: "Erro interno. Tente novamente mais tarde." });
        }
    } else {
        return response.status(400).json({ mensagem: "A senha e confirmação de senha não conferem." });
    }
};

const list = async (request, response) => {
    try {
        const Admins = await Admin.findAll({ attributes: ['id', 'nome', 'email'] });
        return response.status(200).json(Admins);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ mensagem: "Erro interno. Tente novamente mais tarde." });
    }
};

const update = async (request, response) => {
    const { id_admin } = request.params;
    const { nome, email } = request.body;

    if (id_admin) {
        try {
            const update_admin = await Admin.update({ nome, email }, { where: { id: id_admin } });
            return response.status(200).json({ mensagem: `Admin ${id_admin} atualizado com sucesso.` });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ mensagem: `Erro interno. Tente novamente mais tarde.` });
        }
    } else {
        return response.status(400).json({ mansagem: "ERRO - Um id válido deve ser passado no Path" });
    }

};

const givePermissions = async (request, response) => {
    const id_admin = request.requested_by;
    const { permissions } = request.body;

    return response.status(200).json({ mensagem: "Endpoint funcionando corretamente" });
};

const login = async (request, response) => {
    const { email, senha } = request.body;
    try {
        const findByEmail = await Admin.findOne({
            where: {
                email: email
            },
            include: { association: 'conta' }
        });
        if (findByEmail) {
            const verifyPassword = await Password.checkPassword(senha, findByEmail.conta.senha);
            if (verifyPassword == true) {
                const newToken = await Token.generateAdminToken(findByEmail.id);
                return response.status(200).json({ token: newToken });
            }
        }
    } catch (error) {
        console.log(error);
        return response.status(401).json({ mensagem: "Erro no login" });
    }
};

module.exports = {
    register,
    list,
    update,
    login,
    givePermissions,
}
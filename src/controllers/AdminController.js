const { Op } = require("sequelize");
const Error = require('../errors');

const Admin = require('../models/Admin');

//Imports controllers dos relacionamentos
const AuthController = require('../controllers/AuthController');

//Imports modulo de autenticação e permissões
const Password = require('../utils/Passwords');
const Token = require('../utils/Token');

const register = async (request, response, next) => {
    var { nome, email, senha } = request.body;

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
        if (newAdmin) {
            await Admin.destroy({ where: { id: newAdmin.id } });
        }
        console.log(error);
        next(new Error.InternalError("Erro interno. Tente novamente mais tarde."));
        return
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

const update = async (request, response, next) => {
    const { id_admin } = request.params;
    const { nome, email } = request.body;

    try {
        const update_admin = await Admin.update({ nome, email }, { where: { id: id_admin } });
        return response.status(200).json({ mensagem: `Admin ${id_admin} atualizado com sucesso.` });
    } catch (error) {
        console.log(error);
        next(new Error.InternalError("Erro interno. Tente novamente mais tarde."));
        return
    }
};

const getPermissionsByAdminId = async (request, response) => {
    const { id_admin } = request.params;
    try {
        const admin = await Admin.findByPk(id_admin, {
            attributes: ['id', 'nome'],
            include: {
                association: 'permissions',
                attributes: ['id', 'titulo'],
                through: { attributes: [] }
            }
        });
        return response.status(200).json(admin);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ mensagem: "Erro interno. Tente novamente mais tarde." });
    }
};

const givePermissions = async (request, response, next) => {
    const { id_admin } = request.params;
    const { permissions } = request;
    try {
        const admin = await Admin.findByPk(id_admin);
        await admin.addPermissions(permissions);

        // recarrega a instância do objeto admin
        const updatedAdmin = await Admin.findByPk(id_admin, {
            attributes: ['id', 'nome'],
            include: {
                association: 'permissions',
                attributes: ['id', 'titulo'],
                through: { attributes: [] }
            }
        });
        return response.status(200).json(updatedAdmin);
    } catch (error) {
        console.log(error);
        next(new Error.InternalError("Erro interno. Tente novamente mais tarde."));
        return
    }
};

const removePermissions = async (request, response, next) => {
    const { id_admin } = request.params;
    const { permissions } = request;
    try {
        const admin = await Admin.findByPk(id_admin);
        await admin.removePermissions(permissions);

        // recarrega a instância do objeto admin
        const updatedAdmin = await Admin.findByPk(id_admin, {
            attributes: ['id', 'nome'],
            include: {
                association: 'permissions',
                attributes: ['id', 'titulo'],
                through: { attributes: [] }
            }
        });

        return response.status(200).json(updatedAdmin);
    } catch (error) {
        console.log(error);
        next(new Error.InternalError("Erro interno. Tente novamente mais tade. "));
        return
    }
};

const login = async (request, response, next) => {
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
        }else{
            next(new Error.NotFoundError("Erro - Conta não encontrada (verifique o e-mail)"));
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
    getPermissionsByAdminId,
    givePermissions,
    removePermissions,
}
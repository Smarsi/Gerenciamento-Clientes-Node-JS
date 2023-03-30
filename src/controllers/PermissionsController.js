const {Op} = require('sequelize');
const Error = require('../errors');

const Permissions = require('../models/Permissions');

const create = async (request, response) => {
    const { titulo, descricao } = request.body;

    try {
        const new_permission = await Permissions.create({ titulo, descricao });

        return response.status(200).json(new_permission);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ mensagem: "Erro interno. Tente novamente mais tarde." });
    }
};

const getAll = async (request, reponse, next) => {
    try {
        const findAll = await Permissions.findAll({attributes: ["id","titulo", "descricao"]});
        return reponse.status(200).json(findAll);
    } catch (error) {
        console.log(error);
        next(new Error.InternalError("Erro interno. Tente novamente mais tarde."));
        return
    }
};

const deleteById = async (request, response, next) => {
    const { id_permission } = request.params;

    try {
        const del = await Permissions.destroy({ where: {id: id_permission}, force: true });
        return response.status(200).json();
    } catch (error) {
        console.log(error);
        next(new Error.InternalError("Erro interno. Tente novamente mais tarde"));
        return
    }
};

module.exports = {
    create,
    getAll,
    deleteById,
}
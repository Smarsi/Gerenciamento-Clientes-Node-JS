const Permissions = require('../models/Permissions');

const {Op} = require('sequelize');

const create = async (request, response) => {
    const { nome, descricao } = request.body;

    //Decrição não precia ser unique no bd.
    const checkIfAlreadyRegistred = await Permissions.findAll({
        where: {
            nome: this.nome
        }
    });

    if(checkIfAlreadyRegistred.length > 0){
        return response.status(400).json({ mensagem: "Já existe uma permissão com este nome" });
    }
};

module.exports = {
    create,
}
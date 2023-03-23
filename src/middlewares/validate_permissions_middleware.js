const Permissions = require('../models/Permissions');

const validateFieldsAndValuesOnPost = async (request, response, next) => {
    const {body} = request;

    var keys = Object.keys(body);
    var dictPermissionFields = {
        "titulo": "",
        "descricao": ""
    };
    var dictPermissionKeys = Object.keys(dictPermissionFields);


    for(var i=0; i < dictPermissionKeys.length; i++){
        if(keys.includes(dictPermissionKeys[i]) == false){ //Se não encontrar algum campo que deveria ser passado
            return response.status(400).json({ mensagem: `O campo '${dictPermissionKeys[i]}' deve ser passado.` });
        }
    }

    for(i in body){
        if(body[i] == ""){
            return response.status(400).json({ mensagem: `O campo ${i} não pode ser vazio!` })
        }
    }

    next(); //Se não cair em nenhum dos returns de erro continuar para a próxima tarefa.
};

const checkIfAlreadyRegistred = async (request, response, next) => {
    const { titulo } = request.body;

    const find_by_titulo = await Permissions.findAll({
        where: {
            titulo: titulo
        }
    });

    if(find_by_titulo.length > 0){
        return response.status(400).json({ mensagem: `Já existe uma permissão com este titulo (${titulo}) cadastrada no sistema.` });
    }else{
        next();
    }
};

const checkIfIdExists = async (request, response, next) => {
    var { id_permission } = request.params;
    const permission = await Permissions.findByPk(id_permission);

    if (permission) {
        next();
    } else {
        return response.status(404).json({ mensagem: `ERRO - Não existe uma permission com este ID (${id_permission}) cadastrada no sistema.` })
    }
};

module.exports = {
    validateFieldsAndValuesOnPost,
    checkIfAlreadyRegistred,
    checkIfIdExists,
}
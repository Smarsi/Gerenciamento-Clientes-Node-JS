const Permissions = require('../models/Permissions');

const err = require('../errors');

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
            next(new err.BadRequestError(`O campo '${dictPermissionKeys[i]}' deve ser passado.`));
            return
        }
    }

    for(i in body){
        if(body[i] == ""){
            next(new err.BadRequestError(`O campo ${i} não pode ser vazio!`));
            return
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
        next(new err.ConflictError(`Já existe uma permissão (${titulo}) cadastrada no sistema.`));
        return
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
        next(new err.NotFoundError(`ERRO - ID (${id_permission}) não encontrado no sistema.`));
        return
    }
};

module.exports = {
    validateFieldsAndValuesOnPost,
    checkIfAlreadyRegistred,
    checkIfIdExists,
}
const { Op } = require("sequelize");

const err = require('../errors');

const Permissions = require('../models/Permissions');

const validateFieldsAndValuesOnAdminPermissions  = async (request, response, next) =>{
    const {body} = request;

    var keys = Object.keys(body);
    var dictUserFields = {
        "permissions": ""
    };
    var dictUserKeys = Object.keys(dictUserFields);


    for(var i=0; i < dictUserKeys.length; i++){
        if(keys.includes(dictUserKeys[i]) == false){ //Se não encontrar algum campo que deveria ser passado
            next(new err.BadRequestError(`O campo '${dictUserKeys[i]}' deve ser passado.`));
            return 
        }
    }

    for(i in body){
        if(body[i] == ""){
            next(new err.BadRequestError(`O campo ${i} não pode ser vazio!`));
            return
        }
        if(typeof(body[i]) != 'object') {
            next(new err.BadRequestError(`O campo ${i} deve ser um array com ids.`));
            return
        }
    }

    if(body.senha !== body.confirmasenha){
        next(new err.UnauthorizedError("A senha e confirmação de senha não conferem."));
        return
    }


    next(); //Se não cair em nenhum dos returns de erro continuar para a próxima tarefa.
};

const checkPermissionsAndSetupRequest = async (request, response, next) =>{
    const { permissions } = request.body;

    var findPermissions = await Permissions.findAll({
        attributes: ['id'],
        where: {
            id: {
                [Op.or]: permissions
            }
        }
    });
    for (i in findPermissions) {
        findPermissions[i] = findPermissions[i].id; //Transformando em lista
    }

    if (permissions.length > findPermissions.length) {
        for (var i = 0; i < permissions.length; i++) {
            if (!findPermissions.includes(permissions[i])) {
                next(new err.NotFoundError(`ERRO - ID (${id_permission}) não encontrado no sistema.`));
                return
            }
        }
    }else{
        request.permissions = findPermissions; //Deixando permissions acessíveis diretamente na request.
        next();
    }
};

module.exports = {
    validateFieldsAndValuesOnAdminPermissions,
    checkPermissionsAndSetupRequest,
}
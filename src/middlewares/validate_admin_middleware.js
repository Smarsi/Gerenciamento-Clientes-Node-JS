const { Op } = require("sequelize");

const Permissions = require('../models/Permissions');

const validateFieldsAndValuesOnGivePermissions  = async (request, response, next) =>{
    const {body} = request;

    //============First Check (User fields) ============

    var keys = Object.keys(body);
    var dictUserFields = {
        "permissions": ""
    };
    var dictUserKeys = Object.keys(dictUserFields);


    for(var i=0; i < dictUserKeys.length; i++){
        if(keys.includes(dictUserKeys[i]) == false){ //Se não encontrar algum campo que deveria ser passado
            return response.status(400).json({ mensagem: `O campo '${dictUserKeys[i]}' deve ser passado.` });
        }
    }

    for(i in body){
        console.log('AQUIIIIIII IMPORTANTE');
        console.log(typeof(body[i]));
        if(body[i] == ""){
            return response.status(400).json({ mensagem: `O campo ${i} não pode ser vazio!` });
        }
        if(typeof(body[i]) != 'object') {
            return response.status(400).json({ mensagem: `O campo ${i} deve ser um array com ids.` });
        }
    }

    if(body.senha !== body.confirmasenha){
        return response.status(401).json({ mensagem: "A senha e confirmação de senha não conferem." });
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
                return response.status(400).json({ mensagem: `Permission com id (${permissions[i]}) inválida.` });
            }
        }
    }else{
        request.permissions = findPermissions; //Deixando permissions acessíveis diretamente na request.
        next();
    }
};

module.exports = {
    validateFieldsAndValuesOnGivePermissions,
    checkPermissionsAndSetupRequest,
}
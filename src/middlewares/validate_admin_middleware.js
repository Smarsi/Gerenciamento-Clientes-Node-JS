const { Op } = require("sequelize");

const Error = require('../errors');

const Permissions = require('../models/Permissions');
const Admin = require('../models/Admin');

const validateFieldsAndValuesOnPost = async (request, response, next) => {
    const {body} = request;

    //============First Check (Admin fields) ============

    var keys = Object.keys(body);
    var dictAdminFields = {
        "nome": "",
        "email": "",
        "senha": "",
        "confirmasenha": ""
    };
    var dictAdminKeys = Object.keys(dictAdminFields);


    for(var i=0; i < dictAdminKeys.length; i++){
        if(keys.includes(dictAdminKeys[i]) == false){ //Se não encontrar algum campo que deveria ser passado
            next(new Error.BadRequestError(`O campo '${dictAdminKeys[i]}' deve ser passado.`));
            return
        }
    } 

    //============ Second Check (Admin values) ============
    for(i in body){
        if(body[i] == ""){
            next(new Error.BadRequestError(`O campo ${i} não pode ser vazio!`));
            return
        }
    }

    if(body.senha !== body.confirmasenha){
        next(new Error.ForbbidenError(`A senha e confirmação de senha não conferem.`));
        return
    }

    next();
}

const validateFieldsAndValuesOnPut = async (request, response, next) => {
    const {body} = request;

    //============First Check (Admin fields) ============

    var keys = Object.keys(body);
    var dictAdminFields = {
        "nome": "",
        "email": ""
    };
    var dictAdminKeys = Object.keys(dictAdminFields);


    for(var i=0; i < dictAdminKeys.length; i++){
        if(keys.includes(dictAdminKeys[i]) == false){ //Se não encontrar algum campo que deveria ser passado
            next(new Error.BadRequestError(`O campo '${dictAdminKeys[i]}' deve ser passado.`));
            return
        }
    } 

    //============ Second Check (Admin values) ============
    for(i in body){
        if(body[i] == ""){
            next(new Error.BadRequestError(`O campo ${i} não pode ser vazio!`));
            return
        }
    }
    next();
}

const validateFieldsAndValuesOnGiveAdminPermissions  = async (request, response, next) => {
    const {body} = request;

    var keys = Object.keys(body);
    var dictAdminFields = {
        "permissions": ""
    };
    var dictAdminKeys = Object.keys(dictAdminFields);


    for(var i=0; i < dictAdminKeys.length; i++){
        if(keys.includes(dictAdminKeys[i]) == false){ //Se não encontrar algum campo que deveria ser passado
            next(new Error.BadRequestError(`O campo '${dictAdminKeys[i]}' deve ser passado.`));
            return 
        }
    }

    for(i in body){
        if(body[i] == ""){
            next(new Error.BadRequestError(`O campo ${i} não pode ser vazio!`));
            return
        }
        if(typeof(body[i]) != 'object') {
            next(new Error.BadRequestError(`O campo ${i} deve ser um array com ids.`));
            return
        }
    }

    next(); //Se não cair em nenhum dos returns de erro continuar para a próxima tarefa.
};

const findPermissionsAndSetupRequest = async (request, response, next) => {
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
                next(new Error.NotFoundError(`ERRO - Permission de Id (${id_permission}) não encontrada no sistema.`));
                return
            }
        }
    }else{
        request.permissions = findPermissions; //Deixando permissions acessíveis diretamente na request.
        next();
    }
};

const checkIfIdExists = async (request, response, next) => {
    const { id_admin } = request.params;

    const findAdmin = Admin.findByPk(id_admin);
    if(findAdmin){
        next();
    }else{
        next(new Error.NotFoundError(`Erro - Não existe um admin com id ${id_admin}.`));
        return
    }
};

const checkIfAlreadyRegistred = async (request, response, next) =>{
    const { id_admin } = request.params;
    const { email } = request.body;

    const findAdmin = Admin.findOne({
        where:{
            email: email.toString()
        }
    });

    if(findAdmin && findAdmin.id != id_admin){
        return next(new Error.ConflictError("Erro - Este email já está registrado para outra conta de administrador."));
    }else{
        next();
    }
};

module.exports = {
    validateFieldsAndValuesOnPost,
    validateFieldsAndValuesOnPut,
    validateFieldsAndValuesOnGiveAdminPermissions,
    findPermissionsAndSetupRequest,
    checkIfIdExists,
    checkIfAlreadyRegistred,
}
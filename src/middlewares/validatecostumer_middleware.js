const { Op } = require("sequelize");
const err = require('../errors');

const Cliente = require('../models/Customer');

const validateFieldsAndValuesOnPost = async(request, response, next) => {
    const {body} = request;

    //============First Check (User fields) ============

    var keys = Object.keys(body);
    var dictUserFields = {
        "email": "",
        "senha": "",
        "confirmasenha": "",
        "nome": "",
        "cpf": "",
        "endereco": ""
    };
    var dictUserKeys = Object.keys(dictUserFields);


    for(var i=0; i < dictUserKeys.length; i++){
        if(keys.includes(dictUserKeys[i]) == false){ //Se não encontrar algum campo que deveria ser passado
            next(new err.BadRequestError(`O campo '${dictUserKeys[i]}' deve ser passado.`));
            return
        }
    }

    //============ Second Check (Address fields) ============
    if(body.endereco){
        var addressKeys = Object.keys(body.endereco);
        var dictAddressFields = {
            "titulo_endereco": "",
            "cep": "",
            "logradouro": "",
            "numero": "",
            "complemento": "",
            "bairro": "",
            "cidade": "",
            "estado": ""
        }
        var dictAddressKeys = Object.keys(dictAddressFields);

        for(var y=0; y < dictAddressKeys.length; y++ ){
            if(addressKeys.includes(dictAddressKeys[y]) == false){ //Se não encontrar algum campo que deveria ser passado
                next(new err.BadRequestError(`O campo '${dictAddressFields[y]}' do endereco deve ser passado.`));                
                return
            }
        }
    }else{
        next(new err.BadRequestError(`O valor do campo 'endereco' deve ser passado.`));
    }

    //============ Third Check (Customer and Address values) ============
    for(i in body){
        if(body[i] == ""){
            next(new err.BadRequestError(`O campo ${i} não pode ser vazio!`));
            return
        }

        if(typeof(body[i]) == 'object'){
            for(y in body[i]){
                if(body[i][y] == "" && y != "complemento"){
                    next(new err.BadRequestError(`O campo ${y} não pode ser vazio!`));
                    return
                }
            }            
        }
    }

    if(body.senha !== body.confirmasenha){
        next(new err.UnauthorizedError(`A senha e confirmação de senha não conferem.`));
        return
    }


    next(); //Se não cair em nenhum dos returns de erro continuar para a próxima tarefa.
};

const validateFieldsAndValuesOnPut = async (request, response, next) => {
    const {body} = request;

    //============First Check (User fields) ============

    var keys = Object.keys(body);
    var dictUserFields = {
        "nome": "",
        "email": ""                
    };
    var dictUserKeys = Object.keys(dictUserFields);


    for(var i=0; i < dictUserKeys.length; i++){
        if(keys.includes(dictUserKeys[i]) == false){ //Se não encontrar algum campo que deveria ser passado
            next(new err.ConflictError(`O campo '${dictUserKeys[i]}' deve ser passado.`));
            return
        }
    }    

    //============ Third Check (Fields values) ============
    for(i in body){
        if(body[i] == ""){
            next(new err.ConflictError(`O valor do campo ${i} não pode ser vazio!`));
            return
        }        
    }

    next(); //Se não cair em nenhum dos returns de erro continuar para a próxima tarefa.
};

const checkIfIdExists = async (request, response, next) => { //Verifica se o ID existe no BD
    var { id_cliente } = request.params;
    const cliente = await Cliente.findByPk(id_cliente);

    if (cliente) {
        next();
    } else {
        next(new err.NotFoundError(`ERRO - ID (${id_cliente}) não encontrado no sistema.`))
        return
    }

};

const checkEmailOnUpdate = async (request, response, next) => { //Verifica se já existe um cliente com o Email passado
    var { id_cliente } = request.params;
    var { email } = request.body;

    if (email) {
        const cliente = await Cliente.findAll({
            where: {
                email: email
            }
        });

        if (cliente.length > 0) {
            if (cliente[0].id != id_cliente) {    
                next(new err.ConflictError("Erro - Este email já está registrado no sistema."));      
                return
            } else { //Requester é o dono do e-mail
                next();
            }
        } else {
            next();
        }
    };     
};

const checkIfAlreadyRegistred = async(request, response, next) => {
    const {cpf, email} = request.body;
    
    const clienteJaRegistrado = await Cliente.findAll({
        where: {
            [Op.or]: [
                { cpf: cpf },
                { email: email }
            ]
        }
    });

    if (clienteJaRegistrado.length > 0) {
        if (clienteJaRegistrado[0].cpf == cpf) {
            next(new err.ConflictError("Erro - Este CPF já está registrado no sistema."));
            return
        }
        if ((clienteJaRegistrado[0].email).toLowerCase() == email.toLowerCase()) {
            next(new err.ConflictError("Erro - Este email já está registrado no sistema."));
        }
    }else{
        next();
    }
};

module.exports = {
    validateFieldsAndValuesOnPost,
    validateFieldsAndValuesOnPut,
    checkIfIdExists,
    checkEmailOnUpdate,
    checkIfAlreadyRegistred,
};
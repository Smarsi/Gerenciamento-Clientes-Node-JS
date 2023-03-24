const Endereco = require('../models/Address');

const err = require('../errors');

const validateFieldsAndValuesOnPost = async (request, response, next) => {
    const {body} = request;

    if(body){
        var addressKeys = Object.keys(body);
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
                next(new err.BadRequestError(`O campo '${dictAddressKeys[y]}' do endereco deve ser passado.`));
                return
            }
        }
    }else{
        next(new err.ConflictError("ERRO - Um 'body' deve ser passado para esta requisição."));
        return
    }

    // ------- Validate Values -------
    for(i in body){
        if(body[i] == "" && i != "complemento"){
            next(new err.BadRequestError(`O campo ${i} não pode ser vazio!`));
            return
        }           
    }

    next(); //Se não cair em nenhum dos returns de erro continuar para a próxima tarefa.
};

const validateFieldsAndValuesOnPut = async (request, response, next) => {
    const {body} = request;

    if(body){
        var addressKeys = Object.keys(body);
        var dictAddressFields = {
            "titulo_endereco": "",
            "numero": "",
            "complemento": ""
        }
        var dictAddressKeys = Object.keys(dictAddressFields);

        for(var y=0; y < dictAddressKeys.length; y++ ){
            if(addressKeys.includes(dictAddressKeys[y]) == false){ //Se não encontrar algum campo que deveria ser passado
                next(new err.BadRequestError(`O campo '${dictAddressKeys[y]}' do endereco deve ser passado.`));
            }
        }
    }else{
        next(new err.ConflictError("ERRO - Um 'body' deve ser passado para esta requisição."));
        return
    }

    // ------- Validate Values -------
    for(i in body){
        if(body[i] == "" && i != "complemento"){
            next(new err.BadRequestError(`O campo ${i} não pode ser vazio!`));
            return
        }           
    }

    next(); //Se não cair em nenhum dos returns de erro continuar para a próxima tarefa.
};

const checkIfIdExists = async (request, response, next) => {
    const { id_endereco } = request.params;
    const endereco = await Endereco.findByPk(id_endereco);

    if (!endereco) {
        next(new err.NotFoundError(`Erro - ID (${id_endereco}) não encontrado no sistema.`));
    } else {
        next();
    }
};

module.exports = {
    validateFieldsAndValuesOnPost,
    validateFieldsAndValuesOnPut,
    checkIfIdExists
}
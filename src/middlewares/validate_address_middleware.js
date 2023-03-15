const Endereco = require('../models/Address');

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
                return response.status(400).json({ mensagem: `O campo '${dictAddressKeys[y]}' do endereco deve ser passado.` })
            }
        }
    }else{
        return response.status(400).json({ mensagem: "ERRO - Um 'body' deve ser passado para esta requisição." })
    }

    // ------- Validate Values -------
    for(i in body){
        if(body[i] == "" && i != "complemento"){
            return response.status(400).json({ mensagem: `O campo ${i} não pode ser vazio!` })
        }           
    }

    next(); //Se não cair em nenhum dos returns de erro continuar para a próxima tarefa.
};

const validateFieldsAndValuesOnPut = async (request, response, next) => {

};

const checkIfIdExists = async (request, response, next) => {
    const { id_endereco } = request.params;
    const endereco = await Endereco.findByPk(id_endereco);

    if (!endereco) {
        return response.status(404).json({ mensagem: `ERRO - Não existe um endereço com o id passado (${id_endereco})` });
    } else {
        next();
    }
};

module.exports = {
    validateFieldsAndValuesOnPost,
    validateFieldsAndValuesOnPut,
    checkIfIdExists
}
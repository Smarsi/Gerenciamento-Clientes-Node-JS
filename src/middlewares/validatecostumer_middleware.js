const validateFields = async(request, response, next) => {
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
            return response.status(404).json({ mensagem: `O campo '${dictUserKeys[i]}' deve ser passado.` });
        }
    }

    //============ Second Check (Address fields) ============
    if(body.endereco){
        var addressKeys = Object.keys(body.endereco);
        var dictAddressFields = {
            "titulo": "",
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
                return response.status(404).json({ mensagem: `O campo '${dictAddressKeys[y]}' do endereco deve ser passado.` })
            }
        }
    }else{
        return response.status(404).json({ mensagem: "O valor do campo 'endereco' deve ser passado." })
    }


    next(); //Se não cair em nenhum dos returns de erro continuar para a próxima tarefa.
};

const validateValues = async(request, response, next) => {
    var {body} = request;

    for(i in body){
        if(body[i] == ""){
            return response.status(404).json({ mensagem: `O campo ${i} não pode ser vazio!` })
        }

        if(typeof(body[i]) == 'object'){
            for(y in body[i]){
                if(body[i][y] == "" && y != "complemento"){
                    return response.status(404).json({ mensagem: `O campo ${y} não pode ser vazio!` })
                }
            }            
        }
    }
    

    next();
};

module.exports = {
    validateFields,
    validateValues
};
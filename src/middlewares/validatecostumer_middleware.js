const { Op } = require("sequelize");

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
            return response.status(400).json({ mensagem: `O campo '${dictUserKeys[i]}' deve ser passado.` });
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
                return response.status(400).json({ mensagem: `O campo '${dictAddressKeys[y]}' do endereco deve ser passado.` })
            }
        }
    }else{
        return response.status(400).json({ mensagem: "O valor do campo 'endereco' deve ser passado." })
    }

    //============ Third Check (Customer and Address values) ============
    for(i in body){
        if(body[i] == ""){
            return response.status(400).json({ mensagem: `O campo ${i} não pode ser vazio!` })
        }

        if(typeof(body[i]) == 'object'){
            for(y in body[i]){
                if(body[i][y] == "" && y != "complemento"){
                    return response.status(400).json({ mensagem: `O campo ${y} não pode ser vazio!` })
                }
            }            
        }
    }

    if(body.senha !== body.confirmasenha){
        return response.status(401).json({ mensagem: "A senha e confirmação de senha não conferem." });
    }


    next(); //Se não cair em nenhum dos returns de erro continuar para a próxima tarefa.
};

const checkIfIdExists = async (request, response, next) => { //Verifica se o ID existe no BD
    var { id_cliente } = request.params;
    const cliente = await Cliente.findByPk(id_cliente);

    if (cliente) {
        next();
    } else {
        return response.status(404).json({ mensagem: `ERRO - Não existe um cliente com este ID (${id_cliente}) cadastrado no sistema.` })
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
                return response.status(400).json({ mensagem: "ERRO - Este email já registrado por outro usuário no sistema." });
            } else {
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
            return response.status(400).json({ mensagem: "ERRO - CPF já registrado" });
        }
        if (clienteJaRegistrado[0].email == email) {
            return response.status(400).json({ mensagem: "ERRO - Email já registrado" });
        }
    }else{
        next();
    }
};

module.exports = {
    validateFieldsAndValuesOnPost,
    checkIfIdExists,
    checkEmailOnUpdate,
    checkIfAlreadyRegistred,
};
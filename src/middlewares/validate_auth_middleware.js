const Error = require('../errors');

const Conta = require('../models/Account');
const Cliente = require('../models/Customer');

const validateFieldsAndValuesOnLogin = async (request, response, next) => {
    const { body } = request;
    var keys = Object.keys(body);
    var dictUserFields = {
        "email": "",
        "senha": ""
    };
    var dictUserKeys = Object.keys(dictUserFields);
    for (var i = 0; i < dictUserKeys.length; i++) {
        if (keys.includes(dictUserKeys[i]) == false) { //Se não encontrar algum campo que deveria ser passado
            next(new Error.BadRequestError(`O campo '${dictUserKeys[i]}' deve ser passado.`));
            return
        }
    }
    for (i in body) {
        if (body[i] == "") {
            next(new Error.BadRequestError(`O campo ${i} não pode ser vazio!`));
            return
        }
    }
    next(); //Se não cair em nenhum dos returns de erro continuar para a próxima tarefa.
};

const checkEmailOnLogin = async (request, response, next) => {
    const { email } = request.body;

    const conta_cliente = await Cliente.findOne({
        where: {
            email: email
        },
        include: {
            association: 'conta'
    }});
    if(conta_cliente){
        request.conta_cliente = conta_cliente;
        next();
    }else{
        next(new Error.NotFoundError("ERRO - Não existe uma conta com o e-mail informado."));
        return
    }
};

module.exports = {
    validateFieldsAndValuesOnLogin,
    checkEmailOnLogin,
}
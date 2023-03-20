//Imports
const Password = require('../utils/Passwords');
const Token = require('../utils/Token');

const Conta = require('../models/Account');
const Cliente = require('../models/Customer');

const teste = async (request, response) => {
    const authHeader = request.headers['authorization'];
    const token =  authHeader && authHeader.split(" ")[1]; //Pegando apenas o token do header
    const checkToken = await Token.checkToken(token);
    if(checkToken.status == true){
        return response.status(200).json({mensagem:"token valido"});
    }else{
        return response.status(400).json({mensagem:"token invalido"});
    }
}

const login = async (request, response) => {
    const { email, senha } = request.body;

    //Check if User exists
    const cliente = await Cliente.findOne({ email: email });

    if (cliente) {
        const conta = await Conta.findOne({ cliente_id: cliente.id });
        if (conta) {
            registredPassword = conta.senha;
            const checkPassword = await Password.checkPassword(senha, registredPassword, cliente._id);
            if(checkPassword){
                const token = await Token.generateToken(cliente.id);
                if(token){
                    return response.status(200).json({ token });
                }
            }
        }else{
            return response.status(404).json({ mensagem: "ERRO - Não existe conta com o e-mail informado" });
        }
    } else {
        return response.status(404).json({ mensagem: "ERRO - Não existe conta com o e-mail informado" });
    }
}

const changePassword = async (request, response) => {
    return response.status(200).json({ mensagem: "Endpoint funcionando corretamente" });
}

const register = async (request, response) => {
    const { id_cliente } = request.params;
    var { senha, confirmasenha } = request.body;

    if (senha === confirmasenha) {
        try {
            //Building Password
            buildedPassword = await Password.newPassword(senha);
            senha = buildedPassword;

            const conta = await Conta.create({
                cliente_id: id_cliente,
                senha
            });

            return conta.id;
        } catch (error) {
            console.log(error);
            return "Erro";
        }

    }
}

module.exports = {
    login,
    register,
    changePassword,
    teste
}
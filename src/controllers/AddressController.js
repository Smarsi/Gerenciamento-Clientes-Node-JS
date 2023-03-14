const Endereco = require("../models/Address");
const Cliente = require("../models/Customer");

const get = async(request, response) =>{
    const { cliente_id } = request.params;

    const cliente = await Cliente.findByPk(cliente_id, {
        include: { association: 'enderecos' }
    });

    if(cliente.enderecos !== null && cliente.enderecos !== ""){
        return response.status(200).json(cliente.enderecos);
    }else{
        return response.status(400).json({ mensagem: "O cliente não contém um endereço cadastrado" });
    }    
}

const create = async(request, response) =>{
    const { cliente_id } = request.params;
    const { titulo_endereco, cep, logradouro, numero, complemento, bairro, cidade, estado } = request.body.endereco;
    const cliente = await Cliente.findByPk(cliente_id);

    if(!cliente){
        return response.status(404).json({mensagem: "ERRO - Usuário não encontrado"});       
    }
    const endereco = await Endereco.create({
        titulo_endereco,
        cep, 
        logradouro, 
        numero, 
        complemento, 
        bairro, 
        cidade, 
        estado,
        cliente_id,
    });

    return endereco;
}

module.exports = {
    get,
    create
};
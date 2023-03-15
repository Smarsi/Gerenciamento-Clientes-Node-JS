//Imports


const login = async (request, response) =>{
    return response.status(200).json({mensagem: "Endpoint funcionando corretamente."});
}

const register = async (request, response) =>{
    return response.status(200).json({mensagem: "Endpoint funcionando corretamente."});
}

const changePassword = async (request, response) => {
    return response.status(200).json({mensagem: "Endpoint funcionando corretamente"});
}

module.exports = {
    login,
    register,
    changePassword,
}
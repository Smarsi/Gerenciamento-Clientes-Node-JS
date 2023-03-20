const jwt = require('jsonwebtoken');
require('dotenv').config();

async function generateToken(clienteId) {
    const secret = process.env.SECRET;
    const token = jwt.sign({
        id: clienteId
    },
    secret,
    );
    return token;
}

async function checkToken(token){ //recebe um token e verifica se é válido (retorna true ou false);
    const secret = process.env.SECRET;
    console.log(secret);
    try {
        jwt.verify(token, secret);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    generateToken,
    checkToken
}
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
    try {
        jwt.verify(token, secret);
        const decoder = jwt.decode(token);        
        return {status: true, customer: decoder.id};
    } catch (error) {
        return false;
    }
}

module.exports = {
    generateToken,
    checkToken
}
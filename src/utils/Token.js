const jwt = require('jsonwebtoken');
require('dotenv').config();

async function generateToken(clienteId) {
    const secret = process.env.SECRET;
    const token = jwt.sign({
        id: clienteId,
        admin: false
    },
    secret,
    );
    return token;
}

async function generateAdminToken(adminId) {
    const secret = process.env.SECRET;
    const token = jwt.sign({
        id: adminId,
        admin: true
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
        return {
            status: true,
            id: decoder.id,
            isAdmin: decoder.admin
        };
    } catch (error) {
        return { status: false };
    }
}

module.exports = {
    generateToken,
    generateAdminToken,
    checkToken
}
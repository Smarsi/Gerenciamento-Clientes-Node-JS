const bcrypt = require('bcrypt');

async function newPassword(passPhrase) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(passPhrase, salt);

    return passwordHash.toString();
}

async function checkPassword(requestPassword, userPassword, userId) { //Recebe a senha passada na request e a senha armazenada no banco de dados e retorna false ou token
    const verifyPassword = await bcrypt.compare(requestPassword, userPassword);
    if (verifyPassword) {
        return true;
    } else {
        return false;
    }

}

module.exports = {
    newPassword,
    checkPassword,
};
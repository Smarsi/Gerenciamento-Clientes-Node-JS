const bcrypt = require('bcrypt');

async function newPassword(passPhrase){
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(passPhrase, salt);

    return passwordHash.toString();
}

async function checkPassword(requestPassword, userPassword){
    const checkPassword = await bcrypt.compare(requestPassword, userPassword);
    if(checkPassword){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    newPassword,
    checkPassword,
};
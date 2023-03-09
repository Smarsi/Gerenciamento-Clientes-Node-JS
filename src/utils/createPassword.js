const bcrypt = require('bcrypt');

async function newPassword(passPhrase){
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(passPhrase, salt);

    return passwordHash.toString();
}

module.exports = {
    newPassword
};
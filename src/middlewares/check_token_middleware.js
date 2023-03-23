const Token = require('../utils/Token');

const Admin = require('../models/Admin');

const checkTokenAndSetupPermissions = async (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token =  authHeader && authHeader.split(" ")[1]; //Pegando apenas o token do header

    try {
        const checkProvidedToken = await Token.checkToken(token);
        if(checkProvidedToken.status == true){
            request.requested_by = checkProvidedToken.id; //Armazenando dono do token para verificar regras e níveis de acesso.
            request.isAdmin = checkProvidedToken.isAdmin;

            if(request.isAdmin == true){
                var find_admin_permissions = await Admin.findByPk(request.requested_by, {
                    include: {
                        association: 'permissions',
                        attributes: ['titulo'],
                        through: { attributes: [] }
                    }
                });
                var admin_permissions = [];
                for(i in find_admin_permissions.permissions){console.log(admin_permissions.push(find_admin_permissions.permissions[i].titulo)) }
                request.permissions = admin_permissions;
            }     
            next();
        }else{ 
            return response.status(401).json({mensagem: "Usuário não autenticado"});
        }
    } catch (error) {
        console.log(error);
        return response.status(401).json({mensagem: "Usuário não autenticado"});
    }
}

module.exports = {
    checkTokenAndSetupPermissions
}
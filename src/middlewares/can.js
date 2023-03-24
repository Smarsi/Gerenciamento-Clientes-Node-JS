const err = require('../errors');

const can = (needed_permissions) => {
    return (request, response, next) => {
        var user_permissions = request.permissions;
        if(!user_permissions){
            user_permissions = "";
        }

        //Validating permissions for admin.
        for (var i=0; i < needed_permissions.length; i++){
            if(!user_permissions.includes(needed_permissions[i])){
                var allPerm = false;
            }
        }
        if(allPerm != false){     
            next();
        }else{
            next(new err.UnauthorizedError("Não autorizado para realizar esta operação."));
            return
        }
    }
}

module.exports = {
    can,
};
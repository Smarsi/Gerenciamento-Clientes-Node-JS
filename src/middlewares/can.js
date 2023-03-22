const can = (needed_permissions) => {
    return (request, response, next) => {
        const user_permissions = request.permissions;

        //Validating permissions for admin.
        for (var i=0; i < needed_permissions.length; i++){
            if(!user_permissions.includes(needed_permissions[i])){
                var allPerm = false;
            }
        }

        if(allPerm != false){     
            next();
        }else{
            return response.status(401).json({ mensagem: "Sem permissão para realizar esta operação" });
        }
    }
}

module.exports = {
    can,
};
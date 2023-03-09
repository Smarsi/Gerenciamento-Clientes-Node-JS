const validateFields = async(request, response, next) => {
    var all_fields_ok = true;

    const {body} = request;
    var keys = Object.keys(body);

    var dictUserFields = {
        "email": "",
        "senha": "",
        "confirmasenha": "",
        "nome": "",
        "cpf": "",
        "endereco": ""
    };
    var dictKeys = Object.keys(dictUserFields);

    //First Check (User fields)
    if(body.endereco){
        var incorrectFields = 0;
        for(var i=0; i < dictKeys.length; i++){
            if(keys.includes(dictKeys[i]) == false){
                incorrectFields +=1;
            }
        }
    }else{
        return response.status(404).json({ mensagem: "O valor do campo 'endereco' deve ser passado." })
    }
    


    /*First Check (User fields)
    if(JSON.stringify(dictUserFields) === JSON.stringify(keys)){
        console.log("keys corretas em primeiro nivel")
    }else{
        console.log("keys incorretas");
    }*/
    
    if(all_fields_ok == true){
        next();
    }

};

module.exports = validateFields;
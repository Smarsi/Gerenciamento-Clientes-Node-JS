function _ExecuteCount(lista){
    //transformando valores da lista em int
    for(i in lista){
        lista[i] = parseInt(lista[i]);
    }
    do {
        var num = lista.length+1;
        var nova_lista = [];
        for(i in lista){
            nova_lista.push((lista[i] * num));
            num -= 1;
        }
        var soma = 0;
        for(var y=0; y < nova_lista.length; y++){
            soma+= nova_lista[y];
        }
        resto_divisao = soma % 11;
        if(resto_divisao < 2){
            lista.push((0).toString());
        } else if(resto_divisao >= 2){
            lista.push((11-resto_divisao));
        }
    } while (lista.length < 11);
    return lista;
}

const validateCPF = (request, response, next) => {
    const cpf = (request.body.cpf).replaceAll(".","").replaceAll("-","");
    var treated_cpf = cpf.split("");

    if(treated_cpf.length == 11){
        treated_cpf.splice(-2);
        const my_new_cpf = (_ExecuteCount(treated_cpf).join('')); 

        if(my_new_cpf != cpf){
            return response.status(422).json({ mensagem: "ERRO - CPF Inválido" });
        }
    } else{ 
        return response.status(422).json({ mensagem: "ERRO - CPF Inválido (Menos de 11 digitos)" });
    }

    next();
};

module.exports = {
    validateCPF
};
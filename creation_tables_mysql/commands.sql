CREATE DATABASE IF NOT EXISTS gerenciamentoclientes;

USE gerenciamentoclientes;

CREATE TABLE cliente (
	id int not null auto_increment primary key,
    email varchar(45) not null #unique,
    senha varchar(200) not null,
    nome varchar(45) not null,
    cpf varchar(11) not null #unique  
);
# CPF e Email estão com o campo unique comentado apenas para fins de desenvolvimento (processos iniciais de testes e validações);


CREATE TABLE endereco(
	id int not null auto_increment primary key,
    titulo_endereco varchar(45),
    cep varchar(8),
    logradouro varchar(45) not null,
    numero int not null,
    complemento varchar (45),
    bairro varchar(45),
    cidade varchar(45),
    estado varchar(2),
    cliente_id int
);

ALTER TABLE endereco ADD CONSTRAINT FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;
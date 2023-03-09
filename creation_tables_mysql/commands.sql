CREATE DATABASE IF NOT EXISTS gerenciamentoclientes;

USE gerenciamentoclientes;

CREATE TABLE cliente (
	id int not null auto_increment primary key,
    nome varchar(45) not null,
    cpf varchar(11) not null unique,
    profissao varchar(45)    
);
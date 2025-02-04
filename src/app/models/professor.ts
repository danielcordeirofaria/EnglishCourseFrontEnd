import { Endereco } from './endereco';

export class Professor {
  idProfessor?: any;
  nome: string;
  cpf: string;
  endereco: Endereco;
  email: string;
  login: string;
  password: string;
  whatsapp: string;

  constructor(
    nome: string,
    cpf: string,
    endereco: Endereco,
    email: string,
    login: string,
    password: string,
    whatsapp: string,
    idProfessor?: any
  ) {
    this.idProfessor = idProfessor;
    this.nome = nome;
    this.cpf = cpf;
    this.endereco = endereco;
    this.email = email;
    this.login = login;
    this.password = password;
    this.whatsapp = whatsapp;
  }
}

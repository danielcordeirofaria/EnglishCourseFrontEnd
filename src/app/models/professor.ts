import { Endereco } from './endereco';

export class Professor {
  idProfessor?: any;
  nomeProfessor: string;
  cpf: string;
  endereco: Endereco;
  email: string;
  login: string;
  password: string;
  whatsapp: string;

  constructor(
    nomeProfessor: string,
    cpf: string,
    endereco: Endereco,
    email: string,
    login: string,
    password: string,
    whatsapp: string,
    idProfessor?: any
  ) {
    this.idProfessor = idProfessor;
    this.nomeProfessor = nomeProfessor;
    this.cpf = cpf;
    this.endereco = endereco;
    this.email = email;
    this.login = login;
    this.password = password;
    this.whatsapp = whatsapp;
  }
}

import { Endereco } from "./endereco";


export class Responsavel {

    idResponsavel: any;
    nome: string;
    endereco: Endereco;
    dataDeNascimento: string;
    cpf: string;
    email: string;
    whatsapp: string;
    formacao: string;
    profissao: string;

  constructor(
    nome: string,
    endereco: Endereco,
    dataDeNascimento: string,
    cpf: string,
    email: string,
    whatsapp: string,
    formacao: string,
    profissao: string
  ) {
    this.nome = nome;
    this.endereco = endereco;
    this.dataDeNascimento = dataDeNascimento;
    this.cpf = cpf;
    this.email = email;
    this.whatsapp = whatsapp;
    this.formacao = formacao;
    this.profissao = profissao;
  }
}

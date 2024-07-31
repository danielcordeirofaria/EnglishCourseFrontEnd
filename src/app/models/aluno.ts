import { Endereco } from "./endereco";

export class Aluno {
  idAlunoMatricula!: any|string;
  nome: string;
  endereco: Endereco;
  dataDeNascimento: string;
  cpf: string;
  email: string;
  formacao: string;
  profissao: string;
  moduloFeito: string;
  nivel: string;
  idProfessor: number; 
  status: string;

  constructor(
    nome: string,
    endereco: Endereco,
    dataDeNascimento: string,
    cpf: string,
    email: string,
    formacao: string,
    profissao: string,
    moduloFeito: string,
    nivel: string,
    idProfessor: number,
    status: string
  ) {
    this.nome = nome;
    this.endereco = endereco;
    this.dataDeNascimento = dataDeNascimento;
    this.cpf = cpf;
    this.email = email;
    this.formacao = formacao;
    this.profissao = profissao;
    this.moduloFeito = moduloFeito;
    this.nivel = nivel;
    this.idProfessor = idProfessor;
    this.status = status;
  }
}

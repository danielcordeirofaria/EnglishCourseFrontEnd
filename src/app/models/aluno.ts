import { Endereco } from './endereco';

export class Aluno {
  idAlunoMatricula?: number; // torna o id opcional
  nome: string;
  endereco: Endereco;
  dataDeNascimento: string;
  cpf: string;
  email: string;
  formacao: string;
  profissao: string;
  moduloFeito: string;
  nivel: string;

  constructor(
    nome: string,
    endereco: Endereco,
    dataDeNascimento: string,
    cpf: string,
    email: string,
    formacao: string,
    profissao: string,
    moduloFeito: string,
    nivel: string
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
  }
}

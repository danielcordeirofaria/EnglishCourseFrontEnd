import { Endereco } from './endereco';
import { Turma } from './turma'; // Certifique-se de importar a classe correta

export class Aluno {
  idAlunoMatricula!: any | string;
  nome: string;
  endereco: Endereco;
  dataDeNascimento: string;
  cpf: string;
  email: string;
  formacao: string;
  profissao: string;
  moduloFeito: string;
  nivel: string;
  status: string;
  turma: Turma; // Use a classe Turma diretamente

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
    status: string,
    turma: Turma // Use a classe Turma diretamente
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
    this.status = status;
    this.turma = turma; // Atribua a turma corretamente
  }
}
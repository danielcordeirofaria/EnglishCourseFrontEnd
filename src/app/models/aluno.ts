import { Endereco } from './endereco';
import { Responsavel } from './responsavel';
import { Turma } from './turma'; // Certifique-se de importar a classe correta

export class Aluno {
  idAlunoMatricula!: any | string;
  nome: string;
  endereco: Endereco;
  dataDeNascimento: string;
  cpf: string;
  email: string;
  whatsapp: string;
  formacao: string;
  profissao: string;
  moduloFeito: string;
  nivel: string;
  status: string;
  turma: Turma; 
  responsavel: any | Responsavel;

  constructor(
    nome: string,
    endereco: Endereco,
    dataDeNascimento: string,
    cpf: string,
    email: string,
    whatsapp: string,
    formacao: string,
    profissao: string,
    moduloFeito: string,
    nivel: string,
    status: string,
    turma: Turma,
    responsavel?: Responsavel | null // Parâmetro opcional
  ) {
    this.nome = nome;
    this.endereco = endereco;
    this.dataDeNascimento = dataDeNascimento;
    this.cpf = cpf;
    this.email = email;
    this.whatsapp = whatsapp;
    this.formacao = formacao;
    this.profissao = profissao;
    this.moduloFeito = moduloFeito;
    this.nivel = nivel;
    this.status = status;
    this.turma = turma;
    this.responsavel = responsavel;
  }
}
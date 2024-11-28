import { Endereco } from './endereco';

interface AlunoData {
    nome: string;
    endereco: Endereco;
    dataDeNascimento: string;
    cpf: string;
    email: string;
    formacao: string;
    profissao: string;
    modulo: string;
    nivel: string;
}

export class Aluno {
    idAluno!: any | string;
    nome: string;
    endereco: Endereco;
    dataDeNascimento: string;
    cpf: string;
    email: string;
    formacao: string;
    profissao: string;
    modulo: string;
    nivel: string;

    constructor(data: AlunoData) {
        if (!data.nome) {
            throw new Error('O nome é obrigatório.');
        }
        // ... (outras validações)

        this.nome = data.nome;
        this.endereco = data.endereco;
        this.dataDeNascimento = data.dataDeNascimento;
        this.cpf = data.cpf;
        this.email = data.email;
        this.formacao = data.formacao;
        this.profissao = data.profissao;
        this.modulo = data.modulo;
        this.nivel = data.nivel;
    }
}
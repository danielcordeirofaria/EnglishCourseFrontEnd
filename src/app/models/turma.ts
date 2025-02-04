import { Professor } from './professor';

export class Turma {
  idTurma!: any | number;
  nomeTurma: string;
  professor: { idProfessor: number };

  constructor(nomeTurma: string, professor: Professor) {
    this.nomeTurma = nomeTurma;
    this.professor = { idProfessor: professor.idProfessor };
  }
}

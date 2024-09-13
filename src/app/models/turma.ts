import { Professor } from './professor';

export class Turma {
  idTurma: number;
  nomeTurma: string;
  professor: Professor;

  constructor(idTurma: number, nomeTurma: string, professor: Professor) {
    this.idTurma = idTurma;
    this.nomeTurma = nomeTurma;
    this.professor = professor;
  }
}
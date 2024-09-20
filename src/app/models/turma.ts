import { Professor } from './professor';

export class Turma {
  idTurma?: number;
  nomeTurma: string;
  professor: { idProfessor: number };

  constructor(idTurma: number, nomeTurma: string, professor: Professor) {
    this.idTurma = idTurma;
    this.nomeTurma = nomeTurma;
    this.professor = { idProfessor: professor.idProfessor };
  }
}

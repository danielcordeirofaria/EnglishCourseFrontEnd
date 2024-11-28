// turma.ts
import { Professor } from './professor';

export class Turma {
  idTurma?: number;
  nomeTurma: string;
  professor: Professor; // Armazene o objeto Professor completo

  constructor(idTurma: number, nomeTurma: string, professor: Professor) {
    this.idTurma = idTurma;
    this.nomeTurma = nomeTurma;
    this.professor = professor;
  }
}
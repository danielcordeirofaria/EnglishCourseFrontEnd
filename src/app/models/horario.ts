import { Turma } from './turma';

export class Horario {
  turma: { idTurma: number };  // Apenas o idTurma
  diaSemana: string;
  horarioInicio: string;  // Formato esperado: 'HH:mm'
  horarioFim: string;     // Formato esperado: 'HH:mm'

  constructor(
    idTurma: number,  // Aceita apenas o id da turma
    diaSemana: string,
    horarioInicio: string,
    horarioFim: string
  ) {
    this.turma = { idTurma };  // Apenas o id da turma é armazenado
    this.diaSemana = diaSemana;
    this.horarioInicio = horarioInicio;
    this.horarioFim = horarioFim;
  }
}

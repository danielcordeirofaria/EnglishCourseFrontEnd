import { Turma } from './turma';

export class Horario {
  turma: Turma;
  diaSemana: string;
  horarioInicio: string;  // Formato esperado: 'HH:mm'
  horarioFim: string;     // Formato esperado: 'HH:mm'

  constructor(
    turma: Turma,
    diaSemana: string,
    horarioInicio: string,
    horarioFim: string
  ) {
    this.turma = turma;
    this.diaSemana = diaSemana;
    this.horarioInicio = horarioInicio;
    this.horarioFim = horarioFim;
  }
}
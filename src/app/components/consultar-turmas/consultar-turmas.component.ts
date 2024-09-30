import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../services/turma.service';
import { ProfessorService } from '../../services/professor.service';
import { Turma } from '../../models/turma';
import { Professor } from '../../models/professor'; // Certifique-se de ter o modelo Professor
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-consultar-turmas',
  templateUrl: './consultar-turmas.component.html',
  styleUrls: ['./consultar-turmas.component.css']
})
export class ConsultarTurmasComponent implements OnInit {
  turmas: Turma[] = [];
  sortedTurmas: Turma[] = [];
  professores: { [id: number]: string } = {}; // Mapeamento de idProfessor -> nomeProfessor
  filterColumn: 'id' | 'nomeTurma' | 'nomeProfessor' = 'nomeTurma';
  filterValue = '';
  sortColumn = '';
  sortDirection = 'asc';
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  constructor(private turmaService: TurmaService, private professorService: ProfessorService) {}

  ngOnInit(): void {
    this.loadProfessores();
    this.loadTurmas();
  }

  // Função para carregar as turmas
  loadTurmas() {
    this.turmaService.listarTurmas().subscribe(
      (data: Turma[]) => {
        this.turmas = data;
        this.sortedTurmas = [...this.turmas];
      },
      (error: any) => console.error('Erro ao carregar turmas:', error)
    );
  }

  // Função para carregar os professores e armazenar os nomes associados aos IDs
  loadProfessores() {
    this.professorService.listarProfessores().subscribe(
      (professores: Professor[]) => {
        professores.forEach(professor => {
          this.professores[professor.idProfessor] = professor.nomeProfessor;
        });
      },
      (error: any) => console.error('Erro ao carregar professores:', error)
    );
  }

  // Função para retornar o nome do professor a partir do idProfessor
  getNomeProfessor(idProfessor: number): string {
    return this.professores[idProfessor] || 'Professor não encontrado';
  }

  // Função para filtrar turmas
  filtrarTurmas(): void {
    this.sortedTurmas = this.turmas.filter(turma => {
      let valorColuna: string | number = '';

      if (this.filterColumn === 'nomeProfessor') {
        valorColuna = this.getNomeProfessor(turma.professor.idProfessor);
      } else {
        valorColuna = turma[this.filterColumn as keyof Turma] as string | number;
      }

      if (typeof valorColuna === 'string') {
        return valorColuna.toLowerCase().includes(this.filterValue.toLowerCase());
      }
      if (typeof valorColuna === 'number') {
        return valorColuna.toString().includes(this.filterValue);
      }
      return false;
    });
  }

  // Função para ordenar a lista
  ordenandoLista(coluna: string): void {
    if (this.sortColumn === coluna) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = coluna;
      this.sortDirection = 'asc';
    }

    this.sortedTurmas.sort((a, b) => {
      let valorA: string | number = '';
      let valorB: string | number = '';

      if (coluna === 'nomeProfessor') {
        valorA = this.getNomeProfessor(a.professor.idProfessor);
        valorB = this.getNomeProfessor(b.professor.idProfessor);
      } else {
        valorA = a[coluna as keyof Turma] as string | number;
        valorB = b[coluna as keyof Turma] as string | number;
      }

      if (typeof valorA === 'string' && typeof valorB === 'string') {
        return this.sortDirection === 'asc' ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
      }

      if (typeof valorA === 'number' && typeof valorB === 'number') {
        return this.sortDirection === 'asc' ? valorA - valorB : valorB - valorA;
      }

      return 0;
    });
  }
}

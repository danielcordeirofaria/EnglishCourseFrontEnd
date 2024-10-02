import { ActivatedRoute } from '@angular/router';
import { AlunosService } from '../../services/alunos.service';
import { TurmaService } from '../../services/turma.service';
import { ProfessorService } from '../../services/professor.service';
import { Turma } from '../../models/turma';
import { Component, OnInit, TrackByFunction } from '@angular/core';

@Component({
  selector: 'app-turma-detalhes',
  templateUrl: './turma-detalhes.component.html',
  styleUrls: ['./turma-detalhes.component.css']
})
export class TurmaDetalhesComponent implements OnInit {
  turma: Turma | null = null;
  professores: { [id: number]: string } = {};
  alunos: any[] = []; // Alunos da turma
  trackByAluno: TrackByFunction<any> = (index, aluno) => aluno.idAluno; // TrackBy function to improve performance

  constructor(
    private route: ActivatedRoute,
    private turmaService: TurmaService,
    private professorService: ProfessorService,
    private alunosService: AlunosService
  ) { }

  ngOnInit(): void {
    const idTurma = this.route.snapshot.paramMap.get('id');
    
    if (idTurma) {
      console.log('ID da Turma:', idTurma); // Imprime o idTurma antes de fazer a solicitação

      this.retornarTurmaPeloId(Number(idTurma));
      this.listarAlunosPorTurma(Number(idTurma));
    }
  }

  retornarTurmaPeloId(id: number): void {
    this.turmaService.retornarTurmaPeloId(id).subscribe(
      (data: Turma) => {
        this.turma = data;
        if (this.turma?.professor?.idProfessor) {
          this.carregarNomeProfessor(this.turma.professor.idProfessor);
        }
      },
      (error) => {
        console.error('Erro ao carregar detalhes da turma:', error);
      }
    );
  }

  listarAlunosPorTurma(idTurma: number): void {
    this.alunosService.listarAlunoPorIdTurma(idTurma).subscribe(
      (data: any[]) => {
        this.alunos = data; // Se data for um array de alunos
        console.log('Alunos da turma:', this.alunos);
      },
      (error) => {
        console.error('Erro ao carregar alunos da turma:', error);
      }
    );
  }



  carregarNomeProfessor(idProfessor: number): void {
    this.professorService.buscarProfessorPorId(idProfessor).subscribe(
      (professor) => {
        this.professores[idProfessor] = professor.nomeProfessor;
      },
      (error) => {
        console.error('Erro ao carregar o nome do professor:', error);
        this.professores[idProfessor] = 'Professor não encontrado';
      }
    );
  }

  getNomeProfessor(idProfessor: number): string {
    return this.professores[idProfessor] || 'Professor não encontrado';
  }
}

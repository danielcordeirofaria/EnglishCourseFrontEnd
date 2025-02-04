import { ActivatedRoute } from '@angular/router';
import { AlunosService } from '../../services/alunos.service';
import { TurmaService } from '../../services/turma.service';
import { ProfessorService } from '../../services/professor.service';
import { Turma } from '../../models/turma';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { HorariosService } from '../../services/horarios.service';
import { Horario } from '../../models/horario';

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
  horarios: any[] = [];
  horarioEditado: number | null = null; // Para rastrear qual horário está sendo editado
  horariosOriginais: any[] = []; // Para armazenar os horários originais
  loading = false;
  criandoNovoHorario = false;
  novoHorario!: {
    turma: number; diaSemana: string; horarioInicio: string; horarioFim: string;
  };

  constructor(
    private route: ActivatedRoute,
    private turmaService: TurmaService,
    private professorService: ProfessorService,
    private alunosService: AlunosService,
    private horarioService: HorariosService
  ) { }

  ngOnInit(): void {
    const idTurma = this.route.snapshot.paramMap.get('id');
    if (idTurma) {
      this.retornarTurmaPeloId(Number(idTurma));
      this.listarAlunosPorTurma(Number(idTurma));
      this.buscarDadosHorarios(Number(idTurma));
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
      },
      (error) => {
        console.error('Erro ao carregar alunos da turma:', error);
      }
    );
  }

  buscarDadosHorarios(turma: number): void {
    this.horarioService.listarHorariosPorIdTurma(turma).subscribe(
      (data: any[]) => {
        // Mapeamento dos dias da semana para valores numéricos (domingo a sábado)
        const diasSemanaMap: { [key: string]: number } = {
          'DOMINGO': 0,
          'SEGUNDA': 1,
          'TERÇA': 2,
          'QUARTA': 3,
          'QUINTA': 4,
          'SEXTA': 5,
          'SÁBADO': 6
        };
  
        // Ordenar os horários com base no mapeamento dos dias da semana
        this.horarios = data.sort((a, b) => {
          return diasSemanaMap[a.diaSemana] - diasSemanaMap[b.diaSemana];
        });
  
        // Armazenar cópia dos horários originais
        this.horariosOriginais = JSON.parse(JSON.stringify(this.horarios));
  
        console.log('Horários da turma ordenados:', this.horarios);
      },
      (error: any) => {
        console.error('Erro ao carregar os horários da turma:', error);
      }
    );
  }

  editarHorario(index: number): void {
    this.horarioEditado = index; // Define qual horário está em edição
  }

  salvarHorario(index: number, idHorario: number): void {
    const horarioParaSalvar = { ...this.horarios[index] }; // Clona o horário que está sendo editado

    // Certifique-se de que o objeto turma está presente e correto
    horarioParaSalvar.turma = {
      idTurma: this.turma?.idTurma, // Associa a turma atual
      nomeTurma: this.turma?.nomeTurma // Inclua outras propriedades conforme necessário
    };

    console.log('Horário para salvar:', horarioParaSalvar);

    // Chama o serviço para atualizar o horário
    this.horarioService.atualizarHorario(horarioParaSalvar, idHorario).subscribe(
      (response) => {
        console.log('Horário salvo com sucesso:', response);
        this.horarioEditado = null; // Sai do modo de edição
        this.buscarDadosHorarios(this.turma?.idTurma!); // Recarrega os dados de horários após salvar
      },
      (error) => {
        console.error('Erro ao salvar horário:', error);
      }
    );
  }

  cancelarEdicao(): void {
    // Restaura os horários originais
    this.horarios = JSON.parse(JSON.stringify(this.horariosOriginais));
    const idTurma = this.turma?.idTurma; // Certifique-se de que `idTurma` está disponível
    if (idTurma) {
      this.buscarDadosHorarios(idTurma); // Recarrega os horários do servidor
    }
    this.horarioEditado = null; // Sai do modo de edição
  }

  carregarNomeProfessor(idProfessor: number): void {
    this.professorService.buscarProfessorPorId(idProfessor).subscribe(
      (professor) => {
        this.professores[idProfessor] = professor.nome;
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

  criarNovoHorario(): void {
    this.criandoNovoHorario = true;
    this.novoHorario = { // Inicializa o objeto com os valores padrão
      turma: this.turma?.idTurma || 0,
      diaSemana: '',
      horarioInicio: '',
      horarioFim: ''
    };
  }

  salvarNovoHorario(): void {
    if (this.novoHorario.diaSemana && this.novoHorario.horarioInicio && this.novoHorario.horarioFim) {
      // Verifique se idTurma é definido
      const idTurma = this.turma?.idTurma;
      if (idTurma !== undefined) {
        const horarioParaSalvar: Horario = {
          turma: { idTurma }, // Certifique-se de que idTurma é um número
          diaSemana: this.novoHorario.diaSemana,
          horarioInicio: this.novoHorario.horarioInicio,
          horarioFim: this.novoHorario.horarioFim
        };
  
        this.horarios.push(horarioParaSalvar);
        this.horarioService.createHorario(horarioParaSalvar).subscribe(
          (response) => {
            console.log('Novo horário salvo:', response);
            this.criandoNovoHorario = false; // Reseta o estado
            location.reload(); // Recarrega a página

          },
          (error) => {
            console.error('Erro ao salvar horário:', error);
          }
        );
      } else {
        console.error('ID da turma não está definido!');
      }
    } else {
      console.error('Preencha todos os campos do novo horário!');
    }
  }
  
  
    cancelarNovoHorario(): void {
      this.criandoNovoHorario = false; // Cancela a criação do novo horário
      this.novoHorario = {
        turma: this.turma?.idTurma || 0,
        diaSemana: '',
        horarioInicio: '',
        horarioFim: ''
      }; // Limpa os dados do novo horário com campos default
    }
    
    excluirHorario(idHorario: number) {
      if (confirm('Você tem certeza que deseja excluir este horário?')) {
        this.horarioService.excluirHorario(idHorario).subscribe(
          () => {
            console.log('Horário excluído com sucesso.');
            location.reload(); // Recarrega a página
          },
          (error) => {
            console.error('Erro ao excluir horário:', error);
          }
        );
      }
    }
 

  
  
}


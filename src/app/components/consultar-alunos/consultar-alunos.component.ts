import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../models/aluno';
import { AlunosService } from '../../services/alunos.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Turma } from '../../models/turma';
import { TurmaService } from '../../services/turma.service';

@Component({
  selector: 'app-consultar-alunos',
  templateUrl: './consultar-alunos.component.html',
  styleUrls: ['./consultar-alunos.component.css']
})
export class ConsultarAlunosComponent implements OnInit {
  alunos: Aluno[] = [];
  alunoSelecionado: Aluno | undefined;
  router: any;
  sortedAlunos: Aluno[] = [];
  sortDirection: string = 'asc';
  sortColumn: string = 'nome';
  filterColumn: 'status' | 'nome' | 'idAlunoMatricula' | 'nivel' | 'dataDeNascimento' = 'status'; // Coluna padrão para filtro
  filterValue: any = ''; // Valor de filtro
  filterMonth: string = ''; // Mês de nascimento para filtro
  filterYear: number | '' = ''; // Ano de nascimento para filtro
  filterStatus: string = ''; // Status do filtro
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  turma: Turma[] = [];
  
  constructor(
    private alunosService: AlunosService,
    private turmaService: TurmaService 
  ) {}

  ngOnInit(): void {
    this.buscarAlunos();
    this.carregarTurmas(); // Adicione esta linha para carregar as turmas

  }

  // Carregar turmas de uma fonte de dados
carregarTurmas(): void {
  // Supondo que você tenha um serviço que busca as turmas
  this.turmaService.listarTurmas()
    .subscribe(
      (turmas: Turma[]) => {
        this.turma = turmas;
      },
      (error: any) => {
        console.error('Erro ao buscar turmas', error);
      }
    );
}

  buscarAlunos(): void {
    this.alunosService.listarAlunos()
      .subscribe(
        (alunos: Aluno[]) => {
          this.alunos = alunos;
          this.sortedAlunos = [...alunos];

        },
        (error: any) => {
          console.error('Erro ao buscar alunos', error);
        }
      );
  }

  ordenandoLista(coluna: string): void {
    if (this.sortColumn === coluna) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = coluna;
      this.sortDirection = 'asc';
    }

    this.sortedAlunos.sort((a, b) => {
      const valorA = a[coluna as keyof Aluno];
      const valorB = b[coluna as keyof Aluno];

      if (typeof valorA === 'string' && typeof valorB === 'string') {
        return this.sortDirection === 'asc' ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
      }

      if (typeof valorA === 'number' && typeof valorB === 'number') {
        return this.sortDirection === 'asc' ? valorA - valorB : valorB - valorA;
      }

      return 0;
    });
  }

  filtrarAlunos(): void {
    this.sortedAlunos = this.alunos.filter(aluno => {
      if (this.filterColumn === 'dataDeNascimento') {
        const dataNascimento = new Date(aluno.dataDeNascimento);
        const mes = (dataNascimento.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataNascimento.getFullYear();

        const mesFiltro = this.filterMonth ? this.filterMonth : '';
        const anoFiltro = this.filterYear ? this.filterYear : '';

        return (mesFiltro === '' || mes === mesFiltro) && (anoFiltro === '' || ano === anoFiltro);
      } else if (this.filterColumn === 'status') {
        return this.filterStatus === '' || aluno.status === this.filterStatus;
      } else {
        const valorColuna = aluno[this.filterColumn as keyof Aluno];
        if (typeof valorColuna === 'string') {
          return valorColuna.toLowerCase().includes(this.filterValue.toLowerCase());
        }
        if (typeof valorColuna === 'number') {
          return valorColuna.toString().includes(this.filterValue);
        }
        return false;
      }
    });
  }

  calcularIdade(dataDeNascimento: string): number {
    const hoje = new Date();
    const nascimento = new Date(dataDeNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  retornarNomeDaTurma(idTurma: number): string {
    const turmaEncontrada = this.turma.find((t) => t.idTurma === idTurma);
    return turmaEncontrada ? turmaEncontrada.nomeTurma : 'Turma não encontrada';
  }




}



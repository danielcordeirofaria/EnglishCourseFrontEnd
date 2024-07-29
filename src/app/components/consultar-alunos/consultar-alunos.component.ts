import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../models/aluno';
import { AlunosService } from '../../services/alunos.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

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
  filterColumn: 'nome' | 'idAlunoMatricula' | 'nivel' | 'dataDeNascimento' = 'nome'; // Coluna padrão para filtro
  filterValue: any = ''; // Valor de filtro
  filterMonth: string = ''; // Mês de nascimento para filtro
  filterYear: number | '' = ''; // Ano de nascimento para filtro
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  constructor(private alunosService: AlunosService) { }

  ngOnInit(): void {
    this.buscarAlunos();
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

  // ordenandoLista(): void {
  //   this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  //   this.sortedAlunos.sort((a, b) => {
  //     if (this.sortDirection === 'asc') {
  //       return a.nome.localeCompare(b.nome);
  //     } else {
  //       return b.nome.localeCompare(a.nome);
  //     }
  //   });

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
      } else {
        const valorColuna = aluno[this.filterColumn];
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



}



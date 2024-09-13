import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-consultar-professores',
  templateUrl: './consultar-professores.component.html',
  styleUrls: ['./consultar-professores.component.css']
})
export class ConsultarProfessoresComponent implements OnInit {
  professores: Professor[] = [];
  professorSelecionado: Professor | undefined;
  router: any;
  filterColumn: 'status' | 'nome' | 'idProfessor' | 'email' | 'whatsapp' = 'status'; // Coluna padrão para filtro
  filterValue = '';
  sortColumn = '';
  sortDirection = 'asc';
  sortedProfessores: Professor[] = [];
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  filterStatus:  string = '';

  constructor(private professorService: ProfessorService) { }

  ngOnInit(): void {
    this.loadProfessores();
  }


  loadProfessores() {
    this.professorService.listarProfessores().subscribe(
      (data: Professor[]) => {
        this.professores = data;
        this.sortedProfessores = [...this.professores];
      },
      (error: any) => console.error('Erro ao carregar professores:', error)
    );
  }

  filtrarProfessores(): void {
    this.sortedProfessores = this.professores.filter(professor => {
      if (this.filterColumn === 'email' || this.filterColumn === 'whatsapp') {
        const valorColuna = professor[this.filterColumn as keyof Professor];
        return valorColuna && valorColuna.toLowerCase().includes(this.filterValue.toLowerCase());
      } else {
        const valorColuna = professor[this.filterColumn as keyof Professor];
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


  ordenandoLista(coluna: string): void {
    if (this.sortColumn === coluna) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = coluna;
      this.sortDirection = 'asc';
    }

    this.sortedProfessores.sort((a, b) => {
      const valorA = a[coluna as keyof Professor];
      const valorB = b[coluna as keyof Professor];

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

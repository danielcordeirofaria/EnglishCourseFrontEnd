import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../models/aluno';
import { AlunosService } from '../../services/alunos.service';

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

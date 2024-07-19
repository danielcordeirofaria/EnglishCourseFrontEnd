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

  constructor(private alunosService: AlunosService) { }

  ngOnInit(): void {
    this.buscarAlunos();
  }

  buscarAlunos(): void {
    this.alunosService.listarAlunos()
      .subscribe(
        (alunos: Aluno[]) => {
          this.alunos = alunos;
        },
        (error: any) => {
          console.error('Erro ao buscar alunos', error);
        }
      );
  }

  abrirDetalhesAluno(event: MouseEvent): void {
    const idAlunoMatricula = (event.currentTarget as HTMLAnchorElement).getAttribute('data-aluno-id');
    if (idAlunoMatricula) {
      const idAlunoInt = parseInt(idAlunoMatricula, 10);
      this.alunosService.buscarAlunoPorId(idAlunoInt)
        .subscribe(
          (aluno: Aluno) => {
            this.alunoSelecionado = aluno;
            this.router.navigate(['/alunos', idAlunoInt]); // Redireciona para a rota /alunos/idAlunoInt
          },
          (error: any) => {
            console.error('Erro ao buscar aluno por ID', error);
          }
        );
    } else {
      console.error('ID do aluno não encontrado');
    }
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

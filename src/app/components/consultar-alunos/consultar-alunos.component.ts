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

  abrirDetalhesAluno(id: number): void {
    this.alunosService.buscarAlunoPorId(id)
      .subscribe(
        (aluno: Aluno) => {
          this.alunoSelecionado = aluno;
        },
        (error: any) => {
          console.error('Erro ao buscar aluno por ID', error);
        }
      );
  }

  fecharDetalhesAluno(): void {
    this.alunoSelecionado = undefined;
  }

  atualizarAluno(): void {
    if (this.alunoSelecionado && this.alunoSelecionado.idAlunoMatricula) {
      this.alunosService.atualizarAluno(this.alunoSelecionado.idAlunoMatricula, this.alunoSelecionado)
        .subscribe(
          (response: any) => {
            console.log('Aluno atualizado com sucesso', response);
            this.fecharDetalhesAluno();
          },
          (error: any) => {
            console.error('Erro ao atualizar aluno', error);
          }
        );
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../../models/aluno';
import { AlunosService } from '../../services/alunos.service';

@Component({
  selector: 'app-aluno-detalhes',
  templateUrl: './aluno-detalhes.component.html',
  styleUrls: ['./aluno-detalhes.component.css']
})

export class AlunoDetalhesComponent implements OnInit {
  aluno: Aluno | undefined;
  modoEdicao: boolean = false; // Variável para controlar o modo de edição
  alunoOriginal: Aluno | undefined; // Armazena o aluno original para cancelar edições

  constructor(
    private alunosService: AlunosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarDetalhesAluno();
  }

  carregarDetalhesAluno(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.alunosService.buscarAlunoPorId(id)
      .subscribe(
        (aluno: Aluno) => {
          this.aluno = aluno;
          this.alunoOriginal = { ...aluno }; // Armazena uma cópia do aluno para cancelar edições
        },
        (error: any) => {
          console.error('Erro ao buscar aluno', error);
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

  voltar(): void {
    this.router.navigate(['/consulta-alunos']);
  }

  editar(): void {
    this.modoEdicao = true;
  }

  salvar(): void {
    if (this.aluno) {
      const id = this.aluno.idAlunoMatricula!;
      this.alunosService.atualizarAluno(id, this.aluno).subscribe(
        (res: any) => {
          console.log('Aluno salvo com sucesso:', res);
          this.modoEdicao = false;
          this.voltar(); // Navega de volta após salvar
        },
        (err: any) => {
          console.error('Erro ao salvar aluno', err);
        }
      );
    }
  }
  

// Função para cancelar a edição
cancelar(): void {
  this.modoEdicao = false;
  this.aluno = this.alunoOriginal; // Reverte as alterações
}
}

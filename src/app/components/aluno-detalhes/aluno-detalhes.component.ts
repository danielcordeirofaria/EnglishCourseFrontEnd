import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../../models/aluno';
import { AlunosService } from '../../services/alunos.service';
import { HttpClient } from '@angular/common/http';
import { TurmaService } from '../../services/turma.service'; // Importe o serviço de Turma

@Component({
  selector: 'app-aluno-detalhes',
  templateUrl: './aluno-detalhes.component.html',
  styleUrls: ['./aluno-detalhes.component.css']
})
export class AlunoDetalhesComponent implements OnInit {
  aluno: Aluno | undefined;
  turma: any; // Adicione uma propriedade para armazenar a turma
  turmas: any[] = []; // Adicione uma propriedade para armazenar as turmas disponíveis
  modoEdicao: boolean = false;
  alunoOriginal: Aluno | undefined;

  constructor(
    private alunosService: AlunosService,
    private turmaService: TurmaService, // Injete o serviço de Turma
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.carregarDetalhesAluno();
    this.carregarTurmas(); // Carregue as turmas disponíveis
  }
  carregarDetalhesAluno(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.alunosService.buscarAlunoPorId(id)
      .subscribe(
        (aluno: Aluno) => {
          this.aluno = aluno;
          this.alunoOriginal = { ...aluno };
  
          // Buscar a turma associada ao aluno
          if (this.aluno.turma) { // Verifique se 'turma' não é nulo ou indefinido
            this.retornarTurmaPeloId(this.aluno.turma.idTurma);
          }
        },
        (error: any) => {
          console.error('Erro ao buscar aluno', error);
        }
      );
  }
  
  

  carregarTurmas(): void {
    this.turmaService.listarTurmas().subscribe(
      (turmas: any[]) => {
        this.turmas = turmas;
      },
      (error: any) => {
        console.error('Erro ao buscar turmas', error);
      }
    );
  }

  retornarTurmaPeloId(idTurma: number): void {
    this.turmaService.retornarTurmaPeloId(idTurma).subscribe(
      (turma: any) => {
        this.turma = turma;
      },
      (error: any) => {
        console.error('Erro ao buscar turma', error);
      }
    );
  }

  buscarCep(cep: string): void {
    if (cep && cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
        (dados: any) => {
          if (dados && this.aluno) {
            this.aluno.endereco.logradouro = dados.logradouro || '';
            this.aluno.endereco.bairro = dados.bairro || '';
            this.aluno.endereco.cidade = dados.localidade || '';
            this.aluno.endereco.estado = dados.uf || '';
          }
        },
        (error: any) => {
          console.error('Erro ao buscar o CEP:', error);
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
          this.voltar();
        },
        (err: any) => {
          console.error('Erro ao salvar aluno', err);
        }
      );
    }
  }

  cancelar(): void {
    this.modoEdicao = false;
    this.aluno = this.alunoOriginal; // Reverte as alterações
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../../models/aluno';
import { AlunosService } from '../../services/alunos.service';
import { HttpClient } from '@angular/common/http';
import { TurmaService } from '../../services/turma.service'; 
import { Turma } from '../../models/turma';
import { Location } from '@angular/common'; // Importação necessária para o Location

@Component({
  selector: 'app-aluno-detalhes',
  templateUrl: './aluno-detalhes.component.html',
  styleUrls: ['./aluno-detalhes.component.css']
})
export class AlunoDetalhesComponent implements OnInit {
  aluno: Aluno | undefined;
  turma: Turma | undefined; // Altere para o tipo correto
  turmas: Turma[] = [];
  modoEdicao: boolean = false;
  alunoOriginal: Aluno | undefined;

  constructor(
    private alunosService: AlunosService,
    private turmaService: TurmaService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private location: Location // Injete o Location
  ) { }

  ngOnInit(): void {
    this.carregarDetalhesAluno();
    this.carregarTurmas();
  }

  carregarDetalhesAluno(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.alunosService.buscarAlunoPorId(id)
      .subscribe(
        (aluno: Aluno) => {
          this.aluno = aluno;
          this.alunoOriginal = { ...aluno };
  
          if (this.aluno?.turma) {
            this.retornarTurmaPeloId(this.aluno.turma.idTurma!);
          }
        },
        (error: any) => {
          console.error('Erro ao buscar aluno', error);
        }
      );
  }
  
  carregarTurmas(): void {
    this.turmaService.listarTurmas().subscribe(
      (turmas: Turma[]) => {
        this.turmas = turmas;
      },
      (error: any) => {
        console.error('Erro ao buscar turmas', error);
      }
    );
  }

  retornarTurmaPeloId(idTurma: number): void {
    this.turmaService.retornarTurmaPeloId(idTurma).subscribe(
      (turma: Turma) => {
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
    this.location.back();
  }

  editar(): void {
    this.modoEdicao = true;
  }

  salvar(): void {
    console.log("Tentando salvar a atualização do aluno");

    if (this.aluno) {
      const id = this.aluno.idAlunoMatricula!;
      this.alunosService.atualizarAluno(id, this.aluno).subscribe(
        (res: Aluno) => { // Mude para o tipo correto, se necessário
          console.log('Aluno atualizado com sucesso', res);
          this.modoEdicao = false;
          this.voltar();
        },
        (err: any) => {
          console.error('Erro ao salvar aluno', err);
          console.error('Detalhes do erro:', err.error || err.message || err);
        }
      );
    }
  }

  cancelar(): void {
    this.modoEdicao = false;
    this.aluno = this.alunoOriginal;
  }
}

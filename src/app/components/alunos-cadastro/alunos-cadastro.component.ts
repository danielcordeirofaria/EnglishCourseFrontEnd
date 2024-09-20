import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from '../../services/cep.service';
import { AlunosService } from '../../services/alunos.service';
import { TurmaService } from '../../services/turma.service';
import { Aluno } from '../../models/aluno';
import { Endereco } from '../../models/endereco';
import { Router } from '@angular/router';
import { Turma } from '../../models/turma';
import { Professor } from '../../models/professor';

@Component({
  selector: 'app-alunos-cadastro',
  templateUrl: './alunos-cadastro.component.html',
  styleUrls: ['./alunos-cadastro.component.css']
})
export class AlunosCadastroComponent implements OnInit {
  public alunoForm!: FormGroup;
  public loading: boolean = false;
  professores: Professor[] = [];
  turmas: Turma[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alunoService: AlunosService,
    private cepService: CepService,
    private turmaService: TurmaService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadTurmas();
  }

  loadTurmas() {
    this.turmaService.listarTurmas().subscribe(
      (data: Turma[]) => {
        this.turmas = data;
        // Exemplo de como fazer o console.log para o nome da turma
        data.forEach(turma => console.log(turma.nomeTurma));
      },
      (error: any) => console.error('Erro ao carregar turmas:', error)
    );
  }

  createForm() {
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        cep: ['', Validators.required],
      }),
      dataDeNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      formacao: ['', Validators.required],
      profissao: ['', Validators.required],
      moduloFeito: ['', Validators.required],
      nivel: ['', Validators.required],
      status: ['', Validators.required],
      idTurma: ['', Validators.required]
    });
  }

  buscarCep(cep: string) {
    this.cepService.buscarCep(cep).subscribe(
      data => this.populateEndereco(data),
      error => console.error('Erro ao buscar CEP:', error)
    );
  }

  populateEndereco(data: any) {
    if (data) {
      this.alunoForm.patchValue({
        endereco: {
          logradouro: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        }
      });
    }
  }

  onSubmit() {
    console.log("Entrando no submit")
    if (this.alunoForm.valid) {
      console.log("Entrando no if")
      this.loading = true;
      const formValue = this.alunoForm.value;

      // Log para verificar o valor do formulário
      console.log('Form Value:', formValue);

      const endereco = new Endereco(
        formValue.endereco.logradouro,
        formValue.endereco.numero,
        formValue.endereco.bairro,
        formValue.endereco.cidade,
        formValue.endereco.estado,
        formValue.endereco.cep,
        formValue.endereco.complemento
      );

      const novoAluno = new Aluno(
        formValue.nome,
        endereco,
        formValue.dataDeNascimento,
        formValue.cpf,
        formValue.email,
        formValue.formacao,
        formValue.profissao,
        formValue.moduloFeito,
        formValue.nivel,
        formValue.status,
        formValue.idTurma
      );

      this.alunoService.cadastrarAluno(novoAluno).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res && res.message) {
            alert(res.message);
            this.router.navigate(['/']);
          }
        },
        error: (err: any) => {
          console.error('Erro ao cadastrar aluno', err);
          alert('Erro ao cadastrar aluno: ' + (err.error.message || err.message));
          this.loading = false;
        }
      });
    } else {
      console.log("deu ruim")
    }
  }
}

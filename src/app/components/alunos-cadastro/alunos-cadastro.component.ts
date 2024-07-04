import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from '../../services/cep.service';
import { AlunosService } from '../../services/alunos.service';
import { Aluno } from '../../models/aluno';
import { Endereco } from '../../models/endereco';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alunos-cadastro',
  templateUrl: './alunos-cadastro.component.html',
  styleUrls: ['./alunos-cadastro.component.css']
})
export class AlunosCadastroComponent implements OnInit {
  public alunoForm!: FormGroup;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AlunosService,
    private cepService: CepService
  ) { }

  ngOnInit(): void {
    this.createForm();
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
      moduloMatriculado: ['', Validators.required],
      moduloFeito: ['', Validators.required],
      nivel: ['', Validators.required],
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
    if (this.alunoForm.valid) {
      this.loading = true;
      const formValue = this.alunoForm.value;
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
        formValue.nivel
      );
      this.service.cadastrarAluno(novoAluno).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res && res.message) {
            alert(res.message);
            this.router.navigate(["/main"]); // Certifique-se de que a rota "main" esteja corretamente configurada
          }
        },
        error: (err: any) => {
          console.error('Erro ao cadastrar aluno', err);
          alert('Erro ao cadastrar aluno: ' + (err.error.message || err.message));
          this.loading = false;
        }
      });
    }
  }
}

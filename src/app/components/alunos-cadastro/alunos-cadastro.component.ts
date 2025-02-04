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
import { Responsavel } from '../../models/responsavel';

@Component({
  selector: 'app-alunos-cadastro',
  templateUrl: './alunos-cadastro.component.html',
  styleUrls: ['./alunos-cadastro.component.css']
})
export class AlunosCadastroComponent implements OnInit {
  public alunoForm!: FormGroup;
  public loading: boolean = false;
  public responsavelEAluno: string = ''; // Variável para o select
  public mesmoEndereco: boolean = true;
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

  // loadTurmas() {
  //   this.turmaService.listarTurmas().subscribe(
  //     (data: Turma[]) => {
  //       this.turmas = data;
  //       data.forEach(turma => console.log(turma.nomeTurma));
  //     },
  //     (error: any) => console.error('Erro ao carregar turmas:', error)
  //   );
  // }

  loadTurmas() {
    this.turmaService.listarTurmas().subscribe({
      next: (data: Turma[]) => {
        if (data && data.length > 0) { // Verifica se data existe e não é vazio
          this.turmas = data;
          data.forEach(turma => console.log(turma.nomeTurma));
        } else {
          // Tratar o caso de não haver turmas
          console.log("Nenhuma turma cadastrada.");
          // Você pode, por exemplo, exibir uma mensagem na tela informando 
          // que não há turmas cadastradas ou desabilitar algum componente 
          // que depende da lista de turmas.
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar turmas:', error);
        // Aqui você pode adicionar um tratamento para o erro, como exibir 
        // uma mensagem de erro na tela.
      }
    });
  }

  createForm() {
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        numero: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]], // Validação para números
        complemento: [''],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        cep: ['', Validators.required],
      }),
      dataDeNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: [''],
      formacao: ['', Validators.required],
      profissao: ['', Validators.required],
      moduloFeito: ['', Validators.required],
      nivel: ['', Validators.required],
      status: ['ATIVADO', Validators.required],
      idTurma: [null],
      nomeResponsavel: [''],
      dataDeNascimentoResponsavel: [''],
      cpfResponsavel: [''],
      emailResponsavel: [''],
      whatsappResponsavel: [''],
      formacaoResponsavel: [''],
      profissaoResponsavel: [''],
      enderecoResponsavel: this.fb.group({
        cep: [''],
        logradouro: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cidade: [''],
        estado: ['']
      })
    });
  }

  // Função para verificar se os campos do aluno estão preenchidos
  camposAlunoPreenchidos() {
    return this.alunoForm.get('nome')?.valid &&
      this.alunoForm.get('dataDeNascimento')?.valid &&
      this.alunoForm.get('cpf')?.valid &&
      this.alunoForm.get('email')?.valid;
  }

  buscarCep(cep: string, formGroup: string) { 
    this.cepService.buscarCep(cep).subscribe(
      data => {
        if (formGroup === 'endereco') {
          this.populateEndereco(data); 
        } else if (formGroup === 'enderecoResponsavel') {
          this.populateEnderecoResponsavel(data); 
        }
      },
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

  buscarCepResponsavel(cep: string) {
    this.cepService.buscarCep(cep).subscribe(
      data => this.populateEnderecoResponsavel(data),
      error => console.error('Erro ao buscar CEP do responsável:', error)
    );
  }

  populateEnderecoResponsavel(data: any) {
    if (data) {
      this.alunoForm.patchValue({
        enderecoResponsavel: {
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

      console.log(formValue.endereco)

      // Criar o endereço do aluno
      const enderecoAluno = new Endereco(
        formValue.endereco.logradouro,
        formValue.endereco.numero,
        formValue.endereco.bairro,
        formValue.endereco.cidade,
        formValue.endereco.estado,
        formValue.endereco.cep,
        formValue.endereco.complemento
    );

      // Criar o endereço do responsável
      const enderecoResponsavel = new Endereco(
        formValue.enderecoResponsavel.logradouro,
        formValue.enderecoResponsavel.numero,
        formValue.enderecoResponsavel.bairro,
        formValue.enderecoResponsavel.cidade,
        formValue.enderecoResponsavel.estado,
        formValue.enderecoResponsavel.cep,
        formValue.enderecoResponsavel.complemento
      );

      // Criar o responsável
      const responsavel = new Responsavel(
        formValue.nomeResponsavel,
        enderecoResponsavel,
        formValue.dataDeNascimentoResponsavel,
        formValue.cpfResponsavel,
        formValue.emailResponsavel,
        formValue.whatsappResponsavel,
        formValue.formacaoResponsavel,
        formValue.profissaoResponsavel
      );

      // Criar o aluno
      const novoAluno = new Aluno(
        formValue.nome,
        enderecoAluno,
        formValue.dataDeNascimento,
        formValue.cpf,
        formValue.email,
        formValue.whatsapp,
        formValue.formacao,
        formValue.profissao,
        formValue.moduloFeito,
        formValue.nivel,
        formValue.status,
        responsavel,
        formValue.idTurma,
      );

      // Chamar o serviço para cadastrar o aluno
      this.alunoService.cadastrarAluno(novoAluno).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res && res.message) {
            alert(res.message);
            this.router.navigate(['/']);
          }
        },
        error: (err: any) => {
          console.error('Erro ao cadastrar aluno:', err);
          alert('Erro ao cadastrar aluno: ' + (err.error?.message || err.message));
          this.loading = false;
        }
      });
    } else {
      console.log(this.alunoForm.value); // Debug do formulário
      console.log("Formulário inválido");
    }
  }

  copiarDadosParaResponsavel() {
    if (this.camposAlunoPreenchidos()) {
      console.log(this.alunoForm.get('endereco')?.value)


      this.alunoForm.patchValue({
        nomeResponsavel: this.alunoForm.get('nome')?.value,
        dataDeNascimentoResponsavel: this.alunoForm.get('dataDeNascimento')?.value,
        cpfResponsavel: this.alunoForm.get('cpf')?.value,
        emailResponsavel: this.alunoForm.get('email')?.value,
        whatsappResponsavel: this.alunoForm.get('whatsapp')?.value,
        formacaoResponsavel: this.alunoForm.get('formacao')?.value,
        profissaoResponsavel: this.alunoForm.get('profissao')?.value,
      })
    }
  }

  copiarEnderecoParaResponsavel() {
    const enderecoAluno = this.alunoForm.get('endereco')?.value;

    console.log(enderecoAluno)

    this.alunoForm.get('enderecoResponsavel')?.patchValue({
      cep: enderecoAluno.cep,
      logradouro: enderecoAluno.logradouro,
      numero: enderecoAluno.numero,
      complemento: enderecoAluno.complemento,
      bairro: enderecoAluno.bairro,
      cidade: enderecoAluno.cidade,
      estado: enderecoAluno.estado
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfessorService } from '../../services/professor.service';
import { CepService } from '../../services/cep.service';
import { Endereco } from '../../models/endereco';
import { Professor } from '../../models/professor';

@Component({
  selector: 'app-cadastro-primeiro-professor',
  templateUrl: './cadastro-primeiro-professor.component.html',
  styleUrl: './cadastro-primeiro-professor.component.css'
})
export class CadastroPrimeiroProfessorComponent implements OnInit {
  professorForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private professorService: ProfessorService,
    private cepService: CepService // Injete o serviço de CEP
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.professorForm = this.fb.group({
      nomeProfessor: ['', Validators.required],
      cpf: ['', Validators.required],
      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        cep: ['', [Validators.required, Validators.pattern('^\\d{8}$|^\\d{2}\\.\\d{3}-\\d{3}$|^\\d{5}-\\d{3}$')]],
      }),
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      password: ['', Validators.required],
      whatsapp: ['', [Validators.pattern('^[0-9]{10,11}$')]] // Adicione a validação para WhatsApp
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
      this.professorForm.patchValue({
        endereco: {
          logradouro: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        }
      });
    }
  }

  onSubmit(): void {
    console.log(this.professorForm)

    if (this.professorForm.valid) {
      this.loading = true;
      const formValue = this.professorForm.value;

      const cepLimpo = formValue.endereco.cep.replace(/\D/g, '');

      console.log('Form Value:', formValue);

      // Criar instância de Endereco
      const endereco = new Endereco(
        formValue.endereco.logradouro,
        formValue.endereco.numero,
        formValue.endereco.bairro,
        formValue.endereco.cidade,
        formValue.endereco.estado,
        cepLimpo,
        formValue.endereco.complemento // Opcional
      );

      // Criar instância de Professor
      const novoProfessor = new Professor(
        formValue.nomeProfessor,
        formValue.cpf,
        endereco,
        formValue.email,
        formValue.login,
        formValue.password,
        formValue.whatsapp
      );

      this.professorService.cadastrandoPrimeiroUsuario(novoProfessor).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res && res.message) {
            alert(res.message);
            this.router.navigate(['/']);
          }
          window.location.reload();

        },
        error: (error: any) => {
          console.error('Erro ao cadastrar professor', error);
          alert('Erro ao cadastrar professor: ' + (error.error.message || error.message));
          this.loading = false;
        }
      });
    }
  }
}

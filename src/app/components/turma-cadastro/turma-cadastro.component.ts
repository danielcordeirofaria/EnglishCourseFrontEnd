import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TurmaService } from '../../services/turma.service';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor';
import { Turma } from '../../models/turma';

@Component({
  selector: 'app-turma',
  templateUrl: './turma-cadastro.component.html',
  styleUrls: ['./turma-cadastro.component.css']
})
export class TurmaComponent implements OnInit {

  turmaForm: FormGroup;
  loading = false;
  professores: Professor[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
    private professorService: ProfessorService
  ) {
    this.turmaForm = this.formBuilder.group({
      nomeTurma: ['', Validators.required],
      professor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarProfessores();
  }

  carregarProfessores() {
    this.professorService.listarProfessores().subscribe(
      (data: Professor[]) => {
        console.log('Professores carregados:', data);
        this.professores = data;
      },
      (error: any) => {
        console.error('Erro ao carregar professores', error);
      }
    );
  }

  onSubmit() {
    if (this.turmaForm.valid) {
      this.loading = true;
  
      const turmaData: Turma = {
        nomeTurma: this.turmaForm.get('nomeTurma')?.value,
        professor: {
          idProfessor: this.turmaForm.get('professor')?.value  // Somente o id do professor
        }
      };
  
      this.turmaService.createTurma(turmaData).subscribe(
        (response) => {
          console.log('Turma salva:', response);
          this.loading = false;
          this.turmaForm.reset();
        },
        (error) => {
          console.error('Erro ao salvar a turma:', error);
          this.loading = false;
        }
      );
    }
  }
}
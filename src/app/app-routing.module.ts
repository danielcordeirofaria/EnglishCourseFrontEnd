import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AlunosCadastroComponent } from './components/alunos-cadastro/alunos-cadastro.component';
import { ConsultarAlunosComponent } from './components/consultar-alunos/consultar-alunos.component';
import { AlunoDetalhesComponent } from './components/aluno-detalhes/aluno-detalhes.component';
import { CadastrarProfessorComponent } from './components/professores-cadastro/professores-cadastro.component';
import { ConsultarProfessoresComponent } from './components/consultar-professores/consultar-professores.component';
import { ProfessorDetalhesComponent } from './components/professor-detalhes/professor-detalhes.component';
import { TurmaComponent } from './components/turma-cadastro/turma-cadastro.component'
import { ConsultarTurmasComponent } from './components/consultar-turmas/consultar-turmas.component';
import { TurmaDetalhesComponent } from './components/turma-detalhes/turma-detalhes.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'main', component: MainComponent },
  { path: 'alunos-detalhes/:id', component: AlunoDetalhesComponent },
  { path: 'alunos-cadastros', component: AlunosCadastroComponent},
  { path: 'consulta-alunos', component: ConsultarAlunosComponent},
  { path: 'cadastro-professores', component: CadastrarProfessorComponent},
  { path: 'consulta-professores', component: ConsultarProfessoresComponent},
  { path: 'professor-detalhes/:id', component: ProfessorDetalhesComponent},
  { path: 'turma-cadastro', component: TurmaComponent},
  { path: 'consultar-turmas', component: ConsultarTurmasComponent},
  { path: 'turma-detalhes/:id', component: TurmaDetalhesComponent}
  
  // Adicione outras rotas conforme necessário
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

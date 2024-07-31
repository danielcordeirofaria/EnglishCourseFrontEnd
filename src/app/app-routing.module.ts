import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AlunosCadastroComponent } from './components/alunos-cadastro/alunos-cadastro.component';
import { ConsultarAlunosComponent } from './components/consultar-alunos/consultar-alunos.component';
import { AlunoDetalhesComponent } from './components/aluno-detalhes/aluno-detalhes.component';
import { ProfessoresCadastroComponent } from './components/professores-cadastro/professores-cadastro.component';
// Adicione outros componentes conforme necessário

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'main', component: MainComponent },
  { path: 'alunos-detalhes/:id', component: AlunoDetalhesComponent },
  { path: 'alunos-cadastros', component: AlunosCadastroComponent},
  { path: 'consulta-alunos', component: ConsultarAlunosComponent},
  { path: 'cadastro-professores', component: ProfessoresCadastroComponent}
  // Adicione outras rotas conforme necessário
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

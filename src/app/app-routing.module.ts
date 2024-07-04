import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AlunosComponent } from './components/alunos/alunos.component';
import { AlunosCadastroComponent } from './components/alunos-cadastro/alunos-cadastro.component';
import { ConsultarAlunosComponent } from './components/consultar-alunos/consultar-alunos.component';
// Adicione outros componentes conforme necessário

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'main', component: MainComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: 'alunos-cadastros', component: AlunosCadastroComponent},
  { path: 'consulta-alunos', component: ConsultarAlunosComponent}
  // Adicione outras rotas conforme necessário
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

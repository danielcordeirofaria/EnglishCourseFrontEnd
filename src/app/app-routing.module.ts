import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AlunosComponent } from './components/alunos/alunos.component';
// Adicione outros componentes conforme necessário

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'alunos', component: AlunosComponent },
  // Adicione outras rotas conforme necessário
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

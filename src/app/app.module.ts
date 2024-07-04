import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlunosComponent } from './components/alunos/alunos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlunosCadastroComponent } from './components/alunos-cadastro/alunos-cadastro.component';
import { CpfFormatDirective } from './cpf-format.directive';
import { ConsultarAlunosComponent } from './components/consultar-alunos/consultar-alunos.component';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    AlunosComponent,
    AlunosCadastroComponent,
    CpfFormatDirective,
    ConsultarAlunosComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    

  ]
})
export class AppModule { }

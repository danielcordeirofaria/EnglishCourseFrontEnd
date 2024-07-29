import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AlunosCadastroComponent } from './components/alunos-cadastro/alunos-cadastro.component';
import { CpfFormatDirective } from './cpf-format.directive';
import { ConsultarAlunosComponent } from './components/consultar-alunos/consultar-alunos.component';
import { AlunoDetalhesComponent } from './components/aluno-detalhes/aluno-detalhes.component';
import { CommonModule } from '@angular/common';

@NgModule({ declarations: [
        AppComponent,
        AppComponent,
        HeaderComponent,
        MainComponent,
        FooterComponent,
        AlunosCadastroComponent,
        CpfFormatDirective,
        ConsultarAlunosComponent,
        AlunoDetalhesComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }

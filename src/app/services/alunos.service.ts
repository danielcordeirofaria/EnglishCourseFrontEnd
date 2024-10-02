import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  private apiUrl = 'http://localhost:8080/alunos'; // Base URL of your backend

  constructor(private http: HttpClient) { }

  cadastrarAluno(aluno: Aluno): Observable<any> {
    return this.http.post<any>(this.apiUrl, aluno);
  }

  listarAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}`);
  }

  buscarAlunoPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  atualizarAluno(id: number, aluno: Aluno): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, aluno);
  }

  listarAlunoPorIdTurma(idTurma: number): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/turma/${idTurma}`);
  }

}

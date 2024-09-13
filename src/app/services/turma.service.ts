import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from '../models/turma';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  private apiUrl = 'http://localhost:8080/turma';

  constructor(private http: HttpClient) { }

  listarTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.apiUrl);
  }

  retornarTurmaPeloId(idTurma: any): Observable<Turma> {
    return this.http.get<Turma>(`${this.apiUrl}/${idTurma}`)
  }
  
}

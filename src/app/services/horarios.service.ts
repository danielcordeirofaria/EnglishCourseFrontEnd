import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turma } from '../models/turma';
import { Horario } from '../models/horario';




@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/horario';

  listarHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}`);
  }

  createHorario(horario: Horario): Observable<any> {
    return this.http.post<Horario>(this.apiUrl, horario);
  }

  atualizarHorario(horario: Horario, idHorario: number): Observable<Horario> {
    return this.http.put<Horario>(`${this.apiUrl}/${idHorario}`, horario);
}
 
  listarHorariosPorIdTurma(turma: number): Observable<Horario[]> { // Ajuste no nome e nos parâmetros
    return this.http.get<Horario[]>(`${this.apiUrl}/turma/${turma}`);
  }

  excluirHorario(idHorario: number): Observable<any>{
    return this.http.delete<Horario>(`${this.apiUrl}/${idHorario}`);
  }

}

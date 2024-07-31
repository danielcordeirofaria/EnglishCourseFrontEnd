import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor';

@Injectable({
  providedIn: 'root'  // Isso faz com que o serviço esteja disponível globalmente
})
export class ProfessorService {
  private apiUrl = 'http://localhost:8080'; // URL base do seu backend

  constructor(private http: HttpClient) { }

  // Método para obter a lista de professores
  listarProfessor(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.apiUrl}/professores`);
  }
  
}

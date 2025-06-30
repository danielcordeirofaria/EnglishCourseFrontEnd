import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { professorToken } from '../models/professorToken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  public efetuarLogin(login: Login): Observable<professorToken>{

    return this.http.post<professorToken>(this.apiUrl + "auth/login", login);
  }

  public verificarPrimeiroUsuario(): Observable<boolean>{
    return this.http.get<boolean>(this.apiUrl + "auth/verificacaoPrimeiroUsuario")
  }

}
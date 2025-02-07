import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  static saveToken(token: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isValidToken(): boolean {
    const token = this.getToken();
    // Verifique se o token está presente e válido de acordo com sua lógica de validação
    return !!token; // Altere esta lógica conforme necessário
  }
}


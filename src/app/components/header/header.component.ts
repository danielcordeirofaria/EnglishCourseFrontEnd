import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAdmin: boolean = false;
  isTokenValid: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkAdminStatus();
    this.verificarToken();
  }

  checkAdminStatus() {
    const token = localStorage.getItem('token'); // Obtenha o token do localStorage

    // Verifique se há um token
    if (token) {
      // Decodifique o token para obter o conteúdo
      const tokenContent = JSON.parse(atob(token.split('.')[1]));

      // Verifique se o token contém o claim "role" e se o valor é "admin"
      if (tokenContent.role === 'admin') {
        this.isAdmin = true; // Defina isAdmin como true se o usuário for admin
      }
    }
  }

  verificarToken(): void {
    const token = localStorage.getItem('token');
    this.isTokenValid = !!token && token !== 'invalido'; // Defina isTokenValid como true se houver um token válido, caso contrário, defina como false
  }

  deslogar() {
    localStorage.removeItem('token');
    this.isTokenValid = false;
    this.router.navigateByUrl('/');
    location.reload();

  }

}

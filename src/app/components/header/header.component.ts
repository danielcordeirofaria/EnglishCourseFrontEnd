import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAdmin: boolean = false;
  isTokenValid: boolean = false;
  existePrimeiroUsuario: boolean | undefined;

  constructor(
    private router: Router,
    private loginService: LoginService // Injete o LoginService corretamente
  ) { }

  ngOnInit(): void {
    this.checkAdminStatus();
    this.verificarToken();
    this.verificarPrimeiroUsuario(); // Chame o método ao inicializar o componente
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

  verificarPrimeiroUsuario() {
    console.log("Verificando se tem usuário cadastrado");
    this.loginService.verificarPrimeiroUsuario().subscribe(
      (existeProfessor: boolean) => {
        this.existePrimeiroUsuario = existeProfessor; // Armazene o resultado
        if (!existeProfessor) {
          // Se não houver nenhum professor cadastrado, redirecione para a página de cadastro de professor
          this.router.navigateByUrl('/cadastro-primeiro-professor');
        }
      },
      (error: any) => {
        console.error('Erro ao verificar o primeiro usuário:', error);
        this.existePrimeiroUsuario = false; // Em caso de erro, defina como false
      }
    );
  }
}
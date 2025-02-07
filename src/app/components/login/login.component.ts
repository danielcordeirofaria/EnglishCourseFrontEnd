import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { TokenService } from '../../services/token.service';
import { Login } from '../../models/login.model';
import { professorToken } from '../../models/professorToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  public login: Login = new Login();
  
  public loading: boolean = false;
  public mensagem: String = "";
  public constructor(private router:Router, private service: LoginService, private tokenService: TokenService){}

  logar() {
    this.loading = true;
    this.service.efetuarLogin(this.login).subscribe(
      (res: professorToken)  => {
        console.log("Estoudentro do res")
        this.loading = false;
        this.tokenService.saveToken(res.token);
        console.log(res.token)
        this.router.navigate(["main"]).then(() => {
          // Executar reload apenas após a navegação para a rota '/main'
          location.reload();
        });
      },
      (err: any) => {
        this.mensagem = "Usuário/Senha inválidos";
        this.loading = false;
      }
    )

    console.log("esse é o login: "+ this.login.login)
    console.log("esse é a senha: "+ this.login.password)
    }

}

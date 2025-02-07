import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  deslogar() {
throw new Error('Method not implemented.');
}
  isLogoActive: boolean = true; // Inicializa como true quando o componente é inicializado

  constructor() { }

  ngOnInit(): void {
    // Qualquer lógica adicional que você deseja executar quando o componente é inicializado
  }

}

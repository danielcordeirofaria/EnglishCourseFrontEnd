import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from '../../models/professor';
import { ProfessorService } from '../../services/professor.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-professor-detalhes',
  templateUrl: './professor-detalhes.component.html',
  styleUrls: ['./professor-detalhes.component.css']
})
export class ProfessorDetalhesComponent implements OnInit {
  professor: Professor | undefined;
  modoEdicao: boolean = false;
  professorOriginal: Professor | undefined;

  constructor(
    private professorService: ProfessorService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.carregarDetalhesProfessor();
  }

  buscarCep(cep: string): void {
    if (cep && cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
        (dados: any) => {
          if (dados) {
            if (this.professor) {
              this.professor.endereco.logradouro = dados.logradouro || '';
              this.professor.endereco.bairro = dados.bairro || '';
              this.professor.endereco.cidade = dados.localidade || '';
              this.professor.endereco.estado = dados.uf || '';
            }
          }
        },
        (error: any) => {
          console.error('Erro ao buscar o CEP:', error);
        }
      );
    }
  }

  carregarDetalhesProfessor(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.professorService.buscarProfessorPorId(id)
      .subscribe(
        (professor: Professor) => {
          this.professor = professor;
          this.professorOriginal = { ...professor };
        },
        (error: any) => {
          console.error('Erro ao buscar professor', error);
        }
      );
  }

  voltar(): void {
    this.router.navigate(['/consulta-professores']);
  }

  editar(): void {
    this.modoEdicao = true;
  }

  salvar(): void {
    if (this.professor) {
      const id = this.professor.idProfessor!;
      this.professorService.atualizarProfessor(id, this.professor).subscribe(
        (res: any) => {
          console.log('Professor salvo com sucesso:', res);
          this.modoEdicao = false;
          this.voltar();
        },
        (err: any) => {
          console.error('Erro ao salvar professor', err);
        }
      );
    }
  }

  

  cancelar(): void {
    this.modoEdicao = false;
    this.professor = this.professorOriginal;
  }

  getWhatsAppLink(whatsappNumber: string): string {
    // Remove todos os caracteres não numéricos
    const cleanedNumber = whatsappNumber.replace(/\D/g, '');
  
    // Adiciona o código do país (55 para Brasil) se não estiver presente
    if (!cleanedNumber.startsWith('55')) {
      return '55' + cleanedNumber;
    }
  
    return cleanedNumber;
  }
}

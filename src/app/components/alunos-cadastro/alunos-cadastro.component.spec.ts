import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosCadastroComponent } from './alunos-cadastro.component';

describe('AlunosCadastroComponent', () => {
  let component: AlunosCadastroComponent;
  let fixture: ComponentFixture<AlunosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlunosCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlunosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

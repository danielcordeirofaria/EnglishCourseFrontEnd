import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessoresCadastroComponent } from './professores-cadastro.component';

describe('ProfessoresCadastroComponent', () => {
  let component: ProfessoresCadastroComponent;
  let fixture: ComponentFixture<ProfessoresCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessoresCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessoresCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorDetalhesComponent } from './professor-detalhes.component';

describe('ProfessorDetalhesComponent', () => {
  let component: ProfessorDetalhesComponent;
  let fixture: ComponentFixture<ProfessorDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessorDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

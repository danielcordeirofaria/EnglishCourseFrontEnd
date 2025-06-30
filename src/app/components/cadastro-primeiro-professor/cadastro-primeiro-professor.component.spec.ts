import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPrimeiroProfessorComponent } from './cadastro-primeiro-professor.component';

describe('CadastroPrimeiroProfessorComponent', () => {
  let component: CadastroPrimeiroProfessorComponent;
  let fixture: ComponentFixture<CadastroPrimeiroProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroPrimeiroProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroPrimeiroProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

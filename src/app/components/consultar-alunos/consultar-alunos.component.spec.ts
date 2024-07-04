import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAlunosComponent } from './consultar-alunos.component';

describe('ConsultarAlunosComponent', () => {
  let component: ConsultarAlunosComponent;
  let fixture: ComponentFixture<ConsultarAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarAlunosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

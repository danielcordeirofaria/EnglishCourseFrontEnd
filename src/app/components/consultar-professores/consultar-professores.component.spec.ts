import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProfessoresComponent } from './consultar-professores.component';

describe('ConsultarProfessoresComponent', () => {
  let component: ConsultarProfessoresComponent;
  let fixture: ComponentFixture<ConsultarProfessoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarProfessoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarProfessoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarTurmasComponent } from './consultar-turmas.component';

describe('ConsultarTurmasComponent', () => {
  let component: ConsultarTurmasComponent;
  let fixture: ComponentFixture<ConsultarTurmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarTurmasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

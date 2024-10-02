import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaDetalhesComponent } from './turma-detalhes.component';

describe('TurmaDetalhesComponent', () => {
  let component: TurmaDetalhesComponent;
  let fixture: ComponentFixture<TurmaDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurmaDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurmaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

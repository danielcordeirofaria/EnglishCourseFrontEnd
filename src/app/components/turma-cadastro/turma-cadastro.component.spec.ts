import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaComponent } from './turma-cadastro.component';

describe('TurmaCadastroComponent', () => {
  let component: TurmaComponent;
  let fixture: ComponentFixture<TurmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

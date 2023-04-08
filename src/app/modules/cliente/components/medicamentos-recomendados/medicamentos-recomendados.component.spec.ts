import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentosRecomendadosComponent } from './medicamentos-recomendados.component';

describe('Frame22Component', () => {
  let component: MedicamentosRecomendadosComponent;
  let fixture: ComponentFixture<MedicamentosRecomendadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicamentosRecomendadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicamentosRecomendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

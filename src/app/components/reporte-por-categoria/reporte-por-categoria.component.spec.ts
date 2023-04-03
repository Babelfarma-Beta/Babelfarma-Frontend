import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePorCategoriaComponent } from './reporte-por-categoria.component';

describe('ReportePorCategoriaComponent', () => {
  let component: ReportePorCategoriaComponent;
  let fixture: ComponentFixture<ReportePorCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportePorCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportePorCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

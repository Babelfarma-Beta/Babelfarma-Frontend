import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProductoComprasComponent } from './reporte-producto-compras.component';

describe('ReporteProductoComprasComponent', () => {
  let component: ReporteProductoComprasComponent;
  let fixture: ComponentFixture<ReporteProductoComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteProductoComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteProductoComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

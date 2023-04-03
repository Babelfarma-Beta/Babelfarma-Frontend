import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMontoPorMesComponent } from './reporte-monto-por-mes.component';

describe('ReporteMontoPorMesComponent', () => {
  let component: ReporteMontoPorMesComponent;
  let fixture: ComponentFixture<ReporteMontoPorMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMontoPorMesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteMontoPorMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

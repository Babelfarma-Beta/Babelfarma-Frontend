import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaFarmaciaComponent } from './ruta-farmacia.component';

describe('Frame17Component', () => {
  let component: RutaFarmaciaComponent;
  let fixture: ComponentFixture<RutaFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaFarmaciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

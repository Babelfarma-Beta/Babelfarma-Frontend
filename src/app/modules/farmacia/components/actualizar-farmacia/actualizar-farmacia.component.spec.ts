import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarFarmaciaComponent } from './actualizar-farmacia.component';

describe('ActualizarfarmaciaComponent', () => {
  let component: ActualizarFarmaciaComponent;
  let fixture: ComponentFixture<ActualizarFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarFarmaciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

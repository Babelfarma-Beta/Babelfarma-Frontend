import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFarmaciaComponent } from './registro-farmacia.component';

describe('Frame6Component', () => {
  let component: RegistroFarmaciaComponent;
  let fixture: ComponentFixture<RegistroFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroFarmaciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

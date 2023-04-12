import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaciaComponent } from './farmacia.component';

describe('Frame7Component', () => {
  let component: FarmaciaComponent;
  let fixture: ComponentFixture<FarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmaciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

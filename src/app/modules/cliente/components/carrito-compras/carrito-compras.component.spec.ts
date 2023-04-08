import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoComprasComponent } from './carrito-compras.component';

describe('Frame15Component', () => {
  let component: CarritoComprasComponent;
  let fixture: ComponentFixture<CarritoComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarritoComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

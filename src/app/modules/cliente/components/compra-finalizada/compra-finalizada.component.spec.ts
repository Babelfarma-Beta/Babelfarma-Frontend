import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraFinalizadaComponent } from './compra-finalizada.component';

describe('Frame19Component', () => {
  let component: CompraFinalizadaComponent;
  let fixture: ComponentFixture<CompraFinalizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraFinalizadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraFinalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

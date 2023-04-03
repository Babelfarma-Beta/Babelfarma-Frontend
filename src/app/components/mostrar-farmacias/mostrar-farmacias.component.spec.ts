import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarFarmaciasComponent } from './mostrar-farmacias.component';

describe('MostrarfarmaciasComponent', () => {
  let component: MostrarFarmaciasComponent;
  let fixture: ComponentFixture<MostrarFarmaciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarFarmaciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarFarmaciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

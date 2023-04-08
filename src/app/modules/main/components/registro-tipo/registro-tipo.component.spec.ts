import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTipoComponent } from './registro-tipo.component';

describe('Frame4Component', () => {
  let component: RegistroTipoComponent;
  let fixture: ComponentFixture<RegistroTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroTipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCompradorComponent } from './registro-comprador.component';

describe('Frame5Component', () => {
  let component: RegistroCompradorComponent;
  let fixture: ComponentFixture<RegistroCompradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCompradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

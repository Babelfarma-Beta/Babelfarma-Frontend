import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCompradorComponent } from './navbar-comprador.component';

describe('NavbarcompradorComponent', () => {
  let component: NavbarCompradorComponent;
  let fixture: ComponentFixture<NavbarCompradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarCompradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

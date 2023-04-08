import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { RegistroCompradorComponent } from './components/registro-comprador/registro-comprador.component';
import { RegistroFarmaciaComponent } from './components/registro-farmacia/registro-farmacia.component';


@NgModule({
  declarations: [NavbarComponent, RegistroCompradorComponent, RegistroFarmaciaComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularMaterialModule,
  ]
})
export class MainModule { }

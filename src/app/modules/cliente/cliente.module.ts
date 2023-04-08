import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { NavbarCompradorComponent } from './components/navbar-comprador/navbar-comprador.component';


@NgModule({
  declarations: [NavbarCompradorComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    AngularMaterialModule
  ]
})
export class ClienteModule { }

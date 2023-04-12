import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FarmaciaRoutingModule } from './farmacia-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FarmaciaRoutingModule,
    AngularMaterialModule
  ]
})
export class FarmaciaModule { }

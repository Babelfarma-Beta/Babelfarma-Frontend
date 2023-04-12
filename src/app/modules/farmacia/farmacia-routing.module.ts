import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarFarmaciaComponent } from './components/navbar-farmacia/navbar-farmacia.component';
import { FarmaciaComponent } from './components/farmacia/farmacia.component';
import { ReporteMontoPorMesComponent } from './components/reporte-monto-por-mes/reporte-monto-por-mes.component';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ActualizarProductoComponent } from './components/actualizar-producto/actualizar-producto.component';
import { MostrarVentasComponent } from './components/mostrar-ventas/mostrar-ventas.component';
import { ActualizarFarmaciaComponent } from './components/actualizar-farmacia/actualizar-farmacia.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarFarmaciaComponent,
    children:[
      {path: 'Farmacia', component: FarmaciaComponent},
      {path:'ReporteMontoPorMes', component: ReporteMontoPorMesComponent},
      {path: 'RegistarProducto', component:RegistrarProductoComponent},
      {path: 'ListaDeProductos', component: ListaProductosComponent},
      {path: 'ActualizarProducto', component:ActualizarProductoComponent},
      {path:'ListaDeVentas', component: MostrarVentasComponent},
      {path: 'ActualizarDatosFarmacia', component: ActualizarFarmaciaComponent},
      {path: '', component: FarmaciaComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmaciaRoutingModule { }

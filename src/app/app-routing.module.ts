import { ReporteMontoPorMesComponent } from './components/reporte-monto-por-mes/reporte-monto-por-mes.component';
import { MostrarVentasComponent } from './components/mostrar-ventas/mostrar-ventas.component';
import { ReportePorCategoriaComponent } from './components/reporte-por-categoria/reporte-por-categoria.component';
import { ActualizarFarmaciaComponent } from './components/actualizar-farmacia/actualizar-farmacia.component';
import { FarmaciaComponent } from './components/farmacia/farmacia.component';
import { ActualizarProductoComponent } from './components/actualizar-producto/actualizar-producto.component';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  //Pantallas inciales
  {
    path: 'home',
    loadChildren: () =>
    import('./modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'client',
    loadChildren: () =>
    import('./modules/cliente/cliente.module').then((m) => m.ClienteModule),
  },

  //Pantallas de la farmacia
  {path: 'Farmacia/:id', component: FarmaciaComponent},
  {path:'ReporteCategoria/:id', component: ReportePorCategoriaComponent},
  {path:'ReporteMontoPorMes/:id', component: ReporteMontoPorMesComponent},
  {path: 'RegistarProducto/:id', component:RegistrarProductoComponent},
  {path: 'ListaDeProductos/:id', component: ListaProductosComponent},
  {path: 'ActualizarProducto/:id/:idFarmacia', component:ActualizarProductoComponent},
  {path:'ListaDeVentas/:id', component: MostrarVentasComponent},
  {path: 'ActualizarDatosFarmacia/:id', component: ActualizarFarmaciaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

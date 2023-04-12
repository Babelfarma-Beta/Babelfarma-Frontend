import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompradorComponent } from './components/comprador/comprador.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { ReporteProductoComprasComponent } from './components/reporte-producto-compras/reporte-producto-compras.component';
import { ActualizarClienteComponent } from './components/actualizar-cliente/actualizar-cliente.component';
import { CarritoComprasComponent } from './components/carrito-compras/carrito-compras.component';
import { NavbarCompradorComponent } from './components/navbar-comprador/navbar-comprador.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarCompradorComponent,
    children:[
      {path: 'Comprador', component: CompradorComponent},
      {path: 'Busqueda', component: BusquedaComponent},
      {path:'ReporteProductoCompras', component: ReporteProductoComprasComponent},
      {path: 'ActualizarDatosCliente', component: ActualizarClienteComponent},
      {path: 'CarritoCompras', component: CarritoComprasComponent},
      {path: '', component: CompradorComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

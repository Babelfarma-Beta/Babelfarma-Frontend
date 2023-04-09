import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompradorComponent } from './components/comprador/comprador.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { ReporteProductoComprasComponent } from './components/reporte-producto-compras/reporte-producto-compras.component';
import { MedicamentosRecomendadosComponent } from './components/medicamentos-recomendados/medicamentos-recomendados.component';
import { MostrarFarmaciasComponent } from './components/mostrar-farmacias/mostrar-farmacias.component';
import { ActualizarClienteComponent } from './components/actualizar-cliente/actualizar-cliente.component';
import { CarritoComprasComponent } from './components/carrito-compras/carrito-compras.component';
import { RutaFarmaciaComponent } from './components/ruta-farmacia/ruta-farmacia.component';
import { CompraFinalizadaComponent } from './components/compra-finalizada/compra-finalizada.component';
import { NavbarCompradorComponent } from './components/navbar-comprador/navbar-comprador.component';

const routes: Routes = [
  {
    path: ':id',
    component: NavbarCompradorComponent,
    children:[
      {path: 'Comprador', component: CompradorComponent},
      {path: 'Busqueda', component: BusquedaComponent},
      {path:'ReporteProductoCompras/:id', component: ReporteProductoComprasComponent},
      {path: 'MedicamentosRecomendados', component: MedicamentosRecomendadosComponent},
      {path:'MostrarFarmacias', component: MostrarFarmaciasComponent},
      {path: 'ActualizarDatosCliente', component: ActualizarClienteComponent},
      {path: 'CarritoCompras', component: CarritoComprasComponent},
      {path: 'RutaFarmacia', component: RutaFarmaciaComponent},
      {path: 'CompraFinalizada', component: CompraFinalizadaComponent},
      {path: '', component: CompradorComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

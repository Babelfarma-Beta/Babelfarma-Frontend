import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroTipoComponent } from './modules/main/components/registro-tipo/registro-tipo.component';
import { LoginComponent } from './modules/main/components/login/login.component';
import { ContactanosComponent } from './modules/main/components/contactanos/contactanos.component';
import { CompradorComponent } from './modules/cliente/components/comprador/comprador.component';
import { ListaProductosComponent } from './modules/farmacia/components/lista-productos/lista-productos.component';
import { BusquedaComponent } from './modules/cliente/components/busqueda/busqueda.component';
import { NavbarFarmaciaComponent } from './modules/farmacia/components/navbar-farmacia/navbar-farmacia.component';
import { RegistrarProductoComponent } from './modules/farmacia/components/registrar-producto/registrar-producto.component';
import { ActualizarProductoComponent } from './modules/farmacia/components/actualizar-producto/actualizar-producto.component';
import { FarmaciaComponent } from './modules/farmacia/components/farmacia/farmacia.component';
import { InformacionComponent } from './modules/main/components/informacion/informacion.component';
import { CarritoComprasComponent } from './modules/cliente/components/carrito-compras/carrito-compras.component';
import { RecuperarCuentaComponent } from './modules/main/components/recuperar-cuenta/recuperar-cuenta.component';
import { ActualizarClienteComponent } from './modules/cliente/components/actualizar-cliente/actualizar-cliente.component';
import { ActualizarFarmaciaComponent } from './modules/farmacia/components/actualizar-farmacia/actualizar-farmacia.component';
import { MostrarVentasComponent } from './modules/farmacia/components/mostrar-ventas/mostrar-ventas.component';
import { ReporteMontoPorMesComponent } from './modules/farmacia/components/reporte-monto-por-mes/reporte-monto-por-mes.component';
import { ReporteProductoComprasComponent } from './modules/cliente/components/reporte-producto-compras/reporte-producto-compras.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroTipoComponent,
    LoginComponent,
    ContactanosComponent,
    CompradorComponent,
    ListaProductosComponent,
    BusquedaComponent,
    NavbarFarmaciaComponent,
    RegistrarProductoComponent,
    ActualizarProductoComponent,
    FarmaciaComponent,
    InformacionComponent,
    CarritoComprasComponent,
    RecuperarCuentaComponent,
    ActualizarClienteComponent,
    ActualizarFarmaciaComponent,
    MostrarVentasComponent,
    ReporteMontoPorMesComponent,
    ReporteProductoComprasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

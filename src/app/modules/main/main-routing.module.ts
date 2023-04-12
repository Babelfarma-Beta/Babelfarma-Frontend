import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroTipoComponent } from './components/registro-tipo/registro-tipo.component';
import { RecuperarCuentaComponent } from './components/recuperar-cuenta/recuperar-cuenta.component';
import { RegistroCompradorComponent } from './components/registro-comprador/registro-comprador.component';
import { RegistroFarmaciaComponent } from './components/registro-farmacia/registro-farmacia.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children:[
      {path: 'Informacion', component:InformacionComponent},
      {path: 'Contacatanos', component: ContactanosComponent},
      {path: 'Login', component: LoginComponent},
      {path: '', component: InformacionComponent},
      {path: 'registrotipo', component: RegistroTipoComponent},
      {path: 'RecuperaCuenta', component: RecuperarCuentaComponent},
    ]
  },
  {path: 'registroComprador', component: RegistroCompradorComponent},
  {path: 'registroDueñoFarmacia', component: RegistroFarmaciaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

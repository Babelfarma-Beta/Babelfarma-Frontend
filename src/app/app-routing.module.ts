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
  {
    path: 'farmacia',
    loadChildren: () =>
    import('./modules/farmacia/farmacia.module').then((m) => m.FarmaciaModule),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

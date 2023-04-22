import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGuardGuard } from './guards/permissions/client/client-guard.guard';
import { FarmaciaGuardGuard } from './guards/permissions/farmacia/farmacia-guard.guard';


const routes: Routes = [
  //Pantallas inciales
  {
    path: 'home',
    loadChildren: () =>
    import('./modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'client',
    loadChildren: () =>
    import('./modules/cliente/cliente.module').then((m) => m.ClienteModule),
    canActivate: [ClientGuardGuard]
  },
  {
    path: 'farmacia',
    loadChildren: () =>
    import('./modules/farmacia/farmacia.module').then((m) => m.FarmaciaModule),
    canActivate: [FarmaciaGuardGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmaciaGuardGuard implements CanActivate {

  constructor(private router: Router) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.hasUserFarmacia()){
        return true;
      }
      this.router.navigate(['/home']);
      return false;
  }

  hasUserFarmacia(): boolean{
    const farmaciaId = localStorage.getItem('farmaciaId');
    return !!farmaciaId;
  }

}

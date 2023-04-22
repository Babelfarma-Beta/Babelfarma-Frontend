import { Router, ActivatedRoute } from '@angular/router';
import { CarritoDeComprasService } from '../../../../services/carrito-de-compras.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FarmaciaService } from 'src/app/services/farmacia.service';

@Component({
  selector: 'app-navbar-farmacia',
  templateUrl: './navbar-farmacia.component.html',
  styleUrls: ['./navbar-farmacia.component.css']
})
export class NavbarFarmaciaComponent implements OnInit, OnDestroy {

  name!: string;
  idComprador!:any;
  mobileQuery!: MediaQueryList;
  fillerNav = Array.from({ length: 5 }, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private carritoService: CarritoDeComprasService,
    private router: Router,
    private route: ActivatedRoute,
    private farmaciaService: FarmaciaService

    ) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getClientName();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  salir(){
    this.carritoService.setproductosCarrito([]);
    localStorage.clear();
    this.router.navigate(['/']);
  }

  getClientName(){
      let clientId = localStorage.getItem('farmaciaId');

      this.farmaciaService.getFarmaciaId(clientId).subscribe((data)=>{
        this.name= data.nombresDuenio;
      })

  }


}

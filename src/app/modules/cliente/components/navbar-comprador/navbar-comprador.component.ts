import { Router, ActivatedRoute } from '@angular/router';
import { CarritoDeComprasService } from '../../../../services/carrito-de-compras.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-comprador',
  templateUrl: './navbar-comprador.component.html',
  styleUrls: ['./navbar-comprador.component.css']
})

export class NavbarCompradorComponent implements OnInit, OnDestroy {

  idComprador!:any;
  mobileQuery!: MediaQueryList;
  fillerNav = Array.from({ length: 5 }, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private carritoService: CarritoDeComprasService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.loadId();
  }

  loadId(){
    this.idComprador = this.route.snapshot.params['id'];
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  salir(){
    this.carritoService.setproductosCarrito([]);
    this.router.navigate(['/']);
  }


}


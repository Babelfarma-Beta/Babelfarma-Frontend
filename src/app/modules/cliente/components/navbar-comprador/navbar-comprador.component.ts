import { Router, ActivatedRoute } from '@angular/router';
import { CarritoDeComprasService } from '../../../../services/carrito-de-compras.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-navbar-comprador',
  templateUrl: './navbar-comprador.component.html',
  styleUrls: ['./navbar-comprador.component.css']
})

export class NavbarCompradorComponent implements OnInit, OnDestroy {

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
    private clientService: ClienteService

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
    localStorage.clear();
    this.router.navigate(['/']);
  }

  getCantidad(): any{
    let carrito = localStorage.getItem('carrito');


    if(carrito)
    {
      let arreglo = JSON.parse(carrito);
      return arreglo.length;
    }
  }

  getClientName(){
      let clientId = localStorage.getItem('userId');

      this.clientService.getClienteId(clientId).subscribe((data)=>{
        this.name= data.nombres;
      })

  }


}


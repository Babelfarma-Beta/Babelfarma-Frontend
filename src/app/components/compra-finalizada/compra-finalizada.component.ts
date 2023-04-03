import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compra-finalizada',
  templateUrl: './compra-finalizada.component.html',
  styleUrls: ['./compra-finalizada.component.css']
})
export class CompraFinalizadaComponent implements OnInit {

  idClienteIngresado!: any;
  constructor(
    private route: ActivatedRoute
  ) {
    this. getClienteId();
   }

  ngOnInit(): void {
  }

  getClienteId(){
    this.idClienteIngresado = this.route.snapshot.params['id'];
  }
}

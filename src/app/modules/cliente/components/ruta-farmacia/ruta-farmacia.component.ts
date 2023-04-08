import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-farmacia',
  templateUrl: './ruta-farmacia.component.html',
  styleUrls: ['./ruta-farmacia.component.css']
})
export class RutaFarmaciaComponent implements OnInit {

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

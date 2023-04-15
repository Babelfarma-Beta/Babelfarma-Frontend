import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "autoplay":true, "autoplaySpeed": 3000};



  slides = [
    {
      title: 'Farmacias',
      description: 'Son los encargados de vender los medicamentos',
      image: '../../../../assets/img/farmacia.jpg'
    },
    {
      title: 'Clientes',
      description:'Pueden comprar productos de distintas farmacias',
      image: '../../../../assets/img/cliente.jpg'
    },
  ];

  images = [
    {
      url:'local_pharmacy',
      detail:'Múltiples medicamentos'
    },
    {
      url:'location_on',
      detail:'Distintas farmacias disponibles'
    },
    {
      url:'person',
      detail:'Regístrate y empieza a navegar'
    },
    {
      url:'description',
      detail:'Múltiples reportes disponibles'
    },
    {
      url:'bar_chart',
      detail:'Gráficos disponibles'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

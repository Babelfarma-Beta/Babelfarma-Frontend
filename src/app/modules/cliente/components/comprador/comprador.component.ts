import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import { Farmacia } from 'src/app/models/farmacia';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comprador',
  templateUrl: './comprador.component.html',
  styleUrls: ['./comprador.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompradorComponent implements OnInit {

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['ProblemasDeSaludComunes'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null | undefined;
  products:Product[]=[];
  nombresFarmacias:string[]=[];


  constructor(    private productService: ProductService,
    private farmaciaService: FarmaciaService,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.getProducts();
  }

  getProducts(){
    this.productService.getProductoPrecio().subscribe(
      (data)=>{
        this.processProductResponse(data);
      },
      (error: any) => {
        console.log('error en productos: ', error);
      }
    );
  }

  processProductResponse(resp: any) {
    const dateProduct: Product[] = [];

      let listCProduct = resp;

      listCProduct.forEach((element: Product) => {
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dateProduct.push(element);

        this.farmaciaService.getFarmaciaByProductoId(element.id).subscribe((data:Farmacia)=>{
          this.nombresFarmacias[element.id]=(data.nombreEstablecimiento);
        })

      });

      this.products=dateProduct;
  }

  gotoBusqueda(){
    this.router.navigate([`client/Busqueda`]);
  }

}

export interface PeriodicElement {
  ProblemasDeSaludComunes: string;
  description1: string;
  description2: string;
  description3: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    ProblemasDeSaludComunes: 'Asma',
    description1: "• Aerosol Inhalación Bucal",
    description2: "• Bunedosida 200mcg Inhlador",
    description3: " ",
  },
  {
    ProblemasDeSaludComunes: "Dolor de Cabeza",
    description1: "• Aspirina",
    description2: "• Paracetamol",
    description3: "• Ibuprofeno",
  },
  {
    ProblemasDeSaludComunes: 'Bronquitis Aguda',
    description1: "• Dipirona",
    description2: "• Ibuprofeno ",
    description3: "• Amoxicilina",
  },
  {
    ProblemasDeSaludComunes: 'Covid - 19 / Coronavirus',
    description1: "• Tylenol",
    description2: "• Motrin",
    description3: " ",
  },
  {
    ProblemasDeSaludComunes: 'Dolor de garganta',
    description1: "• Amoxixilina",
    description2: "• Ibuprofeno",
    description3: "• Paracetamol",
  },
];

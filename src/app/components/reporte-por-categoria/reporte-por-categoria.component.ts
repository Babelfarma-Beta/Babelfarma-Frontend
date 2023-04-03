import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { FarmaciaService } from '../../services/farmacia.service';
import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-reporte-por-categoria',
  templateUrl: './reporte-por-categoria.component.html',
  styleUrls: ['./reporte-por-categoria.component.css']
})
export class ReportePorCategoriaComponent implements OnInit {

  idFarmacia!:any;
  chartdoughnut: any;
  chartBar: any;

  constructor(private productService: ProductService,
    private route: ActivatedRoute
  ) {
    Chart.register(...registerables)
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.idFarmacia = this.route.snapshot.params['id'];
    this.productService.getProductoFarmacia(this.idFarmacia).subscribe({
      next: (data)=>{
        this.processProductResponse(data);
        this.processProductCategoryResponse(data);
      },

      error: (error) =>{
        console.log(error);
      },

    })
  }


  processProductResponse(resp: any) {
    const nameProduct: String[]= [];
    const account: number[] = [];

    let listCProduct= resp; 
    console.log('listCProduct', listCProduct);

    listCProduct.forEach((element:Product) => {
      nameProduct.push(element.nombre);
      account.push(element.stock);
    });

    this.chartdoughnut = new Chart('canvas-doughnut',{
      type:'doughnut',
      data:{
        labels: nameProduct,
        datasets:[
          {
            label:'Productos',
            data:account,
            borderColor: '#3cba8f',
            backgroundColor:[
              'rgba(255,99,132,0.9)',
              'rgba(54,162,235,0.9)',
              'rgba(255,206,86,0.9)',
              'rgba(75,192,192,0.9)',
              'rgba(153,102,0,0.9)',
              'rgba(255,159,64,0.9)',
            ]
          }
        ]
      }
    })
  
  }

  processProductCategoryResponse(resp: any) {
    const nameCategory: String[]= [];
    const nameUniqueCategories: String[]=[];
    const account: number[] = [];
    var x=0;

    let listCProduct= resp; 

    
    listCProduct.forEach((element:Product) => {
      nameCategory.push(element.categoria.categoria);
    });

    for(let i = 0 ; i < nameCategory.length ; i++)
    {
      if(nameUniqueCategories.includes(nameCategory[i])){
      
      }
      else{
        nameUniqueCategories.push(nameCategory[i]);
      }
    }

  
      
      for(let j = 0 ; j < nameUniqueCategories.length ; j++){
        x=0;
          for(let i = 0 ; i < listCProduct.length ; i++){
            if(listCProduct[i].categoria.categoria==nameUniqueCategories[j]){
              x+=listCProduct[i].stock;
            }
        }
        account.push(x);
      }

    


    this.chartBar = new Chart('canvas-bar',{
      type:'bar',
      data:{
        labels: nameUniqueCategories,
        datasets:[
          {
            label:'Categoría',
            data:account,
            borderColor: '#3cba8f',
            backgroundColor:[
              'rgba(255,99,132,0.9)',
              'rgba(54,162,235,0.9)',
              'rgba(255,206,86,0.9)',
              'rgba(75,192,192,0.9)',
              'rgba(153,102,0,0.9)',
              'rgba(255,159,64,0.9)',
            ]
          }
        ]
      }
    })
  
  }
}

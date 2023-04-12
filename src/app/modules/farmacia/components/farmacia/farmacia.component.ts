import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css']
})
export class FarmaciaComponent implements OnInit {

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
    this.idFarmacia = localStorage.getItem('farmaciaId');
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
              '#3f51B5',
              '#5e64d1',
              '#7b82ee',
              '#989cff',
              '#b5b7ff',
              '#d2d2ff',
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

    for(const element of nameCategory)
    {
      if(nameUniqueCategories.includes(element)){

      }
      else{
        nameUniqueCategories.push(element);
      }
    }



      for(const element of nameUniqueCategories){
        x=0;
          for(let product of listCProduct){
            if(product.categoria.categoria==element){
              x+=product.stock;
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
              '#3f51B5',
              '#5e64d1',
              '#7b82ee',
              '#989cff',
              '#b5b7ff',
              '#d2d2ff',
            ]
          }
        ]
      }
    })

  }
}

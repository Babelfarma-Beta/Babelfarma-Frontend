import { Venta } from '../../../../models/venta';
import { Chart, registerables } from 'chart.js/auto';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from '../../../../services/venta.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reporte-producto-compras',
  templateUrl: './reporte-producto-compras.component.html',
  styleUrls: ['./reporte-producto-compras.component.css']
})
export class ReporteProductoComprasComponent {
  chartBar: any;
  idCliente!:any;
  constructor(private ventasService: VentaService,
    private route: ActivatedRoute
  ) {
    Chart.register(...registerables)
   }

  ngOnInit(): void {
    this.getCompras();
  }

  getCompras(){
    this.idCliente = localStorage.getItem('userId');
    this.ventasService.getVentasByIdCliente(this.idCliente).subscribe({
      next: (data)=>{
        this.processVentasMontoResponse(data);
      },

      error: (error) =>{
        console.log(error);
      },

    })
  }


  processVentasMontoResponse(resp: any) {
    const productos: string[]= [];
    const productosUnicos: string []= [];
    const account: number[] = [];
    let x=0;

    let listCVenta= resp;

    listCVenta.forEach((element:Venta) => {
      productos.push(element.producto.nombre);
    });

    for(let element of productos)
    {
      if(productosUnicos.includes(element)){
        // TODO document why this block is empty

      }
      else{
        productosUnicos.push(element);
      }
    }

      for(let element of productosUnicos){
        x=0;
          for(let venta of listCVenta){
            if(venta.producto.nombre==element){
              x+=1;
            }

        }
        account.push(x);
      }

    this.chartBar = new Chart('canvas-bar',{
      type:'bar',
      data:{
        labels: productosUnicos,
        datasets:[
          {
            label:'Compras por Producto',
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

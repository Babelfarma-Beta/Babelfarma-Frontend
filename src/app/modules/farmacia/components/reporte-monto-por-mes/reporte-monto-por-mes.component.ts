import { Venta } from '../../../../models/venta';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from '../../../../services/venta.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reporte-monto-por-mes',
  templateUrl: './reporte-monto-por-mes.component.html',
  styleUrls: ['./reporte-monto-por-mes.component.css']
})
export class ReporteMontoPorMesComponent {
  idFarmacia!:any;
  chartdoughnut: any;
  chartBar: any;

  constructor(private ventasService: VentaService,
    private route: ActivatedRoute
  ) {
    Chart.register(...registerables)
   }

  ngOnInit(): void {
    this.getVentas();
  }

  getVentas(){
    this.idFarmacia = localStorage.getItem('farmaciaId');
    this.ventasService.getVentasByIdFarmacia(this.idFarmacia).subscribe({
      next: (data)=>{
        this.processVentasMontoResponse(data);
      },

      error: (error) =>{
        console.log(error);
      },

    })
  }


  processVentasMontoResponse(resp: any) {
    const meses: string[]= ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre'
  ,'Noviembre','Diciembre'];
    const account: number[] = [];
    let x=0;

    let listCVenta= resp;


      for(let j = 1 ; j <=meses.length ; j++){
        x=0;
          for(const element of listCVenta){
            if(element.fecha.substring(5,7) ==j){
              x+=element.precioTotal;
            }

        }
        account.push(x);
      }

    this.chartBar = new Chart('canvas-bar',{
      type:'bar',
      data:{
        labels: meses,
        datasets:[
          {
            label:'Monto',
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




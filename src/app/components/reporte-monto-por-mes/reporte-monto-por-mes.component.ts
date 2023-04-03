import { Venta } from './../../models/venta';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from './../../services/venta.service';
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
    this.idFarmacia = this.route.snapshot.params['id'];
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
    var x=0;

    let listCVenta= resp; 
  
      
      for(let j = 1 ; j <=meses.length ; j++){
        x=0;
          for(let i = 0 ; i < listCVenta.length ; i++){
            if(listCVenta[i].fecha.substring(5,7) ==j){
              x+=listCVenta[i].precioTotal;
            }
          
        }
        account.push(x);
      }

    
    console.log(account);

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




import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { VentaService } from '../../../../services/venta.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VentaView } from '../../../../models/venta';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mostrar-ventas',
  templateUrl: './mostrar-ventas.component.html',
  styleUrls: ['./mostrar-ventas.component.css']
})
export class MostrarVentasComponent {
  displayedColumns: string[] = ['id', 'cantidad', 'fecha', 'precioTotal', 'precioUnit','cliente','producto'];
  dataSource = new MatTableDataSource<VentaView>();

  MyForm!: FormGroup;
  ventas!: VentaView[];
  idFarmacia!:any;
  numeroMes!:any;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild('tab') tabGroup!: MatTabGroup;

  constructor(private ventasService: VentaService,
    private fb: FormBuilder) {
       this.reactiveForm()
    }


  ngOnInit(): void {
    this.getVentas();
  }

  reactiveForm() {
    this.MyForm = this.fb.group({
      nombre: [''],
    })
  }

  getVentas() {
    this.idFarmacia = localStorage.getItem('farmaciaId');
    this.ventasService.getVentasByIdFarmacia(this.idFarmacia).subscribe((data:VentaView[])=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.MyForm = this.fb.group({
      nombre: [''],
      mes: ['']
    })

  }

  search() {
    if (this.tabGroup.selectedIndex == 0) {
      let nombreCliente = this.MyForm.value['nombre'];
      this.ventasService.getVentasByClienteName( nombreCliente,this.idFarmacia).subscribe(
        (data)=>{
          this.dataSource = new MatTableDataSource(data);
      },
      (error: any) => {
        console.log('error en productos: ', error);
      }
      )
    }
    if (this.tabGroup.selectedIndex == 1) {
      this.ventasService.getVentasByMes(this.numeroMes,this.idFarmacia).subscribe(
        (data)=>{
          this.dataSource = new MatTableDataSource(data);
      },
      (error: any) => {
        console.log('error en productos: ', error);
      }
      )
    }
  }


}


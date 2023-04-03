import { DistritoService } from './../../services/distrito.service';
import { Distrito } from './../../models/distrito';
import { Form, FormGroup, FormBuilder } from '@angular/forms';
import { NavbarCompradorComponent } from '../navbar-comprador/navbar-comprador.component';
import { FarmaciaService } from './../../services/farmacia.service';
import { Farmacia } from './../../models/farmacia';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-mostrar-farmacias',
  templateUrl: './mostrar-farmacias.component.html',
  styleUrls: ['./mostrar-farmacias.component.css']
})
export class MostrarFarmaciasComponent implements OnInit {

  MyForm!: FormGroup;
  farmacias!:Farmacia[];
  nombreDistrito!: string;
  distritos!: Distrito[];
  @ViewChild('tab') tabGroup!: MatTabGroup;

  constructor(
    private distritoService: DistritoService,
    private farmaciaService: FarmaciaService,
    private fb: FormBuilder
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
    this.getFarmacias(),
    this.getDistritos()
  }

  reactiveForm() {
    this.MyForm = this.fb.group({
      nombreEstablecimiento: [''],
      direccion: [''],
      distrito: [''],
    })
  }


  getFarmacias(){
    this.reactiveForm();

    this.farmaciaService.getFarmacias().subscribe((data: Farmacia[]) => {
      this.farmacias = data;
    });
  }

  getDistritos(): void{
    this.distritoService.getDistrito().subscribe((data: Distrito[]) => {
      this.distritos=data;
    });
  }

  search() {
    if (this.tabGroup.selectedIndex == 0) {
      let nombreEstablecimiento = this.MyForm.value['nombreEstablecimiento'];
      this.farmaciaService.getFarmaciaNombre(nombreEstablecimiento).subscribe((data)=>{
        this.farmacias=data;
      })
    }
    else
    if (this.tabGroup.selectedIndex == 1) {
      let direccion = this.MyForm.value['direccion'];
      this.farmaciaService.getFarmaciaDireccion(direccion).subscribe((data)=>{
        this.farmacias=data;
      })
    }
    else

    if (this.tabGroup.selectedIndex == 2) {
      let distrito = this.nombreDistrito;
      this.farmaciaService.getFarmaciaDistrito(distrito).subscribe((data)=>{
        this.farmacias=data;
      })
    }
  }


}



import { Role } from './../../models/role';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DistritoService } from './../../services/distrito.service';
import { FarmaciaService } from './../../services/farmacia.service';
import { Farmacia } from './../../models/farmacia';
import { Distrito } from './../../models/distrito';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizar-farmacia',
  templateUrl: './actualizar-farmacia.component.html',
  styleUrls: ['./actualizar-farmacia.component.css']
})
export class ActualizarFarmaciaComponent implements OnInit {

  input = new FormControl('', [Validators.required]);
  myForm!: FormGroup;
  idDistrito!: number;
  distritos!: Distrito[];
  farmacia!: Farmacia;
  idFarmacia: any;

  constructor(
    private fb: FormBuilder,
    private farmaciaService: FarmaciaService ,
    private distritoService: DistritoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loadId();
    this.reactiveForm();
    this.loadFarmacia();
    this.getDistritos();
  }

  ngOnInit(): void {
  }

  loadId(){
    this.idFarmacia = this.route.snapshot.paramMap.get('id');
  }

  reactiveForm(){
    this.myForm = this.fb.group({
      direccion: ['', [Validators.required]],
      correoContacto: ['', [Validators.required, Validators.maxLength]],
      telefonoContacto: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
    }
    )
  }


  loadFarmacia() {

    this.farmaciaService.getFarmaciaId(this.idFarmacia)
    .subscribe((data)=>{
      this.farmacia = data;
      this.myForm = this.fb.group({
        direccion: [this.farmacia.direccion, [Validators.required]],
        correoContacto: [this.farmacia.correoContacto, [Validators.required, Validators.maxLength]],
        telefonoContacto: [this.farmacia.telefonoContacto, [Validators.required]],
        distrito: [this.farmacia.distrito.id, [Validators.required]],

      });
      this.idDistrito= this.farmacia.distrito.id;
    })
  }

  updateFarmacia(){
      let r = new Role();
      r.id= 1;

      let d= new Distrito();
      d.id= this.idDistrito;

      const farmacia: Farmacia = {
        id: 0,
        ruc: this.farmacia.ruc,
        nombresDuenio: this.farmacia.nombresDuenio,
        apellidosDuenio: this.farmacia.apellidosDuenio,
        nombreEstablecimiento: this.farmacia.nombreEstablecimiento,
        direccion: this.myForm.get('direccion')!.value,
        correoContacto: this.myForm.get('correoContacto')!.value,
        telefonoContacto: this.myForm.get('telefonoContacto')!.value,
        distrito: d,
        contraseña:this.farmacia.contraseña,
        role:r,
      };

      this.farmaciaService.updateFarmacia(this.idFarmacia, farmacia).subscribe({
        next: (data) => {
          this.snackBar.open('La farmacia fue actualizada con exito!', '', {
            duration: 3000,
          });
          this.router.navigate([`/Farmacia/${this.idFarmacia}`]);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getDistritos(): void{
    this.distritoService.getDistrito().subscribe((data: Distrito[]) => {
      this.distritos=data;
    });
  }

}

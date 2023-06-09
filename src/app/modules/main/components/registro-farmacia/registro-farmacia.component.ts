
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Distrito } from 'src/app/models/distrito';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { Farmacia } from 'src/app/models/farmacia';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-registro-farmacia',
  templateUrl: './registro-farmacia.component.html',
  styleUrls: ['./registro-farmacia.component.css']
})
export class RegistroFarmaciaComponent implements OnInit {
  myForm!: FormGroup;
  idDistrito!: number;
  distritos!: Distrito[];
  container!: HTMLElement;


  constructor(
    private fb: FormBuilder,
    private farmaciaService: FarmaciaService,
    private distritoService: DistritoService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.reactiveForm();
    this.getDistritos();
  }

  ngOnInit(): void {
    this.container = document.getElementById('container') as HTMLElement;
    window.addEventListener('resize', () => {
      this.adjustScroll();
    });
  }

  adjustScroll() {
    if (window.innerWidth >= 800) {
      this.container.scrollTop = 0;
    }
  }

  onNextClick() {
    this.container.scrollTop += 900;
  }

  onPreviousClick() {
    this.container.scrollTop -= 900;
  }

  getDistritos(): void{
    this.distritoService.getDistrito().subscribe((data: Distrito[]) => {
      this.distritos=data;
    });
  }

  reactiveForm(){
    this.myForm = this.fb.group({
      id: [''],
      ruc: ['', [Validators.required, Validators.min(10000000000), Validators.max(99999999999)]],
      nombresDuenio: ['', [Validators.required]],
      apellidosDuenio: ['', [Validators.required]],
      nombreEstablecimiento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      correoContacto: ['', [Validators.required, Validators.email]],
      telefonoContacto: ['', [Validators.required, Validators.min(900000000), Validators.max(999999999)]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]],
      confContraseña:['', [Validators.required]]
    })
  }
  saveFarmacia(){
    const contraseña: string = this.myForm.get('contraseña')!.value;
    const confContraseña: string = this.myForm.get('confContraseña')!.value;
    if(contraseña == confContraseña){
      let r = new Role();
      r.id= 1;

      let d= new Distrito();
      d.id= this.idDistrito;

      const farmacia: Farmacia={
        id: 0,
        ruc: Number(this.myForm.get('ruc')!.value),
        nombresDuenio: this.myForm.get('nombresDuenio')!.value,
        apellidosDuenio: this.myForm.get('apellidosDuenio')!.value,
        nombreEstablecimiento: this.myForm.get('nombreEstablecimiento')!.value,
        direccion: this.myForm.get('direccion')!.value,
        correoContacto: this.myForm.get('correoContacto')!.value,
        telefonoContacto: this.myForm.get('telefonoContacto')!.value,
        distrito: d,
        contraseña: this.myForm.get('contraseña')!.value,
        role: r,
      }

      this.farmaciaService.addFarmacia(farmacia).subscribe({
        next:(data)=>{
          this.snackBar.open('Se ha registrado correctamente', '', {
            duration: 3000
          });
          this.router.navigate(['home/Login']);
        },
        error:(err)=>{
          this.snackBar.open('Este correo ya está registrado como farmacia', '',{
            duration: 5000,
          });
        },
      });
    }
    else{
      this.snackBar.open('Las contraseñas ingresadas no coinciden', '',{
        duration: 5000,
      });
    }
  }
}

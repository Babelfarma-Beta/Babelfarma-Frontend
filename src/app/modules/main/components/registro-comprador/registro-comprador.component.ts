import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Distrito } from 'src/app/models/distrito';
import { ClienteService } from 'src/app/services/cliente.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { Cliente } from 'src/app/models/cliente';
import { Role } from 'src/app/models/role';


@Component({
  selector: 'app-registro-comprador',
  templateUrl: './registro-comprador.component.html',
  styleUrls: ['./registro-comprador.component.css']
})
export class RegistroCompradorComponent implements OnInit {
  myForm!: FormGroup;
  idDistrito!: number;
  distritos!: Distrito[];
  container!: HTMLElement;


  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService ,
    private distritoService: DistritoService,
    private snackBar: MatSnackBar,
    private router: Router
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


  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      dni: ['', [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
      nombres: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.min(900000000),Validators.max(999999999)]],
      fechaNacimiento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]],
      distrito: ['', [Validators.required]],
      confContraseña: ['', [Validators.required]],
    });

  }


  saveCliente(){
    const contraseña: string = this.myForm.get('contraseña')!.value;
    const confContraseña: string = this.myForm.get('confContraseña')!.value;
    if(contraseña == confContraseña){
      let r = new Role();
      r.id= 2;

      let d= new Distrito();
      d.id= this.idDistrito;

      const fechaNacimiento = new Date(this.myForm.get('fechaNacimiento')!.value);
      fechaNacimiento.setDate(fechaNacimiento.getDate() + 1);

      const cliente: Cliente = {
        id: 0,
        dni: this.myForm.get('dni')!.value,
        nombres: this.myForm.get('nombres')!.value,
        apellidoPaterno: this.myForm.get('apellidoPaterno')!.value,
        apellidoMaterno: this.myForm.get('apellidoMaterno')!.value,
        sexo: this.myForm.get('sexo')!.value,
        correo: this.myForm.get('correo')!.value,
        celular: this.myForm.get('celular')!.value,
        fechaNacimiento: fechaNacimiento,
        direccion: this.myForm.get('direccion')!.value,
        distrito:d,
        contraseña: this.myForm.get('contraseña')!.value,
        role:r,
      };

      this.clienteService.addCliente(cliente).subscribe({
        next: (data) => {
          this.snackBar.open('El cliente fue registrado con exito!', '', {
            duration: 3000,
          });
          this.router.navigate(['home/Login']);
        },
        error: (err) => {
          this.snackBar.open('Este correo ya está registrado como cliente', '',{
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

  getDistritos(): void{
    this.distritoService.getDistrito().subscribe((data: Distrito[]) => {
      this.distritos=data;
    });
  }
}

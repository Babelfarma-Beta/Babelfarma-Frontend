import { Role } from './../../models/role';
import { Distrito } from './../../models/distrito';
import { DistritoService } from './../../services/distrito.service';
import { Cliente } from './../../models/cliente';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from './../../services/cliente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-comprador',
  templateUrl: './registro-comprador.component.html',
  styleUrls: ['./registro-comprador.component.css']
})
export class RegistroCompradorComponent implements OnInit {
  myForm!: FormGroup;
  idDistrito!: number;
  distritos!: Distrito[];

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
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      dni: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      celular: ['', [Validators.required]],
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

      const cliente: Cliente = {
        id: 0,
        dni: this.myForm.get('dni')!.value,
        nombres: this.myForm.get('nombres')!.value,
        apellidoPaterno: this.myForm.get('apellidoPaterno')!.value,
        apellidoMaterno: this.myForm.get('apellidoMaterno')!.value,
        sexo: this.myForm.get('sexo')!.value,
        correo: this.myForm.get('correo')!.value,
        celular: this.myForm.get('celular')!.value,
        fechaNacimiento: this.myForm.get('fechaNacimiento')!.value,
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
          this.router.navigate(['/Login']);
        },
        error: (err) => {
          console.log(err);
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

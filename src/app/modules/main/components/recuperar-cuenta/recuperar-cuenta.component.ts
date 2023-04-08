import { Farmacia } from '../../../../models/farmacia';
import { FarmaciaService } from '../../../../services/farmacia.service';
import { Role } from '../../../../models/role';
import { getTestBed } from '@angular/core/testing';
import { ClienteService } from '../../../../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../../services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { Distrito } from 'src/app/models/distrito';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.component.html',
  styleUrls: ['./recuperar-cuenta.component.css']
})
export class RecuperarCuentaComponent implements OnInit {
  myForm!: FormGroup;
  cliente!: Cliente;
  farmacia!: Farmacia;
  nombre!: string;
  idDistrito!: number;
  apellidoPaterno!: string;
  apellidoMaterno!: string;
  celular!: number;
  idCliente: any;
  constructor(

    private fb: FormBuilder,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private router: Router,
    private farmaciaService: FarmaciaService,
    ) {
  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      id: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contrasenia: ['', [Validators.required,Validators.minLength(8)]],
      confContrasenia: ['', [Validators.required]],
    })
  }

  updateContrasenia(){
    const contraseña: string = this.myForm.get('contrasenia')!.value;
    const confContraseña: string = this.myForm.get('confContrasenia')!.value;
    if(contraseña == confContraseña){
      if(this.myForm.get('id')!.value >= 10000000 && this.myForm.get('id')!.value <= 99999999){
        this.clienteService.getClienteDniCorreo(this.myForm.get('id')!.value, this.myForm.get('correo')!.value).subscribe((data: Cliente)=>{
          this.cliente={
            id: data.id,
            dni: data.dni,
            nombres: data.nombres,
            apellidoPaterno: data.apellidoPaterno,
            apellidoMaterno: data.apellidoMaterno,
            sexo: data.sexo,
            correo: data.correo,
            celular: data.celular,
            fechaNacimiento: data.fechaNacimiento,
            direccion: data.direccion,
            distrito: data.distrito,
            contraseña: this.myForm.get('contrasenia')!.value,
            role: data.role,
          }
          this.clienteService.updateCliente(this.cliente.id, this.cliente).subscribe({
            next: (data) => {
              this.snackBar.open('Se actualizó correctamente la contraseña', '', {
                duration: 3000,
              });
              this.router.navigate(['/Login']);
            },
            error: (err) => {
              console.log(err);
            },
          });
        });
      }
      else if(this.myForm.get('id')!.value >= 10000000000 && this.myForm.get('id')!.value <= 99999999999){
        this.farmaciaService.getFarmaciaRucCorreo(this.myForm.get('id')!.value, this.myForm.get('correo')!.value).subscribe((data: Farmacia)=>{
          this.farmacia={
            id: data.id,
            ruc: data.ruc,
            nombresDuenio: data.nombresDuenio,
            apellidosDuenio: data.apellidosDuenio,
            nombreEstablecimiento: data.nombreEstablecimiento,
            direccion: data.direccion,
            correoContacto: data.correoContacto,
            telefonoContacto: data.telefonoContacto,
            distrito: data.distrito,
            contraseña: this.myForm.get('contrasenia')!.value,
            role: data.role,
          }
          this.farmaciaService.updateFarmacia(this.farmacia.id, this.farmacia).subscribe({
            next: (data) => {
              this.snackBar.open('Se actualizó correctamente la contraseña', '', {
                duration: 3000,
              });
              this.router.navigate(['/Login']);
            },
            error: (err) => {
              console.log(err);
            },
          });
        });
      }
      else{
        this.snackBar.open('Por favor verifique su RUC/DNI', '', {
          duration: 3000,
        });
      }
    }
    else{
      this.snackBar.open('Las contraseñas ingresadas no coinciden', '',{
        duration: 5000,
      });
    }
  }
}

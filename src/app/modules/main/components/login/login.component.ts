import { FarmaciaService } from '../../../../services/farmacia.service';
import { Farmacia } from '../../../../models/farmacia';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';
import { Cliente } from '../../../../models/cliente';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  idClienteIngresado!:number;
  idFarmaciaIngresada!:number;
  myForm!: FormGroup;
  clientes!: Cliente[];
  farmacias!: Farmacia[];

  constructor(private clienteService:ClienteService,
    private farmaciaService:FarmaciaService,
     private router: Router,
     private fb: FormBuilder,
     private snackBar: MatSnackBar
     ) {
    this.reactiveForm();
   }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty


  }


  reactiveForm() {
    this.myForm = this.fb.group({

      correo: ['', [Validators.required,Validators.email]],
      contraseña: ['', [Validators.required]],

    });
  }

  validate():void{
    let x:number = 0;
    let c= this.myForm.get('correo')!.value;
    let p= this.myForm.get('contraseña')!.value;

    this.clienteService.getClienteByCorreoAndContraseña(c, p).toPromise().then((data: Cliente|undefined) => {
      if (data) {
          localStorage.setItem('userId', data.id.toString());
          this.snackBar.open('Ingreso exitoso', '', { duration: 3000 });
          this.router.navigate([`client`]);
      }
  }).catch(() => {
      this.farmaciaService.getFarmaciaByCorreoAndContraseña(c, p).toPromise().then((farmacia: Farmacia|undefined) => {
          if (farmacia) {
              localStorage.setItem('farmaciaId', farmacia.id.toString());
              this.snackBar.open('Ingreso exitoso', '', { duration: 3000 });
              this.router.navigate([`farmacia`]);
          } else {
              this.snackBar.open('Datos incorrectos', '', { duration: 3000 });
          }
      }).catch(() => {
          this.snackBar.open('Datos incorrectos', '', { duration: 3000 });
      });
  });


}

}



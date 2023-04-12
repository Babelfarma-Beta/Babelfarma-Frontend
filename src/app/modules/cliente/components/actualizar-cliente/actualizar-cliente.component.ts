import { Role } from '../../../../models/role';
import { Cliente } from '../../../../models/cliente';
import { DistritoService } from '../../../../services/distrito.service';
import { ClienteService } from '../../../../services/cliente.service';
import { Distrito } from '../../../../models/distrito';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {
  input = new FormControl('', [Validators.required]);
  myForm!: FormGroup;
  idDistrito!: number;
  distritos!: Distrito[];
  cliente!: Cliente;
  idCliente: any;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService ,
    private distritoService: DistritoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this. loadId();
      this.reactiveForm();
      this.loadCLiente();
      this.getDistritos();
    }

  ngOnInit(): void {
  }

  loadId(){
    this.idCliente = localStorage.getItem('userId');
  }

  reactiveForm(){
    this.myForm = this.fb.group({
      dni: ['', [Validators.required]],
      nombres: ['', [Validators.required, Validators.maxLength]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
    }
    )
  }


  loadCLiente() {

    this.clienteService.getClienteId(this.idCliente)
    .subscribe((data)=>{
      this.cliente = data;
      this.myForm = this.fb.group({
        dni: [this.cliente.dni, [Validators.required]],
        nombres: [this.cliente.nombres, [Validators.required]],
        apellidoPaterno: [this.cliente.apellidoPaterno, [Validators.required]],
        apellidoMaterno: [this.cliente.apellidoMaterno, [Validators.required]],
        correo: [this.cliente.correo, [Validators.required]],
        celular: [this.cliente.celular, [Validators.required]],
        direccion: [this.cliente.direccion, [Validators.required]],
        distrito: [this.cliente.distrito.id, [Validators.required]],

      });
      this.idDistrito= this.cliente.distrito.id;
    })
  }

  updateCliente(){
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
        sexo: this.cliente.sexo,
        correo: this.myForm.get('correo')!.value,
        celular: this.myForm.get('celular')!.value,
        fechaNacimiento: this.cliente.fechaNacimiento,
        direccion: this.myForm.get('direccion')!.value,
        distrito:d,
        contraseña: this.cliente.contraseña,
        role:r,
      };

      this.clienteService.updateCliente(this.idCliente, cliente).subscribe({
        next: (data) => {
          this.snackBar.open('El cliente fue actualizado con exito!', '', {
            duration: 3000,
          });
          this.router.navigate([`client/Comprador`]);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  gotoHome(){
    this.router.navigate([`client/Comprador`]);
  }

  getDistritos(): void{
    this.distritoService.getDistrito().subscribe((data: Distrito[]) => {
      this.distritos=data;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {

  myForm!: FormGroup;


  constructor( private fb: FormBuilder,
    ) {
      this.reactiveForm();
     }

  ngOnInit(): void {
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      mensaje: ['', [Validators.required]],
    })
  }

}

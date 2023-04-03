import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-farmacia',
  templateUrl: './navbar-farmacia.component.html',
  styleUrls: ['./navbar-farmacia.component.css']
})
export class NavbarFarmaciaComponent implements OnInit {

  idFarmacia!:any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadId();
  }


  loadId(){
    this.idFarmacia = this.route.snapshot.params['id'];
  }

}

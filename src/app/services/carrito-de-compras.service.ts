import { Product } from './../models/product';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoDeComprasService {

  productosCarrito: Product[]= [];

  constructor() { }

  setproductosCarrito(productosCarrito: Product[]){
    this.productosCarrito=productosCarrito;
  }

  getproductosCarrito():Product[]{
    return this.productosCarrito;
  }

}

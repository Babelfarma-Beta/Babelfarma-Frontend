import { ProductService } from 'src/app/services/product.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CarritoDeComprasService {

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  AgregarAlCarrito(number: number): void {
    this.productService.getProductId(number).subscribe((data) => {
      if(data.stock>=1)
      {
        const carrito = JSON.parse(localStorage.getItem('carrito') ?? '[]');
        const existeProducto = carrito.some((producto:any) => producto.id === data.id);
        if (!existeProducto) {
          carrito.push(data);
          localStorage.setItem('carrito', JSON.stringify(carrito));
        }
      }
      else
      this.snackBar.open('Stock agotado', '', {
        duration: 3000,
      });
    });
  }

}

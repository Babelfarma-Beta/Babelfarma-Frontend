import { FarmaciaService } from '../../../../services/farmacia.service';
import { Farmacia } from '../../../../models/farmacia';
import { VentaService } from '../../../../services/venta.service';
import { Venta } from '../../../../models/venta';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../../services/product.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { DistritoService } from '../../../../services/distrito.service';
import { Distrito } from '../../../../models/distrito';
import { Product } from '../../../../models/product';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';


@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  productosCarrito: Product[] = [];
  idDistrito!: number;
  distritos!: Distrito[];
  subtotalb: any;
  myForm!: FormGroup;
  idClienteIngresado!: any;
  nombresFarmacias:string[]=[];
  cantidadesProductos:CantidadByProduct[] =[];

  constructor(
    private distritoService: DistritoService,
    private farmaciaService: FarmaciaService,
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private ventaService: VentaService
  ) {
    this. getClienteId()
    this.getDistritos();
    this.reactiveForm();
    this.mostrarProc();
    this.initialValors();
  }


  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }
  checked = false;
  disabled = false;

  mostrarProc(){
      const carrito = JSON.parse(localStorage.getItem('carrito') ?? '[]');
      this.productosCarrito= carrito;
      this.productosCarrito.forEach((element)=>{
      this.farmaciaService.getFarmaciaByProductoId(element.id).subscribe((data:Farmacia)=>{
        this.nombresFarmacias[element.id]=(data.nombreEstablecimiento);
      })
    })
  }

  initialValors(){
    this.productosCarrito.forEach((element)=>{
      const cantidad:CantidadByProduct = {
        productId: element.id,
        cantidad: 1,
      }
      this.cantidadesProductos.push(cantidad);
    })

  }

  getClienteId(){
    this.idClienteIngresado = this.route.snapshot.params['id'];
  }


  returnNombreFarmacia(id:any): string{
    return this.nombresFarmacias[id];
  }


  getCantidad(productIdBuscado:number){
    let product = this.cantidadesProductos.find(cp => cp.productId == productIdBuscado)
    return product?.cantidad;
  }

  aumentarCantidad(productId:number , stock:number){
    const productoEncontrado = this.cantidadesProductos.find((producto) => producto.productId == productId);
    if (productoEncontrado && productoEncontrado.cantidad < stock) {
      productoEncontrado.cantidad += 1;
    }
  }

  disminuirCantidad(productId:number){
    const productoEncontrado = this.cantidadesProductos.find((producto) => producto.productId == productId);
    if (productoEncontrado && productoEncontrado.cantidad > 1) {
      productoEncontrado.cantidad -= 1;
    }
  }

  getSubtotal(productId:number, price:number){
    const productoEncontrado = this.cantidadesProductos.find((producto) => producto.productId == productId);
    if (productoEncontrado) {
      return productoEncontrado.cantidad * price;
    }
    else
    return null;
  }


  reactiveForm() {
    this.myForm = this.fb.group({
      cantidad: [1, [Validators.min(0)]],
    })
  }


  vaciarCarrito() {
    this.cantidadesProductos = [];
    this.productosCarrito = [];
    localStorage.removeItem('carrito');
  }

  getDistritos(): void {
    this.distritoService.getDistrito().subscribe((data: Distrito[]) => {
      this.distritos = data;
    });
  }

  subtotal(): number {

    let x = 0;
    for (let i = 0; i < this.cantidadesProductos.length; i++) {

      x += this.cantidadesProductos[i].cantidad * this.productosCarrito[i].precio;

    }
    return x;
  }


  eliminarProducto(indice: any) {
    this.cantidadesProductos.splice(indice,1);
    this.productosCarrito.splice(indice, 1);
    localStorage.setItem('carrito', JSON.stringify(this.productosCarrito));
  }

  registrarVentas(){
    const userId= localStorage.getItem('userId');
    const customer = new Cliente();
    customer.id = userId;

    for (let i = 0; i < this.productosCarrito.length; i++) {
      this.farmaciaService.getFarmaciaByProductoId(this.productosCarrito[i].id).subscribe((data)=>{
        const venta:Venta={
          id:0,
          fecha: new Date(),
          idCliente: customer,
          idFarmacia: data,
          idProducto: this.productosCarrito[i],
          productName: this.productosCarrito[i].nombre,
          precioUnit: this.productosCarrito[i].precio,
          cantidad: this.cantidadesProductos[i].cantidad,
          precioTotal: (this.productosCarrito[i].precio)* (this.cantidadesProductos[i].cantidad),
        }
        this.ventaService.addVenta(venta).subscribe(()=>{
          for (let i = 0; i < this.productosCarrito.length; i++) {

            const product: Product = {
              id: 0,
              nombre: this.productosCarrito[i].nombre,
              precio: this.productosCarrito[i].precio,
              stock: this.productosCarrito[i].stock - this.cantidadesProductos[i].cantidad,
              descripcion: this.productosCarrito[i].descripcion,
              categoria: this.productosCarrito[i].categoria,
              picture: this.productosCarrito[i].picture
            }
            this.productService.updateProduct(this.productosCarrito[i].id, product).subscribe({
              next: () => {
                this.vaciarCarrito();
                this.snackBar.open('Productos comprados con éxito', '', { duration: 3000 });
                this.router.navigate([`client/Busqueda`]);
              },
              error: (err) => {
                console.log(err);
              }
            });
          }
        });

      });


    }
  }
}


export interface CantidadByProduct{
  productId:number,
  cantidad:number,
};

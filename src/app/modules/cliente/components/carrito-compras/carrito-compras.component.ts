import { FarmaciaService } from '../../../../services/farmacia.service';
import { Cliente } from '../../../../models/cliente';
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
import { CarritoDeComprasService } from '../../../../services/carrito-de-compras.service';
import { Component, OnInit } from '@angular/core';


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
  cantidades: any[] = [];
  myForm!: FormGroup;
  products: Product[] = [];
  idClienteIngresado!: any;
  nombresFarmacias:string[]=[];

  constructor(
    private carritoService: CarritoDeComprasService,
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
    this.recuperarValores()

  }


  ngOnInit(): void {

  }
  checked = false;
  disabled = false;

  mostrarProc(){
    this.productosCarrito=this.carritoService.getproductosCarrito();
    this.productosCarrito.forEach((element)=>{
      this.farmaciaService.getFarmaciaByProductoId(element.id).subscribe((data:Farmacia)=>{
        this.nombresFarmacias[element.id]=(data.nombreEstablecimiento);
      })

    })
  }

  getClienteId(){
    this.idClienteIngresado = this.route.snapshot.params['id'];
  }


  // private initConfig(): void {
  //   this.payPalConfig = {
  //     currency: 'USD',
  //     clientId: environment.clientId,
  //     createOrderOnClient: (data) => <ICreateOrderRequest><unknown>{
  //       intent: 'CAPTURE',
  //       purchase_units: [{
  //         amount: {
  //           currency_code: 'USD',
  //           value: this.subtotalInDollars(),
  //           breakdown: {
  //             item_total: {
  //               currency_code: 'USD',
  //               value: this.subtotalInDollars()
  //             }
  //           }
  //         },
  //         items: [{
  //           name: 'Enterprise Subscription',
  //           quantity: '1',
  //           category: 'DIGITAL_GOODS',
  //           unit_amount: {
  //             currency_code: 'USD',
  //             value: this.subtotalInDollars(),
  //           },
  //         }]
  //       }]
  //     },
  //     advanced: {
  //       commit: 'true'
  //     },
  //     style: {
  //       label: 'paypal',
  //       layout: 'vertical'
  //     },
  //     onApprove: (data, actions) => {
  //       console.log('onApprove - transaction was approved, but not authorized', data, actions);
  //       actions.order.get().then((details: any) => {
  //         console.log('onApprove - you can get full order details inside onApprove: ', details);
  //       });

  //     },
  //     onClientAuthorization: (data) => {
  //       console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
  //       //aqui
  //       this.registrarVentas(); Estas funciones se usan cuando se realiza la compra
  //       this.actualizarStock(); Estas funciones se usan cuando se realiza la compra
  //     },
  //     onCancel: (data, actions) => {
  //       console.log('OnCancel', data, actions);
  //     },
  //     onError: err => {
  //       console.log('OnError', err);
  //     },
  //     onClick: (data, actions) => {
  //       console.log('onClick', data, actions);
  //     }
  //   };
  // }




  returnNombreFarmacia(id:any): string{
    return this.nombresFarmacias[id];
  }

  processProductResponse(resp: any) {
    const dateProduct: Product[] = [];

    let listCProduct = resp;

    listCProduct.forEach((element: Product) => {
      element.picture = 'data:image/jpeg;base64,' + element.picture;
      dateProduct.push(element);
    });

    this.productosCarrito=dateProduct;
  }


  recuperarValores() {
    for (let i = 0; i < this.productosCarrito.length; i++) {
      this.cantidades[i] = this.myForm.get('cantidad')!.value;
    }
  }


  getSemisuma(indice: any) { //precio e índice el producto

    let cantidad = this.myForm.get('cantidad')!.value;

    this.cantidades[indice] = cantidad;
    console.log(this.subtotalInDollars());

  }

  reactiveForm() {
    this.myForm = this.fb.group({
      cantidad: [1, [Validators.min(0)]],
    })
  }


  vaciarCarrito() {
    this.cantidades = [];
    this.productosCarrito = [];
  }

  getDistritos(): void {
    this.distritoService.getDistrito().subscribe((data: Distrito[]) => {
      this.distritos = data;
    });
  }

  subtotal(): number {

    let x = 0;
    for (let i = 0; i < this.cantidades.length; i++) {

      x += this.cantidades[i] * this.productosCarrito[i].precio;

    }
    return x;
  }

  subtotalInDollars(): number {

    var x=this.subtotal()/3.80;

    x=Number(x.toFixed(2));

    return x;
  }

  eliminarProducto(indice: any) {
    this.cantidades.splice(indice, 1);
    this.productosCarrito.splice(indice, 1);

  }

  registrarVentas(){
    let c = new Cliente();
    c.id= this.route.snapshot.params['id'];


    for (let i = 0; i < this.productosCarrito.length; i++) {
      let f= new Farmacia();
      this.farmaciaService.getFarmaciaByProductoId(this.productosCarrito[i].id).subscribe((data)=>{
        const venta:Venta={
          id:0,
          fecha: new Date(),
          cliente: c,
          farmacia: data,
          producto: this.productosCarrito[i],
          precioUnit: this.productosCarrito[i].precio,
          cantidad: this.cantidades[i],
          precioTotal: (this.productosCarrito[i].precio)* (this.cantidades[i]),
        }
        this.ventaService.addVenta(venta).subscribe(()=>{});

      });


    }
  }

  actualizarStock() {
    this.idClienteIngresado = this.route.snapshot.params['id'];

    for (let i = 0; i < this.productosCarrito.length; i++) {

      const product: Product = {
        id: 0,
        nombre: this.productosCarrito[i].nombre,
        precio: this.productosCarrito[i].precio,
        stock: this.productosCarrito[i].stock - this.cantidades[i],
        descripcion: this.productosCarrito[i].descripcion,
        categoria: this.productosCarrito[i].categoria,
        picture: this.productosCarrito[i].picture
      }
      this.productService.updateProduct(this.productosCarrito[i].id, product).subscribe({
        next: (data) => {
          this.snackBar.open('Productos comprados con éxito', '', { duration: 3000 });
          this.router.navigate([`/Busqueda/${this.idClienteIngresado}`]);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

  }
}

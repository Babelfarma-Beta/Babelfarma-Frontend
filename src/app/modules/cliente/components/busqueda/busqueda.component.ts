import { MatTabGroup } from '@angular/material/tabs';
import { CategoriaService } from '../../../../services/categoria.service';
import { Categoria } from '../../../../models/categoria';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { Product,ProductView } from '../../../../models/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarritoDeComprasService } from 'src/app/services/carrito-de-compras.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  MyForm!: FormGroup;
  categorias!: Categoria[];
  products:ProductView[]=[];
  nombreCategoria!:string;
  productosCarrito:Product[]=[];

  @ViewChild('tab') tabGroup!: MatTabGroup;

  constructor(
    private productService: ProductService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private carritoService:CarritoDeComprasService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategorias();
  }


  reactiveForm() {
    this.MyForm = this.fb.group({
      nombre: [''],
      categoria: [''],
    })
  }


  processProductResponse(resp: any) {
    const dateProduct: ProductView[] = [];

    let listCProduct = resp;

    if(resp)
    listCProduct.forEach((element: ProductView) => {
      element.picture = 'data:image/jpeg;base64,' + element.picture;
      dateProduct.push(element);
    });

    this.products=dateProduct;
  }

  getProducts(){
    this.reactiveForm();
    this.productService.getProductoPrecio().subscribe(
      (data)=>{
        this.processProductResponse(data);
      },
      (error: any) => {
        console.log('error en productos: ', error);
      }
    );
  }

  getCategorias(): void{
    this.categoriaService.getCategorias().subscribe((data: Categoria[]) => {
      this.categorias=data;
    });
  }

  search() {
    if (this.tabGroup.selectedIndex == 0) {
      let nombreProducto = this.MyForm.value['nombre'];
      this.productService.getProductoNombre(nombreProducto).subscribe(
        (data)=>{
        this.processProductResponse(data);
      },
      (error: any) => {
        console.log('error en productos: ', error);
      }
      )
    }
    else
    if (this.tabGroup.selectedIndex == 1) {
      let categoria = this.nombreCategoria;
      this.productService.getProductoCategoria(categoria).subscribe((data)=>{
        this.processProductResponse(data);
      },
      (error: any) => {
        console.log('error en productos: ', error);
      }
      )
    }
  }

  AgregarAlCarrito(number: number): void {
    this.carritoService.AgregarAlCarrito(number);
  }

}

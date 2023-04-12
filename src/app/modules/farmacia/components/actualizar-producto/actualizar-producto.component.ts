import { CategoriaService } from '../../../../services/categoria.service';
import { Categoria } from '../../../../models/categoria';
import { Component, OnInit, Query } from '@angular/core';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../services/product.service';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  myForm!: FormGroup;
  idCategoria!: number;
  categorias!: Categoria[];
  product!: Product;
  idProduct!: any;
  idFarmacia!:any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.reactiveForm();
    this.loadId();
  }

  ngOnInit(): void {

    this.loadProducto();
    this.getCategorias();
  }

  loadId(){
    this.idFarmacia = this.route.snapshot.params['idFarmacia'];
  }

  reactiveForm(){
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.maxLength]],
      stock: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
    }
    )
  }


  loadProducto(){
    this.idProduct = this.route.snapshot.params['id'];
    this.productService.getProductId(this.idProduct)
      .subscribe((data)=>{
        this.product = data;
        this.myForm = this.fb.group({
          id: this.product,
          nombre: [this.product.nombre, [Validators.required]],
          precio: [this.product.precio, [Validators.required, Validators.maxLength]],
          stock: [this.product.stock, [Validators.required]],
          descripcion: [this.product.descripcion, [Validators.required]],
          categoria: [this.product.categoria, [Validators.required]],
          picture:[this.product.picture, [Validators.required]],
        })
      })
  }

  updateProduct(){
    const product: Product={
      id: 0,
      nombre: this.myForm.get('nombre')!.value,
      precio: this.myForm.get('precio')!.value,
      stock: this.myForm.get('stock')!.value,
      descripcion: this.myForm.get('descripcion')!.value,
      categoria: this.product.categoria,
      picture: this.product.picture
    }
    this.productService.updateProduct(this.idProduct, product).subscribe({
      next: (data)=>{
        this.snackBar.open('Producto actualizado exitosamente','',{duration: 3000});
        this.router.navigate([`/ListaDeProductos/${this.idFarmacia}`]);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  getCategorias(): void{
    this.categoriaService.getCategorias().subscribe((data: Categoria[])=>{
      this.categorias=data;
    })
  }
}

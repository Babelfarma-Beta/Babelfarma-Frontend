import { ReactiveFormsModule } from '@angular/forms';
import { Product, ProductView } from './../models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Portal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  basePath: string = environment.basePath;
  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(`${this.basePath}/productos`);
  }

  getProductoNombre(nombre: string){
    return this.http.get<ProductView[]>(`${this.basePath}/productos/nombre/${nombre}`);
  }

  getProductoCategoria(categoria: string){
    return this.http.get<ProductView[]>(`${this.basePath}/productos/categoria/${categoria}`);
  }

  getProductoStock(stock: any){
    return this.http.get<Product>(`${this.basePath}/productos/${stock}`);
  }

  getProductoPrecio(){
    return this.http.get<ProductView[]>(`${this.basePath}/productos/precio`);
  }

  addProduct(idFarmacia: any, product: any) {
    return this.http.post<Product[]>(
      `${this.basePath}/productosregistrados/${idFarmacia}`,
      product
    );
  }

  getProductId(id: any){
    return this.http.get<Product>(`${this.basePath}/productos/id/${id}`);
  }

  updateProduct(id: any, product: Product){
    return this.http.put<Product>(`${this.basePath}/productos/${id}`, product);
  }

  deleteProduct(id: any){
    return this.http.delete<Product>(`${this.basePath}/productos/${id}`);
  }

  getProductoFarmacia(id: any, status:string){
    return this.http.get<Product[]>(`${this.basePath}/productos/farmacia/${id}?status=${status}`);
  }


}

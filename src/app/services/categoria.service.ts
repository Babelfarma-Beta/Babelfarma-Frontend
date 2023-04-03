import { Categoria } from './../models/categoria';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  basePath: string = environment.basePath;
  constructor(private http: HttpClient) { }

  getCategorias(){
    return this.http.get<Categoria[]>(`${this.basePath}/categorias`);
  }

  getCategoriaId(id: any){
    return this.http.get<Categoria>(`${this.basePath}/categorias/${id}`);
  }

  addCategoria(categoria: Categoria){
    return this.http.post<Categoria>(
      `${this.basePath}/categorias`,
      categoria
    );
  }

  updateCategoria(id: any, categoria: Categoria){
     return this.http.put<Categoria>(`${this.basePath}/categorias/${id}`, categoria);
  }

  deleteCategoria(id: any){
    return this.http.delete<Categoria>(`${this.basePath}/categorias/${id}`);
  }

  getCategoria(categoria: string){
    return this.http.get<Categoria>(`${this.basePath}/categorias/${categoria}`);
  }
}

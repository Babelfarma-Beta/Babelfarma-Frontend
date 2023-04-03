import { DetalleVenta } from './../models/detalleVenta';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  basePath: string = environment.basePath;
  constructor(private http: HttpClient) { }

  getDetalleVenta(){
    return this.http.get<DetalleVenta[]>(`${this.basePath}/detallesVenta`);
  }

  addDetalleVenta(id: any, detalleVenta: DetalleVenta){
    return this.http.post<DetalleVenta>(
      `${this.basePath}/detallesVenta`,
      detalleVenta
    );
  }

  updateDetalleVenta(id: any, detalleVenta: DetalleVenta){
    return this.http.put<DetalleVenta>(`${this.basePath}/detallesVenta/${id}`, detalleVenta);
  }

  deleteDetalleVenta(id: any){
    return this.http.delete<DetalleVenta>(`${this.basePath}/detallesVenta/${id}`);
  }
}

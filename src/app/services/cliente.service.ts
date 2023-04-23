import { Cliente } from './../models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  basePath: string = environment.basePath;

  constructor(private http:HttpClient) { }

  getClientes(){
    return this.http.get<Cliente[]>(`${this.basePath}/clientes`);
  }

  getClienteId(id: any) {
    return this.http.get<Cliente>(`${this.basePath}/clientes/id/${id}`);
  }

  getClienteDniCorreo(dni: any, correo: any){
    return this.http.get<Cliente>(`${this.basePath}/clientes/dni/${dni}/correo/${correo}`);
  }

  getClienteSexo(sexo: string){
    return this.http.get<Cliente>(`${this.basePath}/clientes/sexo/${sexo}`);
  }

  addCliente(cliente: Cliente){
    return this.http.post<Cliente>(
      `${this.basePath}/clientes`,
      cliente
    )
  }

  updateCliente(id: any, cliente: Cliente){
    return this.http.put<Cliente>(`${this.basePath}/clientes/${id}`, cliente);
  }

  deleteCliente(id: any){
    return this.http.delete<Cliente>(`${this.basePath}/clientes/${id}`);
  }

  getClienteByCorreoAndContraseña(correo:any, contraseña:any){
    return this.http.get<Cliente>(`${this.basePath}/clientes/correo/${correo}/contraseña/${contraseña}`)
  }


}

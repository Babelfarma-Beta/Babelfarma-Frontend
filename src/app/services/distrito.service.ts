import { Distrito } from './../models/distrito';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  basePath: string = environment.basePath;
  constructor(private http: HttpClient) { }

  getDistrito(){
    return this.http.get<Distrito[]>(`${this.basePath}/distritos`);
  }

  getDistritoId(id: any){
    return this.http.get<Distrito>(`${this.basePath}/distritos/${id}`);
  }

  addDistrito(distrito: Distrito){
    return this.http.post<Distrito>(
      `${this.basePath}/distritos`,
      distrito
      );
  }

  updateDistrito(id: any, distrito: Distrito){
    return this.http.put<Distrito>(`${this.basePath}/distritos/${id}`, distrito);
  }

  deleteDistrito(id: any){
    return this.http.delete<Distrito>(`${this.basePath}/distritos/${id}`);
  }
}

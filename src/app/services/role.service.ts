import { Role } from './../models/role';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  basePath: string = environment.basePath;
  constructor(private http: HttpClient) { }

  getRoles(){
    return this.http.get<Role[]>(`${this.basePath}/roles`);
  }

  getRoleId(id: any){
    return this.http.get<Role>(`${this.basePath}/roles/${id}`);
  }
}

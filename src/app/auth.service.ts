import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl : string = environment.apiBaseUrl + "/api/usuarios";

  constructor(
    private http: HttpClient
  ) { }

  cadastrarUsuario(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
}

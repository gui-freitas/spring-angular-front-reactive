import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl : string = environment.apiBaseUrl + "/api/usuarios";
  tokenUrl: string = environment.apiBaseUrl + environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;

  constructor(
    private http: HttpClient
  ) { }

  cadastrarUsuario(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  tentarLogar(usuario: string, senha: string) : Observable<any>{
    const params = new HttpParams()
                        .set('username', usuario)
                        .set('password', senha)
                        .set('grant_type', 'password')
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.tokenUrl, params.toString(), { headers });
  }
}

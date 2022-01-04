import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';

import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl : string = environment.apiBaseUrl + "/api/usuarios";
  tokenUrl: string = environment.apiBaseUrl + environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

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

  estaAutenticado() : boolean {
    const token = this.obterToken();
    if(token){
      const estaExpirado = this.jwtHelper.isTokenExpired(token);
      return !estaExpirado;
    }
    return false;
  }

  obterToken() {
    const tokenString = localStorage.getItem('access_token');
    if(tokenString){
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }
}

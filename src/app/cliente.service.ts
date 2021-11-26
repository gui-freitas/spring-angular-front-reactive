import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from './cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiUrl: string = environment.apiBaseUrl + '/api/clientes';

  constructor(
    private http: HttpClient
  ) { }

  salvar(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }
}

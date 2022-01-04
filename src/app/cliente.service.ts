import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from './cliente/cliente';
import { PaginaCliente } from './cliente/paginaCliente';

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

  listar(pagina: number, tamanhoPagina: number) : Observable<PaginaCliente> {
    const params = new HttpParams()
                        .set('page', pagina)
                        .set('size', tamanhoPagina)
    return this.http.get<any>(`${this.apiUrl}?${params.toString()}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from './cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    const cliente : Cliente  = new Cliente();
    cliente.nome = 'José da Silva';
    cliente.cpf = '09331269994';

    this.clienteService
      .salvar(cliente)
      .subscribe( resposta => {
        console.log(resposta);
      })
  }

}

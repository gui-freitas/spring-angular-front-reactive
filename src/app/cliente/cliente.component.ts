import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { ValidadorGenerico } from '../ValidadorGenerico';
import { Cliente } from './cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  formGroup: FormGroup;
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, ValidadorGenerico.cpfValido]]
    });
  }
  
  salvar(){
    const valoresForm = this.formGroup.value;
    const cliente : Cliente = new Cliente(valoresForm.nome, valoresForm.cpf);
    this.clienteService.salvar(cliente).subscribe( resposta => {
      this.clientes.push(resposta);
      console.log(this.clientes);
    });
  }
}

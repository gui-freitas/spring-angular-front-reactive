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
  colunas = ['nome', 'cpf', 'dataCadastro'];

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.listar();
  }

  montarFormulario(){
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, ValidadorGenerico.cpfValido]]
    });
  }
  
  salvar(){
    const valoresForm = this.formGroup.value;
    const cliente : Cliente = new Cliente(valoresForm.nome, valoresForm.cpf);
    this.clienteService.salvar(cliente).subscribe( resposta => {
      let lista: Cliente[] = [ ... this.clientes, resposta];
      this.clientes = lista;
    });
  }

  listar(){
    this.clienteService.listar().subscribe(response => {
      this.clientes = response;
    })
  }
}

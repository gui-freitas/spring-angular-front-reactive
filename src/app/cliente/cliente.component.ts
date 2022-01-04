import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ClienteService } from '../cliente.service';
import { ValidadorGenerico } from '../ValidadorGenerico';
import { Cliente } from './cliente';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDetalheComponent } from '../cliente-detalhe/cliente-detalhe.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  formGroup: FormGroup;
  clientes: Cliente[] = [];
  colunas = ['nome', 'cpf', 'dataCadastro'];
  usuarioAutenticado: string;
  totalElementos: number = 0;
  pagina: number = 0;
  tamanhoPagina: number = 5;

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.listar(this.pagina, this.tamanhoPagina);
    this.usuarioAutenticado= this.authService.getUsuarioAutenticado();
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
      this.snackBar.open('Cliente cadastrado!', 'Sucesso', {
        duration: 2000
      });
      this.formGroup.reset();
    });
  }

  listar(pagina: number, tamanhoPagina: number){
    this.clienteService.listar(pagina, tamanhoPagina).subscribe(response => {
      this.clientes = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    })
  }
  
  logout(){
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }

  visualizarCliente(cliente: Cliente, event: any) {
    this.dialog.open(ClienteDetalheComponent, {
      width: '400px',
      height: '450px',
      data: cliente
    })
  }

  paginar(event: PageEvent){
    this.pagina = event.pageIndex;
    this.listar(this.pagina, this.tamanhoPagina);
  }
}

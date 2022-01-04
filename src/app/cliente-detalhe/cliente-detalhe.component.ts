import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '../cliente/cliente';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.css']
})
export class ClienteDetalheComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClienteDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente
  ) { }

  ngOnInit(): void {
  }

  fechar(){
    this.dialogRef.close();
  }
}

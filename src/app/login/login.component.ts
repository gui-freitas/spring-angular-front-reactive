import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: string;
  senha: string;
  erroLogin: boolean;
  formGroup: FormGroup;
  cadastrando: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
  }

  montarFormulario(){
    this.formGroup = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  entrar(){
    const valoresForm = this.formGroup.value;
    console.log(`Usuario: ${valoresForm.usuario}, Senha: ${valoresForm.senha}`)
    this.router.navigate(['/']);
  }

  prepararCadastrar(event: any){
    event.preventDefault();
    this.cadastrando = true;
  } 

  cancelarCadastro(){
      this.cadastrando = false;
      this.usuario = '';
      this.senha = '';
  }

}

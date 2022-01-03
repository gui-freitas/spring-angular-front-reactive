import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: string;
  senha: string;
  formGroup: FormGroup;
  cadastrando: boolean;
  mensagemSucesso: string;
  erros: String[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
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
      this.formGroup.reset();
  }

  cadastrarUsuario(){
    const valoresForm = this.formGroup.value;
    const usuario: Usuario = new Usuario();
    usuario.username = valoresForm.usuario;
    usuario.password = valoresForm.senha;
    console.log(usuario);
    this.authService
      .cadastrarUsuario(usuario)
      .subscribe( response => {
        this.erros = [];
        this.mensagemSucesso = 'Usuário "' + usuario.username + '" cadastrado com sucesso! Efetue o login.';
        this.cadastrando = false;
        this.formGroup.reset();
      }, errorResponse => {
        this.erros = errorResponse.error.errors;
        this.mensagemSucesso = '';
      });
  }

}

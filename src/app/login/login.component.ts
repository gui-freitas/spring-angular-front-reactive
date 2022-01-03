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
    this.authService
          .tentarLogar(valoresForm.usuario, valoresForm.senha)
          .subscribe(response => {
            const access_token = JSON.stringify(response);
            localStorage.setItem('access_token', access_token);
            this.router.navigate(['/'])
          }, errorResponse => {
            this.erros = ['Usuário e/ou senha incorreto(s).']
          });
    this.mensagemSucesso = '';
  }

  prepararCadastrar(event: any){
    event.preventDefault();
    this.cadastrando = true;
    this.formGroup.reset();
    this.erros = [];
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

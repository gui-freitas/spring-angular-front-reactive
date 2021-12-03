import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
  }

  montarFormulario(){
    this.formGroup = this.formBuilder.group({
      usuario: [''],
      senha: ['']
    });
  }

  entrar(){
    const valoresForm = this.formGroup.value;
    console.log(`User: ${valoresForm.usuario}, Pass: ${valoresForm.senha}`)
  }

}

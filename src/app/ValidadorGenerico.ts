import { FormControl } from "@angular/forms";

export class ValidadorGenerico{

    static cpfValido(input: FormControl){
        const cpf = input.value;

        if(cpf){
            let resto: number;
            let i: number;
            let soma: number;
            let digitosIguais: boolean = false;
            let numeros, digitos;

            if(cpf.length < 11 || cpf.length > 11){
                return {cpfInvalido: true};
            }
 
            for(i = 0; i < cpf.length - 1; i++) {
                if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                    digitosIguais = true;
                    break;
                }
            }

            if(digitosIguais){
                numeros = cpf.substring(0, 9);
                digitos = cpf.substring(9);
                soma = 0;
                
                for(i = 10; i > 1; i --){
                    soma += numeros.charAt(10 - i) * i;
                }
                
                resto = soma * 10 % 11;
                
                if(resto === 10 || resto === 11) resto = 0;

                if(resto != (digitos.charAt(0))){
                    return { cpfInvalido: true };
                }

                numeros = cpf.substring(0, 10);
                soma = 0;
                for(i = 11; i > 1; i --){
                    soma += numeros.charAt(11 - i) * i;
                }

                resto = soma * 10 % 11;

                if(resto === 10 || resto === 11) resto = 0;

                if(resto != (digitos.charAt(1))){
                    return { cpfInvalido: true };
                }
            }
        }
        else {
            return { cpfInvalido: true };
        }
        return "";
    };
}
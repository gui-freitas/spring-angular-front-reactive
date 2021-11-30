export class Cliente {
    id: number;
    nome: string;
    cpf: string;
    dataCriacao: string;

    constructor(nome: string, cpf: string){
        this.nome = nome;
        this.cpf = cpf;
    }
}
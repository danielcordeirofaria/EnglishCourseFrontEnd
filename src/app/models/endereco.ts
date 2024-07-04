export class Endereco {
    idEndereco?: number;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  
    constructor(
      logradouro: string,
      numero: string,
      complemento: string,
      bairro: string,
      cidade: string,
      estado: string,
      cep: string,
      idEndereco?: number
    ) {
      this.idEndereco = idEndereco;
      this.logradouro = logradouro;
      this.numero = numero;
      this.complemento = complemento;
      this.bairro = bairro;
      this.cidade = cidade;
      this.estado = estado;
      this.cep = cep;
    }
  }
  
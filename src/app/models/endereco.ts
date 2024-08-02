export class Endereco {
  idEndereco?: number; // Opcional
  logradouro: string;
  numero: string;
  complemento?: string; // Opcional
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;

  constructor(
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string,
    complemento?: string, // Opcional
    idEndereco?: number // Opcional
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

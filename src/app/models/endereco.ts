export class Endereco {
  idEndereco: number | undefined;
  logradouro: string;
  numero: string; // Agora é string
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;

  constructor(
    logradouro: string,
    numero: string, // Agora é string
    bairro: string,
    cidade: string,
    estado: string,
    cep: string,
    complemento?: string 
  ) {
    this.logradouro = logradouro;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
    this.complemento = complemento; 
  }
}
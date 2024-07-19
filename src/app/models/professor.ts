// professor.model.ts
export interface Endereco {
    // Defina os campos do endereço conforme necessário
    idEndereco: number;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  }
  
  export interface Professor {
    idProfessor: number;
    nomeProfessor: string;
    cpfCnpj: string;
    endereco: Endereco;
    email: string;
    login: string;
    password: string;
    whatsapp: string;
  }
  
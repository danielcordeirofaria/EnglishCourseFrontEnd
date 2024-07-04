import { Endereco } from './endereco';

describe('Endereco', () => {
  it('should create an instance', () => {
    const endereco = new Endereco(
      'Rua Exemplo', 
      '123', 
      'Apto 456', 
      'Bairro Exemplo', 
      'Cidade Exemplo', 
      'Estado Exemplo', 
      '12345-678'
    );

    expect(endereco).toBeTruthy();
  });
});

import { Responsavel } from './responsavel';
import { Endereco } from './endereco';

describe('Responsavel', () => {
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
    const responsavel = new Responsavel(
      'Nome Exemplo',
      endereco,
      '2000-01-01',
      '123.456.789-00',
      'email@example.com',
      '1234567890',
      'Formação Exemplo',
      'Profissão Exemplo'
    );
    expect(responsavel).toBeTruthy();
  });
});
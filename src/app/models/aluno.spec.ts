import { Aluno } from './aluno';
import { Endereco } from './endereco';

describe('Aluno', () => {
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

    const aluno = new Aluno(
      'Nome Exemplo',
      endereco,
      '2000-01-01',
      '123.456.789-00',
      'email@example.com',
      'Formação Exemplo',
      'Profissão Exemplo', // Adicione o valor para a profissão
      'Módulo Exemplo',
      'Nível Exemplo'
    );

    expect(aluno).toBeTruthy();
  });
});

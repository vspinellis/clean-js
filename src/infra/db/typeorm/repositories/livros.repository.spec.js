const { livrosRepository } = require('./livros.repository');

describe('Livros Repository Typeorm', function () {
  let sut;

  beforeAll(function () {
    sut = livrosRepository();
  });

  const livroDTO = {
    nome: 'nome_valido',
    quantidade: 3,
    autor: 'autor_valido',
    genero: 'genero_valido',
    ISBN: 'ISBN_valido'
  };

  test('Deve retornar void ao criar um livro', async function () {
    const livroCriado = await sut.cadastrar(livroDTO);

    expect(livroCriado).toBeUndefined();
  });
});

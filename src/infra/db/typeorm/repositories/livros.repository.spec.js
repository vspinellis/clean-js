const { livrosRepository, typeormLivrosRepository } = require('./livros.repository');

describe('Livros Repository Typeorm', function () {
  let sut;

  beforeAll(function () {
    sut = livrosRepository();
  });

  beforeEach(async function () {
    await typeormLivrosRepository.delete({});
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

  test('Deve retornar true se existir um livro por ISBN', async function () {
    await typeormLivrosRepository.save(livroDTO);
    const existePorISBN = await sut.existePorISBN('ISBN_valido');

    expect(existePorISBN).toBe(true);
  });

  test('Deve retornar false se não existir um livro por ISBN', async function () {
    const existePorISBN = await sut.existePorISBN('ISBN_invalido');

    expect(existePorISBN).toBe(false);
  });
});

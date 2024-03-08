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

  test('Deve retornar um livro completo se buscar por nome', async function () {
    await typeormLivrosRepository.save(livroDTO);
    const buscarPorNomeOuISBNComNomeCorreto = await sut.buscarPorNomeOuISBN('nome_valido');

    expect(buscarPorNomeOuISBNComNomeCorreto).toHaveLength(1);
    expect(buscarPorNomeOuISBNComNomeCorreto[0].nome).toBe('nome_valido');
  });

  test('Deve retornar um livro se buscar por ISBN', async function () {
    await typeormLivrosRepository.save(livroDTO);

    const buscarPorNomeOuISBNComISBNCorreto = await sut.buscarPorNomeOuISBN('ISBN_valido');

    expect(buscarPorNomeOuISBNComISBNCorreto).toHaveLength(1);
    expect(buscarPorNomeOuISBNComISBNCorreto[0].ISBN).toBe('ISBN_valido');
  });
});

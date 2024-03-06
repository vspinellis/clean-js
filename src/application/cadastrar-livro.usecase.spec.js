const cadastrarLivroUsecase = require('./cadastrar-livro.usecase');

describe('Cadastrar Livro UseCase', function () {
  const livrosRepository = {
    cadastrar: jest.fn()
  };
  test('Deve poder cadastrar um livro', async function () {
    const livroDTO = {
      nome: 'nome_valido',
      quantidade: 'quantidade_valida',
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido'
    };

    const sut = cadastrarLivroUsecase({ livrosRepository });
    const output = await sut(livroDTO);

    expect(output.right).toBeNull();
    expect(livrosRepository.cadastrar).toHaveBeenCalledWith(livroDTO);
    expect(livrosRepository.cadastrar).toHaveBeenCalledTimes(1);
  });
});

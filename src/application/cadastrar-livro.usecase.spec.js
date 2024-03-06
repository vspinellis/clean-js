const { AppError, Either } = require('../shared/errors');
const cadastrarLivroUseCase = require('./cadastrar-livro.usecase');

describe('Cadastrar Livro UseCase', function () {
  const livrosRepository = {
    cadastrar: jest.fn(),
    existePorISBN: jest.fn()
  };
  test('Deve poder cadastrar um livro', async function () {
    const livroDTO = {
      nome: 'nome_valido',
      quantidade: 'quantidade_valida',
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido'
    };

    const sut = cadastrarLivroUseCase({ livrosRepository });
    const output = await sut(livroDTO);

    expect(output.right).toBeNull();
    expect(livrosRepository.cadastrar).toHaveBeenCalledWith(livroDTO);
    expect(livrosRepository.cadastrar).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o livrosRepository não for fornecido', function () {
    expect(() => cadastrarLivroUseCase({})).toThrow(new AppError(AppError.dependencias));
  });

  test('Deve retornar um throw AppError se os campos obrigatórios não forem fornecidos', async function () {
    const sut = cadastrarLivroUseCase({ livrosRepository });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigatoriosAusentes)
    );
  });

  test('Dever retonar um Either.Left Either.valorJaCadastrado("ISBN") se já existir um ISBN cadastrado para um livro', async function () {
    livrosRepository.existePorISBN.mockReturnValue(true);
    const livroDTO = {
      nome: 'nome_valido',
      quantidade: 'quantidade_valida',
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido'
    };

    const sut = cadastrarLivroUseCase({ livrosRepository });
    const output = await sut(livroDTO);

    expect(output.left).toEqual(Either.valorJaCadastrado('CPF'));
    expect(livrosRepository.existePorISBN).toHaveBeenCalledWith(livroDTO.ISBN);
    expect(livrosRepository.existePorISBN).toHaveBeenCalledTimes(1);
  });
});

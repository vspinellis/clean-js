const { ZodError } = require('zod');
const { Either, AppError } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const buscarLivroPorNomeOuIsbnController = require('./buscar-livro-por-nome-ou-isbn.controller');

describe('Buscar livro por nome ou ISBN Controller', function () {
  const buscarLivroPorNomeOuISBNUseCase = jest.fn();
  test('Deve retornar um httpResponse 200 e os livros se forem encontrados com o valor informado', async function () {
    const livroDTO = [
      {
        id: 'qualquer_id',
        nome: 'qualquer_nome',
        quantidade: 3,
        autor: 'qualquer_autor',
        genero: 'qualquer_genero',
        ISBN: 'qualquer_ISBN'
      }
    ];
    buscarLivroPorNomeOuISBNUseCase.mockResolvedValue(Either.Right(livroDTO));
    const httpRequest = {
      query: {
        valor: 'nome_valido'
      }
    };

    const response = await buscarLivroPorNomeOuIsbnController({
      buscarLivroPorNomeOuISBNUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(200, livroDTO));
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledWith(httpRequest.query);
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um httpResponse 200 e um array vazio se não livros forem encontrados com o valor informado', async function () {
    buscarLivroPorNomeOuISBNUseCase.mockResolvedValue(Either.Right([]));
    const httpRequest = {
      query: {
        valor: 'nome_valido'
      }
    };

    const response = await buscarLivroPorNomeOuIsbnController({
      buscarLivroPorNomeOuISBNUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(200, []));
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledWith(httpRequest.query);
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o buscarLivroPorNomeOuISBN e httpRequest não forem fornecidos', function () {
    expect(() => buscarLivroPorNomeOuIsbnController({})).rejects.toThrow(
      new AppError(AppError.dependencias)
    );
  });

  test('Deve retornar um erro do Zod validator se der erro na validação', function () {
    const httpRequest = {
      query: {}
    };

    expect(() =>
      buscarLivroPorNomeOuIsbnController({ buscarLivroPorNomeOuISBNUseCase, httpRequest })
    ).rejects.toBeInstanceOf(ZodError);
  });
});

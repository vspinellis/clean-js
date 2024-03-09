const { Either } = require('../../shared/errors');
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
});
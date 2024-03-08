const { Either } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const cadastrarLivroController = require('./cadastrar-livro.controller');

describe('Cadastrar livro Controller', function () {
  const cadastrarLivroUseCase = jest.fn();

  test('Deve retornar um httpResponse 201 e null se o livro for cadastrado com sucesso', async function () {
    cadastrarLivroUseCase.mockResolvedValue(Either.Right(null));
    const httpRequest = {
      body: {
        nome: 'qualquer_nome',
        quantidade: 1,
        autor: 'qualquer_autor',
        genero: 'qualquer_genero',
        ISBN: 'qualquer_ISBN'
      }
    };

    const response = await cadastrarLivroController({
      cadastrarLivroUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(201, null));
    expect(cadastrarLivroUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um httpResponse 400 e message se o livro não for cadastrado com sucesso por lógica no useCase', async function () {
    cadastrarLivroUseCase.mockResolvedValue(Either.Left({ message: 'validacao_invalida' }));
    const httpRequest = {
      body: {
        nome: 'qualquer_nome',
        quantidade: 1,
        autor: 'qualquer_autor',
        genero: 'qualquer_genero',
        ISBN: 'qualquer_ISBN'
      }
    };

    const response = await cadastrarLivroController({
      cadastrarLivroUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(400, 'validacao_invalida'));
    expect(cadastrarLivroUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarLivroUseCase).toHaveBeenCalledTimes(1);
  });
});

const { Either, AppError } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const devolverLivroController = require('./devolver-livro.controller');

describe('Devolver livro Controller', function () {
  const devolverLivroUseCase = jest.fn();
  test('Deve retornar uma mensagem ao devolver um livro informando uma muita ou não', async function () {
    devolverLivroUseCase.mockResolvedValue(Either.Right('Multa por atraso: R$ 0'));
    const httpRequest = {
      body: {
        data_devolucao: '2024-02-14'
      },
      params: {
        emprestimo_id: '1'
      }
    };

    const response = await devolverLivroController({
      devolverLivroUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(200, 'Multa por atraso: R$ 0'));
    expect(devolverLivroUseCase).toHaveBeenCalledWith({
      ...httpRequest.body,
      ...httpRequest.params
    });
    expect(devolverLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um erro se o devolverLivroUsecase e httpRequest não forem fornecidos', async function () {
    await expect(() => devolverLivroController({})).rejects.toThrow(
      new AppError(AppError.dependencias)
    );
  });
});

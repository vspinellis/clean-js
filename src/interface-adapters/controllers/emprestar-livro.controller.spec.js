const { Either } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const emprestarLivroController = require('./emprestar-livro-controller');

describe('Emprestar livro Controller', function () {
  const emprestarLivroUseCase = jest.fn();
  test('Deve ser possivel emprestar um livro', async function () {
    emprestarLivroUseCase.mockResolvedValue(Either.Right(null));
    const httpRequest = {
      body: {
        livro_id: 1,
        usuario_id: 1,
        data_saida: '2024-02-03',
        data_retorno: '2024-02-15'
      }
    };

    const response = await emprestarLivroController({
      emprestarLivroUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(201, null));
    expect(emprestarLivroUseCase).toHaveBeenCalledWith({
      livro_id: 1,
      usuario_id: 1,
      data_saida: expect.any(Date),
      data_retorno: expect.any(Date)
    });
    expect(emprestarLivroUseCase).toHaveBeenCalledTimes(1);
  });
});

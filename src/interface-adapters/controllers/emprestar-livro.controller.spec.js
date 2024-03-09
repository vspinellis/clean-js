const { ZodError } = require('zod');
const { Either, AppError } = require('../../shared/errors');
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

  test('deve retornar um httpResponse 400 e error.message se o emprestimo não for realizado com sucesso por lógica do useCase', async function () {
    emprestarLivroUseCase.mockResolvedValue(Either.Left({ message: 'validacao_invalida' }));
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

    expect(response).toEqual(httpResponse(400, 'validacao_invalida'));
    expect(emprestarLivroUseCase).toHaveBeenCalledWith({
      livro_id: 1,
      usuario_id: 1,
      data_saida: expect.any(Date),
      data_retorno: expect.any(Date)
    });
    expect(emprestarLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um erro se o emprestarLivroUseCase e o httpRequest não forem fornecidos', function () {
    expect(() => emprestarLivroController({})).rejects.toThrow(new AppError(AppError.dependencias));
  });

  test('Deve retornar um erro do Zod validator se algum campo obrigatório não for informado', async function () {
    const httpRequest = {
      body: {}
    };

    await expect(() =>
      emprestarLivroController({ emprestarLivroUseCase, httpRequest })
    ).rejects.toBeInstanceOf(ZodError);
  });
});

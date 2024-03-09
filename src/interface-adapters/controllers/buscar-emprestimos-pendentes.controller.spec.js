const buscarPendentesFixture = require('../../../tests/fixtures/buscar-pendentes');
const { Either, AppError } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const buscarEmprestimosPendentesController = require('./buscar-emprestimos-pendentes.controller');

describe('Buscar Emprestimos Pendentes Controller', function () {
  const buscarEmprestimosPendentesUseCase = jest.fn();
  test('Deve retornar um httpResponse 200 e os empréstimos pendentes', async function () {
    buscarEmprestimosPendentesUseCase.mockResolvedValue(Either.Right(buscarPendentesFixture));
    const response = await buscarEmprestimosPendentesController({
      buscarEmprestimosPendentesUseCase
    });

    expect(response).toEqual(httpResponse(200, buscarPendentesFixture));
  });

  test('Deve retornar um erro se o buscrEmprestimosPendentesUseCase não for fornecido', async function () {
    await expect(() => buscarEmprestimosPendentesController({})).rejects.toThrow(
      new AppError(AppError.dependencias)
    );
  });
});

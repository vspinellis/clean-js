const AppError = require('./AppError');

describe('AppError', function () {
  test('AppError é uma instância de Error', function () {
    const appError = new AppError('erro');
    expect(appError).toBeInstanceOf(Error);
  });

  test('AppError contém a mensagem correta', function () {
    const mensagem = 'Mensagem de erro';
    const appError = new AppError(mensagem);
    expect(appError.message).toBe(mensagem);
  });
});

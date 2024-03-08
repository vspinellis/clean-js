const { Either, AppError } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const cadastrarUsuarioController = require('./cadastrar-usuario.controller');

describe('Cadastrar usuario Controller', function () {
  const cadastrarUsuarioUseCase = jest.fn();
  test('Deve retornar um httpResponse 201 e null se o cadastro for realizado com sucesso', async function () {
    cadastrarUsuarioUseCase.mockResolvedValue(Either.Right(null));
    const httpRequest = {
      body: {
        nome_completo: 'qualquer_nome',
        CPF: 'qualquer_CPF',
        endereco: 'qualquer_endereco',
        telefone: 'qualquer_telefone',
        email: 'qualquer_email'
      }
    };

    const response = await cadastrarUsuarioController({
      cadastrarUsuarioUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(201, null));
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o cadastrarUsuarioUseCase e httpRequest não for fornecido', function () {
    expect(() => cadastrarUsuarioController({})).rejects.toThrow(
      new AppError(AppError.dependencias)
    );
  });

  test('Deve retornar um httpResponse 400 e error.message se o cadastro de usuário não for realizado com sucesso por lógica do useCase', async function () {
    cadastrarUsuarioUseCase.mockResolvedValue(Either.Left({ message: 'logica_invalida' }));
    const httpRequest = {
      body: {
        nome_completo: 'qualquer_nome',
        CPF: 'qualquer_CPF',
        endereco: 'qualquer_endereco',
        telefone: 'qualquer_telefone',
        email: 'qualquer_email'
      }
    };

    const response = await cadastrarUsuarioController({
      cadastrarUsuarioUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(400, 'logica_invalida'));
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledTimes(1);
  });
});

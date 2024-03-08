const { ZodError } = require('zod');
const { Either, AppError } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const buscarUsuarioPorCpfController = require('./buscar-usuario-por-cpf.controller');

describe('Buscar usuario por CPF controller', function () {
  const buscarUsuarioPorCPFUseCase = jest.fn();
  test('Deve retornar um httpResponse 200 e um usuario se o mesmo for encontrado', async function () {
    const usuarioDTO = {
      id: 'qualquer_id',
      nome_completo: 'qualquer_nome',
      CPF: '123.123.123-12',
      endereco: 'qualquer_endereco',
      telefone: 'qualquer_telefone',
      email: 'qualquer_email'
    };

    buscarUsuarioPorCPFUseCase.mockResolvedValue(Either.Right(usuarioDTO));

    const httpRequest = {
      params: {
        CPF: '123.123.123-12'
      }
    };

    const response = await buscarUsuarioPorCpfController({
      buscarUsuarioPorCPFUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(200, usuarioDTO));
    expect(buscarUsuarioPorCPFUseCase).toHaveBeenCalledWith(httpRequest.params);
    expect(buscarUsuarioPorCPFUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um httpResponse 200 e null se não for encontrado nenhum usuário com o CPF', async function () {
    buscarUsuarioPorCPFUseCase.mockResolvedValue(Either.Right(null));

    const httpRequest = {
      params: {
        CPF: '123.123.123-12'
      }
    };

    const response = await buscarUsuarioPorCpfController({
      buscarUsuarioPorCPFUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(200, null));
    expect(buscarUsuarioPorCPFUseCase).toHaveBeenCalledWith(httpRequest.params);
    expect(buscarUsuarioPorCPFUseCase).toHaveBeenCalledTimes(1);
  });

  test('Dever retornar um throw AppError se o buscarUsuarioPorCPFUseCase e o httpRequest não forem fornecidos', async function () {
    await expect(() => buscarUsuarioPorCpfController({})).rejects.toThrow(
      new AppError(AppError.dependencias)
    );
  });

  test('Deve retornar um erro do zod validator se os campos obrigatórios não forem fornecidos', function () {
    const httpRequest = {
      params: {}
    };

    expect(() =>
      buscarUsuarioPorCpfController({ buscarUsuarioPorCPFUseCase, httpRequest })
    ).rejects.toBeInstanceOf(ZodError);
  });
});

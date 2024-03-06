const buscarUsuarioPorCpfUseCase = require('./buscar-usuario-por-cpf.usecase');

describe('Buscar usuario por CPF UseCase', function () {
  const usuariosRepository = {
    buscarPorCPF: jest.fn()
  };

  test('Deve retornar um usuário caso o CPF esteja cadastrado', async function () {
    const cpfDTO = {
      CPF: 'CPF_cadastrado'
    };

    const outputDTO = {
      id: 'qualquer_ID',
      nome: 'qualquer_nome',
      CPF: 'CPF_cadastrado',
      telefone: 'qualquer_telefone',
      email: 'qualquer_email'
    };
    usuariosRepository.buscarPorCPF.mockResolvedValue(outputDTO);

    const sut = buscarUsuarioPorCpfUseCase({ usuariosRepository });
    const output = await sut(cpfDTO);

    expect(output.right).toEqual(outputDTO);
    expect(usuariosRepository.buscarPorCPF).toHaveBeenCalledWith(cpfDTO.CPF);
    expect(usuariosRepository.buscarPorCPF).toHaveBeenCalledTimes(1);
  });
});

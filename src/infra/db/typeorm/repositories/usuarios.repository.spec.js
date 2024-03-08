const { usuariosRepository, typeormUsuariosRepository } = require('./usuarios.repository');

describe('Usuarios Repository', function () {
  let sut;
  beforeEach(async function () {
    await typeormUsuariosRepository.delete({});
  });

  beforeAll(function () {
    sut = usuariosRepository();
  });

  const usuarioDTO = {
    nome_completo: 'nome_valido',
    CPF: 'CPF_valido',
    telefone: 'telefone_valido',
    email: 'email_valido',
    endereco: 'endereco_valido'
  };

  test('Deve retornar void ao criar um usuario', async function () {
    const usuarioCriado = await sut.cadastrar(usuarioDTO);

    expect(usuarioCriado).toBeUndefined();
  });

  test('Deve retornar um usuário se o mesmo existir buscando por CPF', async function () {
    await typeormUsuariosRepository.save(usuarioDTO);
    const buscarPorCPFCadastrado = await sut.buscarPorCPF('CPF_valido');

    expect(buscarPorCPFCadastrado.id).toBeDefined();
    expect(buscarPorCPFCadastrado.nome_completo).toBe('nome_valido');
  });

  test('Deve retornar null se o usuário não existir ao buscar por CPF', async function () {
    const buscarPorCPFCadastrado = await sut.buscarPorCPF('CPF_nao_cadastrado');
    expect(buscarPorCPFCadastrado).toBeNull();
  });

  test('Deve retornar true se existir um usuario por CPF', async function () {
    await typeormUsuariosRepository.save(usuarioDTO);
    const existePorCPF = await sut.existePorCPF('CPF_valido');

    expect(existePorCPF).toBe(true);
  });

  test('Deve retornar false se não existir um usuario por CPF', async function () {
    const existePorCPF = await sut.existePorCPF('CPF_invalido');

    expect(existePorCPF).toBe(false);
  });
});

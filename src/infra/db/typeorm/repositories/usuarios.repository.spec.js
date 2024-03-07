const { usuariosRepository, typeormUsuariosRepository } = require('./usuarios.repository');

describe('Usuarios Repository', function () {
  beforeEach(async function () {
    await typeormUsuariosRepository.delete({});
  });

  test('Deve retornar void ao criar um usuario', async function () {
    const sut = usuariosRepository();
    const usuarioCriado = await sut.cadastrar({
      nome_completo: 'nome_valido',
      CPF: 'CPF_valido',
      telefone: 'telefone_valido',
      email: 'email_valido',
      endereco: 'envereco_valido'
    });

    expect(usuarioCriado).toBeUndefined();
  });

  test('Deve retornar um usuário se o mesmo existir buscando por CPF', async function () {
    await typeormUsuariosRepository.save({
      nome_completo: 'nome_valido',
      CPF: 'CPF_valido',
      telefone: 'telefone_valido',
      email: 'email_valido',
      endereco: 'envereco_valido'
    });
    const sut = usuariosRepository();
    const buscarPorCPFCadastrado = await sut.buscarPorCPF('CPF_valido');

    expect(buscarPorCPFCadastrado.id).toBeDefined();
    expect(buscarPorCPFCadastrado.nome_completo).toBe('nome_valido');
  });
});

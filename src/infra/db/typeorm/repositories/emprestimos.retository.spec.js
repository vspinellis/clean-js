const { emprestimosRepository } = require('./emprestimos.repository');
const { typeormLivrosRepository } = require('./livros.repository');
const { typeormUsuariosRepository } = require('./usuarios.repository');

describe('Emprestimos Repository Typeorm', function () {
  let sut;
  beforeAll(function () {
    sut = emprestimosRepository();
  });

  test('Deve retornar void ao criar um empréstimo', async function () {
    const usuario = await typeormUsuariosRepository.save({
      nome_completo: 'qualquer_nome',
      CPF: 'qualquer_CPF',
      telefone: 'qualquer_telefone',
      email: 'qualquer_email',
      endereco: 'qualquer_endereco'
    });

    const livro = await typeormLivrosRepository.save({
      nome: 'qualquer_nome',
      quantidade: 3,
      autor: 'qualquer_autor',
      genero: 'qualquer_genero',
      ISBN: 'qualquer_ISBN'
    });

    const emprestimoCriado = await sut.emprestar({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2024-01-26',
      data_retorno: '2024-01-27'
    });

    expect(emprestimoCriado).toBeUndefined();
  });
});

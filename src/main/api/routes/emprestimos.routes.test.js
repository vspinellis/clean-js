const request = require('supertest');

const {
  typeormLivrosRepository
} = require('../../../infra/db/typeorm/repositories/livros.repository');
const {
  typeormUsuariosRepository
} = require('../../../infra/db/typeorm/repositories/usuarios.repository');
const { app } = require('../app');
const {
  typeormEmprestimosRepository
} = require('../../../infra/db/typeorm/repositories/emprestimos.repository');

describe('Emprestimos Routes', function () {
  beforeEach(async function () {
    await typeormEmprestimosRepository.query('DELETE FROM emprestimos');
    await typeormLivrosRepository.query('DELETE FROM livros');
    await typeormUsuariosRepository.query('DELETE FROM usuarios');
  });

  test('Deve ser possivel emprestar um livro', async function () {
    const livro = await typeormLivrosRepository.save({
      nome: 'qualquer_nome',
      quantidade: 3,
      autor: 'qualquer_autor',
      genero: 'qualquer_genero',
      ISBN: 'qualquer_ISBN'
    });

    const usuario = await typeormUsuariosRepository.save({
      nome_completo: 'qualquer_nome',
      CPF: '123.123.123-12',
      endereco: 'qualquer_endereco',
      telefone: 'qualquer_telefone',
      email: 'qualquer_email@mail.com'
    });

    const { statusCode, body } = await request(app).post('/emprestimos').send({
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2024-02-15',
      data_retorno: '2024-02-16'
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });
});

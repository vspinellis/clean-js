const request = require('supertest');
const {
  typeormLivrosRepository
} = require('../../../infra/db/typeorm/repositories/livros.repository');
const { app } = require('../app');

describe('Livros Routes', function () {
  beforeEach(async function () {
    await typeormLivrosRepository.query('DELETE FROM livros');
  });
  test('Deve ser possivel cadastrar um livro', async function () {
    const { statusCode, body } = await request(app).post('/livros').send({
      nome: 'qualquer_nome',
      quantidade: 3,
      autor: 'qualquer_autor',
      genero: 'qualquer_genero',
      ISBN: 'qualquer_ISBN'
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });
});

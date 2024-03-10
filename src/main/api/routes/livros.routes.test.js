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

  test('Deve ser possível buscar um livro por nome', async function () {
    const livroDTO = {
      nome: 'qualquer_nome',
      quantidade: 3,
      autor: 'qualquer_autor',
      genero: 'qualquer_genero',
      ISBN: 'qualquer_ISBN'
    };
    await typeormLivrosRepository.save(livroDTO);
    const { statusCode, body } = await request(app)
      .get('/livros')
      .query({ valor: 'qualquer_nome' });

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(1);
    expect(body[0]).toEqual(expect.objectContaining(livroDTO));
  });
});

const request = require('supertest');
const {
  typeormLivrosRepository
} = require('../../../infra/db/typeorm/repositories/livros.repository');
const { app } = require('../app');
const {
  typeormEmprestimosRepository
} = require('../../../infra/db/typeorm/repositories/emprestimos.repository');

describe('Livros Routes', function () {
  beforeEach(async function () {
    await typeormEmprestimosRepository.query('DELETE from emprestimos');
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

  test('Deve ser possível buscar um livro por ISBN', async function () {
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
      .query({ valor: 'qualquer_ISBN' });

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(1);
    expect(body[0]).toEqual(expect.objectContaining(livroDTO));
  });

  test('Deve retornar um array vazio ao buscar um livro por nome ou ISBN e nada for encontrado', async function () {
    const { statusCode, body } = await request(app)
      .get('/livros')
      .query({ valor: 'qualquer_ISBN' });

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(0);
  });

  test('Deve retornar um erro se ao cadastrar os campos obrigaórios estiverem ausentes', async function () {
    const { statusCode, body } = await request(app).post('/livros').send({});

    expect(statusCode).toBe(400);
    expect(body.message).toBe('Erro na validação');
    expect(body.erros.fieldErrors).toEqual({
      nome: ['Nome é obrigatório'],
      quantidade: ['Quantidade é obrigatória'],
      autor: ['Autor é obrigatório'],
      genero: ['Gênero é obrigatório'],
      ISBN: ['ISBN é obrigatório']
    });
  });

  test('Deve retornar um erro se o campo obrigatório valor não for fornnecido', async function () {
    const { statusCode, body } = await request(app).get('/livros');

    expect(statusCode).toBe(400);
    expect(body.message).toBe('Erro na validação');
    expect(body.erros.fieldErrors).toEqual({
      valor: ['Valor é obrigatório']
    });
  });
});

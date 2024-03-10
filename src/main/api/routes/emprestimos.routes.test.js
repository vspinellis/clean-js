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

  const livroDTO = {
    nome: 'qualquer_nome',
    quantidade: 3,
    autor: 'qualquer_autor',
    genero: 'qualquer_genero',
    ISBN: 'qualquer_ISBN'
  };

  const usuarioDTO = {
    nome_completo: 'qualquer_nome',
    CPF: '123.123.123-12',
    endereco: 'qualquer_endereco',
    telefone: 'qualquer_telefone',
    email: 'qualquer_email@mail.com'
  };

  test('Deve ser possivel emprestar um livro', async function () {
    const livro = await typeormLivrosRepository.save(livroDTO);
    const usuario = await typeormUsuariosRepository.save(usuarioDTO);
    const { statusCode, body } = await request(app).post('/emprestimos').send({
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2024-02-15',
      data_retorno: '2024-02-16'
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });

  test('Deve retornar 200 e uma mensagem de multa não aplicada', async function () {
    const livro = await typeormLivrosRepository.save(livroDTO);
    const usuario = await typeormUsuariosRepository.save(usuarioDTO);
    const emprestimo = await typeormEmprestimosRepository.save({
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2024-02-15',
      data_retorno: '2024-02-16'
    });

    const { statusCode, body } = await request(app)
      .put(`/emprestimos/devolver/${emprestimo.id}`)
      .send({
        data_devolucao: '2024-02-16'
      });

    expect(statusCode).toBe(200);
    expect(body).toBe('Multa por atraso: R$ 0');
  });

  test('Deve retornar 200 e uma mensagem de multa aplicada', async function () {
    const livro = await typeormLivrosRepository.save(livroDTO);
    const usuario = await typeormUsuariosRepository.save(usuarioDTO);
    const emprestimo = await typeormEmprestimosRepository.save({
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2024-02-15',
      data_retorno: '2024-02-16'
    });

    const { statusCode, body } = await request(app)
      .put(`/emprestimos/devolver/${emprestimo.id}`)
      .send({
        data_devolucao: '2024-02-17'
      });

    expect(statusCode).toBe(200);
    expect(body).toBe('Multa por atraso: R$ 10,00');
  });

  test('Deve retornar um erro caso o campo obrigatório não tenha sido informado', async function () {
    const { statusCode, body } = await request(app).put(`/emprestimos/devolver/3`).send({});

    expect(statusCode).toBe(400);
    expect(body.erros.fieldErrors).toEqual({
      data_devolucao: ['Data devolução é obrigatória']
    });
  });

  test('Deve retornar os empréstimos pendentes', async function () {
    const livro = await typeormLivrosRepository.save(livroDTO);
    const usuario = await typeormUsuariosRepository.save(usuarioDTO);
    await typeormEmprestimosRepository.save([
      {
        livro_id: livro.id,
        usuario_id: usuario.id,
        data_saida: '2024-02-15',
        data_retorno: '2024-02-16',
        data_devolucao: '2024-02-16'
      },
      {
        livro_id: livro.id,
        usuario_id: usuario.id,
        data_saida: '2024-02-17',
        data_retorno: '2024-02-18'
      }
    ]);

    const { statusCode, body } = await request(app).get(`/emprestimos`);

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(1);
  });
});

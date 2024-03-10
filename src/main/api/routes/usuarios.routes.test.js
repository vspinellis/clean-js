const request = require('supertest');
const { app } = require('../app');
const {
  typeormUsuariosRepository
} = require('../../../infra/db/typeorm/repositories/usuarios.repository');

describe('Usuarios Routes', function () {
  beforeEach(async function () {
    await typeormUsuariosRepository.query('DELETE FROM usuarios');
  });

  test('Deve ser possível cadastar um usuário', async function () {
    const { statusCode, body } = await request(app).post('/usuarios').send({
      nome_completo: 'nome_valido',
      CPF: '123.123.123-12',
      endereco: 'endereco_valido',
      telefone: 'telefone_valido',
      email: 'email_valido@email.com'
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });

  test('Deve retornar um erro com os campos obrigatórios ausentes', async function () {
    const { statusCode, body } = await request(app).post('/usuarios').send({});

    expect(statusCode).toBe(400);
    expect(body.message).toBe('Erro na validação');
    expect(body.erros.fieldErrors).toEqual({
      nome_completo: ['Nome Completo é obrigatório'],
      CPF: ['CPF é obrigatório'],
      endereco: ['Endereço é obrigatório'],
      telefone: ['Telefone é obrigatório'],
      email: ['Email é obrigatório']
    });
  });

  test('Deve retornar um usuario ao buscar pelo CPF', async function () {
    const usuarioDTO = {
      nome_completo: 'qualquer_nome',
      CPF: '123.123.123-12',
      endereco: 'endereco_valido',
      telefone: 'telefone_valido',
      email: 'email_valido'
    };
    await typeormUsuariosRepository.save(usuarioDTO);

    const { statusCode, body } = await request(app).get('/usuarios/cpf/123.123.123-12');

    expect(body.id).toBeDefined();
    expect(statusCode).toBe(200);
    expect(body).toEqual(expect.objectContaining(usuarioDTO));
  });

  test('Deve retornar um usuario ao buscar pelo CPF', async function () {
    const { statusCode, body } = await request(app).get('/usuarios/cpf/123.123.123-12');

    expect(statusCode).toBe(200);
    expect(body).toBeNull();
  });
});

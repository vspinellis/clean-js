const { Router } = require('express');
const {
  usuariosRepository
} = require('../../../infra/db/typeorm/repositories/usuarios.repository');
const cadastrarUsuarioUsecase = require('../../../application/cadastrar-usuario.usecase');
const cadastrarUsuarioController = require('../../../interface-adapters/controllers/cadastrar-usuario.controller');

const usuariosRoutes = Router();

usuariosRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body
  };
  const usuariosRepositoryFn = usuariosRepository();
  const cadastraUsuarioUseCaseFn = cadastrarUsuarioUsecase({
    usuariosRepository: usuariosRepositoryFn
  });
  const { statusCode, body } = cadastrarUsuarioController({
    cadastrarUsuarioUseCase: cadastraUsuarioUseCaseFn,
    httpRequest
  });

  return response.status(statusCode).json(body);
});

module.exports = { usuariosRoutes };

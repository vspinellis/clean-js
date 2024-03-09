const cadastrarUsuarioUsecase = require('../../../application/cadastrar-usuario.usecase');
const {
  usuariosRepository
} = require('../../../infra/db/typeorm/repositories/usuarios.repository');
const cadastrarUsuarioController = require('../../../interface-adapters/controllers/cadastrar-usuario.controller');

module.exports = async function cadastrarUsuarioCompose(httpRequest) {
  const usuariosRepositoryFn = usuariosRepository();
  const cadastraUsuarioUseCaseFn = cadastrarUsuarioUsecase({
    usuariosRepository: usuariosRepositoryFn
  });
  const controller = cadastrarUsuarioController({
    cadastrarUsuarioUseCase: cadastraUsuarioUseCaseFn,
    httpRequest
  });

  return controller;
};

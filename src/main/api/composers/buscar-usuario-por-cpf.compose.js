const buscarUsuarioPorCpfUsecase = require('../../../application/buscar-usuario-por-cpf.usecase');
const {
  usuariosRepository
} = require('../../../infra/db/typeorm/repositories/usuarios.repository');
const buscarUsuarioPorCpfController = require('../../../interface-adapters/controllers/buscar-usuario-por-cpf.controller');

module.exports = async function buscarUsuarioPorCPFCompose(httpRequest) {
  const usuariosRepositoryFn = usuariosRepository();
  const buscarUsuarioPorCPFUseCaseFn = buscarUsuarioPorCpfUsecase({
    usuariosRepository: usuariosRepositoryFn
  });
  const controller = await buscarUsuarioPorCpfController({
    buscarUsuarioPorCPFUseCase: buscarUsuarioPorCPFUseCaseFn,
    httpRequest
  });

  return controller;
};

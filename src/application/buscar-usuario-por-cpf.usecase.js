const { Either } = require('../shared/errors');

module.exports = function buscarUsuarioPorCPFUseCase({ usuariosRepository }) {
  return async function ({ CPF }) {
    const usuario = await usuariosRepository.buscarPorCPF(CPF);
    return Either.Right(usuario);
  };
};

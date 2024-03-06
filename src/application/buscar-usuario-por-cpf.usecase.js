const { Either, AppError } = require('../shared/errors');

module.exports = function buscarUsuarioPorCPFUseCase({ usuariosRepository }) {
  if (!usuariosRepository) throw new AppError(AppError.dependencias);
  return async function ({ CPF }) {
    const usuario = await usuariosRepository.buscarPorCPF(CPF);
    return Either.Right(usuario);
  };
};

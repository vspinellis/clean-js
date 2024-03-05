const AppError = require('../shared/errors/AppError');

module.exports = function cadastrarUsuarioUseCase({ usuariosRepository }) {
  if (!usuariosRepository) throw new AppError(AppError.dependencias);
  return async function ({ nome_completo, CPF, telefone, endereco, email }) {
    await usuariosRepository.cadastrar({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email
    });
  };
};

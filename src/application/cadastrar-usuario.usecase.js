const { Either } = require('../shared/errors');
const AppError = require('../shared/errors/AppError');

module.exports = function cadastrarUsuarioUseCase({ usuariosRepository }) {
  if (!usuariosRepository) throw new AppError(AppError.dependencias);
  return async function ({ nome_completo, CPF, telefone, endereco, email }) {
    const checaCampos = nome_completo && CPF && telefone && endereco && email;
    if (!checaCampos) throw new AppError(AppError.parametrosObrigatoriosAusentes);
    const checaSeJaExisteUmUsuarioCadastradoComOCPF = await usuariosRepository.existePorCPF(CPF);
    if (checaSeJaExisteUmUsuarioCadastradoComOCPF)
      return Either.Left(Either.valorJaCadastrado('CPF'));
    await usuariosRepository.cadastrar({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email
    });
    return Either.Right(null);
  };
};

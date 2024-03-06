const { Either, AppError } = require('../shared/errors');

module.exports = function cadastrarLivroUseCase({ livrosRepository }) {
  if (!livrosRepository) throw new AppError(AppError.dependencias);
  return async function ({ nome, quantidade, autor, genero, ISBN }) {
    const checaCampos = nome && quantidade && autor && genero && ISBN;
    if (!checaCampos) throw new AppError(AppError.parametrosObrigatoriosAusentes);
    const checaSeJaExisteUmLivroComOISBN = await livrosRepository.existePorISBN(ISBN);
    if (checaSeJaExisteUmLivroComOISBN) return Either.Left(Either.valorJaCadastrado('CPF'));
    await livrosRepository.cadastrar({ nome, quantidade, autor, genero, ISBN });
    return Either.Right(null);
  };
};

const { Either, AppError } = require('../shared/errors');

module.exports = function buscarLivrosPorNomeOuISBNUsecase({ livrosRepository }) {
  if (!livrosRepository) throw new AppError(AppError.dependencias);
  return async function ({ valor }) {
    const livros = await livrosRepository.buscarPorNomeOuISBN(valor);
    return Either.Right(livros);
  };
};

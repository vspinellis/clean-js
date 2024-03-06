const { Either } = require('../shared/errors');

module.exports = function cadastrarLivroUseCase({ livrosRepository }) {
  return async function ({ nome, quantidade, autor, genero, ISBN }) {
    await livrosRepository.cadastrar({ nome, quantidade, autor, genero, ISBN });
    return Either.Right(null);
  };
};

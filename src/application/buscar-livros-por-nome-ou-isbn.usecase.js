const { Either } = require('../shared/errors');

module.exports = function buscarLivrosPorNomeOuISBNUsecase({ livrosRepository }) {
  return async function ({ valor }) {
    const livros = await livrosRepository.buscarPorNomeOuISBN(valor);
    console.log('LIVROS', livros);
    return Either.Right(livros);
  };
};

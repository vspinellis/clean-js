const buscarLivrosPorNomeOuIsbnUsecase = require('../../../application/buscar-livros-por-nome-ou-isbn.usecase');
const { livrosRepository } = require('../../../infra/db/typeorm/repositories/livros.repository');
const buscarLivroPorNomeOuIsbnController = require('../../../interface-adapters/controllers/buscar-livro-por-nome-ou-isbn.controller');

module.exports = async function buscarLivroPorNomeOuISBNCompose(httpRequest) {
  const livrosRepositoryFn = livrosRepository();
  const buscarLivroPorNomeOuISBNUseCaseFn = buscarLivrosPorNomeOuIsbnUsecase({
    livrosRepository: livrosRepositoryFn
  });
  const controller = buscarLivroPorNomeOuIsbnController({
    buscarLivroPorNomeOuISBNUseCase: buscarLivroPorNomeOuISBNUseCaseFn,
    httpRequest
  });

  return controller;
};

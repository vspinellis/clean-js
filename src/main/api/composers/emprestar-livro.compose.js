const emprestarLivroUsecase = require('../../../application/emprestar-livro.usecase');
const {
  emprestimosRepository
} = require('../../../infra/db/typeorm/repositories/emprestimos.repository');
const emprestarLivroController = require('../../../interface-adapters/controllers/emprestar-livro-controller');

module.exports = function emprestarLivroCompose(httpRequest) {
  const emprestimosRepositoryFn = emprestimosRepository();
  const emprestarLivroUseCaseFn = emprestarLivroUsecase({
    emprestimosRepository: emprestimosRepositoryFn
  });
  const controller = emprestarLivroController({
    emprestarLivroUseCase: emprestarLivroUseCaseFn,
    httpRequest
  });

  return controller;
};

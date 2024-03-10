const emprestarLivroUsecase = require('../../../application/emprestar-livro.usecase');
const {
  emprestimosRepository
} = require('../../../infra/db/typeorm/repositories/emprestimos.repository');
const nodemailerService = require('../../../infra/email/nodemailer');
const emprestarLivroController = require('../../../interface-adapters/controllers/emprestar-livro-controller');

module.exports = function emprestarLivroCompose(httpRequest) {
  const emprestimosRepositoryFn = emprestimosRepository();
  const emailServiceFn = nodemailerService();
  const emprestarLivroUseCaseFn = emprestarLivroUsecase({
    emprestimosRepository: emprestimosRepositoryFn,
    emailService: emailServiceFn
  });
  const controller = emprestarLivroController({
    emprestarLivroUseCase: emprestarLivroUseCaseFn,
    httpRequest
  });

  return controller;
};

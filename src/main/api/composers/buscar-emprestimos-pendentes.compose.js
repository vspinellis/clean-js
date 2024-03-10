const buscarEmprestimosPendentesUsecase = require('../../../application/buscar-emprestimos-pendentes.usecase');
const {
  emprestimosRepository
} = require('../../../infra/db/typeorm/repositories/emprestimos.repository');
const buscarEmprestimosPendentesController = require('../../../interface-adapters/controllers/buscar-emprestimos-pendentes.controller');

module.exports = function buscarEmprestimosPendentesCompose() {
  const emprestimosRepositoryFn = emprestimosRepository();
  const buscarEmprestimosPendentesUseCaseFn = buscarEmprestimosPendentesUsecase({
    emprestimosRepository: emprestimosRepositoryFn
  });
  const controller = buscarEmprestimosPendentesController({
    buscarEmprestimosPendentesUseCase: buscarEmprestimosPendentesUseCaseFn
  });

  return controller;
};

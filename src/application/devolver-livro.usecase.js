const { Either } = require('../shared/errors');

module.exports = function devolverLivroUseCase({ emprestimosRepository }) {
  return async function ({ emprestimo_id, data_devolucao }) {
    await emprestimosRepository.devolver({
      emprestimo_id,
      data_devolucao
    });

    const verificarMulta = 'Multa por atraso: R$ 0';
    return Either.Right(verificarMulta);
  };
};

const { Either } = require('../shared/errors');

module.exports = function devolverLivroUseCase({ emprestimosRepository }) {
  return async function ({ emprestimo_id, data_devolucao }) {
    const { data_retorno } = await emprestimosRepository.devolver({
      emprestimo_id,
      data_devolucao
    });

    const verificarDataRetorno =
      new Date(data_retorno).getTime() < new Date(data_devolucao).getTime();
    const verificarMulta = verificarDataRetorno
      ? 'Multa por atraso: R$ 10,00'
      : 'Multa por atraso: R$ 0';
    return Either.Right(verificarMulta);
  };
};

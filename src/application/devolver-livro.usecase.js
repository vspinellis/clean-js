const { Either, AppError } = require('../shared/errors');

module.exports = function devolverLivroUseCase({ emprestimosRepository }) {
  if (!emprestimosRepository) throw new AppError(AppError.dependencias);
  return async function ({ emprestimo_id, data_devolucao }) {
    const checaCampos = emprestimo_id && data_devolucao;
    if (!checaCampos) throw new AppError(AppError.parametrosObrigatoriosAusentes);
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

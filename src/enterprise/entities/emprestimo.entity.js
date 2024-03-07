const { AppError } = require('../../shared/errors');

const emprestimosEntity = function () {
  function calcularDiasAtraso({ data_retorno, data_devolucao }) {
    return new Date(data_retorno).getTime() < new Date(data_devolucao).getTime();
  }

  const calcularMulta = function ({ data_retorno, data_devolucao }) {
    if (!data_retorno || !data_devolucao)
      throw new AppError(AppError.parametrosObrigatoriosAusentes);
    const diasAtraso = calcularDiasAtraso({ data_retorno, data_devolucao });
    return `Multa por atraso: R$ ${diasAtraso > 0 ? '10,00' : '0'}`;
  };

  return { calcularMulta };
};

module.exports = emprestimosEntity();

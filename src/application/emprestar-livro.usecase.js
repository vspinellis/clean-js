const { sendMailQueue } = require('../infra/queue/bull');
const { AppError, Either } = require('../shared/errors');

module.exports = function emprestarLivroUseCase({ emprestimosRepository, emailService }) {
  if (!emprestimosRepository || !emailService) throw new AppError(AppError.dependencias);
  return async function ({ usuario_id, livro_id, data_saida, data_retorno }) {
    const checaCampos = usuario_id && livro_id && data_saida && data_retorno;
    if (!checaCampos) throw new AppError(AppError.parametrosObrigatoriosAusentes);
    if (data_saida.getTime() > data_retorno.getTime())
      return Either.Left(Either.dataRetornoMenorQueDataSaida);
    const existeLivroISBNEmprestadoPendenteUsuario =
      await emprestimosRepository.existeLivroISBNEmprestadoPendenteUsuario({
        usuario_id,
        livro_id
      });
    if (existeLivroISBNEmprestadoPendenteUsuario)
      return Either.Left(Either.livroComISBNJaEmprestadoPendenteUsuario);
    const id = await emprestimosRepository.emprestar({
      usuario_id,
      livro_id,
      data_saida,
      data_retorno
    });

    const { usuario, livro } = await emprestimosRepository.buscarEmprestimoComLivroComUsuarioPorID(
      id
    );

    await sendMailQueue.add({
      data_saida: data_saida.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      data_retorno: data_retorno.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      usuario,
      livro
    });

    return Either.Right(null);
  };
};

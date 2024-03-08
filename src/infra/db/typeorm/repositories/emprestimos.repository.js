const { typeormServer } = require('../setup');

const typeormEmprestimosRepository = typeormServer.getRepository('Emprestimo');

const emprestimosRepository = function () {
  const emprestar = async function ({ livro_id, usuario_id, data_saida, data_retorno }) {
    await typeormEmprestimosRepository.save({
      livro_id,
      usuario_id,
      data_saida,
      data_retorno
    });
  };

  return { emprestar };
};

module.exports = { typeormEmprestimosRepository, emprestimosRepository };

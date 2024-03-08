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

  const devolver = async function ({ emprestimo_id, data_devolucao }) {
    await typeormEmprestimosRepository.update(emprestimo_id, {
      data_devolucao
    });

    const { data_retorno } = await typeormEmprestimosRepository.findOneBy({
      id: emprestimo_id
    });

    return { data_retorno };
  };

  return { emprestar, devolver };
};

module.exports = { typeormEmprestimosRepository, emprestimosRepository };

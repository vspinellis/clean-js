const { IsNull } = require('typeorm');
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

  const buscarPendentesComLivroComUsuario = async function () {
    const emprestimosPendentes = await typeormEmprestimosRepository.find({
      where: {
        data_devolucao: IsNull()
      },
      relations: ['usuario', 'livro'],
      select: {
        id: true,
        data_saida: true,
        data_retorno: true,
        usuario: {
          nome_completo: true,
          CPF: true
        },
        livro: {
          nome: true
        }
      }
    });

    return emprestimosPendentes;
  };

  const existeLivroISBNEmprestadoPendenteUsuario = async function ({ usuario_id, livro_id }) {
    const emprestimoLivro = await typeormEmprestimosRepository.count({
      where: {
        data_devolucao: IsNull(),
        livro_id,
        usuario_id
      }
    });

    return emprestimoLivro === 0 ? false : true;
  };

  return {
    emprestar,
    devolver,
    buscarPendentesComLivroComUsuario,
    existeLivroISBNEmprestadoPendenteUsuario
  };
};

module.exports = { typeormEmprestimosRepository, emprestimosRepository };

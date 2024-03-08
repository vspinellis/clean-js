const { typeormServer } = require('../setup');

const typeormUsuariosRepository = typeormServer.getRepository('Usuario');

const usuariosRepository = function () {
  const cadastrar = async function ({ nome_completo, CPF, telefone, endereco, email }) {
    await typeormUsuariosRepository.save({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email
    });
  };

  const buscarPorCPF = async function (CPF) {
    const usuario = await typeormUsuariosRepository.findOne({
      where: {
        CPF
      }
    });

    return usuario;
  };

  const existePorCPF = async function (CPF) {
    const usuario = await typeormUsuariosRepository.count({
      where: {
        CPF
      }
    });

    return usuario === 0 ? false : true;
  };

  return { cadastrar, buscarPorCPF, existePorCPF };
};

module.exports = { usuariosRepository, typeormUsuariosRepository };

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

  return { cadastrar, buscarPorCPF };
};

module.exports = { usuariosRepository, typeormUsuariosRepository };

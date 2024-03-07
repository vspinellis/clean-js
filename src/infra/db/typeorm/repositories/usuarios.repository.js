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

  return { cadastrar };
};

module.exports = { usuariosRepository, typeormUsuariosRepository };

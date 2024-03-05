module.exports = function cadastrarUsuarioUseCase({ usuariosRepository }) {
  return async function ({ nome_completo, CPF, telefone, endereco, email }) {
    await usuariosRepository.cadastrar({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email
    });
  };
};

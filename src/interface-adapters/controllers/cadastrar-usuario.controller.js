module.exports = async function cadastrarUsuarioController({
  cadastrarUsuarioUseCase,
  httpRequest
}) {
  const { nome_completo, CPF, endereco, telefone, email } = httpRequest.body;
  const output = await cadastrarUsuarioUseCase({
    nome_completo,
    CPF,
    endereco,
    telefone,
    email
  });

  return output.fold(
    (error) => httpRequest(400, error.message),
    () => httpRequest(201, null)
  );
};

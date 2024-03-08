const httpResponse = require('../../shared/helpers/http.response');

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
    (error) => httpResponse(400, error.message),
    () => httpResponse(201, null)
  );
};

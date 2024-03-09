const { z } = require('zod');
const httpResponse = require('../../shared/helpers/http.response');
const { AppError } = require('../../shared/errors');

const zodValidator = z.object({
  valor: z.string({
    required_error: 'Valor é obrigatório'
  })
});

module.exports = async function buscarLivroPorNomeOuISBNController({
  buscarLivroPorNomeOuISBNUseCase,
  httpRequest
}) {
  const checaDependencias = !buscarLivroPorNomeOuISBNUseCase || !httpRequest || !httpRequest.query;
  if (checaDependencias) throw new AppError(AppError.dependencias);
  const { valor } = zodValidator.parse(httpRequest.query);
  const output = await buscarLivroPorNomeOuISBNUseCase({ valor });

  return output.fold(
    (error) => httpResponse(400, error.message),
    (livros) => httpResponse(200, livros)
  );
};

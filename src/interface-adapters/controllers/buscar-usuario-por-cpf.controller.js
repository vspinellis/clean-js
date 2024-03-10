const { z } = require('zod');
const httpResponse = require('../../shared/helpers/http.response');
const { AppError } = require('../../shared/errors');

const zodValidator = z.object({
  CPF: z
    .string({
      required_error: 'CPF é obrigatório'
    })
    .refine((value) => /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/.test(value), {
      message: 'CPF inválido'
    })
});

module.exports = async function buscarUsuarioPorCPFController({
  buscarUsuarioPorCPFUseCase,
  httpRequest
}) {
  if (!buscarUsuarioPorCPFUseCase || !httpRequest || !httpRequest.params)
    throw new AppError(AppError.dependencias);
  const { CPF } = zodValidator.parse(httpRequest.params);
  const output = await buscarUsuarioPorCPFUseCase({ CPF });
  return output.fold(
    (error) => httpResponse(400, error.message),
    (usuario) => httpResponse(200, usuario)
  );
};

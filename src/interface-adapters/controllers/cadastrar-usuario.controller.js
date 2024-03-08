const { AppError } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');

const { z } = require('zod');

const zodValidator = z.object({
  nome_completo: z.string({
    required_error: 'Nome Completo é obrigatório'
  }),
  CPF: z
    .string({
      required_error: 'CPF é obrigatório'
    })
    .refine((value) => /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/.test(value)),
  endereco: z.string({
    required_error: 'Endereço é obrigatório'
  }),
  telefone: z.string({
    required_error: 'Telefone é obrigatório'
  }),
  email: z
    .string({
      required_error: 'Email é obrigatório'
    })
    .email({
      message: 'Email deve ser válido'
    })
});

module.exports = async function cadastrarUsuarioController({
  cadastrarUsuarioUseCase,
  httpRequest
}) {
  const checaDependencias = !cadastrarUsuarioUseCase || !httpRequest || !httpRequest.body;
  if (checaDependencias) throw new AppError(AppError.dependencias);
  const { nome_completo, CPF, endereco, telefone, email } = zodValidator.parse(httpRequest.body);
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

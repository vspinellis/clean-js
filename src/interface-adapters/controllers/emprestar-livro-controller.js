const { z } = require('zod');
const httpResponse = require('../../shared/helpers/http.response');
const { AppError } = require('../../shared/errors');

const zodValidator = z.object({
  livro_id: z.number({
    required_error: 'Livro é obrigatório'
  }),
  usuario_id: z.number({
    required_error: 'Usuário é obrigatório'
  }),
  data_saida: z.string({
    required_error: 'Data saída é obrigatória'
  }),
  data_retorno: z.string({
    required_error: 'Data retorno é obrigatória'
  })
});

module.exports = async function emprestarLivroController({ emprestarLivroUseCase, httpRequest }) {
  const checaDependencias = !emprestarLivroUseCase || !httpRequest || !httpRequest.body;
  if (checaDependencias) throw new AppError(AppError.dependencias);
  const { livro_id, usuario_id, data_saida, data_retorno } = zodValidator.parse(httpRequest.body);

  const output = await emprestarLivroUseCase({
    livro_id,
    usuario_id,
    data_saida: new Date(data_saida),
    data_retorno: new Date(data_retorno)
  });

  return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(201, null)
  );
};

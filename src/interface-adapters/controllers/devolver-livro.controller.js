const { z } = require('zod');
const httpResponse = require('../../shared/helpers/http.response');

const zodValidatorBody = z.object({
  data_devolucao: z.string({
    required_error: 'Date devolução é obrigatória'
  })
});

module.exports = async function devolverLivroController({ devolverLivroUseCase, httpRequest }) {
  const { data_devolucao } = zodValidatorBody.parse(httpRequest.body);
  const { emprestimo_id } = httpRequest.params;

  const output = await devolverLivroUseCase({
    emprestimo_id,
    data_devolucao
  });

  return output.fold(
    (error) => httpResponse(400, error.message),
    (resultado) => httpResponse(200, resultado)
  );
};

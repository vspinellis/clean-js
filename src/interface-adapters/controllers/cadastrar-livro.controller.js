const { z } = require('zod');
const httpResponse = require('../../shared/helpers/http.response');
const { AppError } = require('../../shared/errors');

const zodValidator = z.object({
  nome: z.string({
    required_error: 'Nome é obrigatório'
  }),
  quantidade: z.number({
    required_error: 'Quantidade é obrigatória'
  }),
  autor: z.string({
    required_error: 'Autor é obrigatório'
  }),
  genero: z.string({
    required_error: 'Gênero é obrigatório'
  }),
  ISBN: z.string({
    required_error: 'ISBN é obrigatório'
  })
});

module.exports = async function cadastrarLivroController({ cadastrarLivroUseCase, httpRequest }) {
  const checaDependencias = !cadastrarLivroUseCase || !httpRequest || !httpRequest.body;
  if (checaDependencias) throw new AppError(AppError.dependencias);
  const { nome, quantidade, autor, genero, ISBN } = zodValidator.parse(httpRequest.body);

  const output = await cadastrarLivroUseCase({
    nome,
    quantidade,
    autor,
    genero,
    ISBN
  });

  return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(201, null)
  );
};

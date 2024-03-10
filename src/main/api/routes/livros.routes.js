const { Router } = require('express');
const cadastrarLivroCompose = require('../composers/cadastrar-livro.compose');
const buscarLivroPorNomeOuIsbnCompose = require('../composers/buscar-livro-por-nome-ou-isbn.compose');

const livrosRoutes = Router();

livrosRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body
  };
  const { statusCode, body } = await cadastrarLivroCompose(httpRequest);
  return response.status(statusCode).json(body);
});

livrosRoutes.get('/', async (request, response) => {
  const httpRequest = {
    query: request.query
  };

  const { statusCode, body } = await buscarLivroPorNomeOuIsbnCompose(httpRequest);
  return response.status(statusCode).json(body);
});
module.exports = { livrosRoutes };

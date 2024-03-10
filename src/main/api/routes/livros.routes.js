const { Router } = require('express');
const cadastrarLivroCompose = require('../composers/cadastrar-livro.compose');

const livrosRoutes = Router();

livrosRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body
  };
  const { statusCode, body } = await cadastrarLivroCompose(httpRequest);
  return response.status(statusCode).json(body);
});

module.exports = { livrosRoutes };

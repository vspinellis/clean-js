const emprestarLivroCompose = require('../composers/emprestar-livro.compose');

const { Router } = require('express');

const emprestimosRoutes = Router();

emprestimosRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body
  };

  const { statusCode, body } = await emprestarLivroCompose(httpRequest);
  return response.status(statusCode).json(body);
});

module.exports = { emprestimosRoutes };

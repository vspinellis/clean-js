const buscarEmprestimosPendentesCompose = require('../composers/buscar-emprestimos-pendentes.compose');
const devolverLivroCompose = require('../composers/devolver-livro.compose');
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

emprestimosRoutes.put('/devolver/:emprestimo_id', async (request, response) => {
  const httpRequest = {
    body: request.body,
    params: request.params
  };

  const { statusCode, body } = await devolverLivroCompose(httpRequest);
  return response.status(statusCode).json(body);
});

emprestimosRoutes.get('/', async (request, response) => {
  const { statusCode, body } = await buscarEmprestimosPendentesCompose();
  return response.status(statusCode).json(body);
});

module.exports = { emprestimosRoutes };

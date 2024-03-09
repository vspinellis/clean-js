const { Router } = require('express');
const cadastrarUsuarioCompose = require('../composers/cadastrar-usuario.compose');

const usuariosRoutes = Router();

usuariosRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body
  };
  const { statusCode, body } = await cadastrarUsuarioCompose(httpRequest);

  return response.status(statusCode).json(body);
});

module.exports = { usuariosRoutes };

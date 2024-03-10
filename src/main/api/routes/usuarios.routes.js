const { Router } = require('express');
const cadastrarUsuarioCompose = require('../composers/cadastrar-usuario.compose');
const buscarUsuarioPorCpfCompose = require('../composers/buscar-usuario-por-cpf.compose');

const usuariosRoutes = Router();

usuariosRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body
  };
  const { statusCode, body } = await cadastrarUsuarioCompose(httpRequest);

  return response.status(statusCode).json(body);
});

usuariosRoutes.get('/cpf/:CPF', async (request, response) => {
  const httpRequest = {
    params: request.params
  };
  const { statusCode, body } = await buscarUsuarioPorCpfCompose(httpRequest);
  return response.status(statusCode).json(body);
});

module.exports = { usuariosRoutes };

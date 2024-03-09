const { Router } = require('express');
const { usuariosRoutes } = require('./usuarios.routes');

const routes = Router();

routes.use('/usuarios', usuariosRoutes);

module.exports = { routes };

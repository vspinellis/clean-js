const { Router } = require('express');
const { usuariosRoutes } = require('./usuarios.routes');
const { livrosRoutes } = require('./livros.routes');

const routes = Router();

routes.use('/usuarios', usuariosRoutes);
routes.use('/livros', livrosRoutes);

module.exports = { routes };

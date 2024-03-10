const { Router } = require('express');
const { usuariosRoutes } = require('./usuarios.routes');
const { livrosRoutes } = require('./livros.routes');
const { emprestimosRoutes } = require('./emprestimos.routes');

const routes = Router();

routes.use('/usuarios', usuariosRoutes);
routes.use('/livros', livrosRoutes);
routes.use('/emprestimos', emprestimosRoutes);

module.exports = { routes };

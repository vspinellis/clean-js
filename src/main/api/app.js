require('express-async-errors');
const express = require('express');
const { routes } = require('./routes');
const { ZodError } = require('zod');
const { typeormServer } = require('../../infra/db/typeorm/setup');
const app = express();

//CONFIGS
app.use(express.json());

typeormServer
  .initialize()
  .then(() => {
    //ROUTES
    app.use(routes);

    app.use(function (error, request, response, next) {
      if (error instanceof ZodError) {
        return response.status(400).json({ message: 'Erro na validação', erros: error.flatten() });
      }
      if (process.env.NODE !== 'production') console.log(error);
      return response.status(500).json({ message: 'Erro interno do servidor' });
    });
  })
  .catch((error) => {
    console.log('Erro durante a inicialização do servidor', error);
  });

module.exports = { app };

require('express-async-errors');
require('dotenv/config');
const express = require('express');
const { routes } = require('./routes');
const { ZodError } = require('zod');
const { typeormServer } = require('../../infra/db/typeorm/setup');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { sendMailQueue } = require('../../infra/queue/bull');

const app = express();

//QUEUE MONITOR
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/queues');

createBullBoard({
  queues: [new BullAdapter(sendMailQueue)],
  serverAdapter
});

//CONFIGS
app.use(express.json());

typeormServer
  .initialize()
  .then(() => {
    //ROUTES
    app.use(routes);

    app.use('/queues', serverAdapter.getRouter());

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

const typeorm = require('typeorm');

const typeormServer = new typeorm.DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  dropSchema: true,
  entities: [
    require('./entities/Usuario.entity-typeorm'),
    require('./entities/Livro.entity-typeorm'),
    require('./entities/Emprestimo.entity-typeorm')
  ]
});

module.exports = { typeormServer };

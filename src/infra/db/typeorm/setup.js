const typeorm = require('typeorm');

const typeormServer = new typeorm.DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  dropSchema: true,
  entities: [require('./entities/Usuario.entity-typeorm')]
});

module.exports = { typeormServer };

const { resolve } = require('path');
const typeorm = require('typeorm');

let typeormServer;

if (process.env.NODE_ENV === 'test') {
  typeormServer = new typeorm.DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    dropSchema: true,
    entities: [resolve(__dirname, 'entities/*.entity-typeorm.js')]
  });
} else if (process.env.NODE_ENV === 'integration') {
  typeormServer = new typeorm.DataSource({
    type: 'postgres',
    host: 'localhost',
    database: 'biblioteca_test',
    synchronize: true,
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    entities: [resolve(__dirname, 'entities/*.entity-typeorm.js')]
  });
}

module.exports = { typeormServer };

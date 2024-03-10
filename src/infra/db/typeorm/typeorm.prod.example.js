module.exports = {
  type: '',
  host: '',
  database: '',
  port: 5432,
  username: '',
  password: '',
  synchronize: false,
  entities: [resolve(__dirname, 'entities/*.entity-typeorm.js')]
};

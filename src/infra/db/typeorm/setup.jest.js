const { typeormServer } = require('./setup');

beforeAll(async function () {
  await typeormServer.initialize();
});

afterAll(async function () {
  await typeormServer.destroy();
});

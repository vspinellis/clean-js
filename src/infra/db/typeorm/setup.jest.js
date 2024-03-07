const { typeormServer } = require('./setup');

beforeAll(async function () {
  await typeormServer.initialize();
});

beforeAll(async function () {
  await typeormServer.destroy();
});

const Queue = require('bull');
const sendMail = require('../../../main/api/jobs/sendMail');

const sendMailQueue = new Queue(sendMail.key, {
  redis: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }
});

sendMailQueue.on('failed', (job) => {
  console.log(job);
});

module.exports = { sendMailQueue };

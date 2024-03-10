const Queue = require('bull');
const sendMail = require('../../../main/api/jobs/sendMail');

const sendMailQueue = new Queue(sendMail.key, {
  redis: { host: '127.0.0.1', port: 6379 }
});

sendMailQueue.on('failed', (job) => {
  console.log(job);
});

module.exports = { sendMailQueue };

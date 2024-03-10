require('dotenv/config');
const { sendMailQueue } = require('../../infra/queue/bull');
const sendMail = require('./jobs/sendMail');

sendMailQueue.process(sendMail.handle);

const { CronJob } = require('cron');

module.exports = (func) => {
  // Every 1 hour
  const job = new CronJob('* * */1 * * *', func());

  job.start();
};

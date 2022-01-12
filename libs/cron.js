const { CronJob } = require('cron');

const observant = require('./observant');

// Every 1 hour
module.exports = new CronJob('0 0 */1 * * *', async () => {
  console.log('Starting Cron Job');
  await observant();
  console.log('Stopping Cron Job');
});
